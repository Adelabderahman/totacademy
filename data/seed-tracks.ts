import { TrackDefinition } from '@/types/curriculum';

export const initialTracksData: TrackDefinition[] = [
  {
    id: 'tot-foundation',
    slug: 'tot-foundation',
    specializationKey: 'tot',
    badge: 'TOT/P-F',
    title: {
      ar: 'البرنامج التأسيسي الشامل لتدريب المدربين (TOTF126)',
      en: 'Comprehensive Foundational TOT Program (TOTF126)',
      fr: 'Programme Fondamental Complet de FdF (TOTF126)',
    },
    subtitle: {
      ar: 'المسار التأصيلي لبناء المدرب المحترف من الصفر وفق المعايير الدولية',
      en: 'The Foundational Pathway to Master Professional Training from Scratch',
      fr: 'Le parcours fondamental pour devenir formateur professionnel',
    },
    desc: {
      ar: 'نقطة انطلاقك نحو احتراف التدريب. يقدم لك هذا البرنامج الأسس العلمية والمهارات التطبيقية لبناء حضور مؤثر وتصميم حقائب تدريبية متكاملة تتوافق مع أحدث المعايير العالمية.',
      en: 'Your starting point towards professional training. This program provides you with the scientific foundations and practical skills to build an influential presence.',
      fr: 'Votre point de départ vers la formation professionnelle. Ce programme vous fournit les bases scientifiques et les compétences pratiques.',
    },
    category: {
      ar: 'قسم تدريب المدربين / الأساسيات',
      en: 'Train the Trainer / Fundamentals',
      fr: 'Formation des Formateurs / Fondamentaux',
    },
    durationHours: 60,
    totalLessonsCount: 18,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    mentor: {
      name: {
        ar: 'د. عبد الكريم بلخيري',
        en: 'Dr. Abdelkrim Belkheiri',
        fr: 'Dr. Abdelkrim Belkheiri',
      },
      role: {
        ar: 'كبير المستشارين وأستاذ التدريب الدولي',
        en: 'Senior Advisor & Master Trainer',
        fr: 'Conseiller Principal & Maître Formateur',
      },
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: {
        ar: 'خبير دولي في هندسة البرامج التدريبية وتأهيل المدربين المحترفين بخبرة تفوق 15 عاماً.',
        en: 'International expert in training program engineering with over 15 years experience.',
      },
    },
    levels: {
      foundation: {
        id: 'foundation',
        title: { ar: 'مستوى التأسيس', en: 'Foundation Level', fr: 'Niveau Fondation' },
        desc: { ar: 'بناء القواعد المعرفية والمهارية الصلبة للمدرب الناشئ', en: 'Building solid cognitive and practical foundations', fr: 'Construire des bases solides' },
        badge: 'L1',
        modules: [
          {
            id: 'module_1',
            num: '01',
            icon: '🧠',
            gradient: 'linear-gradient(135deg, #FF6B6B, #FFA07A)',
            moduleLabel: { ar: 'مقياس 01', en: 'Module 01', fr: 'Module 01' },
            title: { ar: 'معمارية التعلم وسيكولوجية المتدربين', en: 'Architecture of Learning', fr: "L'Architecture de l'Apprentissage" },
            desc: {
              ar: 'يغوص في علم الأندراغوجيا والأسس العصبية لتمكين المدربين من فهم سيكولوجية المتدرب وبناء تجارب راسخة.',
              en: 'Delves into andragogy and neurocognitive foundations to decode trainee psychology.',
              fr: "Explore l'andragogie et les bases neurocognitives pour décoder la psychologie.",
            },
            lessons: [
              {
                id: 'm1_l1',
                type: 'video',
                title: { ar: 'الدرس 01: سيكولوجية تعلم الكبار ومبادئ الأندراغوجيا', en: 'Lesson 01: Adult Learning Psychology & Andragogy', fr: 'Leçon 01: Psychologie des adultes' },
                instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
                duration: { ar: '14 دقيقة', en: '14 mins', fr: '14 mins' },
                img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'مقدمة في كسر حواجز التلقين والتحول نحو التيسير التشاركي الفعال.', en: 'Introduction to moving from rote teaching to active facilitation.', fr: 'Introduction à la facilitation active.' },
                video_id: '3K-Wx5q7ExA',
                contentMarkdown: 'يعتبر فهم سيكولوجية تعليم الكبار (الأندراغوجيا) حجر الزاوية لكل مدرب ناجح. فالراشد لا يتعلم كالتلميذ الصغير، بل ينطلق من تجاربه السابقة واحتياجاته الواقعية لحل المشكلات.'
              },
              {
                id: 'm1_l2',
                type: 'video',
                title: { ar: 'الدرس 02: أنماط التعلم واستراتيجيات الاستيعاب الفعال (VARK)', en: 'Lesson 02: Learning Styles (VARK)', fr: 'Leçon 02: Styles d’apprentissage' },
                instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
                duration: { ar: '18 دقيقة', en: '18 mins', fr: '18 mins' },
                img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'كيف تصمم أنشطة تستجيب للمتدرب البصري، السمعي، والحركي في القاعة التدريبية.', en: 'How to design activities addressing visual, auditory, and kinesthetic learners.', fr: 'Activités adaptées à chaque profil.' },
                video_id: 'dQw4w9WgXcQ',
              },
              {
                id: 'm1_l3',
                type: 'doc',
                title: { ar: 'الوثيقة التأسيسية: مصفوفة كولب للتعلم التجريبي', en: 'Document: Kolb Experiential Cycle Matrix', fr: 'Document: Cycle de Kolb' },
                instructor: { ar: 'فريق التحرير الأكاديمي', en: 'Academic Editorial Board', fr: 'Comité Académique' },
                duration: { ar: 'ملف PDF + تلخيص', en: 'PDF + Summary', fr: 'PDF + Résumé' },
                img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'دليل تطبيقي يوضح دورة كولب الرباعية لتحويل الممارسة إلى خبرة راسخة.', en: 'Practical guide mapping Kolb’s 4-stage cycle.', fr: 'Guide pratique du cycle de Kolb.' },
                doc_preview: 'دليل مصفوفة كولب الرباعية: التجربة الملموسة -> الملاحظة المتأملة -> المفاهيم المجردة -> التجريب النشط.',
              }
            ],
            quiz: {
              title: { ar: 'اختبار مقياس معمارية التعلم', en: 'Learning Architecture Quiz', fr: 'Quiz Architecture de l’Apprentissage' },
              passingScore: 70,
              questions: [
                {
                  q: 'ما هو المفهوم العلمي الذي يدرس تعليم الكبار مقارنة بالبيداغوجيا الخاصة بالصغار؟',
                  options: ['الأندراغوجيا (Andragogy)', 'الأنثروبولوجيا', 'الإبستمولوجيا', 'الديداكتيك فقط'],
                  ans: 0,
                  hint: 'يبدأ بحرف الألف وهو مصطلح صاغه مالكولم نولز.',
                  explanation: 'الأندراغوجيا هي علم وممارسة مساعدة الكبار على التعلم.'
                },
                {
                  q: 'وفق نموذج VARK، أي نوع من المتدربين يفضل المخططات والرسوم البيانية والألوان؟',
                  options: ['المتدرب الحركي', 'المتدرب السمعي', 'المتدرب البصري', 'المتدرب القرائي'],
                  ans: 2,
                  hint: 'يركز على الرؤية والصور.',
                  explanation: 'المتدرب البصري يستوعب المعلومات عبر الرموز والأشكال والمخططات.'
                },
                {
                  q: 'كم عدد مراحل دورة كولب للتعلم التجريبي؟',
                  options: ['مرحلتان', 'ثلاث مراحل', 'أربع مراحل', 'ست مراحل'],
                  ans: 2,
                  hint: 'تبدأ بالتجربة الحسية وتنتهي بالتجريب الفعال.',
                  explanation: 'دورة كولب رباعية المراحل (Concrete Experience, Reflective Observation, Abstract Conceptualization, Active Experimentation).'
                }
              ]
            }
          },
          {
            id: 'module_2',
            num: '02',
            icon: '🗣️',
            gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            moduleLabel: { ar: 'مقياس 02', en: 'Module 02', fr: 'Module 02' },
            title: { ar: 'التيسير الكاريزمي ولغة الجسد التدريبية', en: 'Charismatic Facilitation', fr: 'Facilitation Charismatique' },
            desc: {
              ar: 'يركز على الكاريزما القيادية والذكاء العاطفي، ويزودك بمهارات الاتصال لإدارة المجموعات وبناء حضور مؤثر.',
              en: 'Focuses on leadership charisma, emotional intelligence, and non-verbal presence.',
              fr: 'Axé sur le charisme et l’intelligence émotionnelle.',
            },
            lessons: [
              {
                id: 'm2_l1',
                type: 'video',
                title: { ar: 'الدرس 01: هندسة الحضور والوقفة القيادية في المنصة', en: 'Lesson 01: Platform Stance & Confident Body Language', fr: 'Leçon 01: Posture scénique' },
                instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
                duration: { ar: '16 دقيقة', en: '16 mins', fr: '16 mins' },
                img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'قواعد التموضع المسرحي، حركة اليدين، والاتصال البصري الشامل مع القاعة.', en: 'Stage positioning, hand gestures, and comprehensive eye contact.', fr: 'Positionnement sur scène et contact visuel.' },
                video_id: 'kJQP7kiw5Fk',
              },
              {
                id: 'm2_l2',
                type: 'video',
                title: { ar: 'الدرس 02: إدارة النبرات الصوتية والوقفات التأثيرية', en: 'Lesson 02: Voice Modulation & Dramatic Pauses', fr: 'Leçon 02: Modulation de la voix' },
                instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
                duration: { ar: '20 دقيقة', en: '20 mins', fr: '20 mins' },
                img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'كيف تتجنب الرتابة الصوتية وتستخدم الصمت المتعمد لجذب الانتباه والتركيز.', en: 'How to avoid vocal monotony and use strategic silence.', fr: 'Éviter la monotonie vocale.' },
                video_id: 'L_LUpnjgPso',
              }
            ],
            quiz: {
              title: { ar: 'اختبار مقياس التيسير الكاريزمي', en: 'Charismatic Facilitation Quiz', fr: 'Quiz Facilitation Charismatique' },
              passingScore: 70,
              questions: [
                {
                  q: 'وفق قاعدة محرابيان، ما النسبة التقريبية لتأثير لغة الجسد في نقل المشاعر والانطباعات؟',
                  options: ['7%', '38%', '55%', '90%'],
                  ans: 2,
                  hint: 'هي النسبة الكبرى في مثلث التواصل.',
                  explanation: 'قاعدة محرابيان: الكلمات 7%، نبرة الصوت 38%، ولغة الجسد 55%.'
                },
                {
                  q: 'ما هو الاستخدام الأمثل للوقفة الصامتة (Pause) أثناء الإلقاء؟',
                  options: ['تغطية النسيان فقط', 'لفت الانتباه وتأكيد فكرة جوهرية', 'إعطاء فرصة للمتدربين للحديث الجانبي', 'إنهاء المحاضرة مبكراً'],
                  ans: 1,
                  explanation: 'الوقفة الصامتة الذكية تجذب تركيز القاعة وتعطي مهلة زمنية لمعالجة الفكرة المطروحة.'
                }
              ]
            }
          },
          {
            id: 'module_3',
            num: '03',
            icon: '📐',
            gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            moduleLabel: { ar: 'مقياس 03', en: 'Module 03', fr: 'Module 03' },
            title: { ar: 'الهندسة التعليمية وتصميم الحقائب التدريبية', en: 'Instructional Engineering', fr: 'Ingénierie Pédagogique' },
            desc: {
              ar: 'تطبيق نماذج التصميم التعليمي (ADDIE) لابتكار حقائب متكاملة، وتحويل المعرفة النظرية إلى تطبيقات عملية قياسية.',
              en: 'Apply instructional design models (ADDIE) to create comprehensive training packages.',
              fr: 'Appliquer des modèles de conception (ADDIE) pour créer des kits complets.',
            },
            lessons: [
              {
                id: 'm3_l1',
                type: 'video',
                title: { ar: 'الدرس 01: نموذج ADDIE الشامل لتصميم البرامج التدريبية', en: 'Lesson 01: The Comprehensive ADDIE Model', fr: 'Leçon 01: Le Modèle ADDIE' },
                instructor: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
                duration: { ar: '22 دقيقة', en: '22 mins', fr: '22 mins' },
                img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
                desc: { ar: 'شرح المراحل الخمس: التحليل، التصميم، التطوير، التنفيذ، والتقييم.', en: 'Analysis, Design, Development, Implementation, Evaluation breakdown.', fr: 'Analyse, Conception, Développement, Implémentation, Évaluation.' },
                video_id: '9bZkp7q19f0',
              }
            ],
            quiz: {
              title: { ar: 'اختبار مقياس الهندسة التعليمية', en: 'Instructional Engineering Quiz', fr: 'Quiz Ingénierie Pédagogique' },
              passingScore: 70,
              questions: [
                {
                  q: 'ماذا يمثل حرف A في نموذج التصميم التعليمي ADDIE؟',
                  options: ['Action (العمل)', 'Analysis (التحليل)', 'Assessment (التقييم)', 'Application (التطبيق)'],
                  ans: 1,
                  explanation: 'المرحلة الأولى في ADDIE هي Analysis (تحليل الاحتياجات التدريبية والجمهور المستهدف).'
                }
              ]
            }
          }
        ]
      }
    },
    finalExam: {
      title: {
        ar: 'امتحان نهاية المسار التأصيلي الشامل (TOTF126)',
        en: 'Comprehensive Final Pathway Exam (TOTF126)',
        fr: 'Examen Final Complet du Parcours (TOTF126)',
      },
      passingScore: 75,
      timeMinutes: 45,
      questions: [
        {
          q: 'ما هي المعادلة الأساسية التي تميز تعليم الكبار (الأندراغوجيا) عن تعليم الصغار؟',
          options: [
            'الاعتماد الكلي على التلقين والحفظ',
            'الانطلاق من خبرة المتدرب، وربط المعرفة بحل مشكلات واقعية فورية',
            'عدم استخدام أي وسائل بصرية',
            'إلغاء التطبيقات العملية والاكتفاء بالنظريات'
          ],
          ans: 1,
          explanation: 'الكبار يتعلمون عندما تكون المعرفة ذات صلة بحياتهم المهنية وتمكنهم من حل المشكلات العملية.'
        },
        {
          q: 'في مصفوفة كولب، ماذا يعني الانتقال من التجربة الملموسة إلى الملاحظة المتأملة؟',
          options: [
            'تجاهل التجربة السابقة والبدء من جديد',
            'تحليل ما حدث في النشاط واستخلاص العبر والدروس المستفادة منه',
            'كتابة اختبار نظري سريع',
            'تغيير المدرب مباشرة'
          ],
          ans: 1,
          explanation: 'الملاحظة المتأملة هي مرحلة مراجعة التجربة المعاشة وفهم أبعادها قبل صياغة القوانين المجردة.'
        },
        {
          q: 'أي من المراحل التالية هي المرحلة الأخيرة في نموذج التصميم التعليمي ADDIE؟',
          options: ['التطوير (Development)', 'التحليل (Analysis)', 'التقييم (Evaluation)', 'التنفيذ (Implementation)'],
          ans: 2,
          explanation: 'المرحلة الخامسة والأخيرة في ADDIE هي Evaluation (التقييم المستمر والنهائي للبرنامج ومخرجاته).'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
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
