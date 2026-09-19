'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  EnrolledTrack,
  UserCertificate,
  UserAppointment,
  ContributedArticle,
  SupervisedStudent,
  SupervisingProfessor,
} from '@/types/user';
import {
  auth,
  db,
  googleProvider,
  fetchUserProfileFromFirestore,
  saveUserProfileToFirestore,
  fetchUserEnrolledTracks,
  saveEnrolledTrackToFirestore,
  fetchTrackProgressFromFirestore,
  saveTrackProgressToFirestore,
  fetchUserCertificatesFromFirestore,
  fetchUserAppointmentsFromFirestore,
  TrackProgressRecord,
} from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateFirebaseProfile,
  User as FirebaseUser,
} from 'firebase/auth';

interface RegisterData {
  name: string;
  phone?: string;
  country?: string;
  role?: 'trainer' | 'trainee';
  specialty?: string;
}

interface UserAccountContextType {
  user: UserProfile;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  enrolledTracks: EnrolledTrack[];
  certificates: UserCertificate[];
  appointments: UserAppointment[];
  articles: ContributedArticle[];
  students: SupervisedStudent[];
  professors: SupervisingProfessor[];
  toggleRole: () => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, profileData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: (role?: 'trainer' | 'trainee') => void;
  logout: () => Promise<void>;
  enrollInTrack: (trackData: Partial<EnrolledTrack> & { trackKey: string; titleAr: string }) => Promise<{ success: boolean; error?: string }>;
  updateTrackProgress: (
    trackKey: string,
    data: {
      completedLessons: Record<string, string[]>;
      completedQuizzes: Record<string, string[]>;
      activeModuleId?: string;
      activeLevel?: 'foundation' | 'empowerment' | 'consolidation';
      overallProgress?: number;
      reportCode?: string;
    }
  ) => Promise<void>;
  getTrackProgress: (trackKey: string) => Promise<TrackProgressRecord | null>;
}

const DEFAULT_TRAINER_PROFILE: UserProfile = {
  id: 'tot-usr-1094',
  name: 'د. عبد الكريم بلخيري',
  email: 'a.belkheiri@tot-academy.org',
  phone: '+213 555 989 370',
  role: 'trainer',
  roleTitleAr: 'مدرب دولي معتمد وخبير تدريب المدربين (Master TOT)',
  roleTitleEn: 'Certified International Master Trainer (TOT)',
  specialtyAr: 'هندسة التدريب والتطوير القيادي والذكاء الاصطناعي التعليمي',
  specialtyEn: 'Training Engineering, Leadership & AI in Education',
  bioAr: 'خبير واستشاري معتمد في تأهيل المدربين وتصميم الحقائب التدريبية التفاعلية بخبرة تفوق 14 سنة في الإشراف الأكاديمي والتوجيه الاحترافي في الجزائر والعالم العربي.',
  bioEn: 'Certified international consultant & trainer in TOT programs and interactive instructional design with 14+ years of academic supervision.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
  joinedDate: '15 جانفي 2023',
  country: 'الجزائر',
  city: 'الجزائر العاصمة',
  membershipNumber: 'TOT-DZ-2023-8841',
  status: 'verified',
};

const DEFAULT_TRAINEE_PROFILE: UserProfile = {
  id: 'tot-usr-2045',
  name: 'أحمد بن سالم الهاشمي',
  email: 'ahmed.hashemi@gmail.com',
  phone: '+213 661 234 567',
  role: 'trainee',
  roleTitleAr: 'متدرب متخصص احترافي (TOT/P-P)',
  roleTitleEn: 'Professional Specialized Trainee (TOT/P-P)',
  specialtyAr: 'تصميم الحقائب التدريبية واستراتيجيات التدريب المباشر',
  specialtyEn: 'Instructional Design & Live Facilitation Strategies',
  bioAr: 'أستاذ باحث ومترشح للحصول على الاعتماد الاحترافي لتدريب المدربين ضمن الدفعة 14 بالأكاديمية.',
  bioEn: 'Lecturer and researcher pursuing the Professional Trainer Certification within Batch 14 at TOT Academy.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
  joinedDate: '04 سبتمبر 2024',
  country: 'الجزائر',
  city: 'وهران',
  membershipNumber: 'TOT-STU-2024-9102',
  status: 'active',
};

const INITIAL_TRACKS: EnrolledTrack[] = [
  {
    id: 'trk-1',
    trackKey: 'tot-foundation',
    titleAr: 'تدريب المدربين - المستوى التأسيسي (TOT/P-F)',
    titleEn: 'Training of Trainers - Foundation Level',
    categoryAr: 'برامج إعداد المدربين',
    categoryEn: 'Trainer Preparation',
    enrolledAt: '12 سبتمبر 2024',
    progress: 100,
    status: 'completed',
    nextSessionAr: 'تم اجتياز المسار والاعتماد بنجاح',
    nextSessionEn: 'Track completed & accredited',
    mentorName: 'د. كمال منصوري',
    badge: 'TOT/P-F',
    totalLessons: 12,
    completedLessons: 12,
  },
  {
    id: 'trk-2',
    trackKey: 'tot-pro',
    titleAr: 'تدريب المدربين - الاحترافي المتخصص (TOT/P-P)',
    titleEn: 'Professional Trainer Track (TOT/P-P)',
    categoryAr: 'البرامج الاحترافية المتقدمة',
    categoryEn: 'Advanced Programs',
    enrolledAt: '01 نوفمبر 2024',
    progress: 75,
    status: 'in_progress',
    nextSessionAr: 'الأحد القادم: ورشة الحقائب التفاعلية (18:00)',
    nextSessionEn: 'Next Sunday: Interactive Kits (18:00)',
    mentorName: 'د. سمية العربي',
    badge: 'TOT/P-P',
    totalLessons: 16,
    completedLessons: 12,
  },
  {
    id: 'trk-3',
    trackKey: 'ai-training',
    titleAr: 'دمج أدوات الذكاء الاصطناعي في التعليم والتدريب',
    titleEn: 'AI Tools in Modern Training & Facilitation',
    categoryAr: 'التكنولوجيا والابتكار التربوي',
    categoryEn: 'EdTech & AI',
    enrolledAt: '10 جانفي 2025',
    progress: 30,
    status: 'confirmed',
    nextSessionAr: 'اللقاء التفاعلي الأول: الخميس 20:00 (Zoom)',
    nextSessionEn: 'First Live Meeting: Thursday 20:00 (Zoom)',
    mentorName: 'م. إلياس بلقاسم',
    badge: 'AI-Edu',
    totalLessons: 10,
    completedLessons: 3,
  },
];

const INITIAL_CERTIFICATES: UserCertificate[] = [
  {
    id: 'cert-1',
    titleAr: 'شهادة مدرب معتمد أساسي (TOT Certified)',
    titleEn: 'Certified Foundation Trainer (TOT/P-F)',
    trackTitleAr: 'المسار التدريبي التأسيسي - الدفعة 12',
    trackTitleEn: 'Foundation Training Track - Cohort 12',
    issueDate: '28 أكتوبر 2024',
    credentialId: 'TOT-CERT-2024-8841F',
    grade: 'ممتاز مع مرتبة الشرف (96%)',
    hours: 45,
    issuerAr: 'الأكاديمية الدولية للتدريب وتأهيل المدربين',
    issuerEn: 'International TOT Academy & Accreditation Board',
  },
  {
    id: 'cert-2',
    titleAr: 'دبلوم مهارات العرض والإلقاء والتأثير الإقناعي',
    titleEn: 'Public Speaking & Influential Presentation Diploma',
    trackTitleAr: 'برنامج الكفاءة الخطابية للمدربين',
    trackTitleEn: 'Public Speaking for Trainers',
    issueDate: '14 ديسمبر 2024',
    credentialId: 'TOT-CERT-2024-5120S',
    grade: 'جيد جداً (91%)',
    hours: 30,
    issuerAr: 'هيئة التدريب التفاعلي والتطوير القيادي',
    issuerEn: 'Interactive Training & Leadership Board',
  },
];

const INITIAL_APPOINTMENTS: UserAppointment[] = [
  {
    id: 'app-1',
    titleAr: 'ورشة التحكيم والتطبيق العملي الحضوري (وهران)',
    titleEn: 'Practical Facilitation Workshop (Oran)',
    type: 'workshop',
    typeLabelAr: 'ورشة تدريبية حضورية',
    typeLabelEn: 'In-person Workshop',
    date: '25 فيفري 2025',
    time: '09:30 - 15:00',
    locationAr: 'فندق الزينيت - القاعة الكبرى (وهران)',
    locationEn: 'Le Zenith Hotel - Grand Hall (Oran)',
    mentorOrHost: 'د. عبد الكريم بلخيري',
    status: 'upcoming',
    link: 'https://maps.google.com',
  },
  {
    id: 'app-2',
    titleAr: 'جلسة التوجيه الفردي: مراجعة مشروع التخرج التدريبي',
    titleEn: '1-on-1 Mentorship: Capstone Project Review',
    type: 'consultation',
    typeLabelAr: 'جلسة توجيه فردي (1-on-1)',
    typeLabelEn: '1-on-1 Consultation',
    date: '02 مارس 2025',
    time: '19:00 - 20:00',
    locationAr: 'قاعة افتراضية زوم (Zoom Meeting)',
    locationEn: 'Virtual Zoom Hall',
    mentorOrHost: 'د. سمية العربي',
    status: 'upcoming',
    link: 'https://zoom.us',
  },
  {
    id: 'app-3',
    titleAr: 'الامتحان النهائي الشامل لتقييم الكفاءة التدريبية',
    titleEn: 'Comprehensive Final Certification Exam',
    type: 'exam',
    typeLabelAr: 'تقييم واعتماد رسمي',
    typeLabelEn: 'Official Exam',
    date: '15 مارس 2025',
    time: '18:00 - 20:00',
    locationAr: 'منصة الاختبارات الإلكترونية بالأكاديمية',
    locationEn: 'TOT Digital Exam Portal',
    mentorOrHost: 'لجنة التحكيم والاعتماد',
    status: 'upcoming',
    link: '/edupath#quiz-group',
  },
];

const INITIAL_ARTICLES: ContributedArticle[] = [
  {
    id: 'art-1',
    titleAr: 'استراتيجيات كسر الجليد وصناعة الألفة في أول 10 دقائق من القاعة التدريبية',
    titleEn: 'Ice-Breaking Strategies & Instant Rapport in the First 10 Minutes',
    categoryAr: 'مهارات العرض والتيسير',
    categoryEn: 'Presentation Skills',
    readCount: 1420,
    publishDate: '12 نوفمبر 2024',
    status: 'published',
    issueNumber: 6,
  },
  {
    id: 'art-2',
    titleAr: 'كيف تدمج النماذج التوليدية للذكاء الاصطناعي في صياغة سيناريوهات تدريبية واقعية؟',
    titleEn: 'Integrating GenAI to Craft Realistic Training Case Scenarios',
    categoryAr: 'الذكاء الاصطناعي والتعليم',
    categoryEn: 'EdTech & AI',
    readCount: 890,
    publishDate: '04 جانفي 2025',
    status: 'published',
    issueNumber: 7,
  },
  {
    id: 'art-3',
    titleAr: 'دليل تصميم استبيانات قياس الأثر التدريبي وفق نموذج كيركباتريك',
    titleEn: 'Designing Post-Training ROI Surveys using Kirkpatrick Model',
    categoryAr: 'هندسة وتقييم التدريب',
    categoryEn: 'Training ROI & Evaluation',
    readCount: 0,
    publishDate: 'قيد التدقيق التحريري',
    status: 'under_review',
    issueNumber: 8,
  },
];

const INITIAL_STUDENTS: SupervisedStudent[] = [
  {
    id: 'stu-1',
    name: 'سارة بوجمعة',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    trackTitleAr: 'المسار الاحترافي TOT/P-P',
    trackTitleEn: 'Professional TOT Track',
    progress: 90,
    lastActive: 'منذ ساعتين',
    status: 'submitted_exam',
    phone: '+213 551 223 344',
  },
  {
    id: 'stu-2',
    name: 'يوسف مزيان',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    trackTitleAr: 'المسار التأسيسي TOT/P-F',
    trackTitleEn: 'Foundation TOT Track',
    progress: 65,
    lastActive: 'أمس',
    status: 'active',
    phone: '+213 662 445 566',
  },
  {
    id: 'stu-3',
    name: 'مريم شريف',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    trackTitleAr: 'تصميم الحقائب بالذكاء الاصطناعي',
    trackTitleEn: 'AI Course Kits Design',
    progress: 100,
    lastActive: 'منذ 3 أيام',
    status: 'completed',
    phone: '+213 770 889 900',
  },
];

const INITIAL_PROFESSORS: SupervisingProfessor[] = [
  {
    id: 'prof-1',
    name: 'د. كمال منصوري',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    specialtyAr: 'كبير مستشاري تدريب المدربين وهندسة الكفاءات',
    specialtyEn: 'Senior TOT Consultant & Competency Engineer',
    degreeAr: 'دكتوراه في علوم التربية والمناهج وتطوير الأداء',
    degreeEn: 'Ph.D. in Educational Sciences & Performance',
    trackAr: 'المسار التأسيسي والاحترافي (TOT/P-F & P-P)',
    trackEn: 'Foundation & Professional Tracks',
    phone: '+213 550 112 233',
    email: 'k.mansouri@tot-academy.org',
  },
  {
    id: 'prof-2',
    name: 'د. سمية العربي',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    specialtyAr: 'أخصائية التوجيه القيادي والكوتشينغ التدريبي للمدربين',
    specialtyEn: 'Leadership Mentoring & Executive Coaching',
    degreeAr: 'دكتوراه في علم النفس التدريبي والتواصل المؤسسي',
    degreeEn: 'Ph.D. in Training Psychology & Communication',
    trackAr: 'برنامج التحكيم والتقييم النهائي',
    trackEn: 'Final Assessment & Accreditation Board',
    phone: '+213 555 334 455',
    email: 's.elarbi@tot-academy.org',
  },
];

const UserAccountContext = createContext<UserAccountContextType | undefined>(undefined);

const STORAGE_KEY = 'tot_user_profile_v2';
const AUTH_STATE_KEY = 'tot_auth_state_v2';

export const UserAccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_TRAINER_PROFILE);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [enrolledTracks, setEnrolledTracks] = useState<EnrolledTrack[]>(INITIAL_TRACKS);
  const [certificates, setCertificates] = useState<UserCertificate[]>(INITIAL_CERTIFICATES);
  const [appointments, setAppointments] = useState<UserAppointment[]>(INITIAL_APPOINTMENTS);
  const [articles] = useState<ContributedArticle[]>(INITIAL_ARTICLES);
  const [students] = useState<SupervisedStudent[]>(INITIAL_STUDENTS);
  const [professors] = useState<SupervisingProfessor[]>(INITIAL_PROFESSORS);

  // Synchronize with Firebase Auth state
  useEffect(() => {
    // 1. Check local cache first for instant UI response
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedAuth = localStorage.getItem(AUTH_STATE_KEY);
      if (savedAuth !== null) {
        setIsAuthenticated(savedAuth === 'true');
      }
    } catch {
      // ignore local cache errors
    }

    // 2. Attach live Firebase Auth listener
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem(AUTH_STATE_KEY, 'true');
        } catch {}

        // Load profile from Firestore
        try {
          const remoteProfile = await fetchUserProfileFromFirestore(fUser.uid);
          if (remoteProfile) {
            setUser(remoteProfile);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteProfile));
            } catch {}
          } else {
            // New Firebase user without Firestore document yet - save initial profile
            const newProfile: UserProfile = {
              id: fUser.uid,
              name: fUser.displayName || user.name || 'عضو الأكاديمية',
              email: fUser.email || user.email,
              phone: user.phone,
              role: user.role || 'trainee',
              roleTitleAr: user.role === 'trainer' ? DEFAULT_TRAINER_PROFILE.roleTitleAr : DEFAULT_TRAINEE_PROFILE.roleTitleAr,
              roleTitleEn: user.role === 'trainer' ? DEFAULT_TRAINER_PROFILE.roleTitleEn : DEFAULT_TRAINEE_PROFILE.roleTitleEn,
              specialtyAr: user.specialtyAr || 'إعداد وتأهيل المدربين',
              specialtyEn: user.specialtyEn || 'Training of Trainers',
              bioAr: user.bioAr || 'عضو مسجل في المنصة الأكاديمية لتدريب المدربين.',
              bioEn: user.bioEn || 'Registered member at TOT International Academy.',
              avatar: fUser.photoURL || user.avatar,
              coverImage: user.coverImage || DEFAULT_TRAINER_PROFILE.coverImage,
              joinedDate: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
              country: user.country || 'الجزائر',
              city: user.city || 'الجزائر',
              membershipNumber: `TOT-${Math.floor(1000 + Math.random() * 9000)}`,
              status: 'active',
            };
            setUser(newProfile);
            await saveUserProfileToFirestore(newProfile).catch(() => {});
          }

          // Load enrolled tracks from Firestore
          const remoteTracks = await fetchUserEnrolledTracks(fUser.uid);
          if (remoteTracks && remoteTracks.length > 0) {
            setEnrolledTracks(remoteTracks);
          } else {
            // Seed initial track for the new user and persist to Firestore
            for (const trk of INITIAL_TRACKS) {
              await saveEnrolledTrackToFirestore(fUser.uid, trk).catch(() => {});
            }
          }

          // Load certificates and appointments if any
          const remoteCerts = await fetchUserCertificatesFromFirestore(fUser.uid);
          if (remoteCerts && remoteCerts.length > 0) setCertificates(remoteCerts);

          const remoteAppts = await fetchUserAppointmentsFromFirestore(fUser.uid);
          if (remoteAppts && remoteAppts.length > 0) setAppointments(remoteAppts);
        } catch (err) {
          console.warn('Note loading user data from Firestore:', err);
        }
      } else {
        // If not signed into Firebase Auth, rely on local session flag if set
        const savedAuth = localStorage.getItem(AUTH_STATE_KEY);
        if (savedAuth === 'false') {
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async (updated: Partial<UserProfile>) => {
    const next = { ...user, ...updated };
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}

    // Persist to Firestore if user has an active UID or Firebase User
    const targetUid = firebaseUser?.uid || (next.id.startsWith('tot-usr') ? null : next.id);
    if (targetUid) {
      await saveUserProfileToFirestore({ ...next, id: targetUid }).catch((err) => {
        console.warn('Sync profile to Firestore:', err);
      });
    }
  };

  const toggleRole = () => {
    const nextRole = user.role === 'trainer' ? 'trainee' : 'trainer';
    const template = nextRole === 'trainer' ? DEFAULT_TRAINER_PROFILE : DEFAULT_TRAINEE_PROFILE;
    const next: UserProfile = {
      ...template,
      id: user.id,
      name: user.name || template.name,
      email: user.email || template.email,
      phone: user.phone || template.phone,
      country: user.country || template.country,
      city: user.city || template.city,
    };
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    if (firebaseUser?.uid) {
      saveUserProfileToFirestore(next).catch(() => {});
    }
  };

  // Real Firebase Registration
  const register = async (
    email: string,
    password: string,
    profileData: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      let createdUid = `usr-${Date.now()}`;
      if (auth) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          createdUid = userCredential.user.uid;
          if (profileData.name && userCredential.user) {
            await updateFirebaseProfile(userCredential.user, {
              displayName: profileData.name,
            });
          }
        } catch (fbError: any) {
          // Translate common Firebase errors to user-friendly Arabic
          let errorMsg = fbError.message || 'حدث خطأ أثناء إنشاء الحساب';
          if (fbError.code === 'auth/email-already-in-use') {
            errorMsg = 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام بريد آخر.';
          } else if (fbError.code === 'auth/weak-password') {
            errorMsg = 'كلمة المرور ضعيفة، يجب أن تحتوي على 6 خانات على الأقل.';
          } else if (fbError.code === 'auth/invalid-email') {
            errorMsg = 'صيغة البريد الإلكتروني غير صحيحة.';
          }
          return { success: false, error: errorMsg };
        }
      }

      const role = profileData.role || 'trainee';
      const roleTemplate = role === 'trainer' ? DEFAULT_TRAINER_PROFILE : DEFAULT_TRAINEE_PROFILE;

      const newProfile: UserProfile = {
        ...roleTemplate,
        id: createdUid,
        name: profileData.name,
        email,
        phone: profileData.phone || '+213 555 000 000',
        country: profileData.country || 'الجزائر',
        role,
        specialtyAr: profileData.specialty || (role === 'trainer' ? 'تدريب المدربين والقيادة' : 'تصميم الحقائب والمحتوى'),
        joinedDate: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
        membershipNumber: `TOT-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'active',
      };

      setUser(newProfile);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
        localStorage.setItem(AUTH_STATE_KEY, 'true');
      } catch {}

      await saveUserProfileToFirestore(newProfile).catch(() => {});
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'فشلت عملية التسجيل.' };
    }
  };

  // Real Firebase Login
  const login = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (auth && password) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const fUser = userCredential.user;
          const remoteProfile = await fetchUserProfileFromFirestore(fUser.uid);
          if (remoteProfile) {
            setUser(remoteProfile);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteProfile));
          } else {
            const updated = {
              ...user,
              id: fUser.uid,
              email: fUser.email || email,
              name: fUser.displayName || user.name,
            };
            setUser(updated);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          }
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STATE_KEY, 'true');
          return { success: true };
        } catch (fbError: any) {
          let errorMsg = fbError.message || 'فشل تسجيل الدخول';
          if (
            fbError.code === 'auth/wrong-password' ||
            fbError.code === 'auth/user-not-found' ||
            fbError.code === 'auth/invalid-credential'
          ) {
            errorMsg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى المحاولة ثانية.';
          } else if (fbError.code === 'auth/invalid-email') {
            errorMsg = 'صيغة البريد الإلكتروني غير صالحة.';
          }
          return { success: false, error: errorMsg };
        }
      }

      // Quick offline/local fallback login
      setIsAuthenticated(true);
      const updated = { ...user, email };
      setUser(updated);
      try {
        localStorage.setItem(AUTH_STATE_KEY, 'true');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'حدث خطأ أثناء تسجيل الدخول.' };
    }
  };

  // Google Sign In
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth || !googleProvider) {
        quickDemoLogin('trainer');
        return { success: true };
      }
      const result = await signInWithPopup(auth, googleProvider);
      const fUser = result.user;
      const remoteProfile = await fetchUserProfileFromFirestore(fUser.uid);
      if (remoteProfile) {
        setUser(remoteProfile);
      } else {
        const newProfile: UserProfile = {
          ...DEFAULT_TRAINEE_PROFILE,
          id: fUser.uid,
          name: fUser.displayName || 'عضو جديد',
          email: fUser.email || '',
          avatar: fUser.photoURL || DEFAULT_TRAINEE_PROFILE.avatar,
        };
        setUser(newProfile);
        await saveUserProfileToFirestore(newProfile).catch(() => {});
      }
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STATE_KEY, 'true');
      return { success: true };
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'تم إغلاق نافذة تسجيل الدخول بـ Google.' };
      }
      console.warn('Google Sign In note:', error);
      // If popup fails (e.g. in iframe), allow demo login
      quickDemoLogin('trainer');
      return { success: true };
    }
  };

  // Quick Demo Login helper for preview convenience
  const quickDemoLogin = (role: 'trainer' | 'trainee' = 'trainer') => {
    const template = role === 'trainer' ? DEFAULT_TRAINER_PROFILE : DEFAULT_TRAINEE_PROFILE;
    setUser(template);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(template));
      localStorage.setItem(AUTH_STATE_KEY, 'true');
    } catch {}
  };

  // Enroll in track and persist to Firestore
  const enrollInTrack = async (
    trackData: Partial<EnrolledTrack> & { trackKey: string; titleAr: string }
  ): Promise<{ success: boolean; error?: string }> => {
    const trackId = trackData.id || `trk-${trackData.trackKey}`;
    const newTrack: EnrolledTrack = {
      id: trackId,
      trackKey: trackData.trackKey,
      titleAr: trackData.titleAr,
      titleEn: trackData.titleEn || trackData.titleAr,
      categoryAr: trackData.categoryAr || 'المسارات التدريبية المعتمدة',
      categoryEn: trackData.categoryEn || 'Accredited Training Tracks',
      enrolledAt: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      progress: trackData.progress || 0,
      status: trackData.status || 'confirmed',
      nextSessionAr: trackData.nextSessionAr || 'تم تأكيد القيد بنجاح، يمكنك متابعة المحاور من حيث توقفت.',
      nextSessionEn: trackData.nextSessionEn || 'Registration confirmed. You can start learning now.',
      mentorName: trackData.mentorName || 'طاقم أكاديمية TOT',
      badge: trackData.badge || 'TOT-PRO',
      totalLessons: trackData.totalLessons || 18,
      completedLessons: trackData.completedLessons || 0,
    };

    setEnrolledTracks((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === trackId || t.trackKey === newTrack.trackKey);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], ...newTrack };
        return copy;
      }
      return [newTrack, ...prev];
    });

    const targetUid = firebaseUser?.uid || user.id;
    if (targetUid) {
      await saveEnrolledTrackToFirestore(targetUid, newTrack).catch((err) => {
        console.warn('Sync enrolled track to Firestore error:', err);
      });
    }

    return { success: true };
  };

  // Update track progress in Firestore and state
  const updateTrackProgress = async (
    trackKey: string,
    data: {
      completedLessons: Record<string, string[]>;
      completedQuizzes: Record<string, string[]>;
      activeModuleId?: string;
      activeLevel?: 'foundation' | 'empowerment' | 'consolidation';
      overallProgress?: number;
      reportCode?: string;
    }
  ): Promise<void> => {
    const targetUid = firebaseUser?.uid || user.id;
    if (!targetUid) return;

    // Calculate total completed lessons count
    const totalLessonsDone = Object.values(data.completedLessons).reduce(
      (acc, curr) => acc + (curr?.length || 0),
      0
    );

    // 1. Save track progress record in Firestore
    await saveTrackProgressToFirestore(targetUid, trackKey, {
      activeLevel: data.activeLevel || 'foundation',
      activeModuleId: data.activeModuleId || 'module_1',
      completedLessons: data.completedLessons,
      completedQuizzes: data.completedQuizzes,
      overallProgress: data.overallProgress || 0,
      reportCode: data.reportCode,
    }).catch((err) => {
      console.warn('Failed to save track progress to Firestore:', err);
    });

    // 2. Also update enrolledTracks item for this track
    setEnrolledTracks((prev) => {
      const idx = prev.findIndex((t) => t.trackKey === trackKey || t.id.includes(trackKey));
      if (idx >= 0) {
        const updatedTrack: EnrolledTrack = {
          ...prev[idx],
          progress: data.overallProgress !== undefined ? data.overallProgress : prev[idx].progress,
          completedLessons: totalLessonsDone,
          status: (data.overallProgress || prev[idx].progress) >= 100 ? 'completed' : 'in_progress',
        };
        const copy = [...prev];
        copy[idx] = updatedTrack;

        // Persist track update to Firestore
        saveEnrolledTrackToFirestore(targetUid, updatedTrack).catch(() => {});
        return copy;
      }
      return prev;
    });
  };

  // Retrieve track progress from Firestore
  const getTrackProgress = async (trackKey: string): Promise<TrackProgressRecord | null> => {
    const targetUid = firebaseUser?.uid || user.id;
    if (!targetUid) return null;
    return await fetchTrackProgressFromFirestore(targetUid, trackKey);
  };

  // Sign out
  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth).catch(() => {});
      }
    } finally {
      setIsAuthenticated(false);
      setFirebaseUser(null);
      try {
        localStorage.setItem(AUTH_STATE_KEY, 'false');
      } catch {}
    }
  };

  return (
    <UserAccountContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated,
        loading,
        enrolledTracks,
        certificates,
        appointments,
        articles,
        students,
        professors,
        toggleRole,
        updateProfile,
        login,
        register,
        loginWithGoogle,
        quickDemoLogin,
        logout,
        enrollInTrack,
        updateTrackProgress,
        getTrackProgress,
      }}
    >
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = (): UserAccountContextType => {
  const context = useContext(UserAccountContext);
  if (!context) {
    throw new Error('useUserAccount must be used within a UserAccountProvider');
  }
  return context;
};
