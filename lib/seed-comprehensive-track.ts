import { TrackDefinition, LevelItem, ModuleItem, LessonItem, QuizItem } from '@/types/curriculum';
import { levelModules, allLessonsDB, getQuizzesForModule, finalExamQuestions } from '@/lib/edupath-data';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Builds the complete, canonical data structure for:
 * "المسار التأصيلي الشامل لتدريب المدربين (TOTF126)"
 * Contains all 3 levels, 24 modules, 288 lessons, 144 quizzes, oral interviews, and the 10-slide final exam.
 */
export function buildComprehensiveTotTrack(): TrackDefinition {
  // 1. Build Foundation level modules
  const foundationModules: ModuleItem[] = levelModules.foundation.map((m) => {
    const rawLessons = allLessonsDB[m.id] || [];
    const lessons: LessonItem[] = rawLessons.map((l) => ({
      id: l.id,
      type: l.type as 'video' | 'doc',
      title: l.title,
      instructor: l.instructor,
      duration: l.duration,
      img: l.img,
      desc: l.desc,
      video_id: l.video_id,
      action_url: l.action_url,
      doc_preview: l.doc_preview,
    }));

    const quizzes = getQuizzesForModule(m.id, 'ar');
    const allQuestions = quizzes.flatMap((q) => q.questions);
    const axesQuestions: Record<number, any[]> = {};
    quizzes.forEach((q, idx) => {
      axesQuestions[idx] = q.questions;
    });
    const quizItem: QuizItem = {
      id: `qz_${m.id}`,
      title: { ar: 'اختبارات تقييم المقياس (6 محاور)', en: 'Module Assessment Quizzes' },
      passingScore: 70,
      timeLimitSeconds: 15,
      questions: allQuestions,
      axes: [
        'المفاهيم والأسس الجوهرية',
        'المنهجيات والآليات التطبيقية',
        'دراسات الحالة ونمذجة المواقف',
        'الأدوات والاستراتيجيات المتقدمة',
        'التحسين المستمر وضمان الجودة',
        'التطبيقات الميدانية والقياس',
      ],
      axesQuestions,
      reportSlideEnabled: true,
    };

    return {
      id: m.id,
      num: m.num,
      icon: m.icon,
      gradient: m.gradient,
      moduleLabel: m.moduleLabel,
      title: m.title,
      desc: m.desc,
      summary: {
        ar: `ملخص مكثف لمقياس ${m.title.ar}: يركز على تزويد المدرب بالأدوات المعرفية والعملية للانتقال من المفاهيم النظرية إلى التطبيق الميداني الفعال وفق المعايير المعتمدة.`,
        en: `Intensive summary for ${m.title.en}: Focuses on equipping the trainer with practical tools.`,
      },
      interviewQuestion: {
        ar: `قدم استجواباً شفوياً أو تقريراً تلخيصياً من 500 إلى 1000 كلمة يشرح فيه كيفية تطبيق محاور مقياس "${m.title.ar}" في حقيبة تدريبية واقعية.`,
        en: `Provide an oral summary or a 500-1000 word brief on applying ${m.title.en} in practice.`,
      },
      lessons,
      quiz: quizItem,
    };
  });

  // 2. Build Empowerment level modules
  const empowermentModules: ModuleItem[] = (levelModules.empowerment || []).map((m) => {
    const rawLessons = allLessonsDB[m.id] || [];
    const lessons: LessonItem[] = rawLessons.map((l) => ({
      id: l.id,
      type: l.type as 'video' | 'doc',
      title: l.title,
      instructor: l.instructor,
      duration: l.duration,
      img: l.img,
      desc: l.desc,
      video_id: l.video_id,
      action_url: l.action_url,
      doc_preview: l.doc_preview,
    }));

    const quizzes = getQuizzesForModule(m.id, 'ar');
    const allQuestions = quizzes.flatMap((q) => q.questions);
    const axesQuestions: Record<number, any[]> = {};
    quizzes.forEach((q, idx) => {
      axesQuestions[idx] = q.questions;
    });
    const quizItem: QuizItem = {
      id: `qz_${m.id}`,
      title: { ar: 'اختبارات تقييم المقياس (6 محاور)', en: 'Module Assessment Quizzes' },
      passingScore: 70,
      timeLimitSeconds: 15,
      questions: allQuestions,
      axes: [
        'المفاهيم والأسس التمكينية',
        'المنهجيات المتقدمة',
        'دراسات الحالة الواقعية',
        'الأدوات التقنية',
        'معايير الجودة',
        'القياس الميداني',
      ],
      axesQuestions,
      reportSlideEnabled: true,
    };

    return {
      id: m.id,
      num: m.num,
      icon: m.icon,
      gradient: m.gradient,
      moduleLabel: m.moduleLabel,
      title: m.title,
      desc: m.desc,
      summary: {
        ar: `ملخص مقياس ${m.title.ar}: مرحلة التمكين التي تصقل مهارات المدرب وتنقله إلى مستوى الممارسة المتقدمة وإدارة المواقف المعقدة.`,
        en: `Summary of ${m.title.en}: Empowerment phase advancing the trainer to complex situations.`,
      },
      interviewQuestion: {
        ar: `اشرح بأسلوبك وخبرتك العملية سيناريو تطبيق مهارات "${m.title.ar}" في حل مشكلة تدريبية واقعية.`,
        en: `Explain a real-world scenario applying ${m.title.en}.`,
      },
      lessons,
      quiz: quizItem,
    };
  });

  // 3. Build Consolidation level modules
  const consolidationModules: ModuleItem[] = (levelModules.consolidation || []).map((m) => {
    const rawLessons = allLessonsDB[m.id] || [];
    const lessons: LessonItem[] = rawLessons.map((l) => ({
      id: l.id,
      type: l.type as 'video' | 'doc',
      title: l.title,
      instructor: l.instructor,
      duration: l.duration,
      img: l.img,
      desc: l.desc,
      video_id: l.video_id,
      action_url: l.action_url,
      doc_preview: l.doc_preview,
    }));

    const quizzes = getQuizzesForModule(m.id, 'ar');
    const allQuestions = quizzes.flatMap((q) => q.questions);
    const axesQuestions: Record<number, any[]> = {};
    quizzes.forEach((q, idx) => {
      axesQuestions[idx] = q.questions;
    });
    const quizItem: QuizItem = {
      id: `qz_${m.id}`,
      title: { ar: 'اختبارات تقييم المقياس (6 محاور)', en: 'Module Assessment Quizzes' },
      passingScore: 75,
      timeLimitSeconds: 15,
      questions: allQuestions,
      axes: [
        'الحوكمة والقيادة',
        'إدارة التميز المؤسسي',
        'الاعتمادات الدولية',
        'هندسة المناهج الكبرى',
        'اقتصاديات المعرفة',
        'مشروع الاعتماد النهائي',
      ],
      axesQuestions,
      reportSlideEnabled: true,
    };

    return {
      id: m.id,
      num: m.num,
      icon: m.icon,
      gradient: m.gradient,
      moduleLabel: m.moduleLabel,
      title: m.title,
      desc: m.desc,
      summary: {
        ar: `ملخص مقياس ${m.title.ar}: مرحلة التمتين والاعتماد التي تمنح المدرب استقلالية تامة وقدرة على قيادة الأكاديميات وإدارة الاعتمادات الدولية.`,
        en: `Summary of ${m.title.en}: Consolidation phase enabling international accreditation and leadership.`,
      },
      interviewQuestion: {
        ar: `قدم رؤيتك الاستراتيجية لمشروع تدريبي متكامل يعتمد على "${m.title.ar}" ومؤشرات قياس أثره على المدى البعيد.`,
        en: `Provide your strategic vision for a program based on ${m.title.en}.`,
      },
      lessons,
      quiz: quizItem,
    };
  });

  // 4. Assemble Levels
  const levels: Record<string, LevelItem> = {
    foundation: {
      id: 'foundation',
      title: { ar: 'المستوى الأول: مستوى التأسيس', en: 'Level 1: Foundation Level', fr: 'Niveau 1: Fondation' },
      desc: {
        ar: 'بناء القواعد المعرفية والمهارية الصلبة للمدرب المحترف من الصفر.',
        en: 'Building solid cognitive and practical foundations for the professional trainer.',
        fr: 'Construire des bases cognitives et pratiques solides.',
      },
      badge: 'L1',
      modules: foundationModules,
    },
    empowerment: {
      id: 'empowerment',
      title: { ar: 'المستوى الثاني: مستوى التمكين', en: 'Level 2: Empowerment Level', fr: 'Niveau 2: Habilitation' },
      desc: {
        ar: 'صقل المهارات المتقدمة وإدارة ديناميكيات المجموعات والتصميم التعليمي الرشيق.',
        en: 'Polishing advanced skills, managing group dynamics, and agile design.',
        fr: 'Perfectionnement des compétences avancées et design agile.',
      },
      badge: 'L2',
      modules: empowermentModules,
    },
    consolidation: {
      id: 'consolidation',
      title: { ar: 'المستوى الثالث: مستوى التمتين والاعتماد', en: 'Level 3: Consolidation & Accreditation', fr: 'Niveau 3: Renforcement' },
      desc: {
        ar: 'قيادة المؤسسات التدريبية، إدارة الاعتمادات الدولية، وتأليف الحقائب المرجعية.',
        en: 'Leading training institutions, international accreditations, and master authoring.',
        fr: 'Direction des institutions de formation et accréditations internationales.',
      },
      badge: 'L3',
      modules: consolidationModules,
    },
  };

  // 5. Final Exam Questions compilation
  const compiledExamQuestions = [
    {
      q: 'ما هي المعادلة الأساسية التي تميز تعليم الكبار (الأندراغوجيا) عن تعليم الصغار (البيداغوجيا)؟',
      options: [
        'الاعتماد الكلي على التلقين والحفظ الفردي',
        'الانطلاق من خبرة المتدرب، وربط المعرفة بحل مشكلات واقعية فورية',
        'إلغاء التطبيقات العملية والاكتفاء بالنظريات المكتوبة',
        'عدم استخدام أي وسائل سمعية وبصرية في القاعة',
      ],
      ans: 1,
      hint: 'ترتكز على الخبرة السابقة والحاجة العملية للراشد.',
      explanation: 'الكبار يتعلمون بفاعلية عندما تنطلق المعرفة من واقعهم العملي وتساعدهم في حل مشكلات قائمة.',
    },
    {
      q: 'وفق نموذج محرابيان، ما النسبة التقريبية لتأثير لغة الجسد والحركات في إيصال المشاعر والرسالة التدريبية؟',
      options: ['7%', '38%', '55%', '85%'],
      ans: 2,
      hint: 'لغة الجسد تشكل أكثر من نصف التأثير في التواصل الشخصي.',
      explanation: 'قاعدة محرابيان الشهيرة: 7% للكلمات، 38% للنبرة الصوتية، و55% للغة الجسد والتعابير.',
    },
    {
      q: 'ما هو الترتيب الصحيح للمراحل الخمس في نموذج التصميم التعليمي الكلاسيكي ADDIE؟',
      options: [
        'التحليل، التصميم، التطوير، التنفيذ، والتقييم',
        'التصميم، التطوير، التحليل، التقييم، والتنفيذ',
        'التنفيذ، التحليل، التصميم، التقييم، والتطوير',
        'التطوير، التقييم، التصميم، التحليل، والتنفيذ',
      ],
      ans: 0,
      hint: 'يبدأ بحرف A (Analysis) وينتهي بـ E (Evaluation).',
      explanation: 'نموذج ADDIE يتكون من: Analysis -> Design -> Development -> Implementation -> Evaluation.',
    },
    {
      q: 'ما الفارق الجوهري بين التلعيب (Gamification) واللعب التعليمي الكامل (Serious Games)؟',
      options: [
        'التلعيب يوظف آليات اللعبة (نقاط، شارات، تصدر) في سياق تدريبي جاد دون بناء لعبة كاملة',
        'التلعيب مخصص للأطفال فقط والألعاب الجادة للكبار',
        'لا يوجد أي فرق بينهما وهما مصطلحان متطابقان',
        'الألعاب الجادة لا تتضمن أي أهداف تعليمية مسبقة',
      ],
      ans: 0,
      explanation: 'التلعيب يستعير ميكانيكا الألعاب لتحفيز السلوك في سياق حقيقي، بينما الألعاب الجادة هي لعبة مكتملة بذاتها.',
    },
    {
      q: 'في المستوى الرابع من نموذج كيركباتريك (Kirkpatrick Level 4)، ما الذي يتم قياسه وتقييمه؟',
      options: [
        'رد فعل المتدربين وانطباعهم الأولي',
        'مقدار المعرفة المكتسبة في الاختبار النظري',
        'التغير السلوكي في بيئة العمل اليومية',
        'النتائج المؤسسية الملموسة وأثر التدريب على أهداف العمل ومؤشرات الأداء',
      ],
      ans: 3,
      hint: 'يركز على النتائج النهائية للأعمال (Business Results).',
      explanation: 'المستوى الرابع يقيس النتائج المؤسسية، وقد أضاف فيليبس المستوى الخامس لحساب العائد المالي (ROI).',
    },
  ];

  // 6. Return the Complete Track Definition
  return {
    id: 'tot-foundation',
    slug: 'tot-foundation',
    specializationKey: 'tot',
    badge: 'TOT/P-F',
    title: {
      ar: 'المسار التأصيلي الشامل لتدريب المدربين (TOTF126)',
      en: 'Comprehensive Foundational TOT Program (TOTF126)',
      fr: 'Programme Fondamental Complet de FdF (TOTF126)',
    },
    subtitle: {
      ar: 'المسار التأصيلي لبناء المدرب المحترف من الصفر وفق المعايير الدولية',
      en: 'The Foundational Pathway to Master Professional Training from Scratch',
      fr: 'Le parcours fondamental pour devenir formateur professionnel',
    },
    desc: {
      ar: 'نقطة انطلاقك نحو احتراف التدريب. يقدم لك هذا البرنامج الأسس العلمية والمهارات التطبيقية لبناء حضور مؤثر وتصميم حقائب تدريبية متكاملة تتوافق مع أحدث المعايير العالمية من التأسيس إلى التمكين ثم التمتين.',
      en: 'Your starting point towards professional training. This program provides you with the scientific foundations and practical skills to build an influential presence and engineer comprehensive training packages from foundation to enablement and mastery.',
      fr: 'Votre point de départ vers la formation professionnelle. Ce programme vous fournit les bases scientifiques et les compétences pratiques.',
    },
    summary: {
      ar: 'رحلة تدريبية وتأصيلية متكاملة لإعداد وتأهيل المدربين المحترفين ونقل المعارف من التأسيس إلى التمكين ثم التمتين، بقيادة نخبة من كبار المستشارين والمدربين المعتمدين دولياً.',
      en: 'A comprehensive foundational journey to qualify professional trainers, advancing from foundation to enablement and mastery.',
      fr: 'Un parcours fondamental complet pour qualifier les formateurs professionnels, de la fondation à la maîtrise.',
    },
    category: {
      ar: 'قسم تدريب المدربين / الأساسيات والتأهيل',
      en: 'Train the Trainer / Fundamentals & Qualification',
      fr: 'Formation des Formateurs / Fondamentaux',
    },
    categoryBadgeText: {
      ar: 'تدريب المدربين والتأهيل الأكاديمي',
      en: 'TOT Academic Qualification',
      fr: 'Formation des Formateurs',
    },
    durationHours: 60,
    totalLessonsCount: 288,
    status: 'published',
    isAvailable: true,
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    introVideoId: '3K-Wx5q7ExA',
    mode: {
      ar: 'عن بعد (مع ورشات تطبيقية)',
      en: 'Remote (with applied workshops)',
      fr: 'À distance (avec ateliers pratiques)',
    },
    modeKey: 'remote',
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
        ar: 'خبير دولي في هندسة البرامج التدريبية وتأهيل المدربين المحترفين، بخبرة تفوق 15 عاماً في تدريب الآلاف في الوطن العربي وأوروبا.',
        en: 'International expert in training program engineering with over 15 years of master trainer experience.',
      },
    },
    trainers: [
      {
        id: 'tr-belkheiri',
        name: {
          ar: 'د. عبد الكريم بلخيري',
          en: 'Dr. Abdelkrim Belkheiri',
          fr: 'Dr. Abdelkrim Belkheiri',
        },
        role: {
          ar: 'كبير المستشارين وأستاذ التدريب الدولي',
          en: 'Senior Advisor & Master Trainer',
          fr: 'Conseiller Principal',
        },
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        isLead: true,
      },
      {
        id: 'tr-mansouri',
        name: {
          ar: 'د. كمال منصوري',
          en: 'Dr. Kamel Mansouri',
          fr: 'Dr. Kamel Mansouri',
        },
        role: {
          ar: 'استشاري التيسير وهندسة الحقائب',
          en: 'Facilitation & Courseware Consultant',
          fr: 'Consultant Ingénierie Pédagogique',
        },
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      },
      {
        id: 'tr-elarbi',
        name: {
          ar: 'د. سمية العربي',
          en: 'Dr. Soumaya El Arbi',
          fr: 'Dr. Soumaya El Arbi',
        },
        role: {
          ar: 'خبيرة القياس وتقييم الأثر التدريبي',
          en: 'Measurement & Training Impact Expert',
          fr: 'Experte Mesure d Impact',
        },
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      },
    ],
    levels,
    finalExam: {
      title: {
        ar: 'امتحان نهاية المسار التأصيلي الشامل (TOTF126)',
        en: 'Comprehensive Final Pathway Exam (TOTF126)',
        fr: 'Examen Final Complet du Parcours (TOTF126)',
      },
      passingScore: 75,
      timeMinutes: 45,
      questions: compiledExamQuestions,
    },
    confirmationBanner: {
      enabled: true,
      title: {
        ar: 'تأكيد التسجيل في المسار التأصيلي الشامل (TOTF126)',
        en: 'Confirm Registration in Comprehensive Pathway (TOTF126)',
      },
      noticeText: {
        ar: 'اختيارك لهذا المسار والتسجيل فيه يقتضي الالتزام بالإكمال فيه، حيث سيتم تقييمك لامتحانك النهائي ومنحك الشهادة بناءً على هذا المسار. لا ينصح بأداء الامتحان النهائي إلا بعد تأكيد التسجيل.',
        en: 'Enrolling in this pathway requires commitment to complete all modules and quizzes before the final certification exam.',
      },
      features: [
        { ar: 'دخول دائم لكافة المقاييس والدروس والتحديثات', en: 'Lifetime access to all modules and lessons' },
        { ar: 'اختبارات تقييمية مع تغذية راجعة فورية وتعليل علمي', en: 'Formative assessments with immediate scientific feedback' },
        { ar: 'استجوابات شفوية وتطبيقية مع فريق التحرير الأكاديمي', en: 'Oral and applied evaluations with academic faculty' },
        { ar: 'شهادة إتمام معتمدة وكود تحقق رقمي رسمي', en: 'Accredited certificate with verifiable credential code' },
      ],
      whatsappNumber: '+213555000000',
      whatsappMessage: {
        ar: 'مرحباً، أود متابعة وتأكيد تسجيلي في المسار التأصيلي الشامل لتدريب المدربين (TOTF126).',
        en: 'Hello, I would like to follow up on my enrollment in TOTF126.',
      },
      badge: 'TOTF126-VERIFIED',
    },
    backMetrics: {
      foundation: [
        'معمارية التعلم',
        'التيسير الكاريزمي',
        'الهندسة التعليمية',
        'الابتكار البيداغوجي',
        'التحول الرقمي',
        'تحليلات الأثر',
        'الحوكمة الاستراتيجية',
        'العلامة الشخصية للمدرب',
      ],
      empowerment: [
        'ديناميكيات المجموعات المتقدمة وإدارة الصراعات',
        'التصميم التعليمي الرشيق (Agile & SAM)',
        'الكوتشينج والتوجيه في التدريب',
        'التيسير البصري والمحاكاة المتقدمة',
        'تصميم تجارب التعلم المدمج',
        'علم الأعصاب الإدراكي للمدربين',
        'تسويق الخدمات وبناء النماذج الربحية',
        'قياس العائد على الاستثمار المعمق',
      ],
      consolidation: [
        'إدارة وتأسيس الأكاديميات التدريبية',
        'هندسة التعلم والتطوير المؤسسي (L&D)',
        'الكوتشينج التنفيذي والقيادي',
        'الاعتمادات الدولية وضمان الجودة',
        'المناهج المبنية على الكفاءات',
        'قيادة التحول الرقمي المتقدم',
        'اقتصاديات المعرفة والملكية الفكرية',
        'البحث العلمي والابتكار البيداغوجي',
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Saves or seeds the complete comprehensive track directly into the Firebase Firestore database.
 */
export async function seedComprehensiveTrackToFirestore(): Promise<{
  success: boolean;
  track: TrackDefinition;
  error?: string;
}> {
  const track = buildComprehensiveTotTrack();

  if (!db) {
    return {
      success: false,
      track,
      error: 'قاعدة بيانات Firebase غير مهيأة أو غير متصلة حالياً.',
    };
  }

  try {
    const docRef = doc(db, 'tracks', track.id);
    await setDoc(docRef, track, { merge: true });
    return {
      success: true,
      track,
    };
  } catch (err: any) {
    console.error('Error seeding comprehensive track to Firestore:', err);
    return {
      success: false,
      track,
      error: err?.message || 'حدث خطأ أثناء حفظ المسار في Firestore.',
    };
  }
}
