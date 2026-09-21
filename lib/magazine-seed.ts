import { MagazineArticleItem } from '@/types/curriculum';
import {
  MAG_SECTIONS,
  MAG_GROUPS,
  EDITORIAL_SLIDES,
  MagazineSection,
  MagazineGroup,
} from '@/lib/magazine-data';

export interface MagazineSectionMeta {
  n: number;
  slug: string;
  group: string;
  name: { ar: string; en: string; fr: string };
  groupTitle: { ar: string; en: string; fr: string };
  accentColor: string;
}

export const MAGAZINE_SECTIONS_LIST: MagazineSectionMeta[] = MAG_SECTIONS.map((sec) => {
  const group = MAG_GROUPS.find((g) => g.key === sec.group);
  let accent = '#3b82f6';
  if (sec.group === 'strategy') accent = '#f59e0b';
  else if (sec.group === 'practice') accent = '#10b981';
  else if (sec.group === 'innovation') accent = '#0284c7';
  else if (sec.group === 'community') accent = '#8b5cf6';

  return {
    n: sec.n,
    slug: sec.slug,
    group: sec.group,
    name: sec.name,
    groupTitle: group ? group.title : { ar: sec.group, en: sec.group, fr: sec.group },
    accentColor: accent,
  };
});

export const MAGAZINE_GROUPS_LIST = [
  { key: 'all', title: { ar: 'كافة الأقسام الـ 18', en: 'All 18 Sections', fr: 'Toutes les 18 rubriques' }, accent: '#2563eb' },
  { key: 'strategy', title: { ar: 'الرؤية والاستراتيجية (1 - 4)', en: 'Vision & Strategy', fr: 'Vision & Stratégie' }, accent: '#f59e0b' },
  { key: 'practice', title: { ar: 'الممارسة والتطبيق (5 - 8)', en: 'Field Practice', fr: 'Pratique de terrain' }, accent: '#10b981' },
  { key: 'innovation', title: { ar: 'الابتكار والتكنولوجيا (9 - 13)', en: 'Innovation & Tech', fr: 'Innovation & Tech' }, accent: '#0284c7' },
  { key: 'community', title: { ar: 'المجتمع والشراكات (14 - 18)', en: 'Community & Media', fr: 'Communauté & Média' }, accent: '#8b5cf6' },
];

// Seed articles for initial synchronization
export function generateAllMagazineSeedArticles(): MagazineArticleItem[] {
  const articles: MagazineArticleItem[] = [];

  // 1. Initial signature seed articles
  articles.push(
    {
      id: 'art-01',
      slug: 'future-of-tot-ai',
      sectionSlug: 'cover-story',
      sectionNumber: 2,
      sectionGroup: 'strategy',
      issueNumber: 5,
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
      content: `## مستقبل تدريب المدربين في عصر الذكاء الاصطناعي

لم يعد الذكاء الاصطناعي مجرد أداة إضافية مساعدة، بل أصبح ركيزة جوهرية تعيد كتابة قواعد التدريب والتعليم المهني.

### التحول من التلقين إلى التيسير العميق
حينما تصبح المعلومات متوفرة بضغطة زر وبأي لغة، تصبح قيمة المدرب الحقيقية تكمن في:
1. **طرح الأسئلة الذكية** التي تثير التفكير النقدي وتفكيك المفاهيم المعقدة.
2. **إدارة المشاعر والتفاعل البشري** داخل القاعة التدريبية وبناء الثقة المتبادلة.
3. **تطبيق المعرفة** في سياقات ومشاريع وتحديات واقعية تحاكي سوق العمل.

### نموذج المحطات الثلاث للتطوير
- **المحطة الأولى:** أتمتة إعداد المواد والحقائب بالنماذج اللغوية الضخمة.
- **المحطة الثانية:** تصميم سيناريوهات محاكاة وتخصيص التعلم حسب احتياج كل متدرب.
- **المحطة الثالثة:** قياس مؤشرات التغير السلوكي ونقل أثر التدريب في الميدان.

> «المدرب الذي لن يستبدله الذكاء الاصطناعي هو المدرب الذي يوظف الذكاء الاصطناعي ليضاعف أثره الإنساني.»`,
      author: {
        name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
        role: { ar: 'كبير المستشارين الأكاديميين ورئيس التحرير', en: 'Senior Academic Advisor & Editor-in-Chief', fr: 'Conseiller Académique' },
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      category: 'ملف العدد',
      coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2026-09-01',
      readingTimeMinutes: 6,
      featured: true,
      status: 'published',
      contentType: 'article',
      tags: ['ملف العدد', 'ذكاء اصطناعي', 'هندسة التدريب', 'TOT'],
    },
    {
      id: 'art-02',
      slug: 'andragogy-secrets',
      sectionSlug: 'pedagogy-lab',
      sectionNumber: 5,
      sectionGroup: 'practice',
      issueNumber: 5,
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
      content: `## أسرار الأندراغوجيا في تدريب الكبار

تختلف سيكولوجية تعليم الكبار جذرياً عن تعليم الصغار. فالراشد يأتي إلى القاعة التدريبية حاملاً رصيداً من التجارب والخبرات السابقة، ولا يقبل دور المتلقي السلبي.

### المبادئ الجوهرية الستة:
1. **الحاجة إلى المعرفة:** يحتاج المتدرب الراشد إلى معرفة "لماذا" يتعلم هذا الشيء وما هي الفائدة المباشرة لوظيفته.
2. **مفهوم الذات المستقل:** يرى نفسه مسؤولاً ومستقلاً ويرفض أسلوب الإملاء أو الوصاية الفكرية.
3. **دور الخبرة الميدانية:** الخبرة السابقة هي المرجع الأساسي الذي يبني عليه تعلمه الجديد أو يرفضه إذا تعارض معه.
4. **الجاهزية للتعلم:** ترتبط بتطوير مهارة يحتاجها فوراً لأداء مهامه الحالية أو ترقيته القادمة.
5. **التوجه نحو حل المشكلات:** يفضل التعلم المتمحور حول المشاكل والمشاريع أكثر من التمحور حول المواضيع النظرية.
6. **الدافع الداخلي:** المحفزات الداخلية (التقدير، الرضا عن الإنجاز، الكفاءة) أقوى بكثير من الشهادات الشكلية.`,
      author: {
        name: { ar: 'أ. مروان بن زيان', en: 'Mr. Marouane Ben Ziane', fr: 'M. Marouane Ben Ziane' },
        role: { ar: 'مستشار التطوير المؤسسي وتصميم الحقائب', en: 'Organizational Development Consultant', fr: 'Consultant en Développement' },
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      },
      category: 'مختبر البيداغوجيا',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      publishedAt: '2026-08-25',
      readingTimeMinutes: 7,
      featured: false,
      status: 'published',
      contentType: 'article',
      tags: ['مختبر البيداغوجيا', 'أندراغوجيا', 'تعليم الكبار'],
    }
  );

  // 2. Map all 70 cards from the 18 editorial slides
  EDITORIAL_SLIDES.forEach((slide) => {
    const sec = MAG_SECTIONS.find((m) => m.slug === slide.slug);
    const secNumber = sec ? sec.n : 1;
    const secGroup = sec ? sec.group : 'strategy';

    slide.cards.forEach((card, idx) => {
      const artId = `mag-${slide.slug}-${idx + 1}`;
      if (articles.some((a) => a.id === artId)) return;

      const hasVideo = card.contentType === 'video' || !!card.video;
      const readTime = card.story?.ar?.readTime
        ? parseInt(card.story.ar.readTime) || 5
        : hasVideo
        ? 8
        : 5;

      const contentBody =
        card.story?.ar?.paragraphs && card.story.ar.paragraphs.length > 0
          ? card.story.ar.paragraphs.join('\n\n')
          : `## ${card.title.ar}\n\n${card.intro.ar}\n\n### المحاور والمنهجيات التدريبية\n\n1. **التحليل الميداني الدقيق**: استقراء الاحتياجات الحقيقية وبيئة العمل المستهدفة.\n2. **التصميم الإجرائي**: تحويل المفاهيم إلى أدوات تفاعلية وقوالب عمل يمارسها المتدرب.\n3. **قياس الأثر والتقييم المستمر**: ضمان رسوخ الكفاءة وتجسيدها في الأداء الوظيفي اليومي.\n\n> «${
              card.eyebrow?.ar || 'معرفة المدرب... بصوت المدرب'
            }» - منصة تجمع الرؤية بالابتكار لتمكين المدرب المحترف.`;

      const authorNameAr =
        card.story?.ar?.author ||
        card.video?.speaker?.ar ||
        'هيئة تحرير مجلة المدرب';
      const authorNameEn =
        card.story?.en?.author ||
        card.video?.speaker?.en ||
        'Editorial Board';
      const authorNameFr =
        card.story?.fr?.author ||
        card.video?.speaker?.fr ||
        'Comité de Rédaction';

      const authorRoleAr =
        card.story?.ar?.role || 'خبير تدريب وتطوير مهني معتمد';
      const authorRoleEn =
        card.story?.en?.role || 'Certified Training & Development Expert';
      const authorRoleFr =
        card.story?.fr?.role || 'Expert en formation professionnelle';

      articles.push({
        id: artId,
        slug: `${slide.slug}-${idx + 1}`,
        sectionSlug: slide.slug,
        sectionNumber: secNumber,
        sectionGroup: secGroup,
        issueNumber: 5,
        title: {
          ar: card.title.ar,
          en: card.title.en || card.title.ar,
          fr: card.title.fr || card.title.ar,
        },
        excerpt: {
          ar: card.intro.ar,
          en: card.intro.en || card.intro.ar,
          fr: card.intro.fr || card.intro.ar,
        },
        content: contentBody,
        author: {
          name: { ar: authorNameAr, en: authorNameEn, fr: authorNameFr },
          role: { ar: authorRoleAr, en: authorRoleEn, fr: authorRoleFr },
          avatar:
            card.story?.ar?.avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        category: sec ? sec.name.ar : card.eyebrow?.ar || 'مجلة المدرب',
        coverImage:
          card.image ||
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=88',
        publishedAt: card.story?.ar?.date || '2026-09-01',
        readingTimeMinutes: readTime,
        featured: card.kind === 'feature' || idx === 0,
        status: 'published',
        contentType: hasVideo ? 'video' : 'article',
        videoUrl: card.video?.url || '',
        tags: [
          sec ? sec.name.ar : 'مجلة المدرب',
          card.eyebrow?.ar || '',
          hasVideo ? 'فيديو' : 'مقال',
        ].filter(Boolean),
      });
    });
  });

  return articles;
}
