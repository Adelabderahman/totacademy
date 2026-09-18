export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
  [key: string]: string;
}

export interface ModernCourse {
  gradient: string;
  image: string;
  bannerClassroom: LocalizedString;
  bannerCategory: LocalizedString;
  cardLabelBeginner: LocalizedString;
  cardLabelOnline: LocalizedString;
  title: LocalizedString;
  duration: LocalizedString;
  level: LocalizedString;
  price: LocalizedString;
  seeClassroomBtn: LocalizedString;
}

export interface Trainer {
  isJoinCard?: boolean;
  name: LocalizedString;
  role: LocalizedString;
  gradient: string;
  video?: string;
  avatar?: string;
  btn?: LocalizedString;
  image?: string;
}

export interface RegistrationPortal {
  title: LocalizedString;
  desc: LocalizedString;
  image: string;
}

export interface CertificateItem {
  code: string;
  title: LocalizedString;
  desc: LocalizedString;
  image: string;
}

export interface PartnerItem {
  name: LocalizedString;
  logo: string;
  image: string;
}

export interface FAQItem {
  q: LocalizedString;
  a: LocalizedString;
}

export const coreI18n: Record<string, Record<string, string>> = {
  ar: {
    logo_text: "برنامج تدريب المدربين",
    top_signup: "التسجيل",
    nav_classrooms: "الأقسام التعلمية",
    nav_workshops: "ورش العمل",
    nav_bootcamps: "المعسكرات",
    nav_diplomas: "شهادات معتمدة",
    hero_subtitle: "انضم إلى أكثر من 10,000 موهبة تم تكوينها",
    hero_title: "استثمر شغفك ...واصنع الأثر",
    hero_desc: "وداعاً للنظريات التي لا تنتهي، حان وقت التطبيق. كن مدرباً محترفاً واحصل على وظيفة أحلامك. حياتك الجديدة تبدأ من هنا.",
    btn_contact: "تواصل مع مستشار",
    btn_catalog: "تصفح الكتالوج",
    read_more: "المزيد",
    learn_more: "تعرف على المزيد",
    vmo_section_title: "هويتنا المعرفية",
    part1_main_title: "برنامج تدريب المدربين - الأساسيات",
    part1_main_desc: "برنامج متكامل لتأسيس المدربين المحترفين وفق المعايير العالمية.",
    part2_main_title: "برامج تدريب المدربين للمتخصصين",
    part2_main_desc: "برامج متقدمة مصممة خصيصاً للمدربين ذوي الخبرة لتعميق تخصصاتهم في مجالات دقيقة ومطلوبة في السوق.",
    part3_main_title: "نخبة المدربين والمرافقين",
    part3_main_desc: "تعرف على خبرائنا المتخصصين الذين يرافقونك خطوة بخطوة نحو تحقيق أهدافك المهنية والتدريبية بنجاح واحترافية.",
    part4_main_title: "بوابات التسجيل في الأكاديمية",
    part4_main_desc: "من أي باب دخلت .. ستبدأ في استثمار شغفك وصناعة الأثر الخالد",
    part5_main_title: "الاعتمادات والشهادات الأكاديمية",
    part5_main_desc: "توّج مسيرتك بشهادات معتمدة محلياً ودولياً، تفتح لك آفاقاً جديدة في عالم التدريب الاحترافي.",
    part6_main_title: "شركاء النجاح",
    part6_main_desc: "نعتز بشراكاتنا الاستراتيجية مع كبرى المؤسسات لتوفير أفضل تجربة تدريبية.",
    part7_main_title: "الأسئلة الشائعة",
    part7_main_desc: "كل ما تحتاجه من إجابات في مكان واحد",
    advisor_title: "تواصل مع مستشارك الآن",
    advisor_desc: "متواجدون على مدار الساعة 24/7 للإجابة على كافة استفساراتك وتوجيهك نحو البرنامج الأنسب لك.",
    btn_contact_advisor: "تحدث مع المستشار",
    btn_faq_more: "التفاصيل كاملة",
    btn_learn_more: "تعرف على المزيد",
    btn_join_team: "انضم لفريقنا من المدربين.",
    trainer_profile: "الملف الشخصي",
    reg_btn: "سجل واستثمر شغفك",
    coming_soon: "بوابة واعدة عن قريب",
    btn_get_cert: "احصل على الشهادة",
    btn_more_certs: "المزيد من الشهادات",
    about_intro: "لأن كل شغف يحمل في طياته بذرة لإرث عظيم، وُلدت <span class='highlight-text'>TOT ACADEMY</span> لتكون الحاضنة الأولى لكل من يمتلك مهارة متوقدة ورغبة صادقة في إحداث الأثر. نحن نؤمن بأن المعرفة تزداد بالبذل، ولذا نسعى لتحويل مواهبك الخام إلى مشاريع معرفية مربحة ومستدامة، من خلال إتقان فن <span class='highlight-text'>\"كيف تُعلّم\"</span>. نحن لا نكتفي بنقل النظريات، بل نمضي معك في رحلة متكاملة نحو التميز المهني.",
    mission_title: "الرسالة",
    mission_text: "تحويل الشغف والخبرات الفردية إلى مهنة تدريبية احترافية، من خلال بيئة حاضنة تضمن الاعتماد الموثوق والمتابعة الحثيثة لبلوغ ذروة النجاح والتأثير.",
    vision_title: "الرؤية",
    vision_text: "إضاءة سماء المعرفة عبر هندسة وتمكين مليون مدرب ملهم خلال العقد القادم، ليكونوا صناعاً للتغيير وقادة في مجتمعاتهم.",
    objectives_title: "الأهداف",
    objectives_text: "استثمار المهارات في مشاريع تدريبية مربحة، منح اعتمادات مهنية رصينة، وتوفير فرص حقيقية تضمن الانطلاقة القوية مع التوجيه المستمر.",
    footer_desc: "أكاديمية تدريبية رائدة تسعى لخلق بيئة تعليمية محفزة تنمي المهارات الاحترافية والإبداعية، وتدعم مسيرة التدريب وصناعة الأثر في الجزائر والعالم العربي.",
    footer_links_title: "روابط هامة",
    footer_contact_title: "تواصل معنا",
    footer_phones: "أرقام الهاتف:",
    footer_address: "شارع العقيد بوقرة، عمارة رقم 13، الأبيار الجزائر العاصمة",
    footer_newsletter_title: "النشرة البريدية",
    footer_newsletter_desc: "اشترك لتصلك دعوات المؤتمرات والندوات",
    nl_placeholder: "البريد الإلكتروني",
    footer_copy1: "أكاديمية تدريب المدربين -- استثمر شغفك واصنع الأثر . جميع الحقوق محفوظة",
    footer_copy2: "تصميم وتطوير الأستاذ بلال عويش",
    bottom_nav_home: "الرئيسية",
    bottom_nav_sections: "الأقسام",
    bottom_nav_library: "المكتبة",
    bottom_nav_schedule: "المواعيد",
    bottom_nav_videos: "الفيديوهات",
    bottom_nav_news: "الأخبار"
  },
  en: {
    logo_text: "TOT<span class='highlight'>Academy</span>",
    top_signup: "Sign Up",
    nav_classrooms: "Classrooms",
    nav_workshops: "Workshops",
    nav_bootcamps: "Bootcamps",
    nav_diplomas: "Diplomas",
    hero_subtitle: "Join +10,000 trained talents",
    hero_title: "Invest your passion... and make an impact",
    hero_desc: "No more endless theory, it's time for practice. Become a professional trainer and land your dream job.",
    btn_contact: "Contact an Advisor",
    btn_catalog: "Explore catalog",
    read_more: "More",
    learn_more: "Learn more",
    vmo_section_title: "Our Cognitive Identity",
    part1_main_title: "Train the Trainer - Fundamentals",
    part1_main_desc: "A comprehensive program to establish professional trainers.",
    part2_main_title: "TOT Programs for Specialists",
    part2_main_desc: "Advanced programs for experienced trainers to deepen their specializations in niche areas.",
    part3_main_title: "Elite Trainers & Coaches",
    part3_main_desc: "Meet our specialized experts who will guide you step by step to achieve your professional and training goals successfully.",
    part4_main_title: "Academy Registration Portals",
    part4_main_desc: "Whichever door you enter... you will begin investing your passion and making a lasting impact.",
    part5_main_title: "Academy Accreditations & Certificates",
    part5_main_desc: "Crown your journey with locally and internationally accredited certificates, opening new horizons.",
    part6_main_title: "Our Partners",
    part6_main_desc: "We value our strategic partnerships with major institutions to provide the best training experience.",
    part7_main_title: "Frequently Asked Questions",
    part7_main_desc: "All the answers you need in one place",
    advisor_title: "Talk to your advisor now",
    advisor_desc: "We are available 24/7 to answer all your inquiries and guide you to the right program.",
    btn_contact_advisor: "Contact Advisor",
    btn_faq_more: "Full Details",
    btn_learn_more: "Learn More",
    btn_join_team: "Join our team of trainers.",
    trainer_profile: "View Profile",
    reg_btn: "Register & Invest Your Passion",
    coming_soon: "Promising portal coming soon",
    btn_get_cert: "Get the Certificate",
    btn_more_certs: "More Certificates",
    about_intro: "Because every passion holds the seed of a monumental legacy, <span class='highlight-text'>TOT ACADEMY</span> was founded to be the ultimate incubator for anyone possessing a vibrant skill and a genuine desire to make an impact. We strive to transform your raw talents into profitable, sustainable ventures by mastering the art of <span class='highlight-text'>\"how to teach.\"</span> We walk alongside you on a comprehensive journey toward professional excellence.",
    mission_title: "Mission",
    mission_text: "Transforming your passion into a professional training career through a nurturing ecosystem providing reliable accreditation and steadfast mentorship.",
    vision_title: "Vision",
    vision_text: "Empowering one million inspiring trainers over the next decade to be catalysts for change and leaders of development in their communities.",
    objectives_title: "Objectives",
    objectives_text: "Capitalize on skills for profit, award credible professional accreditations, and secure genuine opportunities with continuous strategic guidance.",
    footer_desc: "A leading training academy striving to create a stimulating educational environment that develops professional and creative skills, supporting the training journey locally and globally.",
    footer_links_title: "Important Links",
    footer_contact_title: "Contact Us",
    footer_phones: "Phone Numbers:",
    footer_address: "Col. Bougara St, Bldg 13, El Biar, Algiers",
    footer_newsletter_title: "Newsletter",
    footer_newsletter_desc: "Subscribe to receive conference and seminar invitations",
    nl_placeholder: "Email Address",
    footer_copy1: "TOT Academy -- Invest your passion and make an impact. All rights reserved",
    footer_copy2: "Designed & Developed by Prof. Bilal Aouiche",
    bottom_nav_home: "Home",
    bottom_nav_sections: "Sections",
    bottom_nav_library: "Library",
    bottom_nav_schedule: "Schedule",
    bottom_nav_videos: "Videos",
    bottom_nav_news: "News"
  },
  fr: {
    logo_text: "TOT<span class='highlight'>Academy</span>",
    top_signup: "S'inscrire",
    nav_classrooms: "Classrooms",
    nav_workshops: "Workshops",
    nav_bootcamps: "Bootcamps",
    nav_diplomas: "Diplômes",
    hero_subtitle: "Rejoignez +10 000 talents formés",
    hero_title: "Investissez votre passion... et créez l'impact",
    hero_desc: "Fini la théorie sans fin, place à la pratique. Devenez un formateur professionnel et décrochez le poste de vos rêves.",
    btn_contact: "Contacter un conseiller",
    btn_catalog: "Explorer le catalogue",
    read_more: "Plus",
    learn_more: "En savoir plus",
    vmo_section_title: "Notre Identité Cognitive",
    part1_main_title: "Formation des Formateurs - Les Fondamentaux",
    part1_main_desc: "Un programme complet pour établir des formateurs professionnels.",
    part2_main_title: "Programmes TOT pour Spécialistes",
    part2_main_desc: "Programmes avancés pour les formateurs expérimentés afin d'approfondir leurs spécialisations.",
    part3_main_title: "L'Élite des Formateurs & Coachs",
    part3_main_desc: "Rencontrez nos experts qui vous guideront pas à pas pour atteindre vos objectifs professionnels avec succès et professionnalisme.",
    part4_main_title: "Portails d'inscription de l'Académie",
    part4_main_desc: "Quelle que soit la porte par laquelle vous entrez... vous commencerez à investir votre passion et à créer un impact durable.",
    part5_main_title: "Accréditations & Certificats de l'Académie",
    part5_main_desc: "Couronnez votre parcours avec des certificats accrédités localement et internationalement, vous ouvrant de nouveaux horizons.",
    part6_main_title: "Nos Partenaires",
    part6_main_desc: "Nous valorisons nos partenariats stratégiques pour offrir la meilleure expérience de formation.",
    part7_main_title: "Foire Aux Questions",
    part7_main_desc: "Toutes les réponses dont vous avez besoin au même endroit",
    advisor_title: "Parlez à votre conseiller",
    advisor_desc: "Nous sommes disponibles 24/7 pour répondre à toutes vos questions et vous guider.",
    btn_contact_advisor: "Contacter le conseiller",
    btn_faq_more: "Voir plus",
    btn_learn_more: "En savoir plus",
    btn_join_team: "Rejoignez notre équipe de formateurs.",
    trainer_profile: "Voir Profil",
    reg_btn: "Inscrivez-vous & Investissez",
    coming_soon: "Portail prometteur à venir",
    btn_get_cert: "Obtenir le Certificat",
    btn_more_certs: "Plus de Certificats",
    about_intro: "Parce que chaque passion porte la promesse d'un héritage grandiose, la <span class='highlight-text'>TOT ACADEMY</span> est née pour être le tremplin par excellence de tous ceux qui possèdent un talent ardent. Nous nous engageons à transformer vos talents bruts en projets rentables, en maîtrisant l'art de <span class='highlight-text'>\"savoir transmettre\"</span>. Nous vous accompagnons dans un voyage holistique vers l'excellence.",
    mission_title: "Mission",
    mission_text: "Transformer vos passions en une profession hautement qualifiée grâce à un écosystème offrant une accréditation rigoureuse et un mentorat continu.",
    vision_title: "Vision",
    vision_text: "Former un million de formateurs inspirants d'ici dix ans pour qu'ils deviennent les architectes du changement dans leurs communautés.",
    objectives_title: "Objectifs",
    objectives_text: "Rentabiliser vos compétences, délivrer des accréditations solides et garantir de réelles opportunités avec un suivi stratégique.",
    footer_desc: "Une académie de formation de premier plan s'efforçant de créer un environnement éducatif stimulant pour développer les compétences professionnelles et créatives au niveau local et mondial.",
    footer_links_title: "Liens Importants",
    footer_contact_title: "Contactez-nous",
    footer_phones: "Téléphones:",
    footer_address: "Rue Col. Bougara, Bât 13, El Biar, Alger",
    footer_newsletter_title: "Newsletter",
    footer_newsletter_desc: "Abonnez-vous pour recevoir nos invitations",
    nl_placeholder: "Adresse Email",
    footer_copy1: "TOT Academy -- Investissez votre passion et créez l'impact. Tous droits réservés",
    footer_copy2: "Conçu & Développé par Prof. Bilal Aouiche",
    bottom_nav_home: "Accueil",
    bottom_nav_sections: "Sections",
    bottom_nav_library: "Bibliothèque",
    bottom_nav_schedule: "Agenda",
    bottom_nav_videos: "Vidéos",
    bottom_nav_news: "Actualités"
  }
};

export const FAQ_FULL_ANSWERS: Record<string, string[]> = {
  ar: [
    'البرنامج التأسيسي مصمم لبناء الأساس المهني للمدرب، ويجمع بين المفاهيم الأساسية والتطبيق العملي. تمتد الرحلة عادة من 3 إلى 4 أسابيع بحسب الجدول التدريبي، مع جلسات تساعد المتدرب على تحويل المعرفة إلى ممارسة فعلية.',
    'نعم، ترتبط الشهادات بالبرامج واجتياز متطلباتها، وتصدر وفق الإطار المعتمد للأكاديمية والشركاء المعنيين. وللتأكد من تفاصيل الاعتماد الخاصة بكل برنامج، يمكن الرجوع إلى بيانات البرنامج عند التسجيل.',
    'نوفر خيارات دفع مرنة بحسب البرنامج المتاح. الهدف هو تسهيل الالتحاق بالتكوين دون الإخلال بشروط التسجيل أو مواعيد الاستحقاق، ويمكن للمستشار توضيح الخيارات المتاحة قبل التسجيل.',
    'نعم، يمكن متابعة البرامج عن بعد عندما يكون البرنامج متاحاً بنمط التعليم الافتراضي. تتيح الفصول الافتراضية التفاعل مع المدرب، طرح الأسئلة، ومتابعة الأنشطة من أي مكان مع اتصال مناسب بالإنترنت.',
    'الانضمام إلى برنامج المتخصصين يستهدف من أنهى المسار التأسيسي أو يمتلك خبرة موثقة مناسبة في التدريب. وقد تختلف المتطلبات التفصيلية حسب التخصص والبرنامج المختار.',
    'الدعم لا ينتهي بمجرد انتهاء الجلسات. تهدف الأكاديمية إلى مواصلة توجيه الخريجين ومساعدتهم في تطوير المسار المهني والاستفادة من الخبرة المكتسبة بعد التدريب.',
    'بعد التسجيل وتفعيل الحساب، يتم توجيه المتدرب إلى مساحة البرنامج التي تتضمن المواد والمراجع والأدوات المتاحة له. وتختلف صلاحيات الوصول حسب البرنامج ونوع الاشتراك.',
    'يضم فريق الأكاديمية مدربين وخبراء ذوي خلفيات متنوعة في التدريب والتخصصات المهنية. وتُعرض معلومات المدرب المرتبطة بكل برنامج لمساعدة المتدرب على اختيار المسار الأنسب.',
    'يمكن الانتقال إلى مستوى أعلى وفق شروط البرنامج الجديد. ويتم النظر في المسار السابق وما تم إنجازه عند تحديد طريقة الانتقال والاحتساب.',
    'تخضع عملية الاسترداد والإلغاء لشروط التسجيل الخاصة بالبرنامج. لذلك يُنصح بمراجعة الشروط قبل الدفع، والتواصل مع الأكاديمية عند الحاجة إلى إلغاء أو تعديل التسجيل.'
  ],
  en: [
    'The foundational program is designed to build the professional core for trainers, bridging essential principles and rigorous micro-teaching. The track typically spans 3 to 4 weeks depending on the cohort schedule.',
    'Yes, our credentials are tied to formal performance criteria and awarded through our certified academy network and partner universities, recognized across corporate and educational sectors.',
    'We provide modular, flexible payment schedules depending on the chosen track. Our advisors are on call to guide you through accessible installment plans.',
    'Fully accredited virtual classrooms are available with interactive live streaming, immediate feedback, and downloadable courseware for remote participants.',
    'Specialist tracks require completion of the foundational level or verified professional training portfolio spanning at least two years.',
    'Our mentorship continues 6 months post-graduation, including career coaching, curriculum review, and personal branding guidance.',
    'Upon registration and verification, you receive immediate access to the LMS repository containing comprehensive master decks, worksheets, and assessment rubrics.',
    'Our faculty consists of certified university academics, industry consultants, and master trainers boasting over a decade of real-world impact.',
    'Credit transfers and level advancement pathways allow trainees to fast-track higher credentials without repeating equivalent accredited modules.',
    'Registration fees are refundable up to 5 business days before cohort commencement as per our transparent admissions agreement.'
  ],
  fr: [
    'Le programme fondamental est conçu pour établir la base professionnelle du formateur, alliant théorie rigoureuse et mises en situation réelles sur 3 à 4 semaines.',
    'Oui, nos certifications sont reconnues auprès de grandes institutions partenaires et attestent formellement de vos compétences pédagogiques.',
    'Des facilités de paiement échelonné sont proposées pour permettre à chaque talent d’intégrer nos cursus dans les meilleures conditions.',
    'Nos classes virtuelles interactives offrent une expérience immersive complète avec retours en direct et accès permanent aux enregistrements.',
    'L’admission aux programmes spécialistes nécessite la validation du niveau fondamental ou une expérience attestée d’au moins deux ans en formation.',
    'L’accompagnement se poursuit six mois après l’obtention de la certification grâce à nos ateliers de mentorat et d’insertion professionnelle.',
    'Dès confirmation, vous accédez à votre espace dédié regroupant tous les guides, modèles d’ingénierie et supports pédagogiques.',
    'Nos intervenants sont des praticiens de haut niveau et des universitaires chevronnés avec plus de dix ans d’expérience sur le terrain.',
    'Des passerelles modulaires permettent de valoriser vos acquis préalables pour progresser directement vers les paliers supérieurs.',
    'Les conditions de désistement prévoient un remboursement intégral jusqu’à cinq jours ouvrés avant le lancement officiel de la session.'
  ]
};

export const programsDB = {
  part1: [
    {
      gradient: "linear-gradient(45deg, #FF6B6B, #FFA07A)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      bannerClassroom: { ar: 'أساسيات', en: 'Essentials', fr: 'Essentiels' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'معمارية التعلم', en: 'Architecture of learning', fr: "Architecture de l'apprentissage" },
      duration: { ar: '١٢ سا', en: '12h', fr: '12h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #4facfe, #00f2fe)",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      bannerClassroom: { ar: 'كاريزما', en: 'Charisma', fr: 'Charisme' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'التيسير الكاريزمي', en: 'Charismatic Facilitation', fr: 'Facilitation Charismatique' },
      duration: { ar: '١٢ سا', en: '12h', fr: '12h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #43e97b, #38f9d7)",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80",
      bannerClassroom: { ar: 'هندسة', en: 'Engineering', fr: 'Ingénierie' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الهندسة التعليمية', en: 'Instructional Engineering', fr: 'Ingénierie Pédagogique' },
      duration: { ar: '١٥ سا', en: '15h', fr: '15h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #fa709a, #fee140)",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      bannerClassroom: { ar: 'ابتكار', en: 'Innovation', fr: 'Innovation' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الابتكار البيداغوجي', en: 'Pedagogical Innovation', fr: 'Innovation Pédagogique' },
      duration: { ar: '١٠ سا', en: '10h', fr: '10h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #667eea, #764ba2)",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
      bannerClassroom: { ar: 'رقمي', en: 'Digital', fr: 'Numérique' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'التحول الرقمي', en: 'Digital Transformation', fr: 'Transformation Numérique' },
      duration: { ar: '١٢ سا', en: '12h', fr: '12h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #f77062, #fe5196)",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
      bannerClassroom: { ar: 'تحليلات', en: 'Analytics', fr: 'Analytique' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'تحليلات الأثر', en: 'Impact Analytics', fr: "Analytique d'Impact" },
      duration: { ar: '١٤ سا', en: '14h', fr: '14h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #13547a, #80d0c7)",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80",
      bannerClassroom: { ar: 'حوكمة', en: 'Governance', fr: 'Gouvernance' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الحوكمة الاستراتيجية', en: 'Strategic Governance', fr: 'Gouvernance Stratégique' },
      duration: { ar: '١٢ سا', en: '12h', fr: '12h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    },
    {
      gradient: "linear-gradient(45deg, #ff0844, #ffb199)",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      bannerClassroom: { ar: 'تسويق', en: 'Branding', fr: 'Branding' },
      bannerCategory: { ar: 'برنامج تدريب المدربين', en: 'Train the Trainer', fr: 'Formation des Formateurs' },
      cardLabelBeginner: { ar: 'تأسيس', en: 'Beginner', fr: 'Débutant' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'العلامة الشخصية', en: "Trainer's Branding", fr: 'Branding du Formateur' },
      duration: { ar: '١٠ سا', en: '10h', fr: '10h' },
      level: { ar: 'المستوى: برنامج تدريب المدربين الأساسيات', en: 'Level 1: Train the Trainer Essentials', fr: 'Niveau 1: Les Fondamentaux' },
      price: { ar: 'مجاني', en: 'Free', fr: 'Gratuit' },
      seeClassroomBtn: { ar: 'عرض القاعة', en: 'See classroom', fr: 'Voir la classe' }
    }
  ],
  part2: [
    {
      gradient: "linear-gradient(45deg, #059669, #10b981)",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      bannerClassroom: { ar: 'قيادة', en: 'Leadership', fr: 'Leadership' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'القيادة الاستراتيجية', en: 'Strategic Leadership', fr: 'Leadership Stratégique' },
      duration: { ar: '٢٠ سا', en: '20h', fr: '20h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #0ea5e9, #34d399)",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
      bannerClassroom: { ar: 'ذكاء', en: 'AI & Tech', fr: 'Intelligence' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence', fr: 'Intelligence Artificielle' },
      duration: { ar: '٢٥ سا', en: '25h', fr: '25h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #f59e0b, #fbbf24)",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
      bannerClassroom: { ar: 'أجايل', en: 'Agile', fr: 'Agile' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الإدارة الرشيقة', en: 'Agile Management', fr: 'Gestion Agile' },
      duration: { ar: '١٨ سا', en: '18h', fr: '18h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #8b5cf6, #c084fc)",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      bannerClassroom: { ar: 'موارد', en: 'HR Eng', fr: 'RH' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'هندسة الموارد', en: 'HR Engineering', fr: 'Ingénierie RH' },
      duration: { ar: '١٥ سا', en: '15h', fr: '15h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #ef4444, #f87171)",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      bannerClassroom: { ar: 'تسويق', en: 'Marketing', fr: 'Marketing' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'التسويق الرقمي', en: 'Digital Marketing', fr: 'Marketing Digital' },
      duration: { ar: '٢٢ سا', en: '22h', fr: '22h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #f97316, #fdba74)",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80",
      bannerClassroom: { ar: 'سلامة', en: 'Safety', fr: 'Sécurité' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الصحة والسلامة', en: 'Health & Safety', fr: 'Qualité & Sécurité' },
      duration: { ar: '٢٠ سا', en: '20h', fr: '20h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #14b8a6, #5eead4)",
      image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=400&q=80",
      bannerClassroom: { ar: 'مبيعات', en: 'Sales', fr: 'Ventes' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'المبيعات الاستشارية', en: 'Consultative Sales', fr: 'Ventes Consultatives' },
      duration: { ar: '١٥ سا', en: '15h', fr: '15h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    },
    {
      gradient: "linear-gradient(45deg, #6366f1, #a5b4fc)",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80",
      bannerClassroom: { ar: 'رفاهية', en: 'Wellbeing', fr: 'Bien-être' },
      bannerCategory: { ar: 'للمتخصصين', en: 'For Specialists', fr: 'Spécialistes' },
      cardLabelBeginner: { ar: 'تمكين', en: 'Advanced', fr: 'Avancé' },
      cardLabelOnline: { ar: 'الفصول الافتراضية', en: 'Online classrooms', fr: 'Classes en ligne' },
      title: { ar: 'الرفاهية المؤسسية', en: 'Occupational Wellbeing', fr: 'Bien-être au Travail' },
      duration: { ar: '١٢ سا', en: '12h', fr: '12h' },
      level: { ar: 'المستوى: مدرب متخصص', en: 'Level: Specialist Trainer', fr: 'Niveau: Spécialiste' },
      price: { ar: 'مدفوع', en: 'Premium', fr: 'Premium' },
      seeClassroomBtn: { ar: 'عرض التفاصيل', en: 'View Details', fr: 'Voir Détails' }
    }
  ],
  trainers: [
    {
      name: { ar: 'د. بلال عويش', en: 'Dr. Bilal Aouiche', fr: 'Dr. Bilal Aouiche' },
      role: { ar: 'خبير القيادة الاستراتيجية والتواصل', en: 'Strategic Leadership Expert', fr: 'Expert en Leadership' },
      gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      video: '8G84kPpD4w0',
      avatar: 'https://i.postimg.cc/XqdFTjPn/besnaci.jpg'
    },
    {
      name: { ar: 'أ. ندى', en: 'Nada', fr: 'Nada' },
      role: { ar: 'مدربة تطوير الويب والبرمجيات', en: 'Web Development Coach', fr: 'Coach Développement Web' },
      gradient: 'linear-gradient(135deg, #0575e6 0%, #021b79 100%)',
      video: '8G84kPpD4w0',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: { ar: 'أ. إسماعيل', en: 'Ismail', fr: 'Ismail' },
      role: { ar: 'خبير تحليل البيانات و Power BI', en: 'Data Analyst & Power BI', fr: 'Analyste de données' },
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      video: '8G84kPpD4w0',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    },
    {
      name: { ar: 'أ. عفاف', en: 'Afaf', fr: 'Afaf' },
      role: { ar: 'مهندسة برمجيات وأنظمة متكاملة', en: 'Software Engineer', fr: 'Ingénieur Logiciel' },
      gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
      video: '8G84kPpD4w0',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80'
    },
    {
      isJoinCard: true,
      name: { ar: 'كن أنت المدرب', en: 'Be the Trainer', fr: 'Soyez le Formateur' },
      role: { ar: 'شغفك هو من يحدد من أنت.', en: 'Your passion defines who you are.', fr: 'Votre passion définit qui vous êtes.' },
      btn: { ar: 'انضم لفريقنا', en: 'Join Our Team', fr: 'Rejoignez-nous' },
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
      gradient: 'linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.4))'
    }
  ],
  registration: [
    {
      title: { ar: 'بوابة التسجيل كمتدرب TOT/P-F', en: 'Portal: Trainee TOT/P-F', fr: 'Portail: Stagiaire TOT/P-F' },
      desc: { ar: 'بوابة مخصصة للمبتدئين الراغبين في دخول عالم التدريب من أوسع أبوابه. اكتسب المهارات الأساسية وابدأ رحلتك نحو الاحتراف.', en: 'Portal for beginners wanting to enter the training world. Gain basic skills and start your journey to professionalism.', fr: 'Portail pour débutants souhaitant entrer dans le monde de la formation. Acquérez des compétences de base et commencez.' },
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80'
    },
    {
      title: { ar: 'بوابة التسجيل كمتدرب متخصص TOT/P-P', en: 'Portal: Specialized TOT/P-P', fr: 'Portail: Spécialisé TOT/P-P' },
      desc: { ar: 'مسار متقدم للمدربين ذوي الخبرة الراغبين في تعميق تخصصاتهم وتطوير استراتيجياتهم لتتوافق مع أحدث المعايير العالمية في السوق.', en: 'Advanced track for experienced trainers wanting to deepen their specializations and develop strategies to meet global standards.', fr: 'Parcours avancé pour formateurs expérimentés souhaitant approfondir leurs spécialisations et développer des stratégies mondiales.' },
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80'
    },
    {
      title: { ar: 'بوابة التسجيل كمستفيد / زائر', en: 'Portal: Beneficiary/Visitor', fr: 'Portail: Bénéficiaire/Visiteur' },
      desc: { ar: 'انضم إلى مجتمعنا كمستفيد لتصلك أحدث الإصدارات، المقالات، والدورات المجانية. كن على اطلاع دائم بكل ما هو جديد.', en: 'Join our community as a beneficiary to receive the latest releases, articles, and free courses.', fr: 'Rejoignez notre communauté en tant que bénéficiaire pour recevoir les dernières parutions et des cours gratuits.' },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80'
    },
    {
      title: { ar: 'بوابة التسجيل كمدرب محترف ضمن الطاقم', en: 'Portal: Professional Trainer', fr: 'Portail: Formateur Pro' },
      desc: { ar: 'هل تمتلك الخبرة والشغف؟ سجل الآن لتنضم إلى نخبة مدربي الأكاديمية وساهم في بناء جيل جديد من الكفاءات.', en: 'Do you have the experience and passion? Register now to join our elite academy trainers.', fr: 'Avez-vous de l\'expérience et de la passion ? Inscrivez-vous pour rejoindre nos formateurs d\'élite.' },
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400&q=80'
    },
    {
      title: { ar: 'بوابة الحصول على شهادة الأكاديمية', en: 'Portal: Academy Certificate', fr: 'Portail: Certificat' },
      desc: { ar: 'استمارة مخصصة لمتدربي الأكاديمية لطلب استخراج أو توثيق الشهادات المعتمدة بعد اجتياز البرامج التدريبية بنجاح وتفوق.', en: 'Dedicated form for academy trainees to request or authenticate certified certificates after successfully passing programs.', fr: 'Formulaire dédié aux stagiaires pour demander ou authentifier des certificats après avoir réussi les programmes.' },
      image: 'https://images.unsplash.com/photo-1589330694653-efa647611533?w=400&q=80'
    },
    {
      title: { ar: 'بوابة استمارة ورشة أو معسكر تدريبي', en: 'Portal: Workshop/Bootcamp', fr: 'Portail: Atelier/Bootcamp' },
      desc: { ar: 'احجز مقعدك في ورش العمل التفاعلية والمعسكرات التدريبية المكثفة التي تنظمها الأكاديمية لصقل مهاراتك العملية في وقت قياسي.', en: 'Book your seat in interactive workshops and intensive bootcamps organized to refine your practical skills.', fr: 'Réservez votre place dans des ateliers interactifs et des bootcamps intensifs pour affiner vos compétences.' },
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80'
    },
    {
      title: { ar: 'بوابة دفع الحقوق وتفعيل التسجيل', en: 'Portal: Payment & Activation', fr: 'Portail: Paiement & Activation' },
      desc: { ar: 'البوابة الآمنة لرفع وصولات الدفع وتأكيد اشتراكك في البرامج المدفوعة. خطوتك الأخيرة قبل البدء الفعلي في مسارك.', en: 'Secure portal to upload payment receipts and confirm your subscription to paid programs.', fr: 'Portail sécurisé pour télécharger les reçus de paiement et confirmer votre inscription aux programmes payants.' },
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80'
    }
  ],
  certificates: [
    {
      code: 'TOT/P-F',
      title: { ar: 'شهادة مدرب معتمد', en: 'Certified Trainer', fr: 'Formateur Certifié' },
      desc: { ar: 'شهادة اجتياز البرنامج التأسيسي لتدريب المدربين بنجاح وتفوق.', en: 'Certificate of successful completion of the foundational Train the Trainer program.', fr: 'Certificat de réussite du programme fondamental de formation des formateurs.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    },
    {
      code: 'TOT/P-TT',
      title: { ar: 'شهادة مدرب مدربين معتمد', en: 'Certified Master Trainer', fr: 'Maître Formateur Certifié' },
      desc: { ar: 'شهادة متقدمة تمنح حصرياً للكفاءات القادرة على تكوين أجيال من المدربين الجدد.', en: 'Advanced certificate granted exclusively to those capable of training new generations of trainers.', fr: 'Certificat avancé accordé exclusivement à ceux capables de former de nouvelles générations de formateurs.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    },
    {
      code: 'TOT/P-TS',
      title: { ar: 'شهادة مدرب متخصص معتمد', en: 'Certified Specialized Trainer', fr: 'Formateur Spécialisé Certifié' },
      desc: { ar: 'اعتماد يثبت كفاءتك كمدرب في مجالك الدقيق (إدارة، تقنية، تسويق، وغيرها).', en: 'Accreditation proving your competence as a trainer in your niche field.', fr: 'Accréditation prouvant votre compétence en tant que formateur dans votre domaine spécialisé.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    },
    {
      code: 'WORKSHOPS',
      title: { ar: 'شهادات الورشات والأيام التكوينية', en: 'Workshops & Study Days', fr: 'Ateliers & Journées d\'Étude' },
      desc: { ar: 'شهادات تثبت حضورك وتفاعلك الإيجابي في ورشات العمل والأيام الدراسية التطبيقية.', en: 'Certificates proving your attendance and active participation in practical workshops.', fr: 'Certificats prouvant votre présence et participation active aux ateliers pratiques.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    },
    {
      code: 'CONFERENCES',
      title: { ar: 'شهادات الملتقيات العلمية', en: 'Scientific Conferences', fr: 'Conférences Scientifiques' },
      desc: { ar: 'شهادات المشاركة في المؤتمرات السنوية لتبادل الخبرات وتوسيع شبكة المعارف المهنية.', en: 'Certificates of participation in annual conferences for exchanging expertise and networking.', fr: 'Certificats de participation aux conférences annuelles pour échanger des expertises et réseauter.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    },
    {
      code: 'SOON',
      title: { ar: 'شهادات عن قريب', en: 'Certificates Coming Soon', fr: 'Certificats à venir' },
      desc: { ar: 'نعمل على إضافة المزيد من الاعتمادات والشهادات قريباً لتلبية طموحاتكم في مختلف التخصصات.', en: 'We are working on adding more accreditations and certificates soon to meet your ambitions.', fr: 'Nous travaillons pour ajouter bientôt plus d\'accréditations et de certificats pour répondre à vos ambitions.' },
      image: 'https://i.postimg.cc/pL3qkNrj/TOT.png'
    }
  ],
  partners: [
    {
      name: { ar: 'مركز التعليم المكثف', en: 'Center of Continuing Education', fr: 'Centre de Formation Continue' },
      logo: 'https://ui-avatars.com/api/?name=C+E&background=0b3a96&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'حاضنة الأعمال الجامعية', en: 'University Business Incubator', fr: 'Incubateur d\'Entreprises Universitaire' },
      logo: 'https://ui-avatars.com/api/?name=U+B&background=059669&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'مركز تطوير المقاولاتية', en: 'Entrepreneurship Development Center', fr: 'Centre de Développement de l\'Entrepreneuriat' },
      logo: 'https://ui-avatars.com/api/?name=E+D&background=ffab00&color=000&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'معهد القادة للتدريب', en: 'Leaders Training Institute', fr: 'Institut de Formation des Leaders' },
      logo: 'https://ui-avatars.com/api/?name=L+T&background=1e293b&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'أكاديمية التميز والإبداع', en: 'Excellence & Innovation Academy', fr: 'Académie d\'Excellence et d\'Innovation' },
      logo: 'https://ui-avatars.com/api/?name=E+I&background=e11d48&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'مجمع الابتكار التكنولوجي', en: 'Tech Innovation Hub', fr: 'Pôle d\'Innovation Technologique' },
      logo: 'https://ui-avatars.com/api/?name=T+I&background=0284c7&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'المعهد العالي للتطوير', en: 'Higher Institute for Development', fr: 'Institut Supérieur de Développement' },
      logo: 'https://ui-avatars.com/api/?name=H+I&background=10b981&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'منصة خبراء المستقبل', en: 'Future Experts Platform', fr: 'Plateforme des Experts du Futur' },
      logo: 'https://ui-avatars.com/api/?name=F+E&background=6366f1&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'أكاديمية الرواد العالمية', en: 'Global Pioneers Academy', fr: 'Académie Globale des Pionniers' },
      logo: 'https://ui-avatars.com/api/?name=G+P&background=8b5cf6&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=150&fit=crop'
    },
    {
      name: { ar: 'مركز المهارات المتقدمة', en: 'Advanced Skills Center', fr: 'Centre de Compétences Avancées' },
      logo: 'https://ui-avatars.com/api/?name=A+S&background=ec4899&color=fff&rounded=true&font-size=0.4',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=150&fit=crop'
    }
  ],
  faqs: [
    {
      q: { ar: 'ما هي مدة البرنامج التأسيسي للمدربين؟', en: 'What is the duration of the foundational program?', fr: 'Quelle est la durée du programme fondamental ?' },
      a: { ar: 'تتراوح مدة البرنامج التأسيسي بين 3 إلى 4 أسابيع مقسمة إلى جلسات نظرية وتطبيقية مكثفة لضمان الاستيعاب الكامل.', en: 'The program lasts between 3 to 4 weeks, divided into theoretical and practical sessions.', fr: 'Le programme dure entre 3 et 4 semaines, divisé en sessions théoriques et pratiques.' }
    },
    {
      q: { ar: 'هل الشهادة معتمدة دولياً ومحلياً؟', en: 'Is the certificate accredited internationally?', fr: 'Le certificat est-il accrédité à l\'international ?' },
      a: { ar: 'نعم، نمنح شهادات معتمدة بالتعاون مع كبرى المؤسسات التدريبية، وهي معترف بها في معظم الجهات الوظيفية والأكاديمية.', en: 'Yes, we grant accredited certificates in cooperation with major institutions.', fr: 'Oui, nous accordons des certificats accrédités en coopération avec de grandes institutions.' }
    },
    {
      q: { ar: 'هل تتوفر خطط سداد مرنة أو بالتقسيط؟', en: 'Are there flexible payment plans?', fr: 'Y a-t-il des plans de paiement flexibles ?' },
      a: { ar: 'نعم، إيماناً منا بدعم المهارات، نوفر خطط سداد مريحة تتيح لك الدفع على دفعات خلال فترة التدريب.', en: 'Yes, we offer flexible payment plans allowing you to pay in installments.', fr: 'Oui, nous proposons des plans de paiement flexibles vous permettant de payer en plusieurs fois.' }
    },
    {
      q: { ar: 'هل يمكنني متابعة الدورة التدريبية عن بُعد؟', en: 'Can I attend the course online?', fr: 'Puis-je suivre le cours en ligne ?' },
      a: { ar: 'بالتأكيد، نوفر نظام فصول افتراضية عالي الجودة يتيح لك التفاعل المباشر مع المدربين من أي مكان.', en: 'Absolutely, we provide a high-quality virtual classroom system for online learning.', fr: 'Absolument, nous fournissons un système de classe virtuelle de haute qualité.' }
    },
    {
      q: { ar: 'ما هي شروط الانضمام لبرنامج المتخصصين؟', en: 'What are the prerequisites for the specialized program?', fr: 'Quels sont les prérequis pour le programme spécialisé ?' },
      a: { ar: 'يشترط اجتياز المستوى التأسيسي أو امتلاك خبرة موثقة لا تقل عن سنتين في مجال التدريب والإلقاء.', en: 'Passing the foundational level or having at least 2 years of documented training experience.', fr: 'Avoir réussi le niveau fondamental ou avoir au moins 2 ans d\'expérience documentée.' }
    },
    {
      q: { ar: 'هل تقدمون دعماً ومتابعة بعد انتهاء التدريب؟', en: 'Do you offer post-training support?', fr: 'Offrez-vous un soutien post-formation ?' },
      a: { ar: 'نعم، نبقى على تواصل مع خريجينا لمدة 6 أشهر مع توفير جلسات توجيه مهني وتسويقي مجانية.', en: 'Yes, we stay in touch for 6 months and provide free career and marketing mentoring.', fr: 'Oui, nous restons en contact pendant 6 mois et offrons un mentorat professionnel.' }
    },
    {
      q: { ar: 'كيف يمكنني الوصول إلى الحقيبة التدريبية؟', en: 'How do I access the training materials?', fr: 'Comment accéder au matériel de formation ?' },
      a: { ar: 'بعد التسجيل، يتم منحك حساباً خاصاً على المنصة يتيح لك تحميل كافة المراجع، العروض، وأدوات المدرب.', en: 'Upon registration, you get an account to download all materials and tools.', fr: 'Après l\'inscription, vous obtenez un compte pour télécharger tous les matériaux.' }
    },
    {
      q: { ar: 'ما هي خبرة المدربين في الأكاديمية؟', en: 'What is the experience level of the trainers?', fr: 'Quelle est l\'expérience des formateurs ?' },
      a: { ar: 'نخبة المدربين لدينا هم أساتذة جامعيون وخبراء معتمدون يمتلكون خبرة تتجاوز 10 سنوات في الأسواق المحلية والدولية.', en: 'Our elite trainers are professors and experts with over 10 years of experience.', fr: 'Nos formateurs d\'élite sont des professeurs et experts ayant plus de 10 ans d\'expérience.' }
    },
    {
      q: { ar: 'هل يمكن ترقية اشتراكي لاحقاً إلى برنامج أعلى؟', en: 'Can I upgrade my subscription later?', fr: 'Puis-je mettre à niveau mon abonnement plus tard ?' },
      a: { ar: 'بالطبع، نظام الأكاديمية مرن جداً ويسمح لك بترقية مسارك التدريبي واحتساب ما درسته مسبقاً ضمن ساعات البرنامج الجديد.', en: 'Of course, our flexible system allows you to upgrade your training path easily.', fr: 'Bien sûr, notre système flexible vous permet de mettre à niveau votre parcours facilement.' }
    },
    {
      q: { ar: 'ما هي سياسة الاسترداد وإلغاء التسجيل؟', en: 'What is the refund and cancellation policy?', fr: 'Quelle est la politique de remboursement ?' },
      a: { ar: 'يمكنك استرداد رسوم التسجيل كاملة إذا تم الإلغاء قبل 5 أيام من بدء البرنامج وفقاً للشروط والأحكام الموضحة في الموقع.', en: 'Full refunds are available if canceled 5 days before the program starts.', fr: 'Des remboursements complets sont possibles si annulé 5 jours avant le début du programme.' }
    }
  ]
};
