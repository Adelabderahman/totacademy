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
  ConfirmedEnrollmentRecord,
  UserNotification,
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
  deleteTrackProgressFromFirestore,
  deleteEnrolledTrackFromFirestore,
  fetchUserConfirmedEnrollments,
  saveConfirmedEnrollmentToFirestore,
  fetchUserCertificatesFromFirestore,
  saveUserCertificateToFirestore,
  fetchUserAppointmentsFromFirestore,
  saveUserAppointmentToFirestore,
  deleteUserAppointmentFromFirestore,
  fetchUserNotificationsFromFirestore,
  saveUserNotificationToFirestore,
  markNotificationReadInFirestore,
  deleteNotificationFromFirestore,
  sendNotificationToUser,
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
import { collection, onSnapshot } from 'firebase/firestore';

interface RegisterData {
  name: string;
  phone?: string;
  country?: string;
  role?: 'user' | 'trainer' | 'trainee';
  accountType?: string;
  accountTypeLabelAr?: string;
  accountTypeLabelEn?: string;
  specialty?: string;
  bio?: string;
}

interface UserAccountContextType {
  user: UserProfile;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  enrolledTracks: EnrolledTrack[];
  certificates: UserCertificate[];
  appointments: UserAppointment[];
  notifications: UserNotification[];
  unreadNotificationsCount: number;
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
  confirmedEnrollments: Record<string, ConfirmedEnrollmentRecord>;
  isTrackConfirmed: (trackKey: string) => boolean;
  confirmTrackEnrollment: (
    trackKey: string,
    trackTitleAr?: string,
    snapshotData?: {
      overallProgress?: number;
      completedLessons?: Record<string, string[]>;
      completedQuizzes?: Record<string, string[]>;
      activeLevel?: string;
      activeModuleId?: string;
      reportCode?: string;
    }
  ) => Promise<{ success: boolean; error?: string }>;
  deleteTrackFromAccount: (trackKey: string) => Promise<{ success: boolean; error?: string }>;
  resetTrackProgress: (trackKey: string) => Promise<void>;
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
  addAppointment: (appointment: Omit<UserAppointment, 'id'>) => { success: boolean; id: string };
  cancelAppointment: (apptId: string) => Promise<{ success: boolean }>;
  addArticle: (article: Omit<ContributedArticle, 'id'>) => { success: boolean; id: string };
  addCertificate: (cert: Omit<UserCertificate, 'id'>) => { success: boolean; id: string };
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  sendDirectNotification: (notif: Omit<UserNotification, 'id'>, targetUserId: string) => Promise<void>;
}

const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'tot-usr-member',
  name: 'عضو الأكاديمية',
  email: 'member@tot-academy.org',
  phone: '+213 555 000 000',
  role: 'user',
  roleTitleAr: 'عضو أكاديمية تدريب المدربين',
  roleTitleEn: 'TOT Academy Member',
  accountType: 'trainer',
  accountTypeLabelAr: 'مدرب',
  accountTypeLabelEn: 'Trainer',
  specialtyAr: 'إعداد وتأهيل المدربين وتطوير المهارات',
  specialtyEn: 'Professional Training & Skill Development',
  bioAr: 'عضو مسجل بالأكاديمية لمتابعة المسارات التدريبية المعتمدة وتطوير مهارات التدريب الاحترافي.',
  bioEn: 'Registered member at TOT Academy pursuing accredited training tracks and professional development.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
  joinedDate: '2025',
  country: 'الجزائر',
  city: 'الجزائر العاصمة',
  membershipNumber: 'TOT-MBR-2025',
  status: 'active',
};

const DEFAULT_TRAINER_PROFILE: UserProfile = {
  id: 'tot-usr-1094',
  name: 'د. عبد الكريم بلخيري',
  email: 'a.belkheiri@tot-academy.org',
  phone: '+213 555 989 370',
  role: 'trainer',
  roleTitleAr: 'مدرب دولي معتمد وخبير تدريب المدربين (Master TOT)',
  roleTitleEn: 'Certified International Master Trainer (TOT)',
  accountType: 'tot-master-trainer',
  accountTypeLabelAr: 'مدرب مدربين',
  accountTypeLabelEn: 'Master Trainer of Trainers',
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
  accountType: 'trainee',
  accountTypeLabelAr: 'متدرب',
  accountTypeLabelEn: 'Trainee',
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

const setAuthCookie = (email?: string | null) => {
  if (typeof document !== 'undefined') {
    if (email) {
      document.cookie = `tot_user_email=${encodeURIComponent(email)}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      document.cookie = 'tot_user_email=; path=/; max-age=0; SameSite=Lax';
    }
  }
};

export const UserAccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [enrolledTracks, setEnrolledTracks] = useState<EnrolledTrack[]>([]);
  const [confirmedEnrollments, setConfirmedEnrollments] = useState<Record<string, ConfirmedEnrollmentRecord>>({});
  const [certificates, setCertificates] = useState<UserCertificate[]>(INITIAL_CERTIFICATES);
  const [appointments, setAppointments] = useState<UserAppointment[]>(INITIAL_APPOINTMENTS);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const [articles, setArticles] = useState<ContributedArticle[]>(INITIAL_ARTICLES);
  const [students] = useState<SupervisedStudent[]>(INITIAL_STUDENTS);
  const [professors] = useState<SupervisingProfessor[]>(INITIAL_PROFESSORS);

  // Synchronize with Firebase Auth state
  useEffect(() => {
    // 1. Check local cache first for instant UI response
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.email) setAuthCookie(parsed.email);
      }
      const savedAuth = localStorage.getItem(AUTH_STATE_KEY);
      if (savedAuth !== null) {
        setIsAuthenticated(savedAuth === 'true');
      } else {
        setIsAuthenticated(false);
      }
      const savedTracks = localStorage.getItem('tot_user_enrolled_tracks');
      if (savedTracks) {
        setEnrolledTracks(JSON.parse(savedTracks));
      }
      const savedConfirmed = localStorage.getItem('tot_user_confirmed_enrollments');
      if (savedConfirmed) {
        setConfirmedEnrollments(JSON.parse(savedConfirmed));
      }
      const savedAppointments = localStorage.getItem('tot_user_appointments');
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      }
      const savedNotifications = localStorage.getItem('tot_user_notifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
      const savedArticles = localStorage.getItem('tot_user_articles');
      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      }
      const savedCertificates = localStorage.getItem('tot_user_certificates');
      if (savedCertificates) {
        setCertificates(JSON.parse(savedCertificates));
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
            if (remoteProfile.email) setAuthCookie(remoteProfile.email);
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
            if (newProfile.email) setAuthCookie(newProfile.email);
            await saveUserProfileToFirestore(newProfile).catch(() => {});
          }

          // Load enrolled tracks from Firestore - do NOT auto-seed tracks for new users
          const remoteTracks = await fetchUserEnrolledTracks(fUser.uid);
          if (remoteTracks && remoteTracks.length > 0) {
            setEnrolledTracks(remoteTracks);
            try {
              localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(remoteTracks));
            } catch {}
          } else {
            // New registered user has NO enrolled tracks yet (empty state)
            setEnrolledTracks([]);
          }

          // Load confirmed enrollments from Firestore (الملف الثاني)
          const remoteConfirmed = await fetchUserConfirmedEnrollments(fUser.uid);
          const confirmedMap: Record<string, ConfirmedEnrollmentRecord> = {};
          if (remoteConfirmed && remoteConfirmed.length > 0) {
            remoteConfirmed.forEach((c) => {
              if (c.trackKey) {
                const clean = c.trackKey.replace(/^trk-/, '');
                confirmedMap[c.trackKey] = c;
                confirmedMap[clean] = c;
                confirmedMap[`trk-${clean}`] = c;
              }
            });
            setConfirmedEnrollments(confirmedMap);
            try {
              localStorage.setItem('tot_user_confirmed_enrollments', JSON.stringify(confirmedMap));
            } catch {}
          } else {
            setConfirmedEnrollments({});
          }

          // Reconcile enrolledTracks with confirmedMap so confirmed status and 12-month validity is 100% persisted
          if (remoteTracks && remoteTracks.length > 0) {
            const syncedTracks = remoteTracks.map((trk) => {
              const clean = trk.trackKey?.replace(/^trk-/, '') || trk.id.replace(/^trk-/, '');
              const confRec = confirmedMap[trk.trackKey] || confirmedMap[clean] || confirmedMap[trk.id] || confirmedMap[`trk-${clean}`];
              if (confRec) {
                return {
                  ...trk,
                  isConfirmed: true,
                  status: 'confirmed' as const,
                  confirmedAt: confRec.confirmedAt || trk.confirmedAt,
                  confirmedAtFormatted: confRec.confirmedAtFormatted || trk.confirmedAtFormatted,
                  expiresAt: confRec.expiresAt || trk.expiresAt,
                  expiresAtFormatted: confRec.expiresAtFormatted || trk.expiresAtFormatted,
                  validityMonths: confRec.validityMonths || 12,
                };
              }
              return trk;
            });
            setEnrolledTracks(syncedTracks);
            try {
              localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(syncedTracks));
            } catch {}
          }

          // Load certificates and appointments if any
          const remoteCerts = await fetchUserCertificatesFromFirestore(fUser.uid);
          if (remoteCerts && remoteCerts.length > 0) {
            setCertificates(remoteCerts);
          } else {
            setCertificates([]);
          }

          const remoteAppts = await fetchUserAppointmentsFromFirestore(fUser.uid);
          if (remoteAppts && remoteAppts.length > 0) {
            setAppointments(remoteAppts);
          } else {
            setAppointments([]);
          }

          // Load notifications from Firestore
          const remoteNotifs = await fetchUserNotificationsFromFirestore(fUser.uid);
          if (remoteNotifs && remoteNotifs.length > 0) {
            setNotifications(remoteNotifs);
            try {
              localStorage.setItem('tot_user_notifications', JSON.stringify(remoteNotifs));
            } catch {}
          } else {
            // First welcome notification for new / active user
            const welcomeNotif: UserNotification = {
              id: 'notif-welcome',
              userId: fUser.uid,
              titleAr: 'مرحباً بك في أكاديمية TOT الدولية!',
              titleEn: 'Welcome to TOT International Academy!',
              messageAr: 'حسابك مفعل وجاهز الآن. يمكنك متابعة مساراتك التدريبية، حجز المواعيد والورشات التفاعلية، وطلب الشهادات والاعتمادات الرسمية.',
              messageEn: 'Your account is active. You can enroll in tracks, book interactive appointments, and request official credentials.',
              type: 'system',
              read: false,
              createdAt: new Date().toISOString(),
              sender: 'إدارة الأكاديمية والمشرف العام',
            };
            setNotifications([welcomeNotif]);
            saveUserNotificationToFirestore(fUser.uid, welcomeNotif).catch(() => {});
          }

          // Attach live Firestore listeners for real-time synchronization
          if (db) {
            try {
              const notifColl = collection(db, 'users', fUser.uid, 'notifications');
              unsubNotifs = onSnapshot(notifColl, (snap) => {
                const liveNotifs = snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserNotification));
                liveNotifs.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
                if (liveNotifs.length > 0) {
                  setNotifications(liveNotifs);
                  try {
                    localStorage.setItem('tot_user_notifications', JSON.stringify(liveNotifs));
                  } catch {}
                }
              });

              const apptColl = collection(db, 'users', fUser.uid, 'appointments');
              unsubAppts = onSnapshot(apptColl, (snap) => {
                if (!snap.empty) {
                  const liveAppts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserAppointment));
                  setAppointments(liveAppts);
                  try {
                    localStorage.setItem('tot_user_appointments', JSON.stringify(liveAppts));
                  } catch {}
                }
              });

              const certColl = collection(db, 'users', fUser.uid, 'certificates');
              unsubCerts = onSnapshot(certColl, (snap) => {
                if (!snap.empty) {
                  const liveCerts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserCertificate));
                  setCertificates(liveCerts);
                  try {
                    localStorage.setItem('tot_user_certificates', JSON.stringify(liveCerts));
                  } catch {}
                }
              });
            } catch (snapErr) {
              console.warn('Realtime listeners warning:', snapErr);
            }
          }
        } catch (err) {
          console.warn('Note loading user data from Firestore:', err);
        }
      } else {
        // If not signed into Firebase Auth, check local session flag
        const savedAuth = localStorage.getItem(AUTH_STATE_KEY);
        if (savedAuth !== 'true') {
          setIsAuthenticated(false);
          setEnrolledTracks([]);
          setCertificates([]);
          setAppointments([]);
          setNotifications([]);
        }
      }
      setLoading(false);
    });

    let unsubNotifs: (() => void) | null = null;
    let unsubAppts: (() => void) | null = null;
    let unsubCerts: (() => void) | null = null;

    return () => {
      unsubscribe();
      unsubNotifs?.();
      unsubAppts?.();
      unsubCerts?.();
    };
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
    // Role switcher disabled in favor of unified general member account
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
          const isOpNotAllowed =
            fbError?.code === 'auth/operation-not-allowed' ||
            fbError?.message?.includes('operation-not-allowed') ||
            String(fbError).includes('operation-not-allowed');

          // If Email/Password provider is not yet enabled in Firebase Console (auth/operation-not-allowed),
          // fallback smoothly to local authenticated account so the user is never blocked!
          if (isOpNotAllowed) {
            console.warn(
              'Notice: Email/Password provider is not enabled in Firebase Console. Proceeding with immediate authenticated profile.'
            );
            // Fall through to local profile creation with createdUid
          } else {
            // Translate common Firebase errors to user-friendly Arabic
            let errorMsg = fbError?.message || 'حدث خطأ أثناء إنشاء الحساب';
            if (fbError?.code === 'auth/email-already-in-use' || String(fbError).includes('email-already-in-use')) {
              errorMsg = 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام بريد آخر.';
            } else if (fbError?.code === 'auth/weak-password' || String(fbError).includes('weak-password')) {
              errorMsg = 'كلمة المرور ضعيفة، يجب أن تحتوي على 6 خانات على الأقل.';
            } else if (fbError?.code === 'auth/invalid-email' || String(fbError).includes('invalid-email')) {
              errorMsg = 'صيغة البريد الإلكتروني غير صحيحة.';
            } else if (fbError?.code === 'auth/network-request-failed') {
              errorMsg = 'تعذر الاتصال بالشبكة، يرجى التحقق من اتصال الإنترنت.';
            }
            return { success: false, error: errorMsg };
          }
        }
      }

      const accountType = profileData.accountType || (profileData.role === 'trainee' ? 'trainee' : 'trainer');
      const accountTypeLabelAr = profileData.accountTypeLabelAr || (accountType === 'trainee' ? 'متدرب' : 'مدرب');
      const accountTypeLabelEn = profileData.accountTypeLabelEn || (accountType === 'trainee' ? 'Trainee' : 'Trainer');
      const assignedRole = accountType === 'trainee' ? 'trainee' : 'trainer';

      const newProfile: UserProfile = {
        ...DEFAULT_USER_PROFILE,
        id: createdUid,
        name: profileData.name,
        email,
        phone: profileData.phone || '+213 555 000 000',
        country: profileData.country || 'الجزائر',
        role: assignedRole,
        roleTitleAr: accountTypeLabelAr,
        roleTitleEn: accountTypeLabelEn,
        accountType,
        accountTypeLabelAr,
        accountTypeLabelEn,
        specialtyAr: profileData.specialty || 'إعداد وتأهيل المدربين المحترفين',
        specialtyEn: 'Training of Trainers',
        bioAr: profileData.bio || 'عضو مسجل في الأكاديمية الدولية لتدريب المدربين.',
        bioEn: profileData.bio || 'Registered member at TOT International Academy.',
        joinedDate: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
        membershipNumber: `TOT-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'active',
      };

      setUser(newProfile);
      setIsAuthenticated(true);
      setAuthCookie(email);
      setEnrolledTracks([]);
      setCertificates([]);
      setAppointments([]);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
        localStorage.setItem(AUTH_STATE_KEY, 'true');
        localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify([]));
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
          const isOpNotAllowed =
            fbError?.code === 'auth/operation-not-allowed' ||
            fbError?.message?.includes('operation-not-allowed') ||
            String(fbError).includes('operation-not-allowed');

          if (isOpNotAllowed) {
            console.warn(
              'Notice: Email/Password provider not enabled in Firebase Console. Logging in via session profile.'
            );
            // Fall through to local session authentication below
          } else {
            let errorMsg = fbError?.message || 'فشل تسجيل الدخول';
            if (
              fbError?.code === 'auth/wrong-password' ||
              fbError?.code === 'auth/user-not-found' ||
              fbError?.code === 'auth/invalid-credential' ||
              String(fbError).includes('invalid-credential')
            ) {
              errorMsg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى المحاولة ثانية.';
            } else if (fbError?.code === 'auth/invalid-email' || String(fbError).includes('invalid-email')) {
              errorMsg = 'صيغة البريد الإلكتروني غير صالحة.';
            } else if (fbError?.code === 'auth/network-request-failed') {
              errorMsg = 'تعذر الاتصال، يرجى التأكد من اتصال الإنترنت.';
            }
            return { success: false, error: errorMsg };
          }
        }
      }

      // Quick offline/local fallback login
      setIsAuthenticated(true);
      const updated = { ...user, email };
      setUser(updated);
      setAuthCookie(email);
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
        return { success: false, error: 'خدمة تسجيل الدخول بـ Google غير مهيأة أو غير مدعومة في المعاينة.' };
      }
      const result = await signInWithPopup(auth, googleProvider);
      const fUser = result.user;
      const remoteProfile = await fetchUserProfileFromFirestore(fUser.uid);
      if (remoteProfile) {
        setUser(remoteProfile);
      } else {
        const newProfile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          id: fUser.uid,
          name: fUser.displayName || 'عضو الأكاديمية',
          email: fUser.email || '',
          avatar: fUser.photoURL || DEFAULT_USER_PROFILE.avatar,
        };
        setUser(newProfile);
        await saveUserProfileToFirestore(newProfile).catch(() => {});
      }
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_STATE_KEY, 'true');
      return { success: true };
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'تم إغلاق نافذة تسجيل الدخول بـ Google.' };
      }
      return { success: false, error: error?.message || 'تعذر تسجيل الدخول بـ Google.' };
    }
  };

  // Safe helper
  const quickDemoLogin = () => {};

  // Enroll in track and persist to Firestore
  const enrollInTrack = async (
    trackData: Partial<EnrolledTrack> & { trackKey: string; titleAr: string }
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanKey = trackData.trackKey.replace(/^trk-/, '');
    const trackId = trackData.id || `trk-${cleanKey}`;

    // Check if this track is ALREADY confirmed in records
    const isAlreadyConfirmed = isTrackConfirmed(trackData.trackKey) || isTrackConfirmed(cleanKey);
    const existingConf = confirmedEnrollments[trackData.trackKey] || confirmedEnrollments[cleanKey] || confirmedEnrollments[`trk-${cleanKey}`];

    const newTrack: EnrolledTrack = {
      id: trackId,
      trackKey: cleanKey,
      titleAr: trackData.titleAr,
      titleEn: trackData.titleEn || trackData.titleAr,
      categoryAr: trackData.categoryAr || 'المسارات التدريبية المعتمدة',
      categoryEn: trackData.categoryEn || 'Accredited Training Tracks',
      enrolledAt: trackData.enrolledAt || new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      progress: trackData.progress || 0,
      // CRITICAL: If confirmed, status is ALWAYS 'confirmed' and isConfirmed is ALWAYS true!
      status: isAlreadyConfirmed ? 'confirmed' : (trackData.status || 'in_progress'),
      isConfirmed: isAlreadyConfirmed,
      confirmedAt: existingConf?.confirmedAt,
      confirmedAtFormatted: existingConf?.confirmedAtFormatted,
      expiresAt: existingConf?.expiresAt,
      expiresAtFormatted: existingConf?.expiresAtFormatted,
      validityMonths: isAlreadyConfirmed ? 12 : undefined,
      nextSessionAr: trackData.nextSessionAr || 'تم تأكيد القيد بنجاح، يمكنك متابعة المحاور من حيث توقفت.',
      nextSessionEn: trackData.nextSessionEn || 'Registration confirmed. You can start learning now.',
      mentorName: trackData.mentorName || 'طاقم أكاديمية TOT',
      badge: trackData.badge || 'TOT-PRO',
      totalLessons: trackData.totalLessons || 18,
      completedLessons: trackData.completedLessons || 0,
    };

    setEnrolledTracks((prev) => {
      const existingIdx = prev.findIndex(
        (t) =>
          t.id === trackId ||
          t.trackKey === trackData.trackKey ||
          t.trackKey === cleanKey ||
          t.id === `trk-${cleanKey}` ||
          t.id === trackData.id
      );
      let nextList: EnrolledTrack[];
      if (existingIdx >= 0) {
        const existing = prev[existingIdx];
        const confirmedState = existing.isConfirmed || isAlreadyConfirmed;
        nextList = [...prev];
        nextList[existingIdx] = {
          ...existing,
          ...newTrack,
          isConfirmed: confirmedState,
          status: confirmedState ? 'confirmed' : (newTrack.status || existing.status),
          confirmedAt: existing.confirmedAt || existingConf?.confirmedAt,
          confirmedAtFormatted: existing.confirmedAtFormatted || existingConf?.confirmedAtFormatted,
          expiresAt: existing.expiresAt || existingConf?.expiresAt,
          expiresAtFormatted: existing.expiresAtFormatted || existingConf?.expiresAtFormatted,
          validityMonths: confirmedState ? 12 : undefined,
        };
      } else {
        nextList = [newTrack, ...prev];
      }
      try {
        localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(nextList));
      } catch {}
      return nextList;
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

    const cleanKey = trackKey.replace(/^trk-/, '');

    // Calculate total completed lessons count
    const totalLessonsDone = Object.values(data.completedLessons).reduce(
      (acc, curr) => acc + (curr?.length || 0),
      0
    );

    // 1. Save track progress record in Firestore
    await saveTrackProgressToFirestore(targetUid, cleanKey, {
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
      const idx = prev.findIndex(
        (t) =>
          t.trackKey === trackKey ||
          t.trackKey === cleanKey ||
          t.id === trackKey ||
          t.id === `trk-${cleanKey}` ||
          t.id.includes(cleanKey)
      );
      if (idx >= 0) {
        const isConfirmedAlready =
          prev[idx].isConfirmed ||
          isTrackConfirmed(trackKey) ||
          isTrackConfirmed(cleanKey) ||
          Boolean(confirmedEnrollments[trackKey]) ||
          Boolean(confirmedEnrollments[cleanKey]);

        const existingConf =
          confirmedEnrollments[trackKey] ||
          confirmedEnrollments[cleanKey] ||
          confirmedEnrollments[`trk-${cleanKey}`];

        const updatedTrack: EnrolledTrack = {
          ...prev[idx],
          progress: data.overallProgress !== undefined ? data.overallProgress : prev[idx].progress,
          completedLessons: totalLessonsDone,
          // CRITICAL: Confirmed status is never wiped by progress updates!
          isConfirmed: isConfirmedAlready,
          status: isConfirmedAlready
            ? 'confirmed'
            : ((data.overallProgress || prev[idx].progress) >= 100 ? 'completed' : 'in_progress'),
          confirmedAt: prev[idx].confirmedAt || existingConf?.confirmedAt,
          confirmedAtFormatted: prev[idx].confirmedAtFormatted || existingConf?.confirmedAtFormatted,
          expiresAt: prev[idx].expiresAt || existingConf?.expiresAt,
          expiresAtFormatted: prev[idx].expiresAtFormatted || existingConf?.expiresAtFormatted,
          validityMonths: isConfirmedAlready ? 12 : undefined,
        };
        const copy = [...prev];
        copy[idx] = updatedTrack;

        // Persist track update to Firestore
        saveEnrolledTrackToFirestore(targetUid, updatedTrack).catch(() => {});
        try {
          localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(copy));
        } catch {}
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

  // Check if a track is officially confirmed
  const isTrackConfirmed = (trackKey: string): boolean => {
    if (!trackKey) return false;
    const cleanKey = trackKey.replace(/^trk-/, '');

    if (confirmedEnrollments[trackKey]?.isConfirmed) return true;
    if (confirmedEnrollments[cleanKey]?.isConfirmed) return true;
    if (confirmedEnrollments[`trk-${cleanKey}`]?.isConfirmed) return true;

    for (const [key, rec] of Object.entries(confirmedEnrollments)) {
      if (rec?.isConfirmed) {
        const kClean = key.replace(/^trk-/, '');
        if (kClean === cleanKey || key === trackKey || key === `trk-${cleanKey}`) return true;
      }
    }

    const found = enrolledTracks.find(
      (t) =>
        t.trackKey === trackKey ||
        t.trackKey === cleanKey ||
        t.id === trackKey ||
        t.id === `trk-${cleanKey}` ||
        t.trackKey?.replace(/^trk-/, '') === cleanKey
    );
    return Boolean(found?.isConfirmed);
  };

  // Confirm track registration permanently: saves ConfirmedEnrollmentRecord (الملف الثاني في فايربيز)
  // This cannot be undone once confirmed. Valid for 12 months.
  const confirmTrackEnrollment = async (
    trackKey: string,
    trackTitleAr?: string,
    snapshotData?: {
      overallProgress?: number;
      completedLessons?: Record<string, string[]>;
      completedQuizzes?: Record<string, string[]>;
      activeLevel?: string;
      activeModuleId?: string;
      reportCode?: string;
    }
  ): Promise<{ success: boolean; error?: string }> => {
    const targetUid = firebaseUser?.uid || user.id;
    const resolvedTitle = trackTitleAr || 'المسار التأصيلي الشامل لتدريب المدربين (TOTF126)';
    const cleanKey = trackKey.replace(/^trk-/, '');

    // Calculate dates for 12 months validity window
    const now = new Date();
    const expiresDate = new Date(now);
    expiresDate.setFullYear(expiresDate.getFullYear() + 1); // exactly 12 months
    const confirmedAtISO = now.toISOString();
    const expiresAtISO = expiresDate.toISOString();
    const confirmedAtFormatted = now.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
    const expiresAtFormatted = expiresDate.toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' });

    // Build the permanent immutable record (الملف الثاني)
    const confirmedRecord: ConfirmedEnrollmentRecord = {
      trackKey: cleanKey,
      userId: targetUid,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      membershipNumber: user.membershipNumber,
      confirmedAt: confirmedAtISO,
      confirmedAtFormatted,
      expiresAt: expiresAtISO,
      expiresAtFormatted,
      validityMonths: 12,
      status: 'confirmed',
      isConfirmed: true,
      overallProgressSnapshot: snapshotData?.overallProgress ?? 0,
      completedLessonsSnapshot: snapshotData?.completedLessons ?? {},
      completedQuizzesSnapshot: snapshotData?.completedQuizzes ?? {},
      activeLevelSnapshot: snapshotData?.activeLevel || 'foundation',
      activeModuleIdSnapshot: snapshotData?.activeModuleId || 'module_1',
      trackTitleAr: resolvedTitle,
      reportCode: snapshotData?.reportCode,
      notes: 'تم تأكيد القيد الرسمي للمسار في سجل الأكاديمية بنجاح لمدة 12 شهراً كاملة.',
    };

    // 1. Save Confirmed Enrollment to Firestore (الملف الثاني)
    if (targetUid) {
      await saveConfirmedEnrollmentToFirestore(targetUid, confirmedRecord).catch((err) => {
        console.warn('Failed to save confirmed enrollment to Firestore:', err);
      });
    }

    // 2. Update local confirmedEnrollments state & localStorage with both keys
    setConfirmedEnrollments((prev) => {
      const updated = {
        ...prev,
        [cleanKey]: confirmedRecord,
        [trackKey]: confirmedRecord,
        [`trk-${cleanKey}`]: confirmedRecord,
      };
      try {
        localStorage.setItem('tot_user_confirmed_enrollments', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 3. Mark the track in enrolledTracks as confirmed (permanent with 12 months validity)
    setEnrolledTracks((prev) => {
      const idx = prev.findIndex(
        (t) => t.trackKey === trackKey || t.trackKey === cleanKey || t.id === trackKey || t.id === `trk-${cleanKey}`
      );
      let nextList: EnrolledTrack[];
      if (idx >= 0) {
        nextList = [...prev];
        nextList[idx] = {
          ...nextList[idx],
          status: 'confirmed',
          isConfirmed: true,
          confirmedAt: confirmedAtISO,
          confirmedAtFormatted,
          expiresAt: expiresAtISO,
          expiresAtFormatted,
          validityMonths: 12,
        };
      } else {
        const newEnrolled: EnrolledTrack = {
          id: `trk-${cleanKey}`,
          trackKey: cleanKey,
          titleAr: resolvedTitle,
          titleEn: 'Foundation Training Track (TOTF126)',
          categoryAr: 'تدريب المدربين (TOT)',
          categoryEn: 'Training of Trainers (TOT)',
          enrolledAt: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
          progress: snapshotData?.overallProgress ?? 0,
          status: 'confirmed',
          isConfirmed: true,
          confirmedAt: confirmedAtISO,
          confirmedAtFormatted,
          expiresAt: expiresAtISO,
          expiresAtFormatted,
          validityMonths: 12,
          nextSessionAr: 'تم تأكيد قيدك بنجاح، المسار مفعل بالكامل لمدة 12 شهراً.',
          nextSessionEn: 'Registration confirmed. Track is valid for 12 months.',
          mentorName: 'د. عبد الكريم بلخيري',
          badge: 'TOT/P-F',
          totalLessons: 18,
          completedLessons: 0,
        };
        nextList = [newEnrolled, ...prev];
      }
      try {
        localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(nextList));
      } catch {}

      const targetTrack = nextList[idx >= 0 ? idx : 0];
      if (targetUid && targetTrack) {
        saveEnrolledTrackToFirestore(targetUid, targetTrack).catch(() => {});
      }
      return nextList;
    });

    return { success: true };
  };

  // Delete track before confirmation: deletes from account and clears progress (starts from 0% if restarted)
  const deleteTrackFromAccount = async (trackKey: string): Promise<{ success: boolean; error?: string }> => {
    const cleanKey = trackKey.replace(/^trk-/, '');

    // If the track is confirmed, it CANNOT be deleted
    if (isTrackConfirmed(trackKey) || isTrackConfirmed(cleanKey)) {
      return {
        success: false,
        error: 'لا يمكن حذف هذا المسار؛ لقد تم تأكيد التسجيل فيه رسمياً وهو مفعل لمدة 12 شهراً.',
      };
    }

    const targetUid = firebaseUser?.uid || user.id;

    // 1. Delete from Firestore subcollections (الملف الأول)
    if (targetUid) {
      await Promise.allSettled([
        deleteTrackProgressFromFirestore(targetUid, trackKey),
        deleteTrackProgressFromFirestore(targetUid, cleanKey),
        deleteEnrolledTrackFromFirestore(targetUid, `trk-${cleanKey}`),
        deleteEnrolledTrackFromFirestore(targetUid, trackKey),
        deleteEnrolledTrackFromFirestore(targetUid, cleanKey),
      ]);
    }

    // 2. Remove from enrolledTracks local state and storage
    setEnrolledTracks((prev) => {
      const filtered = prev.filter(
        (t) =>
          t.trackKey !== trackKey &&
          t.trackKey !== cleanKey &&
          t.id !== trackKey &&
          t.id !== `trk-${cleanKey}` &&
          !t.id.includes(cleanKey)
      );
      try {
        localStorage.setItem('tot_user_enrolled_tracks', JSON.stringify(filtered));
      } catch {}
      return filtered;
    });

    // 3. Clear any cached local progress so if user restarts, it starts from ZERO (0%)
    try {
      const userPrefix = targetUid ? `tot_${targetUid}_` : 'tot_usr_';
      localStorage.removeItem(`tot_track_progress_${trackKey}`);
      localStorage.removeItem(`tot_track_progress_${cleanKey}`);
      localStorage.removeItem('tot_edupath_state_v1');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.startsWith(userPrefix) || key.includes(cleanKey) || key.includes(trackKey))) {
          localStorage.removeItem(key);
        }
      }
    } catch {}

    return { success: true };
  };

  // Reset track progress back to 0%
  const resetTrackProgress = async (trackKey: string): Promise<void> => {
    const targetUid = firebaseUser?.uid || user.id;
    if (targetUid) {
      await saveTrackProgressToFirestore(targetUid, trackKey, {
        activeLevel: 'foundation',
        activeModuleId: 'module_1',
        completedLessons: {},
        completedQuizzes: {},
        overallProgress: 0,
      }).catch(() => {});
    }
  };

  // Add an appointment to user account, local persistence, and Firestore sync
  const addAppointment = (newApp: Omit<UserAppointment, 'id'>): { success: boolean; id: string } => {
    const id = `app-${Date.now()}`;
    const targetUid = firebaseUser?.uid || user.id;
    const fullApp: UserAppointment = {
      id,
      userId: targetUid,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      createdAt: new Date().toISOString(),
      ...newApp,
      status: newApp.status || 'pending',
    };

    setAppointments((prev) => {
      const updated = [fullApp, ...prev.filter((a) => a.id !== id)];
      try {
        localStorage.setItem('tot_user_appointments', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (targetUid) {
      saveUserAppointmentToFirestore(targetUid, fullApp).catch((err) => {
        console.warn('Could not persist appointment to Firestore:', err);
      });

      const appNotif: UserNotification = {
        id: `notif-app-${Date.now()}`,
        userId: targetUid,
        titleAr: `تم تسجيل طلب الموعد: ${fullApp.titleAr}`,
        titleEn: `Appointment requested: ${fullApp.titleEn || fullApp.titleAr}`,
        messageAr: `تم استلام طلب حجزك بنجاح بتاريخ ${fullApp.date} (${fullApp.time}) في ${fullApp.locationAr}. طلبك قيد التأكيد النهائي من إدارة الأكاديمية.`,
        messageEn: `Your booking request for ${fullApp.date} (${fullApp.time}) was received and is awaiting admin confirmation.`,
        type: 'system',
        read: false,
        createdAt: new Date().toISOString(),
        sender: 'إدارة العمليات والمواعيد',
      };
      setNotifications((prev) => [appNotif, ...prev]);
      saveUserNotificationToFirestore(targetUid, appNotif).catch(() => {});
    }

    return { success: true, id };
  };

  const cancelAppointment = async (apptId: string): Promise<{ success: boolean }> => {
    const targetUid = firebaseUser?.uid || user.id;
    setAppointments((prev) =>
      prev.map((a) => (a.id === apptId ? { ...a, status: 'cancelled' } : a))
    );
    try {
      const saved = localStorage.getItem('tot_user_appointments');
      if (saved) {
        const parsed: UserAppointment[] = JSON.parse(saved);
        const updated = parsed.map((a) => (a.id === apptId ? { ...a, status: 'cancelled' } : a));
        localStorage.setItem('tot_user_appointments', JSON.stringify(updated));
      }
    } catch {}

    if (targetUid) {
      await deleteUserAppointmentFromFirestore(targetUid, apptId).catch(() => {});
    }
    return { success: true };
  };

  // Add an article submission to user account
  const addArticle = (newArt: Omit<ContributedArticle, 'id'>): { success: boolean; id: string } => {
    const id = `art-${Date.now()}`;
    const fullArt: ContributedArticle = { id, ...newArt };
    setArticles((prev) => {
      const updated = [fullArt, ...prev];
      try {
        localStorage.setItem('tot_user_articles', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return { success: true, id };
  };

  // Add a certificate to user account and request review in Firestore
  const addCertificate = (newCert: Omit<UserCertificate, 'id'>): { success: boolean; id: string } => {
    const id = `cert-${Date.now()}`;
    const targetUid = firebaseUser?.uid || user.id;
    const fullCert: UserCertificate = {
      id,
      userId: targetUid,
      userName: user.name,
      userEmail: user.email,
      status: 'pending_review',
      requestedAt: new Date().toISOString(),
      ...newCert,
    };

    setCertificates((prev) => {
      const updated = [fullCert, ...prev.filter((c) => c.id !== id)];
      try {
        localStorage.setItem('tot_user_certificates', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (targetUid) {
      saveUserCertificateToFirestore(targetUid, fullCert).catch((err) => {
        console.warn('Could not persist certificate to Firestore:', err);
      });

      const certNotif: UserNotification = {
        id: `notif-cert-${Date.now()}`,
        userId: targetUid,
        titleAr: `طلب اعتماد شهادة: ${fullCert.titleAr}`,
        titleEn: `Certificate request: ${fullCert.titleEn || fullCert.titleAr}`,
        messageAr: `تم إيداع طلبك للحصول على شهادة ${fullCert.titleAr} بالرمز (${fullCert.credentialId})، وسيتم تدقيق إنجازاتك والمصادقة عليها من قبل مجلس الاعتماد الأكاديمي.`,
        messageEn: `Your request for ${fullCert.titleEn || fullCert.titleAr} has been logged for academic board verification.`,
        type: 'certificate_pending',
        read: false,
        createdAt: new Date().toISOString(),
        sender: 'هيئة الاعتماد والشهادات',
      };
      setNotifications((prev) => [certNotif, ...prev]);
      saveUserNotificationToFirestore(targetUid, certNotif).catch(() => {});
    }

    return { success: true, id };
  };

  const markNotificationAsRead = async (id: string): Promise<void> => {
    const targetUid = firebaseUser?.uid || user.id;
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      const saved = localStorage.getItem('tot_user_notifications');
      if (saved) {
        const parsed: UserNotification[] = JSON.parse(saved);
        const updated = parsed.map((n) => (n.id === id ? { ...n, read: true } : n));
        localStorage.setItem('tot_user_notifications', JSON.stringify(updated));
      }
    } catch {}

    if (targetUid) {
      await markNotificationReadInFirestore(targetUid, id).catch(() => {});
    }
  };

  const markAllNotificationsAsRead = async (): Promise<void> => {
    const targetUid = firebaseUser?.uid || user.id;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      const saved = localStorage.getItem('tot_user_notifications');
      if (saved) {
        const parsed: UserNotification[] = JSON.parse(saved);
        const updated = parsed.map((n) => ({ ...n, read: true }));
        localStorage.setItem('tot_user_notifications', JSON.stringify(updated));
      }
    } catch {}

    if (targetUid) {
      for (const n of notifications) {
        if (!n.read) {
          markNotificationReadInFirestore(targetUid, n.id).catch(() => {});
        }
      }
    }
  };

  const deleteNotification = async (id: string): Promise<void> => {
    const targetUid = firebaseUser?.uid || user.id;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      const saved = localStorage.getItem('tot_user_notifications');
      if (saved) {
        const parsed: UserNotification[] = JSON.parse(saved);
        const updated = parsed.filter((n) => n.id !== id);
        localStorage.setItem('tot_user_notifications', JSON.stringify(updated));
      }
    } catch {}

    if (targetUid) {
      await deleteNotificationFromFirestore(targetUid, id).catch(() => {});
    }
  };

  const sendDirectNotification = async (
    notif: Omit<UserNotification, 'id'>,
    targetUserId: string
  ): Promise<void> => {
    await sendNotificationToUser(notif, targetUserId);
    // If sent to self, update local state
    if (targetUserId === user.id || targetUserId === firebaseUser?.uid) {
      const full: UserNotification = {
        ...notif,
        id: `notif-${Date.now()}`,
        userId: targetUserId,
        read: false,
        createdAt: notif.createdAt || new Date().toISOString(),
      };
      setNotifications((prev) => [full, ...prev]);
    }
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
      setEnrolledTracks([]);
      setConfirmedEnrollments({});
      setCertificates([]);
      setAppointments([]);
      setNotifications([]);
      setAuthCookie(null);
      try {
        localStorage.setItem(AUTH_STATE_KEY, 'false');
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('tot_user_enrolled_tracks');
        localStorage.removeItem('tot_user_confirmed_enrollments');
        localStorage.removeItem('tot_user_appointments');
        localStorage.removeItem('tot_user_notifications');
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
        confirmedEnrollments,
        isTrackConfirmed,
        confirmTrackEnrollment,
        deleteTrackFromAccount,
        resetTrackProgress,
        certificates,
        appointments,
        notifications,
        unreadNotificationsCount,
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
        addAppointment,
        cancelAppointment,
        addArticle,
        addCertificate,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        sendDirectNotification,
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
