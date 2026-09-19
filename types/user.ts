export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'trainer' | 'trainee';
  roleTitleAr: string;
  roleTitleEn: string;
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
  nextSessionAr: string;
  nextSessionEn: string;
  mentorName: string;
  badge: string;
  totalLessons: number;
  completedLessons: number;
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
