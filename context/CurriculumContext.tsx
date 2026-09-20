'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  TrackDefinition,
  MagazineArticleItem,
  HomePageSettings,
  SiteGeneralSettings,
  AcademyEventItem,
  TrainerDirectoryItem,
  TrackTrainerItem,
} from '@/types/curriculum';
import { initialTracksData, initialMagazineArticles } from '@/data/seed-tracks';
import { buildComprehensiveTotTrack } from '@/lib/seed-comprehensive-track';
import {
  defaultHomeSettings,
  defaultSiteSettings,
  defaultEventsList,
  defaultTrainersList,
  getRegisteredPlatformTrainers,
} from '@/data/seed-cms';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { MASTER_ADMIN_EMAIL, checkIsAdmin } from '@/lib/adminAccess';

interface CurriculumContextType {
  tracks: TrackDefinition[];
  publishedTracks: TrackDefinition[];
  magazineArticles: MagazineArticleItem[];
  homeSettings: HomePageSettings;
  siteSettings: SiteGeneralSettings;
  eventsList: AcademyEventItem[];
  trainersList: TrainerDirectoryItem[];
  platformTrainers: TrackTrainerItem[];
  adminEmails: string[];
  isLoading: boolean;
  getTrack: (idOrSlug: string) => TrackDefinition | undefined;
  saveTrack: (track: TrackDefinition) => Promise<{ success: boolean; error?: string }>;
  deleteTrack: (trackId: string) => Promise<{ success: boolean; error?: string }>;
  getArticle: (idOrSlug: string) => MagazineArticleItem | undefined;
  saveArticle: (article: MagazineArticleItem) => Promise<{ success: boolean; error?: string }>;
  deleteArticle: (articleId: string) => Promise<{ success: boolean; error?: string }>;
  saveHomeSettings: (settings: HomePageSettings) => Promise<{ success: boolean; error?: string }>;
  saveSiteSettings: (settings: SiteGeneralSettings) => Promise<{ success: boolean; error?: string }>;
  saveEvent: (event: AcademyEventItem) => Promise<{ success: boolean; error?: string }>;
  deleteEvent: (eventId: string) => Promise<{ success: boolean; error?: string }>;
  saveTrainer: (trainer: TrainerDirectoryItem) => Promise<{ success: boolean; error?: string }>;
  deleteTrainer: (trainerId: string) => Promise<{ success: boolean; error?: string }>;
  addAdminEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  removeAdminEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  isUserAdmin: (email?: string | null) => boolean;
  resetToDefaults: () => Promise<void>;
  resetToSeedData: () => Promise<{ success: boolean; error?: string }>;
  seedComprehensiveTrackToDatabase: () => Promise<{ success: boolean; error?: string }>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

const TRACKS_KEY = 'tot_academy_cms_tracks';
const ARTICLES_KEY = 'tot_academy_cms_articles';
const HOME_KEY = 'tot_academy_cms_home';
const SITE_KEY = 'tot_academy_cms_site';
const EVENTS_KEY = 'tot_academy_cms_events';
const TRAINERS_KEY = 'tot_academy_cms_trainers';
const ADMINS_KEY = 'tot_academy_admin_emails';

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Tracks state
  const [tracks, setTracks] = useState<TrackDefinition[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(TRACKS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading cached tracks:', e);
      }
    }
    return initialTracksData;
  });

  // 2. Articles state
  const [magazineArticles, setMagazineArticles] = useState<MagazineArticleItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(ARTICLES_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading cached articles:', e);
      }
    }
    return initialMagazineArticles;
  });

  // 3. Home Page settings state
  const [homeSettings, setHomeSettings] = useState<HomePageSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(HOME_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Error reading cached home settings:', e);
      }
    }
    return defaultHomeSettings;
  });

  // 4. Site general settings
  const [siteSettings, setSiteSettings] = useState<SiteGeneralSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(SITE_KEY);
        if (cached) return JSON.parse(cached);
      } catch (e) {
        console.warn('Error reading cached site settings:', e);
      }
    }
    return defaultSiteSettings;
  });

  // 5. Events list
  const [eventsList, setEventsList] = useState<AcademyEventItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(EVENTS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading cached events:', e);
      }
    }
    return defaultEventsList;
  });

  // 6. Trainers directory list
  const [trainersList, setTrainersList] = useState<TrainerDirectoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(TRAINERS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading cached trainers:', e);
      }
    }
    return defaultTrainersList;
  });

  // 7. Dynamic Admin emails list
  const [adminEmails, setAdminEmails] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(ADMINS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Error reading cached admins:', e);
      }
    }
    return [MASTER_ADMIN_EMAIL];
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
      } catch {}
    }
  }, [tracks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ARTICLES_KEY, JSON.stringify(magazineArticles));
      } catch {}
    }
  }, [magazineArticles]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(HOME_KEY, JSON.stringify(homeSettings));
      } catch {}
    }
  }, [homeSettings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SITE_KEY, JSON.stringify(siteSettings));
      } catch {}
    }
  }, [siteSettings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(EVENTS_KEY, JSON.stringify(eventsList));
      } catch {}
    }
  }, [eventsList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TRAINERS_KEY, JSON.stringify(trainersList));
      } catch {}
    }
  }, [trainersList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ADMINS_KEY, JSON.stringify(adminEmails));
      } catch {}
    }
  }, [adminEmails]);

  // Firestore Real-time synchronization
  useEffect(() => {
    let isMounted = true;

    if (!db || !isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const firestore = db;

    try {
      // 1. Tracks listener
      const tracksCol = collection(firestore, 'tracks');
      const unsubscribeTracks = onSnapshot(
        tracksCol,
        (snapshot) => {
          if (!isMounted) return;
          if (!snapshot.empty) {
            const remoteTracks: TrackDefinition[] = [];
            snapshot.forEach((docSnap) => {
              remoteTracks.push({ ...(docSnap.data() as TrackDefinition), id: docSnap.id });
            });

            // If tot-foundation in remote database is missing or is an incomplete legacy stub, upgrade it to the full comprehensive track
            const totTrack = remoteTracks.find((t) => t.id === 'tot-foundation');
            const isStub = !totTrack || !totTrack.levels?.empowerment || (totTrack.levels?.foundation?.modules?.length || 0) < 8;
            if (isStub) {
              const fullTot = buildComprehensiveTotTrack();
              setDoc(doc(firestore, 'tracks', fullTot.id), fullTot).catch(console.warn);
              const merged = [fullTot, ...remoteTracks.filter((t) => t.id !== fullTot.id)];
              setTracks(merged);
            } else {
              setTracks(remoteTracks);
            }
          } else {
            initialTracksData.forEach((t) => {
              setDoc(doc(firestore, 'tracks', t.id), t).catch(console.warn);
            });
          }
          setIsLoading(false);
        },
        (err) => {
          console.warn('Firestore tracks listener note:', err.message);
          setIsLoading(false);
        }
      );

      // 2. Articles listener
      const articlesCol = collection(firestore, 'magazine_articles');
      const unsubscribeArticles = onSnapshot(
        articlesCol,
        (snapshot) => {
          if (!isMounted) return;
          if (!snapshot.empty) {
            const remoteArticles: MagazineArticleItem[] = [];
            snapshot.forEach((docSnap) => {
              remoteArticles.push({ ...(docSnap.data() as MagazineArticleItem), id: docSnap.id });
            });
            setMagazineArticles(remoteArticles);
          } else {
            initialMagazineArticles.forEach((a) => {
              setDoc(doc(firestore, 'magazine_articles', a.id), a).catch(console.warn);
            });
          }
        },
        (err) => {
          console.warn('Firestore articles listener note:', err.message);
        }
      );

      // 3. Home settings listener
      const homeDocRef = doc(firestore, 'cms', 'home_settings');
      const unsubscribeHome = onSnapshot(
        homeDocRef,
        (docSnap) => {
          if (!isMounted) return;
          if (docSnap.exists()) {
            setHomeSettings(docSnap.data() as HomePageSettings);
          } else {
            setDoc(homeDocRef, defaultHomeSettings).catch(console.warn);
          }
        },
        (err) => console.warn('Home settings listener note:', err.message)
      );

      // 4. Site settings & admin listener
      const siteDocRef = doc(firestore, 'cms', 'site_settings');
      const unsubscribeSite = onSnapshot(
        siteDocRef,
        (docSnap) => {
          if (!isMounted) return;
          if (docSnap.exists()) {
            const data = docSnap.data() as SiteGeneralSettings;
            setSiteSettings(data);
            if (Array.isArray(data.adminEmails) && data.adminEmails.length > 0) {
              setAdminEmails(data.adminEmails);
            }
          } else {
            setDoc(siteDocRef, defaultSiteSettings).catch(console.warn);
          }
        },
        (err) => console.warn('Site settings listener note:', err.message)
      );

      // 5. Events collection listener
      const eventsCol = collection(firestore, 'events');
      const unsubscribeEvents = onSnapshot(
        eventsCol,
        (snapshot) => {
          if (!isMounted) return;
          if (!snapshot.empty) {
            const remoteEvents: AcademyEventItem[] = [];
            snapshot.forEach((d) => remoteEvents.push({ ...(d.data() as AcademyEventItem), id: d.id }));
            setEventsList(remoteEvents);
          }
        },
        (err) => console.warn('Events listener note:', err.message)
      );

      return () => {
        isMounted = false;
        unsubscribeTracks();
        unsubscribeArticles();
        unsubscribeHome();
        unsubscribeSite();
        unsubscribeEvents();
      };
    } catch (e) {
      console.warn('CurriculumContext Firestore init exception:', e);
      setIsLoading(false);
    }
  }, []);

  // Platform trainers list ready for dropdown selection
  const platformTrainers = React.useMemo<TrackTrainerItem[]>(() => {
    // Combine seed platform trainers + any custom trainers added in trainersList
    const base = getRegisteredPlatformTrainers();
    trainersList.forEach((tr) => {
      if (!base.some((b) => b.id === tr.id)) {
        base.push({
          id: tr.id,
          name: tr.name,
          role: tr.role,
          img: tr.image,
          bio: tr.bio,
          email: tr.email,
          phone: tr.phone,
          isLead: false,
        });
      }
    });
    return base;
  }, [trainersList]);

  // Admin access check helper
  const isUserAdmin = useCallback(
    (email?: string | null): boolean => {
      return checkIsAdmin(email, adminEmails);
    },
    [adminEmails]
  );

  // Tracks Handlers
  const getTrack = useCallback(
    (idOrSlug: string): TrackDefinition | undefined => {
      if (!idOrSlug) return tracks[0];
      const clean = idOrSlug.replace(/^trk-/, '').toLowerCase();
      return (
        tracks.find((t) => t.id.toLowerCase() === clean || t.slug.toLowerCase() === clean) ||
        tracks.find((t) => t.id.toLowerCase() === idOrSlug.toLowerCase()) ||
        tracks[0]
      );
    },
    [tracks]
  );

  const saveTrack = useCallback(
    async (track: TrackDefinition): Promise<{ success: boolean; error?: string }> => {
      try {
        const updatedTrack: TrackDefinition = {
          ...track,
          updatedAt: new Date().toISOString(),
        };

        setTracks((prev) => {
          const exists = prev.some((t) => t.id === updatedTrack.id);
          if (exists) {
            return prev.map((t) => (t.id === updatedTrack.id ? updatedTrack : t));
          }
          return [updatedTrack, ...prev];
        });

        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'tracks', updatedTrack.id), updatedTrack, { merge: true });
        }

        return { success: true };
      } catch (err: any) {
        console.error('Error saving track:', err);
        return { success: false, error: err.message || 'فشل حفظ المسار' };
      }
    },
    []
  );

  const deleteTrack = useCallback(
    async (trackId: string): Promise<{ success: boolean; error?: string }> => {
      try {
        setTracks((prev) => prev.filter((t) => t.id !== trackId));
        if (db && isFirebaseConfigured) {
          await deleteDoc(doc(db, 'tracks', trackId));
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error deleting track:', err);
        return { success: false, error: err.message || 'فشل حذف المسار' };
      }
    },
    []
  );

  // Article Handlers
  const getArticle = useCallback(
    (idOrSlug: string): MagazineArticleItem | undefined => {
      const clean = idOrSlug.toLowerCase();
      return magazineArticles.find((a) => a.id.toLowerCase() === clean || a.slug.toLowerCase() === clean);
    },
    [magazineArticles]
  );

  const saveArticle = useCallback(
    async (article: MagazineArticleItem): Promise<{ success: boolean; error?: string }> => {
      try {
        setMagazineArticles((prev) => {
          const exists = prev.some((a) => a.id === article.id);
          if (exists) {
            return prev.map((a) => (a.id === article.id ? article : a));
          }
          return [article, ...prev];
        });

        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'magazine_articles', article.id), article, { merge: true });
        }

        return { success: true };
      } catch (err: any) {
        console.error('Error saving article:', err);
        return { success: false, error: err.message || 'فشل حفظ المقال' };
      }
    },
    []
  );

  const deleteArticle = useCallback(
    async (articleId: string): Promise<{ success: boolean; error?: string }> => {
      try {
        setMagazineArticles((prev) => prev.filter((a) => a.id !== articleId));
        if (db && isFirebaseConfigured) {
          await deleteDoc(doc(db, 'magazine_articles', articleId));
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error deleting article:', err);
        return { success: false, error: err.message || 'فشل حذف المقال' };
      }
    },
    []
  );

  // Home Settings Handler
  const saveHomeSettings = useCallback(
    async (settings: HomePageSettings): Promise<{ success: boolean; error?: string }> => {
      try {
        setHomeSettings(settings);
        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'cms', 'home_settings'), settings, { merge: true });
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error saving home settings:', err);
        return { success: false, error: err.message || 'فشل حفظ إعدادات الرئيسية' };
      }
    },
    []
  );

  // Site Settings Handler
  const saveSiteSettings = useCallback(
    async (settings: SiteGeneralSettings): Promise<{ success: boolean; error?: string }> => {
      try {
        setSiteSettings(settings);
        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'cms', 'site_settings'), settings, { merge: true });
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error saving site settings:', err);
        return { success: false, error: err.message || 'فشل حفظ إعدادات الموقع' };
      }
    },
    []
  );

  // Events Handlers
  const saveEvent = useCallback(
    async (event: AcademyEventItem): Promise<{ success: boolean; error?: string }> => {
      try {
        setEventsList((prev) => {
          const exists = prev.some((e) => e.id === event.id);
          if (exists) {
            return prev.map((e) => (e.id === event.id ? event : e));
          }
          return [event, ...prev];
        });

        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'events', event.id), event, { merge: true });
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error saving event:', err);
        return { success: false, error: err.message || 'فشل حفظ الفعالية' };
      }
    },
    []
  );

  const deleteEvent = useCallback(
    async (eventId: string): Promise<{ success: boolean; error?: string }> => {
      try {
        setEventsList((prev) => prev.filter((e) => e.id !== eventId));
        if (db && isFirebaseConfigured) {
          await deleteDoc(doc(db, 'events', eventId));
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error deleting event:', err);
        return { success: false, error: err.message || 'فشل حذف الفعالية' };
      }
    },
    []
  );

  // Trainer Handlers
  const saveTrainer = useCallback(
    async (trainer: TrainerDirectoryItem): Promise<{ success: boolean; error?: string }> => {
      try {
        setTrainersList((prev) => {
          const exists = prev.some((t) => t.id === trainer.id);
          if (exists) {
            return prev.map((t) => (t.id === trainer.id ? trainer : t));
          }
          return [trainer, ...prev];
        });

        if (db && isFirebaseConfigured) {
          await setDoc(doc(db, 'trainers', trainer.id), trainer, { merge: true });
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error saving trainer:', err);
        return { success: false, error: err.message || 'فشل حفظ بيانات المدرب' };
      }
    },
    []
  );

  const deleteTrainer = useCallback(
    async (trainerId: string): Promise<{ success: boolean; error?: string }> => {
      try {
        setTrainersList((prev) => prev.filter((t) => t.id !== trainerId));
        if (db && isFirebaseConfigured) {
          await deleteDoc(doc(db, 'trainers', trainerId));
        }
        return { success: true };
      } catch (err: any) {
        console.error('Error deleting trainer:', err);
        return { success: false, error: err.message || 'فشل حذف المدرب' };
      }
    },
    []
  );

  // Dynamic Admin Email Handlers
  const addAdminEmail = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      const normalized = email.trim().toLowerCase();
      if (!normalized || !normalized.includes('@')) {
        return { success: false, error: 'يرجى إدخال بريد إلكتروني صالح' };
      }
      if (adminEmails.includes(normalized)) {
        return { success: false, error: 'هذا البريد مسجل بالفعل كمسؤول' };
      }

      const updated = [...adminEmails, normalized];
      setAdminEmails(updated);

      const updatedSiteSettings = {
        ...siteSettings,
        adminEmails: updated,
      };
      setSiteSettings(updatedSiteSettings);

      if (db && isFirebaseConfigured) {
        try {
          await setDoc(doc(db, 'cms', 'site_settings'), updatedSiteSettings, { merge: true });
        } catch (e: any) {
          console.warn('Error saving admin email to Firestore:', e);
        }
      }

      return { success: true };
    },
    [adminEmails, siteSettings]
  );

  const removeAdminEmail = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      const normalized = email.trim().toLowerCase();
      if (normalized === MASTER_ADMIN_EMAIL.toLowerCase()) {
        return { success: false, error: 'لا يمكن حذف حساب المسؤول الرئيسي (abdo@gmail.com)' };
      }

      const updated = adminEmails.filter((adm) => adm.toLowerCase() !== normalized);
      setAdminEmails(updated);

      const updatedSiteSettings = {
        ...siteSettings,
        adminEmails: updated,
      };
      setSiteSettings(updatedSiteSettings);

      if (db && isFirebaseConfigured) {
        try {
          await setDoc(doc(db, 'cms', 'site_settings'), updatedSiteSettings, { merge: true });
        } catch (e: any) {
          console.warn('Error removing admin from Firestore:', e);
        }
      }

      return { success: true };
    },
    [adminEmails, siteSettings]
  );

  // Reset all to defaults
  const resetToDefaults = useCallback(async () => {
    setTracks(initialTracksData);
    setMagazineArticles(initialMagazineArticles);
    setHomeSettings(defaultHomeSettings);
    setSiteSettings(defaultSiteSettings);
    setEventsList(defaultEventsList);
    setTrainersList(defaultTrainersList);
    setAdminEmails([MASTER_ADMIN_EMAIL]);

    if (typeof window !== 'undefined') {
      localStorage.setItem(TRACKS_KEY, JSON.stringify(initialTracksData));
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(initialMagazineArticles));
      localStorage.setItem(HOME_KEY, JSON.stringify(defaultHomeSettings));
      localStorage.setItem(SITE_KEY, JSON.stringify(defaultSiteSettings));
      localStorage.setItem(EVENTS_KEY, JSON.stringify(defaultEventsList));
      localStorage.setItem(TRAINERS_KEY, JSON.stringify(defaultTrainersList));
      localStorage.setItem(ADMINS_KEY, JSON.stringify([MASTER_ADMIN_EMAIL]));
    }

    if (db && isFirebaseConfigured) {
      try {
        for (const t of initialTracksData) {
          await setDoc(doc(db, 'tracks', t.id), t);
        }
        for (const a of initialMagazineArticles) {
          await setDoc(doc(db, 'magazine_articles', a.id), a);
        }
        await setDoc(doc(db, 'cms', 'home_settings'), defaultHomeSettings);
        await setDoc(doc(db, 'cms', 'site_settings'), defaultSiteSettings);
      } catch (e) {
        console.warn('Error resetting to defaults in Firestore:', e);
      }
    }
  }, []);

  const seedComprehensiveTrackToDatabase = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const fullTrack = buildComprehensiveTotTrack();
      setTracks((prev) => {
        const otherTracks = prev.filter((t) => t.id !== fullTrack.id);
        return [fullTrack, ...otherTracks];
      });
      if (typeof window !== 'undefined') {
        try {
          const cachedTracks = [fullTrack, ...tracks.filter((t) => t.id !== fullTrack.id)];
          localStorage.setItem(TRACKS_KEY, JSON.stringify(cachedTracks));
        } catch {}
      }
      if (db && isFirebaseConfigured) {
        await setDoc(doc(db, 'tracks', fullTrack.id), fullTrack, { merge: false });
      }
      return { success: true };
    } catch (err: any) {
      console.error('Failed to seed comprehensive track to database:', err);
      return { success: false, error: err?.message || 'فشل حفظ المسار التأصيلي في قاعدة البيانات' };
    }
  }, [tracks]);

  const publishedTracks = tracks.filter((t) => t.status === 'published');

  return (
    <CurriculumContext.Provider
      value={{
        tracks,
        publishedTracks,
        magazineArticles,
        homeSettings,
        siteSettings,
        eventsList,
        trainersList,
        platformTrainers,
        adminEmails,
        isLoading,
        getTrack,
        saveTrack,
        deleteTrack,
        getArticle,
        saveArticle,
        deleteArticle,
        saveHomeSettings,
        saveSiteSettings,
        saveEvent,
        deleteEvent,
        saveTrainer,
        deleteTrainer,
        addAdminEmail,
        removeAdminEmail,
        isUserAdmin,
        resetToDefaults,
        resetToSeedData: async () => {
          await resetToDefaults();
          return { success: true };
        },
        seedComprehensiveTrackToDatabase,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export const useCurriculum = (): CurriculumContextType => {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
};
