'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TrackDefinition, MagazineArticleItem } from '@/types/curriculum';
import { initialTracksData, initialMagazineArticles } from '@/data/seed-tracks';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

interface CurriculumContextType {
  tracks: TrackDefinition[];
  publishedTracks: TrackDefinition[];
  magazineArticles: MagazineArticleItem[];
  isLoading: boolean;
  getTrack: (idOrSlug: string) => TrackDefinition | undefined;
  saveTrack: (track: TrackDefinition) => Promise<{ success: boolean; error?: string }>;
  deleteTrack: (trackId: string) => Promise<{ success: boolean; error?: string }>;
  resetToDefaults: () => Promise<void>;
  getArticle: (idOrSlug: string) => MagazineArticleItem | undefined;
  saveArticle: (article: MagazineArticleItem) => Promise<{ success: boolean; error?: string }>;
  deleteArticle: (articleId: string) => Promise<{ success: boolean; error?: string }>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

const TRACKS_STORAGE_KEY = 'tot_academy_cms_tracks';
const ARTICLES_STORAGE_KEY = 'tot_academy_cms_articles';

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<TrackDefinition[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(TRACKS_STORAGE_KEY);
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

  const [magazineArticles, setMagazineArticles] = useState<MagazineArticleItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(ARTICLES_STORAGE_KEY);
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state to local storage whenever changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(TRACKS_STORAGE_KEY, JSON.stringify(tracks));
      } catch (e) {
        console.warn('LocalStorage save tracks error:', e);
      }
    }
  }, [tracks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(magazineArticles));
      } catch (e) {
        console.warn('LocalStorage save articles error:', e);
      }
    }
  }, [magazineArticles]);

  // Real-time Firestore sync if connected
  useEffect(() => {
    let isMounted = true;

    if (!db || !isFirebaseConfigured) {
      setIsLoading(false);
      return;
    }

    const firestore = db;

    try {
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
            setTracks(remoteTracks);
          } else {
            // Seed initial tracks to Firestore on first run
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

      return () => {
        isMounted = false;
        unsubscribeTracks();
        unsubscribeArticles();
      };
    } catch (e) {
      console.warn('CurriculumContext Firestore init exception:', e);
      setIsLoading(false);
    }
  }, []);

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

  const resetToDefaults = useCallback(async () => {
    setTracks(initialTracksData);
    setMagazineArticles(initialMagazineArticles);

    if (typeof window !== 'undefined') {
      localStorage.setItem(TRACKS_STORAGE_KEY, JSON.stringify(initialTracksData));
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(initialMagazineArticles));
    }

    if (db && isFirebaseConfigured) {
      try {
        for (const t of initialTracksData) {
          await setDoc(doc(db, 'tracks', t.id), t);
        }
        for (const a of initialMagazineArticles) {
          await setDoc(doc(db, 'magazine_articles', a.id), a);
        }
      } catch (e) {
        console.warn('Error resetting to defaults in Firestore:', e);
      }
    }
  }, []);

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

  const publishedTracks = tracks.filter((t) => t.status === 'published');

  return (
    <CurriculumContext.Provider
      value={{
        tracks,
        publishedTracks,
        magazineArticles,
        isLoading,
        getTrack,
        saveTrack,
        deleteTrack,
        resetToDefaults,
        getArticle,
        saveArticle,
        deleteArticle,
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
