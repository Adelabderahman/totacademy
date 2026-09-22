export type AccountTypeId =
  | 'trainee'
  | 'trainer'
  | 'pro-trainer'
  | 'tot-master-trainer'
  | 'senior-trainer'
  | 'excellent-trainer'
  | 'distinguished-trainer'
  | 'media-trainer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'trainer' | 'trainee';
  roleTitleAr: string;
  roleTitleEn: string;
  accountType?: AccountTypeId | string;
  accountTypeLabelAr?: string;
  accountTypeLabelEn?: string;
  specialtyAr: string;
  specialtyEn: string;
  bioAr: string;
  bioEn: string;
  avatar: string;
  coverImage: string;
  joinedDate: string;
  country: string;
  city: string;
  membershipNumber: string;
  status: 'active' | 'verified' | 'pending';
}

export function getAccountTypeLabel(accountType?: string, lang: string = 'ar'): string {
  switch (accountType) {
    case 'trainee':
      return lang === 'ar' ? 'متدرب' : lang === 'fr' ? 'Stagiaire' : 'Trainee';
    case 'trainer':
      return lang === 'ar' ? 'مدرب' : lang === 'fr' ? 'Formateur' : 'Trainer';
    case 'pro-trainer':
      return lang === 'ar' ? 'مدرب محترف' : lang === 'fr' ? 'Formateur Professionnel' : 'Professional Trainer';
    case 'tot-master-trainer':
      return lang === 'ar' ? 'حساب مدرب مدربين' : lang === 'fr' ? 'Formateur de Formateurs' : 'Trainer of Trainers';
    case 'senior-trainer':
      return lang === 'ar' ? 'كبير مدربين' : lang === 'fr' ? 'Grand Formateur' : 'Senior Trainer';
    case 'excellent-trainer':
      return lang === 'ar' ? 'مدرب ممتاز' : lang === 'fr' ? 'Formateur Émérite' : 'Distinguished Trainer';
    case 'distinguished-trainer':
      return lang === 'ar' ? 'مدرب مميز' : lang === 'fr' ? 'Formateur Élite' : 'Elite Trainer';
    case 'media-trainer':
      return lang === 'ar' ? 'مدرب إعلامي' : lang === 'fr' ? 'Formateur Médias' : 'Media Trainer';
    default:
      return lang === 'ar' ? (accountType || 'مدرب') : 'Trainer';
  }
}

export interface EnrolledTrack {
  id: string;
  trackKey: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  enrolledAt: string;
  progress: number; // 0 - 100
  status: 'confirmed' | 'in_progress' | 'completed';
  isConfirmed?: boolean;
  confirmedAt?: string;
  confirmedAtFormatted?: string;
  expiresAt?: string; // 12 months after confirmation
  expiresAtFormatted?: string;
  validityMonths?: number;
  nextSessionAr: string;
  nextSessionEn: string;
  mentorName: string;
  badge: string;
  totalLessons: number;
  completedLessons: number;
}

export interface ConfirmedEnrollmentRecord {
  trackKey: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  membershipNumber?: string;
  confirmedAt: string; // ISO date string
  confirmedAtFormatted?: string;
  expiresAt?: string; // ISO date string (12 months from confirmedAt)
  expiresAtFormatted?: string;
  validityMonths?: number; // 12
  status: 'confirmed';
  isConfirmed: true;
  // Deep progress snapshots
  overallProgressSnapshot: number;
  completedLessonsSnapshot: Record<string, string[]>;
  completedQuizzesSnapshot: Record<string, string[]>;
  activeLevelSnapshot?: string;
  activeModuleIdSnapshot?: string;
  trackTitleAr: string;
  trackTitleEn?: string;
  reportCode?: string;
  notes?: string;
}

export interface UserCertificate {
  id: string;
  titleAr: string;
  titleEn: string;
  trackTitleAr: string;
  trackTitleEn: string;
  issueDate: string;
  credentialId: string;
  grade: string;
  hours: number;
  issuerAr: string;
  issuerEn: string;
}

export interface UserAppointment {
  id: string;
  titleAr: string;
  titleEn: string;
  type: 'workshop' | 'interactive_meeting' | 'consultation' | 'exam';
  typeLabelAr: string;
  typeLabelEn: string;
  date: string;
  time: string;
  locationAr: string;
  locationEn: string;
  mentorOrHost: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  link?: string;
}

export interface ContributedArticle {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  readCount: number;
  publishDate: string;
  status: 'published' | 'under_review';
  issueNumber: number;
}

export interface SupervisedStudent {
  id: string;
  name: string;
  avatar: string;
  trackTitleAr: string;
  trackTitleEn: string;
  progress: number;
  lastActive: string;
  status: 'active' | 'submitted_exam' | 'completed';
  phone: string;
}

export interface SupervisingProfessor {
  id: string;
  name: string;
  avatar: string;
  specialtyAr: string;
  specialtyEn: string;
  degreeAr: string;
  degreeEn: string;
  trackAr: string;
  trackEn: string;
  phone: string;
  email: string;
}
