import {
  HomePageSettings,
  SiteGeneralSettings,
  AcademyEventItem,
  TrainerDirectoryItem,
  TrackTrainerItem,
} from '@/types/curriculum';
import { CATEGORIES } from '@/data/trainersData';
import { EVENT_SECTIONS } from '@/data/eventsData';

export const defaultHomeSettings: HomePageSettings = {
  hero: {
    badge: {
      ar: '🎓 الأكاديمية الدولية الأولى لتدريب المدربين',
      en: 'The Premier International TOT Academy',
      fr: 'La Première Académie Internationale de FdF',
    },
    title: {
      ar: 'اصنع أثرك التدريبي... وتخرّج كمدرب دولي معتمد',
      en: 'Create Your Training Impact... Graduate as an Accredited International Trainer',
      fr: 'Créez votre impact... Devenez formateur international accrédité',
    },
    desc: {
      ar: 'مسارات تدريبية احترافية، إشراف أكاديمي مباشر من نخبة الخبراء، ومنصة رقمية ذكية تمنحك أدوات التأثير والتميز المهني في العالم العربي والعالم.',
      en: 'Professional training tracks, direct academic mentorship, and an AI-powered platform to empower your professional career.',
      fr: 'Parcours professionnels, mentorat académique direct et plateforme intelligente.',
    },
    primaryCta: {
      ar: 'استكشف المسارات المعتمدة',
      en: 'Explore Accredited Tracks',
      fr: 'Explorer les Parcours',
    },
    primaryCtaUrl: '/edupath',
    secondaryCta: {
      ar: 'تأكيد التسجيل السريع',
      en: 'Instant Enrollment Confirmation',
      fr: 'Confirmation Rapide',
    },
    secondaryCtaUrl: 'https://wa.me/213555989370',
    videoId: 'PHya0gprvH8',
  },
  stats: {
    trainersCount: '+1,200',
    hoursCount: '+45,000',
    countriesCount: '18',
    satisfactionRate: '98.7%',
  },
  announcement: {
    enabled: true,
    text: {
      ar: '✨ فتح باب التسجيل للدفعة 14 للبرنامج التأسيسي الشامل TOTF126 - مقاعد محدودة!',
      en: '✨ Enrollment is now open for Batch 14 of the Comprehensive TOTF126 Program!',
      fr: '✨ Inscription ouverte pour la 14ème promotion du programme TOTF126!',
    },
    linkUrl: '/edupath?track=tot-foundation',
  },
};

export const defaultSiteSettings: SiteGeneralSettings = {
  siteName: {
    ar: 'أكاديمية تدريب المدربين الدولية (TOT Academy)',
    en: 'TOT International Academy',
    fr: 'Académie Internationale TOT',
  },
  slogan: {
    ar: 'المرجع العربي الأول في هندسة التدريب الاحترافي والاعتماد الدولي',
    en: 'The Premier Benchmark in Professional Training Engineering',
    fr: 'La Référence en Ingénierie de Formation',
  },
  logoText: 'TOT Academy',
  whatsappNumber: '213555989370',
  telegramUrl: 'https://t.me/totacademy',
  contactEmail: 'contact@tot-academy.org',
  contactPhone: '+213 555 989 370',
  adminEmails: ['abdo@gmail.com'],
};

// Extract seed trainers from CATEGORIES
export const defaultTrainersList: TrainerDirectoryItem[] = CATEGORIES.flatMap((cat) =>
  cat.trainers.map((tr) => ({
    id: tr.id,
    name: tr.name,
    role: tr.role,
    category: cat.key,
    image: tr.image,
    country: tr.country,
    languages: tr.languages,
    bio: tr.bio,
    email: tr.email,
    phone: tr.phone,
  }))
);

// Extract seed events from EVENT_SECTIONS
export const defaultEventsList: AcademyEventItem[] = EVENT_SECTIONS.flatMap((sec) =>
  sec.events.map((ev) => ({
    id: ev.id,
    title: ev.title,
    date: ev.date,
    time: '18:00 - 21:00 (GMT+1)',
    location: ev.loc,
    mode: ev.mode,
    trainerName: {
      ar: 'نخبة خبراء الأكاديمية',
      en: 'TOT Academy Elite Mentors',
      fr: 'Experts de l’Académie',
    },
    seats: ev.seats,
    coverImage: ev.img,
    desc: ev.desc,
    status: 'upcoming' as const,
    registrationUrl: 'https://sites.google.com/view/totacademya/totf126',
    category: sec.key,
  }))
);

// Helper to get platform registered trainers ready for track dropdown
export function getRegisteredPlatformTrainers(): TrackTrainerItem[] {
  return defaultTrainersList.map((tr) => ({
    id: tr.id,
    name: tr.name,
    role: tr.role,
    img: tr.image,
    bio: tr.bio,
    email: tr.email,
    phone: tr.phone,
    isLead: false,
  }));
}
