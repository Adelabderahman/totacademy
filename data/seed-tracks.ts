import { TrackDefinition } from '@/types/curriculum';
import { buildComprehensiveTotTrack } from '@/lib/seed-comprehensive-track';

export const initialTracksData: TrackDefinition[] = [
  buildComprehensiveTotTrack(),
  {
    id: 'tech-ai-trainer',
    slug: 'tech-ai-trainer',
    specializationKey: 'tech',
    badge: 'AIT/101',
    title: {
      ar: 'مسار مدرب الذكاء الاصطناعي وتطبيقات التعليم الذكي (AIT101)',
      en: 'AI in Training & Smart Learning Systems (AIT101)',
      fr: "L'IA dans la Formation et l'Apprentissage Intelligent (AIT101)",
    },
    subtitle: {
      ar: 'إتقان توظيف الذكاء الاصطناعي التوليدي في هندسة الحقائب، المحاكاة، وصناعة المحتوى التفاعلي',
      en: 'Mastering Generative AI for Course Engineering, Simulation, and Interactive Content',
      fr: 'Maîtrisez l’IA générative pour l’ingénierie pédagogique et la simulation',
    },
    desc: {
      ar: 'مسار احترافي متقدم يؤهل المدربين المعاصرين لقيادة ثورة الذكاء الاصطناعي في بيئات التعلم. تتعلم خلاله هندسة الأوامر (Prompt Engineering) لإنتاج الحقائب التدريبية في دقائق، وتصميم شخصيات المحاكاة الذكية.',
      en: 'Advanced professional track empowering modern trainers to lead AI integration in education and training.',
      fr: 'Parcours avancé permettant aux formateurs d’intégrer l’IA générative.',
    },
    category: {
      ar: 'قسم تكنولوجيا التعليم / الذكاء الاصطناعي',
      en: 'EdTech / Artificial Intelligence',
      fr: 'EdTech / Intelligence Artificielle',
    },
    durationHours: 45,
    totalLessonsCount: 12,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    mentor: {
      name: {
        ar: 'م. سليم قادري',
        en: 'Eng. Salim Kadri',
        fr: 'Ing. Salim Kadri',
      },
      role: {
        ar: 'خبير حلول الذكاء الاصطناعي وتكنولوجيا التعليم',
        en: 'AI Solutions & EdTech Architect',
        fr: 'Expert en IA et Solutions EdTech',
      },
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: {
        ar: 'مهندس نظم ذكاء اصطناعي ومستشار معتمد في التحول الرقمي للجامعات والمراكز التدريبية.',
        en: 'AI Systems Engineer and certified digital transformation consultant.',
      },
    },
    levels: {
      foundation: {
        id: 'foundation',
        title: { ar: 'المستوى التأسيسي للذكاء الاصطناعي', en: 'AI Foundations Level', fr: 'Bases de l’IA' },
        desc: { ar: 'مفاهيم الذكاء الاصطناعي التوليدي وهندسة الأوامر المتقدمة للمدربين', en: 'Core generative AI concepts and advanced prompting for educators', fr: 'Concepts clés et ingénierie de prompts' },
        badge: 'L1',
        modules: [
          {
            id: 'mod_ai_01',
            num: '01',
            icon: '🤖',
            gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
            moduleLabel: { ar: 'مقياس 01', en: 'Module 01', fr: 'Module 01' },
            title: { ar: 'هندسة الأوامر (Prompt Engineering) لتوليد المحتوى التدريبي', en: 'Prompt Engineering for Course Creation', fr: 'Prompt Engineering Pédagogique' },
            desc: {
              ar: 'كيف تصيغ أوامر برمجية دقيقة للنماذج اللغوية الكبيرة لبناء هيكلية الدورات ومحتوى الشرائح واختبارات التقييم.',
              en: 'Crafting precise prompts for LLMs to build course outlines, slide contents, and quizzes.',
              fr: 'Rédiger des prompts précis pour créer des plans et des quiz.',
            },
            lessons: [
              {
                id: 'ai_l1',
                type: 'video',
                title: { ar: 'الدرس 01: الإطار الهيكلي للأوامر التدريبية (Role - Context - Task - Constraints)', en: 'Lesson 01: The R-C-T-C Prompting Framework', fr: 'Leçon 01: Le Cadre R-C-T-C' },
                instructor: { ar: 'م. سليم قادري', en: 'Eng. Salim Kadri', fr: 'Ing. Salim Kadri' },
                duration: { ar: '25 دقيقة', en: '25 mins', fr: '25 mins' },
                img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'خطوات بناء برومبت تدريبي احترافي يحول النموذج إلى مصمم تعليمي خبير.', en: 'Step-by-step to turning models into expert instructional designers.', fr: 'Transformer les modèles en concepteurs experts.' },
                video_id: 'aircAruvnKk',
              },
              {
                id: 'ai_l2',
                type: 'video',
                title: { ar: 'الدرس 02: توليد سيناريوهات المحاكاة ودراسات الحالة التفاعلية', en: 'Lesson 02: Generating Interactive Case Studies', fr: 'Leçon 02: Études de cas interactives' },
                instructor: { ar: 'م. سليم قادري', en: 'Eng. Salim Kadri', fr: 'Ing. Salim Kadri' },
                duration: { ar: '19 دقيقة', en: '19 mins', fr: '19 mins' },
                img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'بناء دراسات حالة واقعية مع معايير تقييم ذكية للمتدربين.', en: 'Designing real-world case studies with automated rubrics.', fr: 'Études de cas réelles et grilles d’évaluation.' },
                video_id: '5qap5aO4i9A',
              }
            ],
            quiz: {
              title: { ar: 'اختبار هندسة الأوامر التدريبية', en: 'Prompting Quiz', fr: 'Quiz Prompting' },
              passingScore: 70,
              questions: [
                {
                  q: 'ما هو العنصر الأكثر أهمية في البرومبت لمنع الموديل من الهلوسة وتقديم إجابات عامة وغير دقيقة؟',
                  options: ['تحديد الدور والسياق والقيود بدقة (Role, Context, Constraints)', 'استخدام جمل قصيرة جداً', 'تكرار نفس الكلمة 5 مرات', 'عدم إعطاء أي أمثلة'],
                  ans: 0,
                  explanation: 'تحديد الدور والسياق وقواعد الإخراج والقيود يضمن توجيه النموذج لتقديم مخرجات احترافية.'
                }
              ]
            }
          }
        ]
      }
    },
    finalExam: {
      title: {
        ar: 'الامتحان النهائي لمسار مدرب الذكاء الاصطناعي (AIT101)',
        en: 'Final AI Trainer Assessment Exam (AIT101)',
        fr: 'Examen Final Formateur IA (AIT101)',
      },
      passingScore: 70,
      timeMinutes: 30,
      questions: [
        {
          q: 'ما هي أفضل استراتيجية لتوليد كويز متوازن لطلابك بواسطة الذكاء الاصطناعي؟',
          options: [
            'الطلب العشوائي دون تحديد المستويات',
            'تزويد النموذج بمستويات بلوم المعرفية وتحديد عدد الأسئلة ونوع كل سؤال مع مفتاح الإجابة والتعليل',
            'مطالبة النموذج بوضع أسئلة مستحيلة الحل',
            'الاعتماد على الأسئلة المقالية فقط دون خيارات'
          ],
          ans: 1,
          explanation: 'الاستناد إلى تصنيف بلوم وتحديد نوع السؤال والتعليل الأكاديمي يضمن امتحاناً موثوقاً وعادلاً.'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'digital-marketing-trainer',
    slug: 'digital-marketing-trainer',
    specializationKey: 'marketing',
    badge: 'MKT/202',
    title: {
      ar: 'مسار التسويق الرقمي وبناء العلامة الشخصية للمدرب (MKT202)',
      en: 'Digital Marketing & Personal Branding for Trainers (MKT202)',
      fr: 'Marketing Digital et Branding pour Formateurs (MKT202)',
    },
    subtitle: {
      ar: 'استراتيجيات استقطاب المتدربين، إطلاق الأكاديميات الرقمية، وتحويل الخبرة إلى منتج معرفي عالي العائد',
      en: 'Trainee Acquisition, Launching Digital Academies, and Monetizing Expertise',
      fr: 'Acquisition d’apprenants et monétisation de votre savoir-faire',
    },
    desc: {
      ar: 'تعلم كيف تسوق لنفسك كمرجع موثوق في مجالك التدريبي، وتبني قمعاً تسويقياً متكاملاً يستقطب المؤسسات والمتدربين باستمرار دون إرهاق الإعلانات التقليدية.',
      en: 'Learn how to position yourself as an authority in your field and build high-converting marketing funnels.',
      fr: 'Apprenez à vous positionner comme une référence et créer des tunnels de conversion.',
    },
    category: {
      ar: 'قسم التسويق الرقمي / العلامة الشخصية',
      en: 'Digital Marketing / Personal Branding',
      fr: 'Marketing Digital / Branding',
    },
    durationHours: 35,
    totalLessonsCount: 10,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    mentor: {
      name: {
        ar: 'أ. مروان بن زيان',
        en: 'Mr. Marouane Ben Ziane',
        fr: 'M. Marouane Ben Ziane',
      },
      role: {
        ar: 'مستشار التسويق الرقمي والنمو للمؤسسات التعليمية',
        en: 'Digital Marketing & Growth Strategist',
        fr: 'Stratège en Marketing Digital',
      },
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: {
        ar: 'أدار أكثر من 50 حملة تسويقية لأكاديميات دولية وساعد مئات المدربين في تحويل شغفهم إلى أعمال رقمية رائدة.',
        en: 'Managed 50+ growth campaigns for international academies.',
      },
    },
    levels: {
      foundation: {
        id: 'foundation',
        title: { ar: 'مستوى تأسيس العلامة الشخصية', en: 'Branding Foundations', fr: 'Bases du Branding' },
        desc: { ar: 'صياغة الرسالة، استهداف الشريحة الذهبية، وبناء التواجد الرقمي الموثوق', en: 'Message formulation and golden audience targeting', fr: 'Formulation du message et ciblage' },
        badge: 'L1',
        modules: [
          {
            id: 'mod_mkt_01',
            num: '01',
            icon: '🎯',
            gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            moduleLabel: { ar: 'مقياس 01', en: 'Module 01', fr: 'Module 01' },
            title: { ar: 'هندسة العرض القيّم واستقطاب العملاء', en: 'Value Proposition & Client Funnels', fr: 'Proposition de Valeur' },
            desc: {
              ar: 'تحديد القيمة الفريدة (UVP) التي تميز برنامجك التدريبي عن المنافسين وبناء قمع مبيعات معرفي.',
              en: 'Defining your unique value proposition and structuring educational sales funnels.',
              fr: 'Définir votre proposition de valeur unique et créer votre tunnel de vente.',
            },
            lessons: [
              {
                id: 'mkt_l1',
                type: 'video',
                title: { ar: 'الدرس 01: صياغة الوعد التحويلي للبرنامج التدريبي', en: 'Lesson 01: Formulating the Transformational Promise', fr: 'Leçon 01: La Promesse de Transformation' },
                instructor: { ar: 'أ. مروان بن زيان', en: 'Mr. Marouane Ben Ziane', fr: 'M. Marouane Ben Ziane' },
                duration: { ar: '21 دقيقة', en: '21 mins', fr: '21 mins' },
                img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'كيف تنتقل من بيع ساعات تدريبية إلى بيع نتائج تحول واقع المتدرب.', en: 'Shifting from selling training hours to selling transformative results.', fr: 'Vendre des résultats transformateurs.' },
                video_id: 'e-ORhEE9VVg',
              }
            ],
            quiz: {
              title: { ar: 'اختبار هندسة العرض القيّم', en: 'Value Proposition Quiz', fr: 'Quiz Proposition de Valeur' },
              passingScore: 70,
              questions: [
                {
                  q: 'ما هو الفارق الجوهري بين بيع "ساعات التدريب" وبيع "الوعد التحويلي"؟',
                  options: [
                    'لا يوجد أي فارق',
                    'الوعد التحويلي يركز على المهارة والنتيجة العملية الملموسة التي يكتسبها المتدرب',
                    'ساعات التدريب دائماً أغلى سعراً',
                    'الوعد التحويلي يتطلب وقتاً أطول دائماً'
                  ],
                  ans: 1,
                  explanation: 'المتدربون والمؤسسات يستثمرون في النتائج والحلول وليس في عدد الساعات المجردة.'
                }
              ]
            }
          }
        ]
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
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
