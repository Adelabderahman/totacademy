import { TrackDefinition } from '@/types/curriculum';
import { buildComprehensiveTotTrack } from '@/lib/seed-comprehensive-track';
import {
  buildTechAiTrack,
  buildTechNoCodeTrack,
  buildTechDataBiTrack,
  buildMarketingTrack,
  buildMediaJournalismTrack,
  buildCreativityContentTrack,
} from '@/lib/seed-specialization-tracks';

export const initialTracksData: TrackDefinition[] = [
  buildComprehensiveTotTrack(),
  buildTechAiTrack(),
  buildTechNoCodeTrack(),
  buildTechDataBiTrack(),
  buildMarketingTrack(),
  buildMediaJournalismTrack(),
  buildCreativityContentTrack(),
];

export const initialMagazineArticles = [
  {
    id: 'art-01',
    slug: 'future-of-tot-ai',
    issueNumber: 1,
    title: {
      ar: 'مستقبل تدريب المدربين في عصر الذكاء الاصطناعي التوليدي',
      en: 'The Future of Train-The-Trainer in the Era of Generative AI',
      fr: "L'avenir de la formation des formateurs à l'ère de l'IA générative",
    },
    excerpt: {
      ar: 'كيف يعيد الذكاء الاصطناعي تشكيل دور المدرب من ملقن للمعلومات إلى ميسر ومصمم لتجارب التعلم الإنسانية العميقة.',
      en: 'How AI is reshaping the trainer’s role from information delivery to human-centered experiential facilitation.',
      fr: "Comment l'IA redéfinit le rôle du formateur.",
    },
    content: `
# مستقبل تدريب المدربين في عصر الذكاء الاصطناعي

لم يعد الذكاء الاصطناعي مجرد أداة إضافية مساعدة، بل أصبح ركيزة جوهرية تعيد كتابة قواعد التدريب والتعليم المهني.

## التحول من التلقين إلى التيسير العميق
حينما تصبح المعلومات متوفرة بضغطة زر وبأي لغة، تصبح قيمة المدرب الحقيقية تكمن في:
1. **طرح الأسئلة الذكية** التي تثير التفكير النقدي.
2. **إدارة المشاعر والتفاعل البشري** داخل القاعة التدريبية.
3. **تطبيق المعرفة** في سياقات وتحديات واقعية معقدة.

## الخلاصة
المدرب الذي لن يستبدله الذكاء الاصطناعي هو المدرب الذي يوظف الذكاء الاصطناعي لتطوير مهاراته ومضاعفة أثره.
    `,
    author: {
      name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
      role: { ar: 'كبير المستشارين الأكاديميين', en: 'Senior Academic Advisor', fr: 'Conseiller Académique' },
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    category: 'ذكاء اصطناعي وتكنولوجيا',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-09-01',
    readingTimeMinutes: 5,
    featured: true,
    status: 'published' as const,
  },
  {
    id: 'art-02',
    slug: 'andragogy-secrets',
    issueNumber: 1,
    title: {
      ar: 'أسرار الأندراغوجيا: كيف يفكر ويتعلم الكبار في بيئات العمل الحديثة؟',
      en: 'Andragogy Secrets: How Adults Think and Learn in Modern Workplaces',
      fr: 'Les secrets de l’andragogie dans les entreprises modernes',
    },
    excerpt: {
      ar: 'دراسة تحليلية للمبادئ الستة لمالكولم نولز وتطبيقاتها العملية في قاعات التدريب الاحترافية.',
      en: 'Analytical study of Malcolm Knowles’ six principles and practical applications in professional classrooms.',
      fr: 'Étude analytique des six principes de Malcolm Knowles.',
    },
    content: `
# أسرار الأندراغوجيا في تدريب الكبار

تختلف سيكولوجية تعليم الكبار جذرياً عن تعليم الصغار. فالراشد يأتي إلى القاعة التدريبية حاملاً رصيداً من التجارب والخبرات السابقة.

### المبادئ الجوهرية:
- **الحاجة إلى المعرفة:** يحتاج المتدرب الراشد إلى معرفة "لماذا" يتعلم هذا الشيء وما هي الفائدة المباشرة له.
- **مفهوم الذات:** يرى نفسه مسؤولاً ومستقلاً ويرفض التلقين أو الوصاية الفكرية.
- **التوجه نحو المشكلات:** يفضل التعلم المتمحور حول حل مشاكل وظيفية وحياتية واقعية.
    `,
    author: {
      name: { ar: 'أ. مروان بن زيان', en: 'Mr. Marouane Ben Ziane', fr: 'M. Marouane Ben Ziane' },
      role: { ar: 'مستشار التطوير المؤسسي', en: 'Organizational Development Consultant', fr: 'Consultant en Développement' },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    category: 'نظريات التعلم',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-08-25',
    readingTimeMinutes: 7,
    featured: false,
    status: 'published' as const,
  }
];
