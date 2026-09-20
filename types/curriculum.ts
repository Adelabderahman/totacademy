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

export interface ModuleItem {
  id: string;
  num: string;
  icon: string;
  gradient: string;
  moduleLabel: LocalizedString;
  title: LocalizedString;
  desc: LocalizedString;
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
  durationHours: number;
  totalLessonsCount?: number;
  status: 'published' | 'draft';
  mentor: {
    name: LocalizedString;
    role: LocalizedString;
    img: string;
    bio?: LocalizedString;
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
    questions: QuizQuestionItem[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface MagazineArticleItem {
  id: string;
  slug: string;
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
}
