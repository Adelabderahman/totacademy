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

interface UserAccountContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  enrolledTracks: EnrolledTrack[];
  certificates: UserCertificate[];
  appointments: UserAppointment[];
  articles: ContributedArticle[];
  students: SupervisedStudent[];
  professors: SupervisingProfessor[];
  toggleRole: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  login: (userData?: Partial<UserProfile>) => void;
  logout: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [enrolledTracks] = useState<EnrolledTrack[]>(INITIAL_TRACKS);
  const [certificates] = useState<UserCertificate[]>(INITIAL_CERTIFICATES);
  const [appointments] = useState<UserAppointment[]>(INITIAL_APPOINTMENTS);
  const [articles] = useState<ContributedArticle[]>(INITIAL_ARTICLES);
  const [students] = useState<SupervisedStudent[]>(INITIAL_STUDENTS);
  const [professors] = useState<SupervisingProfessor[]>(INITIAL_PROFESSORS);

  // Load profile from localStorage on mount if available
  useEffect(() => {
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
      // ignore storage errors
    }
  }, []);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleRole = () => {
    setUser((prev) => {
      const nextRole = prev.role === 'trainer' ? 'trainee' : 'trainer';
      const template = nextRole === 'trainer' ? DEFAULT_TRAINER_PROFILE : DEFAULT_TRAINEE_PROFILE;
      const next: UserProfile = {
        ...template,
        name: prev.name || template.name,
        email: prev.email || template.email,
        phone: prev.phone || template.phone,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const login = (userData?: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    if (userData) {
      updateProfile(userData);
    }
    try {
      localStorage.setItem(AUTH_STATE_KEY, 'true');
    } catch {}
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(AUTH_STATE_KEY, 'false');
    } catch {}
  };

  return (
    <UserAccountContext.Provider
      value={{
        user,
        isAuthenticated,
        enrolledTracks,
        certificates,
        appointments,
        articles,
        students,
        professors,
        toggleRole,
        updateProfile,
        login,
        logout,
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
