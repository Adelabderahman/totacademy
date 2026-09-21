export type LangKey = 'ar' | 'en' | 'fr';

export interface LocalizedString {
  ar: string;
  en: string;
  fr?: string;
}

export interface QuizQuestionItem {
  q: string;
  options: string[];
  ans: number; // 0-based index of correct option
  hint?: string;
  explanation?: string;
}

export interface QuizItem {
  id?: string;
  title: LocalizedString;
  passingScore: number;
  timeLimitSeconds?: number;
  questions: QuizQuestionItem[];
  axes?: string[]; // 6 axes titles
  axesQuestions?: Record<number, QuizQuestionItem[]>; // 6 axes × 6 questions each
  reportSlideEnabled?: boolean; // Final report slide
}

export interface LessonItem {
  id: string;
  type: 'video' | 'doc' | 'interactive';
  title: LocalizedString;
  instructor: LocalizedString;
  duration: LocalizedString;
  img: string;
  desc: LocalizedString;
  video_id?: string;
  action_url?: string;
  doc_preview?: string;
  contentMarkdown?: string;
  resources?: { name: string; url: string; type: string }[];
}

export type LessonData = LessonItem;

export interface ModuleItem {
  id: string;
  num: string;
  icon: string;
  gradient: string;
  moduleLabel: LocalizedString;
  title: LocalizedString;
  desc: LocalizedString;
  summary?: LocalizedString; // Back of module card summary
  interviewQuestion?: LocalizedString; // Oral / Comprehension interview question
  lessons: LessonItem[];
  quiz?: QuizItem;
}

export interface LevelItem {
  id: 'foundation' | 'empowerment' | 'consolidation';
  title: LocalizedString;
  desc: LocalizedString;
  badge: string;
  modules: ModuleItem[];
}

export interface TrackTrainerItem {
  id?: string;
  name: LocalizedString;
  role: LocalizedString;
  img: string;
  bio?: LocalizedString;
  isLead?: boolean;
  email?: string;
  phone?: string;
}

export interface TrackConfirmationBanner {
  enabled: boolean;
  title: LocalizedString;
  noticeText: LocalizedString;
  features: LocalizedString[];
  whatsappNumber?: string;
  whatsappMessage?: LocalizedString;
  badge?: string;
}

export interface TrackDefinition {
  id: string; // e.g. 'tot-foundation', 'tech-ai-trainer'
  slug: string;
  specializationKey: 'tot' | 'tech' | 'marketing' | 'media' | 'creativity' | string;
  badge: string; // e.g. 'TOT/P-F'
  title: LocalizedString;
  subtitle?: LocalizedString;
  desc: LocalizedString;
  category: LocalizedString;
  coverImage?: string;
  introVideoId?: string;
  durationHours: number;
  totalLessonsCount?: number;
  status: 'published' | 'draft';
  // Front of card properties in Specializations page
  isAvailable?: boolean; // متاح أو غير متاح
  categoryBadgeText?: LocalizedString; // عبارة تكنولوجيا التي تظهر فوق الصورة في الزاوية
  mode?: LocalizedString; // نمط التدريس: عن بعد / حضوري / هجين
  modeKey?: 'remote' | 'onsite' | 'hybrid';
  summary?: LocalizedString; // المقدمة الصغيرة حول المسار
  // Legacy single mentor support
  mentor: {
    name: LocalizedString;
    role: LocalizedString;
    img: string;
    bio?: LocalizedString;
  };
  // Advanced multi-trainer team support
  trainers?: TrackTrainerItem[];
  // Registration confirmation banner settings
  confirmationBanner?: TrackConfirmationBanner;
  // Back of card metrics
  backMetrics?: {
    foundation?: string[];
    empowerment?: string[];
    consolidation?: string[];
  };
  // Accreditation & Certificate details
  certificateDetails?: {
    title?: LocalizedString;
    accreditedHours?: number;
    codePrefix?: string;
    issuer?: LocalizedString;
  };
  levels: {
    foundation?: LevelItem;
    empowerment?: LevelItem;
    consolidation?: LevelItem;
  };
  finalExam?: {
    title: LocalizedString;
    passingScore: number;
    timeMinutes: number;
    questions?: QuizQuestionItem[];
    axes?: string[]; // 8 axes for the 10 slides
    axesQuestions?: Record<number, QuizQuestionItem[]>; // 8 axes × 5 questions each
    submitSlideEnabled?: boolean; // Slide 10
  };
  createdAt: string;
  updatedAt: string;
}

export interface CertificateTemplateItem {
  id: string;
  title: LocalizedString;
  trackKey: string;
  codePrefix: string;
  accreditedHours: number;
  passingGrade: number;
  issuer: LocalizedString;
  signatureName: string;
  signatureRole: string;
  badge: string;
  status: 'active' | 'draft';
}

export interface MagazineArticleItem {
  id: string;
  slug: string;
  sectionSlug?: string;
  sectionNumber?: number;
  sectionGroup?: 'strategy' | 'practice' | 'innovation' | 'community' | string;
  issueNumber: number;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: string;
  author: {
    name: LocalizedString;
    role: LocalizedString;
    avatar: string;
  };
  category: string;
  coverImage: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  status: 'published' | 'draft';
  contentType?: 'article' | 'video';
  videoUrl?: string;
  tags?: string[];
}

export interface HomePageSettings {
  hero: {
    badge: LocalizedString;
    title: LocalizedString;
    desc: LocalizedString;
    primaryCta: LocalizedString;
    primaryCtaUrl: string;
    secondaryCta: LocalizedString;
    secondaryCtaUrl: string;
    videoId?: string;
  };
  stats: {
    trainersCount: string;
    hoursCount: string;
    countriesCount: string;
    satisfactionRate: string;
  };
  announcement?: {
    enabled: boolean;
    text: LocalizedString;
    linkUrl?: string;
    style?: 'gold' | 'blue' | 'emerald' | 'rose';
  };
  vmo?: {
    aboutIntro?: LocalizedString;
    missionTitle?: LocalizedString;
    missionText?: LocalizedString;
    visionTitle?: LocalizedString;
    visionText?: LocalizedString;
    objectivesTitle?: LocalizedString;
    objectivesText?: LocalizedString;
  };
  quickSupport?: {
    whatsappNumber?: string;
    catalogUrl?: string;
    contactBtnText?: LocalizedString;
  };
}

export interface SiteGeneralSettings {
  siteName: LocalizedString;
  slogan: LocalizedString;
  logoText: string;
  whatsappNumber: string;
  telegramUrl: string;
  contactEmail: string;
  contactPhone: string;
  adminEmails: string[];
}

export interface AcademyEventItem {
  id: string;
  title: LocalizedString;
  date: string;
  time?: string;
  location: LocalizedString;
  mode: 'inperson' | 'online' | 'hybrid';
  trainerName: LocalizedString;
  trainerAvatar?: string;
  seats: number;
  coverImage: string;
  desc: LocalizedString;
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationUrl?: string;
  category?: 'workshops' | 'days' | 'bootcamps' | 'camps' | 'meetups' | string;
  meetingUrl?: string;
  price?: {
    amount: number;
    currency: string;
    isFree?: boolean;
  };
  targetAudience?: LocalizedString;
  notes?: LocalizedString;
}

export interface TrainerDirectoryItem {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  category: string;
  image: string;
  country: string;
  languages: string[];
  bio: LocalizedString;
  email?: string;
  phone?: string;
  specialization?: LocalizedString;
  experienceYears?: number | string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    youtube?: string;
  };
  certificates?: {
    ar: string[];
    en?: string[];
    fr?: string[];
  };
  skills?: {
    ar: string[];
    en?: string[];
    fr?: string[];
  };
  status?: 'active' | 'honorary' | 'guest';
}

