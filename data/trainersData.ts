export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
}

export interface LocalizedArray {
  ar: string[];
  en: string[];
  fr: string[];
}

export interface TrainerItem {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  image: string;
  country: string;
  languages: string[];
  birth: string;
  email: string;
  phone: string;
  bio: LocalizedString;
  certificates: LocalizedArray;
  training: LocalizedArray;
  academic: LocalizedArray;
  activities: LocalizedArray;
  profile: string;
}

export interface TrainerCategory {
  key: string;
  icon: string;
  color: string;
  name: LocalizedString;
  trainers: TrainerItem[];
}

export const coreI18n = {
  ar: {
    top_signup: "التسجيل",
    nav_classrooms: "الأقسام التعلمية",
    nav_tracks: "المدربون",
    logo_text: "مدربي الأكاديمية / TOT<span class='highlight'>Academy</span>",
    hero_badge: "🎓 خبرات تصنع الأثر",
    hero_title: "تعرّف على <span>مدربينا</span>... شركاء نجاحك المهني",
    hero_desc: "نخبة من مدربي المدربين والخبراء والمستشارين، يجمعون بين المعرفة العميقة والخبرة الميدانية لصناعة تجارب تدريبية مؤثرة.",
    stat_total: "مدربون وخبراء",
    stat_multi: "متعددو التخصصات",
    stat_tech: "تكنولوجيا وتسويق",
    stat_media: "إعلام واتصال",
    stat_consulting: "تدريب واستشارات",
    scroll_cue: "استعرض المدربين",
    section_eyebrow: "دليل الخبراء",
    section_title: "مدربونا حسب التخصص والخبرة",
    section_desc: "ابحث وصنّف المدربين حسب مجال التخصص، لغة التدريب، أو بلد الإقامة، ثم افتح بطاقة المدرب للتعرف على سيرته ومهاراته ونشاطاته.",
    filter_category_label: "تصنيف المدرب",
    filter_language_label: "لغة التدريب",
    filter_country_label: "الدولة",
    filter_search_label: "البحث",
    filter_all_categories: "كل التصنيفات",
    filter_all_languages: "كل اللغات",
    filter_all_countries: "كل الدول",
    filter_search_placeholder: "ابحث عن اسم المدرب أو صفته...",
    filters_reset: "↺ إعادة تعيين الفلاتر",
    no_results: "لا يوجد مدربون مطابقون لخيارات البحث الحالية.",
    trainer_count_suffix: "مدربين",
    trainer_word: "المدرب",
    meet_trainer: "تعرّف على المدرب",
    tab_profile: "المدرب",
    tab_skills: "مهاراته",
    tab_activities: "نشاطاته",
    profile_cta: "اطلع على حساب المدرب",
    close_aria: "رجوع",
    label_name: "الاسم واللقب",
    label_birth: "تاريخ الميلاد",
    label_email: "الإيميل",
    label_phone: "رقم الهاتف / واتساب",
    label_country: "الدولة",
    label_languages: "لغات التدريب",
    label_certificates: "الشهادات",
    label_training_skills: "المهارات التدريبية",
    label_academic_skills: "المهارات العلمية",
    label_language_skills: "المهارات اللغوية",
    footer_desc: "أكاديمية متخصصة في تدريب المدربين وبناء المسارات المهنية عالية الجودة.",
    footer_links_title: "روابط هامة",
    footer_contact_title: "تواصل معنا",
    footer_phones: "أرقام الهاتف:",
    footer_address: "شارع العقيد بوقرة، عمارة رقم 13، الأبيار الجزائر العاصمة",
    footer_newsletter_title: "النشرة البريدية",
    footer_newsletter_desc: "اشترك لتصلك دعوات المؤتمرات والندوات",
    footer_copy1: "أكاديمية تدريب المدربين -- استثمر شغفك واصنع الأثر . جميع الحقوق محفوظة",
    footer_copy2: "تصميم وتطوير الأستاذ بلال عويش",
    bottom_nav_home: "الرئيسية",
    bottom_nav_sections: "المدربون",
    bottom_nav_library: "المكتبة",
    bottom_nav_schedule: "المواعيد",
    bottom_nav_videos: "الفيديوهات",
    bottom_nav_news: "الأخبار"
  },
  en: {
    top_signup: "Sign Up",
    nav_classrooms: "Classrooms",
    nav_tracks: "Trainers",
    logo_text: "TOT<span class='highlight'>Academy / Trainers</span>",
    hero_badge: "🎓 Expertise that makes an impact",
    hero_title: "Meet <span>Our Trainers</span>... partners in your professional success",
    hero_desc: "An elite network of master trainers, experts, and consultants combining deep knowledge with field experience to create impactful learning experiences.",
    stat_total: "Trainers & experts",
    stat_multi: "Multidisciplinary",
    stat_tech: "Technology & marketing",
    stat_media: "Media & communication",
    stat_consulting: "Training & consulting",
    scroll_cue: "Explore Trainers",
    section_eyebrow: "Expert Directory",
    section_title: "Our Trainers by Specialty and Expertise",
    section_desc: "Find and filter trainers by specialty, training language, or country, then open a profile to discover their biography, skills, and activities.",
    filter_category_label: "Trainer Category",
    filter_language_label: "Training Language",
    filter_country_label: "Country",
    filter_search_label: "Search",
    filter_all_categories: "All Categories",
    filter_all_languages: "All Languages",
    filter_all_countries: "All Countries",
    filter_search_placeholder: "Search trainer name or role...",
    filters_reset: "↺ Reset Filters",
    no_results: "No trainers match the current filters.",
    trainer_count_suffix: "trainers",
    trainer_word: "Trainer",
    meet_trainer: "Meet the Trainer",
    tab_profile: "Profile",
    tab_skills: "Skills",
    tab_activities: "Activities",
    profile_cta: "View Trainer Profile",
    close_aria: "Back",
    label_name: "Full Name",
    label_birth: "Date of Birth",
    label_email: "Email",
    label_phone: "Phone / WhatsApp",
    label_country: "Country",
    label_languages: "Training Languages",
    label_certificates: "Certifications",
    label_training_skills: "Training Skills",
    label_academic_skills: "Academic Skills",
    label_language_skills: "Language Skills",
    footer_desc: "An academy specialized in training trainers and building high-quality professional tracks.",
    footer_links_title: "Important Links",
    footer_contact_title: "Contact Us",
    footer_phones: "Phone Numbers:",
    footer_address: "Col. Bougara St, Bldg 13, El Biar, Algiers",
    footer_newsletter_title: "Newsletter",
    footer_newsletter_desc: "Subscribe to receive conference and seminar invitations",
    footer_copy1: "TOT Academy -- Invest your passion and make an impact. All rights reserved",
    footer_copy2: "Designed & Developed by Prof. Bilal Aouiche",
    bottom_nav_home: "Home",
    bottom_nav_sections: "Trainers",
    bottom_nav_library: "Library",
    bottom_nav_schedule: "Schedule",
    bottom_nav_videos: "Videos",
    bottom_nav_news: "News"
  },
  fr: {
    top_signup: "S'inscrire",
    nav_classrooms: "Salles de formation",
    nav_tracks: "Formateurs",
    logo_text: "TOT<span class='highlight'>Academy / Formateurs</span>",
    hero_badge: "🎓 Une expertise qui crée de l'impact",
    hero_title: "Découvrez <span>nos formateurs</span>... partenaires de votre réussite professionnelle",
    hero_desc: "Un réseau d'élite de maîtres-formateurs, experts et consultants réunissant connaissances approfondies et expérience de terrain pour créer des formations à fort impact.",
    stat_total: "Formateurs & experts",
    stat_multi: "Multidisciplinaires",
    stat_tech: "Technologie & marketing",
    stat_media: "Médias & communication",
    stat_consulting: "Formation & conseil",
    scroll_cue: "Explorer les formateurs",
    section_eyebrow: "Annuaire des experts",
    section_title: "Nos formateurs par spécialité et expertise",
    section_desc: "Recherchez et filtrez les formateurs par spécialité, langue de formation ou pays, puis ouvrez leur profil pour découvrir leur parcours, leurs compétences et leurs activités.",
    filter_category_label: "Catégorie",
    filter_language_label: "Langue de formation",
    filter_country_label: "Pays",
    filter_search_label: "Recherche",
    filter_all_categories: "Toutes les catégories",
    filter_all_languages: "Toutes les langues",
    filter_all_countries: "Tous les pays",
    filter_search_placeholder: "Rechercher un nom ou une fonction...",
    filters_reset: "↺ Réinitialiser les filtres",
    no_results: "Aucun formateur ne correspond aux filtres actuels.",
    trainer_count_suffix: "formateurs",
    trainer_word: "Formateur",
    meet_trainer: "Découvrir le formateur",
    tab_profile: "Profil",
    tab_skills: "Compétences",
    tab_activities: "Activités",
    profile_cta: "Voir le profil du formateur",
    close_aria: "Retour",
    label_name: "Nom complet",
    label_birth: "Date de naissance",
    label_email: "E-mail",
    label_phone: "Téléphone / WhatsApp",
    label_country: "Pays",
    label_languages: "Langues de formation",
    label_certificates: "Certifications",
    label_training_skills: "Compétences pédagogiques",
    label_academic_skills: "Compétences scientifiques",
    label_language_skills: "Compétences linguistiques",
    footer_desc: "Une académie spécialisée dans la formation des formateurs et la création de parcours professionnels de haute qualité.",
    footer_links_title: "Liens importants",
    footer_contact_title: "Contactez-nous",
    footer_phones: "Téléphones :",
    footer_address: "Rue Col. Bougara, Bât 13, El Biar, Alger",
    footer_newsletter_title: "Newsletter",
    footer_newsletter_desc: "Abonnez-vous pour recevoir nos invitations",
    footer_copy1: "TOT Academy -- Investissez votre passion et créez l'impact. Tous droits réservés",
    footer_copy2: "Conçu & développé par Prof. Bilal Aouiche",
    bottom_nav_home: "Accueil",
    bottom_nav_sections: "Formateurs",
    bottom_nav_library: "Bibliothèque",
    bottom_nav_schedule: "Agenda",
    bottom_nav_videos: "Vidéos",
    bottom_nav_news: "Actualités"
  }
};

export const LANGUAGES: Record<string, LocalizedString> = {
  ar: { ar: "العربية", en: "Arabic", fr: "Arabe" },
  fr: { ar: "الفرنسية", en: "French", fr: "Français" },
  en: { ar: "الإنجليزية", en: "English", fr: "Anglais" }
};

export const COUNTRIES: Record<string, LocalizedString> = {
  dz: { ar: "الجزائر", en: "Algeria", fr: "Algérie" },
  tn: { ar: "تونس", en: "Tunisia", fr: "Tunisie" },
  ma: { ar: "المغرب", en: "Morocco", fr: "Maroc" },
  fr: { ar: "فرنسا", en: "France", fr: "France" },
  ca: { ar: "كندا", en: "Canada", fr: "Canada" }
};

export const CATEGORIES: TrainerCategory[] = [
  {
    key: "tech",
    icon: "🌐",
    color: "#1152cf",
    name: {
      ar: "مدربو مدربين متعددو التخصصات",
      en: "Multidisciplinary Master Trainers",
      fr: "Maîtres-formateurs multidisciplinaires"
    },
    trainers: [
      {
        id: "bilal-aouiche",
        name: { ar: "الدكتور بلال عويش", en: "Dr. Bilal Aouiche", fr: "Dr Bilal Aouiche" },
        role: {
          ar: "كبير مدربي المدربين ومستشار تطوير الأكاديميات",
          en: "Senior Master Trainer & Academy Development Consultant",
          fr: "Maître-formateur principal et consultant en développement d'académies"
        },
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr", "en"],
        birth: "1985-04-18",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "خبير في هندسة التكوين وبناء قدرات المدربين، يقود برامج احترافية تجمع بين منهجيات التعلم الحديثة والتحول الرقمي وقيادة المؤسسات التدريبية.",
          en: "An expert in learning architecture and trainer capability building, leading professional programs that combine modern learning methods, digital transformation, and training organization leadership.",
          fr: "Expert en ingénierie de formation et développement des formateurs, il dirige des programmes alliant pédagogies modernes, transformation numérique et pilotage d'organismes de formation."
        },
        certificates: {
          ar: ["دكتوراه في علوم التربية", "مدرب دولي معتمد", "مستشار جودة التدريب"],
          en: ["PhD in Education Sciences", "Certified International Trainer", "Training Quality Consultant"],
          fr: ["Doctorat en sciences de l'éducation", "Formateur international certifié", "Consultant qualité en formation"]
        },
        training: {
          ar: ["هندسة البرامج", "تدريب المدربين", "قيادة ورش العمل"],
          en: ["Program Design", "Train-the-Trainer", "Workshop Leadership"],
          fr: ["Ingénierie de programmes", "Formation de formateurs", "Animation d'ateliers"]
        },
        academic: {
          ar: ["البحث التربوي", "التحول الرقمي", "قياس الأثر"],
          en: ["Educational Research", "Digital Transformation", "Impact Measurement"],
          fr: ["Recherche pédagogique", "Transformation numérique", "Mesure d'impact"]
        },
        activities: {
          ar: [
            "إطلاق برامج تدريب مدربين إقليمية",
            "تصميم أكاديميات مؤسسية متكاملة",
            "الإشراف على ملتقيات جودة التدريب"
          ],
          en: [
            "Launched regional master-trainer programs",
            "Designed integrated corporate academies",
            "Led training-quality forums"
          ],
          fr: [
            "Lancement de programmes régionaux de maîtres-formateurs",
            "Conception d'académies d'entreprise intégrées",
            "Pilotage de forums sur la qualité de la formation"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "leila-ben-omar",
        name: { ar: "الدكتورة ليلى بن عمر", en: "Dr. Leila Ben Omar", fr: "Dr Leila Ben Omar" },
        role: {
          ar: "مدربة مدربين وخبيرة في التعلم المؤسسي",
          en: "Master Trainer & Corporate Learning Expert",
          fr: "Maître-formatrice et experte en apprentissage organisationnel"
        },
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=88",
        country: "tn",
        languages: ["ar", "fr", "en"],
        birth: "1987-09-12",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "متخصصة في بناء منظومات التعلم المؤسسي وتصميم الرحلات التدريبية المتمحورة حول المتعلم، بخبرة واسعة في تطوير القيادات والفرق.",
          en: "Specialized in corporate learning ecosystems and learner-centered journeys, with extensive experience in leadership and team development.",
          fr: "Spécialiste des écosystèmes d'apprentissage organisationnel et des parcours centrés sur l'apprenant, avec une solide expérience en développement des leaders et des équipes."
        },
        certificates: {
          ar: ["دكتوراه في إدارة الموارد البشرية", "اعتماد تصميم خبرات التعلم", "ممارس كوتشينغ تنفيذي"],
          en: ["PhD in Human Resources Management", "Learning Experience Design Certification", "Executive Coaching Practitioner"],
          fr: ["Doctorat en gestion des ressources humaines", "Certification en design d'expérience d'apprentissage", "Praticienne en coaching exécutif"]
        },
        training: {
          ar: ["التيسير المتقدم", "التعلم المؤسسي", "تطوير القيادات"],
          en: ["Advanced Facilitation", "Corporate Learning", "Leadership Development"],
          fr: ["Facilitation avancée", "Apprentissage organisationnel", "Développement du leadership"]
        },
        academic: {
          ar: ["السلوك التنظيمي", "إدارة المواهب", "القيادة"],
          en: ["Organizational Behavior", "Talent Management", "Leadership"],
          fr: ["Comportement organisationnel", "Gestion des talents", "Leadership"]
        },
        activities: {
          ar: [
            "بناء أكاديمية قيادات لشركة إقليمية",
            "تطوير حقائب تدريبية لمديري الفرق",
            "إدارة برامج كوتشينغ جماعي"
          ],
          en: [
            "Built a leadership academy for a regional company",
            "Developed team-manager learning kits",
            "Managed group-coaching programs"
          ],
          fr: [
            "Création d'une académie de leadership régionale",
            "Développement de kits pour managers",
            "Pilotage de programmes de coaching collectif"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "adel-belhadj",
        name: { ar: "الأستاذ عادل بلحاج", en: "Adel Belhadj", fr: "Adel Belhadj" },
        role: {
          ar: "مدرب مدربين وخبير في الابتكار التعليمي",
          en: "Master Trainer & Learning Innovation Expert",
          fr: "Maître-formateur et expert en innovation pédagogique"
        },
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=88",
        country: "ma",
        languages: ["ar", "fr"],
        birth: "1989-02-03",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "يصمم تجارب تعلم تفاعلية ويوظف الابتكار والتفكير التصميمي لتحويل المحتوى المعقد إلى رحلات تدريبية عملية وجذابة.",
          en: "Designs interactive learning experiences and uses innovation and design thinking to transform complex content into practical, engaging training journeys.",
          fr: "Conçoit des expériences d'apprentissage interactives et mobilise l'innovation et le design thinking pour transformer les contenus complexes en parcours pratiques et engageants."
        },
        certificates: {
          ar: ["ماجستير في تقنيات التعليم", "مدرب تفكير تصميمي", "اعتماد التعلم القائم على المشاريع"],
          en: ["Master's in Learning Technologies", "Design Thinking Trainer", "Project-Based Learning Certification"],
          fr: ["Master en technologies éducatives", "Formateur en design thinking", "Certification apprentissage par projet"]
        },
        training: {
          ar: ["التعلم النشط", "تصميم الألعاب التدريبية", "التيسير الإبداعي"],
          en: ["Active Learning", "Training Game Design", "Creative Facilitation"],
          fr: ["Apprentissage actif", "Conception de jeux pédagogiques", "Facilitation créative"]
        },
        academic: {
          ar: ["تقنيات التعليم", "التفكير التصميمي", "الابتكار"],
          en: ["Learning Technologies", "Design Thinking", "Innovation"],
          fr: ["Technologies éducatives", "Design thinking", "Innovation"]
        },
        activities: {
          ar: [
            "تصميم مختبر ابتكار تدريبي",
            "إنتاج ألعاب تعليمية للمؤسسات",
            "تأطير هاكاثونات تعليمية"
          ],
          en: [
            "Designed a training innovation lab",
            "Produced educational games for organizations",
            "Mentored learning hackathons"
          ],
          fr: [
            "Conception d'un laboratoire d'innovation pédagogique",
            "Production de jeux éducatifs",
            "Encadrement de hackathons d'apprentissage"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      }
    ]
  },
  {
    key: "marketing",
    icon: "🚀",
    color: "#d5803b",
    name: {
      ar: "مدربو مدربين متخصصون في التكنولوجيا والتسويق",
      en: "Master Trainers in Technology & Marketing",
      fr: "Maîtres-formateurs en technologie et marketing"
    },
    trainers: [
      {
        id: "karim-zerrougui",
        name: { ar: "المهندس كريم زروقي", en: "Karim Zerrougui", fr: "Karim Zerrougui" },
        role: {
          ar: "مدرب تقنيات الذكاء الاصطناعي والتحول الرقمي",
          en: "AI Technologies & Digital Transformation Trainer",
          fr: "Formateur en IA et transformation numérique"
        },
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr", "en"],
        birth: "1990-11-24",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "مهندس ومدرب يبسّط تقنيات الذكاء الاصطناعي والأتمتة، ويساعد المدربين والمؤسسات على توظيف الأدوات الرقمية بكفاءة ومسؤولية.",
          en: "An engineer and trainer who simplifies AI and automation, helping trainers and organizations use digital tools efficiently and responsibly.",
          fr: "Ingénieur et formateur, il simplifie l'IA et l'automatisation et accompagne les formateurs et organisations dans un usage efficace et responsable du numérique."
        },
        certificates: {
          ar: ["مهندس نظم معلومات", "مدرب ذكاء اصطناعي معتمد", "اعتماد أتمتة العمليات"],
          en: ["Information Systems Engineer", "Certified AI Trainer", "Process Automation Certification"],
          fr: ["Ingénieur systèmes d'information", "Formateur IA certifié", "Certification en automatisation des processus"]
        },
        training: {
          ar: ["تبسيط التقنية", "المختبرات التطبيقية", "التدريب الرقمي"],
          en: ["Technology Simplification", "Hands-on Labs", "Digital Training"],
          fr: ["Vulgarisation technologique", "Laboratoires pratiques", "Formation numérique"]
        },
        academic: {
          ar: ["الذكاء الاصطناعي", "الأتمتة", "تحليل النظم"],
          en: ["Artificial Intelligence", "Automation", "Systems Analysis"],
          fr: ["Intelligence artificielle", "Automatisation", "Analyse des systèmes"]
        },
        activities: {
          ar: [
            "تدريب فرق على أدوات الذكاء التوليدي",
            "بناء حلول أتمتة للعمليات",
            "تقديم مختبرات تحول رقمي"
          ],
          en: [
            "Trained teams on generative AI tools",
            "Built process-automation solutions",
            "Delivered digital-transformation labs"
          ],
          fr: [
            "Formation d'équipes aux outils d'IA générative",
            "Création de solutions d'automatisation",
            "Animation de laboratoires de transformation numérique"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "nour-salhi",
        name: { ar: "الأستاذة نور الهدى صالحي", en: "Nour El Houda Salhi", fr: "Nour El Houda Salhi" },
        role: {
          ar: "مدربة تسويق رقمي وبناء العلامات",
          en: "Digital Marketing & Brand Building Trainer",
          fr: "Formatrice en marketing digital et stratégie de marque"
        },
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr"],
        birth: "1992-06-16",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "متخصصة في بناء الاستراتيجيات الرقمية والعلامات المؤثرة، تجمع بين التحليل الإبداعي، صناعة المحتوى، وقياس الأداء التسويقي.",
          en: "Specialized in digital strategy and impactful brands, combining creative analysis, content production, and marketing performance measurement.",
          fr: "Spécialiste des stratégies numériques et des marques à impact, elle combine analyse créative, création de contenu et mesure de la performance marketing."
        },
        certificates: {
          ar: ["ماجستير تسويق", "اعتماد إعلانات رقمية", "استراتيجية العلامة التجارية"],
          en: ["Master's in Marketing", "Digital Advertising Certification", "Brand Strategy Certification"],
          fr: ["Master en marketing", "Certification publicité numérique", "Certification stratégie de marque"]
        },
        training: {
          ar: ["تصميم الحملات", "ورش صناعة المحتوى", "تحليل الأداء"],
          en: ["Campaign Design", "Content Workshops", "Performance Analysis"],
          fr: ["Conception de campagnes", "Ateliers de contenu", "Analyse de performance"]
        },
        academic: {
          ar: ["سلوك المستهلك", "التسويق الرقمي", "إدارة العلامات"],
          en: ["Consumer Behavior", "Digital Marketing", "Brand Management"],
          fr: ["Comportement du consommateur", "Marketing digital", "Gestion de marque"]
        },
        activities: {
          ar: [
            "إدارة حملات إطلاق منتجات",
            "تكوين فرق التسويق بالمحتوى",
            "تطوير استراتيجيات علامات ناشئة"
          ],
          en: [
            "Managed product-launch campaigns",
            "Trained content-marketing teams",
            "Developed startup brand strategies"
          ],
          fr: [
            "Pilotage de campagnes de lancement",
            "Formation d'équipes en marketing de contenu",
            "Développement de stratégies de marque pour startups"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "ahmed-bencheikh",
        name: { ar: "المهندس أحمد بن الشيخ", en: "Ahmed Bencheikh", fr: "Ahmed Bencheikh" },
        role: {
          ar: "خبير تدريب في البيانات وذكاء الأعمال",
          en: "Training Expert in Data & Business Intelligence",
          fr: "Expert-formateur en données et business intelligence"
        },
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr", "en"],
        birth: "1988-12-08",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "يحوّل البيانات إلى قصص وقرارات قابلة للتنفيذ، ويقدم برامج عملية في التحليل، لوحات القيادة، وذكاء الأعمال للمدربين والمؤسسات.",
          en: "Transforms data into actionable stories and decisions, delivering practical programs in analytics, dashboards, and business intelligence.",
          fr: "Transforme les données en récits et décisions actionnables et anime des programmes pratiques en analyse, tableaux de bord et business intelligence."
        },
        certificates: {
          ar: ["مهندس بيانات", "محلل BI معتمد", "اعتماد تصور البيانات"],
          en: ["Data Engineer", "Certified BI Analyst", "Data Visualization Certification"],
          fr: ["Ingénieur data", "Analyste BI certifié", "Certification visualisation de données"]
        },
        training: {
          ar: ["التعلم بالمشاريع", "مختبرات البيانات", "تفسير المؤشرات"],
          en: ["Project-Based Learning", "Data Labs", "KPI Interpretation"],
          fr: ["Apprentissage par projet", "Laboratoires de données", "Interprétation des KPI"]
        },
        academic: {
          ar: ["تحليل البيانات", "ذكاء الأعمال", "الإحصاء التطبيقي"],
          en: ["Data Analytics", "Business Intelligence", "Applied Statistics"],
          fr: ["Analyse de données", "Business intelligence", "Statistiques appliquées"]
        },
        activities: {
          ar: [
            "بناء لوحات قيادة تنفيذية",
            "تدريب محللين مبتدئين",
            "تصميم تحديات بيانات تطبيقية"
          ],
          en: [
            "Built executive dashboards",
            "Trained junior analysts",
            "Designed applied data challenges"
          ],
          fr: [
            "Création de tableaux de bord exécutifs",
            "Formation d'analystes juniors",
            "Conception de défis data appliqués"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      }
    ]
  },
  {
    key: "media",
    icon: "🎙️",
    color: "#e56458",
    name: {
      ar: "مدربون متخصصون في الإعلام والاتصال",
      en: "Trainers in Media & Communication",
      fr: "Formateurs en médias et communication"
    },
    trainers: [
      {
        id: "sara-merabet",
        name: { ar: "الأستاذة سارة مرابط", en: "Sara Merabet", fr: "Sara Merabet" },
        role: {
          ar: "مدربة إعلام رقمي واتصال مؤسسي",
          en: "Digital Media & Corporate Communication Trainer",
          fr: "Formatrice en médias numériques et communication institutionnelle"
        },
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr", "en"],
        birth: "1991-03-27",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "صحفية ومدربة اتصال تساعد المؤسسات وصناع المحتوى على تطوير رسائل موثوقة، قصص مؤثرة، واستراتيجيات حضور رقمي احترافية.",
          en: "A journalist and communication trainer helping organizations and creators develop trusted messages, compelling stories, and professional digital presence strategies.",
          fr: "Journaliste et formatrice en communication, elle accompagne organisations et créateurs dans la production de messages fiables, de récits percutants et de stratégies numériques professionnelles."
        },
        certificates: {
          ar: ["ماجستير إعلام واتصال", "اعتماد صحافة رقمية", "مدربة اتصال أزمات"],
          en: ["Master's in Media & Communication", "Digital Journalism Certification", "Crisis Communication Trainer"],
          fr: ["Master en médias et communication", "Certification journalisme numérique", "Formatrice en communication de crise"]
        },
        training: {
          ar: ["السرد القصصي", "التدريب الإعلامي", "إدارة المقابلات"],
          en: ["Storytelling", "Media Training", "Interview Management"],
          fr: ["Storytelling", "Media training", "Conduite d'entretiens"]
        },
        academic: {
          ar: ["الإعلام الرقمي", "الاتصال المؤسسي", "أخلاقيات النشر"],
          en: ["Digital Media", "Corporate Communication", "Publishing Ethics"],
          fr: ["Médias numériques", "Communication institutionnelle", "Éthique de publication"]
        },
        activities: {
          ar: [
            "تأطير غرف أخبار رقمية",
            "تدريب متحدثين رسميين",
            "إنتاج أدلة اتصال مؤسسي"
          ],
          en: [
            "Mentored digital newsrooms",
            "Trained spokespersons",
            "Produced corporate communication guides"
          ],
          fr: [
            "Encadrement de rédactions numériques",
            "Formation de porte-parole",
            "Production de guides de communication institutionnelle"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "youcef-hamdi",
        name: { ar: "الأستاذ يوسف حمدي", en: "Youcef Hamdi", fr: "Youcef Hamdi" },
        role: {
          ar: "مدرب صناعة المحتوى والتقديم الاحترافي",
          en: "Content Production & Professional Presentation Trainer",
          fr: "Formateur en création de contenu et présentation professionnelle"
        },
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=88",
        country: "dz",
        languages: ["ar", "fr"],
        birth: "1993-07-11",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "مدرب ومقدم يركز على الحضور أمام الكاميرا، بناء المحتوى المرئي، وتقنيات الإلقاء التي تمنح المدربين رسائل أكثر وضوحاً وتأثيراً.",
          en: "A trainer and presenter focused on camera presence, visual content creation, and delivery techniques that make training messages clearer and more impactful.",
          fr: "Formateur et présentateur spécialisé dans la présence caméra, la création de contenu visuel et les techniques de prise de parole qui renforcent l'impact pédagogique."
        },
        certificates: {
          ar: ["إجازة في السمعي البصري", "اعتماد تقديم تلفزيوني", "مدرب صناعة محتوى"],
          en: ["Degree in Audiovisual Media", "TV Presentation Certification", "Content Creation Trainer"],
          fr: ["Licence en audiovisuel", "Certification présentation TV", "Formateur en création de contenu"]
        },
        training: {
          ar: ["الإلقاء", "الحضور أمام الكاميرا", "تصميم الفيديو التعليمي"],
          en: ["Public Speaking", "Camera Presence", "Educational Video Design"],
          fr: ["Prise de parole", "Présence caméra", "Conception de vidéos pédagogiques"]
        },
        academic: {
          ar: ["الإنتاج السمعي البصري", "الإخراج", "تحرير المحتوى"],
          en: ["Audiovisual Production", "Directing", "Content Editing"],
          fr: ["Production audiovisuelle", "Réalisation", "Édition de contenu"]
        },
        activities: {
          ar: [
            "إنتاج سلاسل تعليمية مصورة",
            "تدريب مقدمي البرامج",
            "إدارة ورش الإلقاء والتأثير"
          ],
          en: [
            "Produced educational video series",
            "Trained program hosts",
            "Led speaking and influence workshops"
          ],
          fr: [
            "Production de séries vidéo éducatives",
            "Formation de présentateurs",
            "Animation d'ateliers de prise de parole et d'influence"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      }
    ]
  },
  {
    key: "creativity",
    icon: "🧭",
    color: "#8b5cf6",
    name: {
      ar: "خبراء التدريب والاستشارات وتطوير المؤسسات",
      en: "Training, Consulting & Organization Development Experts",
      fr: "Experts en formation, conseil et développement des organisations"
    },
    trainers: [
      {
        id: "lina-bouziane",
        name: { ar: "الدكتورة لينة بوزيان", en: "Dr. Lina Bouziane", fr: "Dr Lina Bouziane" },
        role: {
          ar: "مستشارة تدريب وتطوير الكفاءات",
          en: "Training & Competency Development Consultant",
          fr: "Consultante en formation et développement des compétences"
        },
        image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=88",
        country: "fr",
        languages: ["ar", "fr", "en"],
        birth: "1986-01-30",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "ترافق المؤسسات في تشخيص الاحتياجات وبناء أطر الكفاءات ومسارات التطوير، مع تركيز على قياس أثر التدريب وربطه بالأداء.",
          en: "Supports organizations in needs analysis, competency frameworks, and development pathways, with a focus on measuring training impact and linking it to performance.",
          fr: "Accompagne les organisations dans l'analyse des besoins, les référentiels de compétences et les parcours de développement, avec un accent sur la mesure d'impact et la performance."
        },
        certificates: {
          ar: ["دكتوراه في علم النفس التنظيمي", "مستشارة إدارة مواهب", "اعتماد تقييم الكفاءات"],
          en: ["PhD in Organizational Psychology", "Talent Management Consultant", "Competency Assessment Certification"],
          fr: ["Doctorat en psychologie organisationnelle", "Consultante en gestion des talents", "Certification évaluation des compétences"]
        },
        training: {
          ar: ["تحليل الاحتياجات", "تقييم الأثر", "تصميم مسارات التطوير"],
          en: ["Needs Analysis", "Impact Evaluation", "Development Path Design"],
          fr: ["Analyse des besoins", "Évaluation d'impact", "Conception de parcours de développement"]
        },
        academic: {
          ar: ["علم النفس التنظيمي", "نماذج الكفاءات", "تحليل الأداء"],
          en: ["Organizational Psychology", "Competency Models", "Performance Analysis"],
          fr: ["Psychologie organisationnelle", "Modèles de compétences", "Analyse de performance"]
        },
        activities: {
          ar: [
            "بناء أطر كفاءات لمؤسسات كبرى",
            "تنفيذ دراسات أثر التدريب",
            "تصميم خطط تطوير المواهب"
          ],
          en: [
            "Built competency frameworks for major organizations",
            "Conducted training impact studies",
            "Designed talent-development plans"
          ],
          fr: [
            "Création de référentiels de compétences",
            "Réalisation d'études d'impact",
            "Conception de plans de développement des talents"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      },
      {
        id: "imane-touati",
        name: { ar: "الأستاذة إيمان تواتي", en: "Imane Touati", fr: "Imane Touati" },
        role: {
          ar: "خبيرة تدريب في القيادة وإدارة المشاريع",
          en: "Leadership & Project Management Training Expert",
          fr: "Experte-formatrice en leadership et gestion de projet"
        },
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=88",
        country: "ca",
        languages: ["ar", "fr", "en"],
        birth: "1990-05-22",
        email: "bbillel87@gmail.com",
        phone: "+213555989370",
        bio: {
          ar: "تقدم برامج تطبيقية في القيادة الرشيقة وإدارة المشاريع والعمل الجماعي، وتساعد المتدربين على تحويل الخطط إلى نتائج قابلة للقياس.",
          en: "Delivers applied programs in agile leadership, project management, and teamwork, helping learners turn plans into measurable results.",
          fr: "Anime des programmes appliqués en leadership agile, gestion de projet et travail d'équipe, afin de transformer les plans en résultats mesurables."
        },
        certificates: {
          ar: ["ماجستير إدارة مشاريع", "اعتماد إدارة مشاريع احترافية", "مدربة قيادة رشيقة"],
          en: ["Master's in Project Management", "Professional Project Management Certification", "Agile Leadership Trainer"],
          fr: ["Master en gestion de projet", "Certification professionnelle en gestion de projet", "Formatrice en leadership agile"]
        },
        training: {
          ar: ["المحاكاة الإدارية", "دراسات الحالة", "كوتشينغ الفرق"],
          en: ["Management Simulations", "Case Studies", "Team Coaching"],
          fr: ["Simulations managériales", "Études de cas", "Coaching d'équipes"]
        },
        academic: {
          ar: ["إدارة المشاريع", "القيادة الرشيقة", "إدارة المخاطر"],
          en: ["Project Management", "Agile Leadership", "Risk Management"],
          fr: ["Gestion de projet", "Leadership agile", "Gestion des risques"]
        },
        activities: {
          ar: [
            "قيادة برامج تطوير مديري المشاريع",
            "تيسير معسكرات قيادة رشيقة",
            "استشارة فرق تحول مؤسسي"
          ],
          en: [
            "Led project-manager development programs",
            "Facilitated agile leadership bootcamps",
            "Consulted organizational transformation teams"
          ],
          fr: [
            "Pilotage de programmes pour chefs de projet",
            "Animation de bootcamps en leadership agile",
            "Conseil auprès d'équipes de transformation"
          ]
        },
        profile: "https://sites.google.com/view/totacademya/hello"
      }
    ]
  }
];

export function getAllTrainers(): { trainer: TrainerItem; category: TrainerCategory }[] {
  return CATEGORIES.reduce<{ trainer: TrainerItem; category: TrainerCategory }[]>(
    (list, cat) => list.concat(cat.trainers.map((tr) => ({ trainer: tr, category: cat }))),
    []
  );
}
