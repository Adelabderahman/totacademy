export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
}

export interface Trainer {
  name: string;
  img: string;
  url?: string;
}

export interface TrackLevels {
  foundation: LocalizedString[];
  enable: LocalizedString[];
  reinforce: LocalizedString[];
}

export interface TrackLevelsRaw {
  foundation: { ar: string[]; en: string[]; fr: string[] };
  enable: { ar: string[]; en: string[]; fr: string[] };
  reinforce: { ar: string[]; en: string[]; fr: string[] };
}

export interface TrackItem {
  id?: string;
  title: LocalizedString;
  summary: LocalizedString;
  image: string;
  status: LocalizedString;
  statusKey: 'available' | 'completed';
  duration: number;
  mode: LocalizedString;
  modeKey: 'remote' | 'onsite';
  url?: string;
  trainers: Trainer[];
  levels: TrackLevelsRaw;
}

export interface Specialization {
  key: 'tech' | 'marketing' | 'media' | 'creativity';
  icon: string;
  color: string;
  name: LocalizedString;
  tracks: TrackItem[];
}

export const coreI18n: Record<'ar' | 'en' | 'fr', Record<string, string>> = {
  ar: {
    top_signup: "التسجيل",
    nav_classrooms: "الأقسام التعلمية",
    nav_workshops: "ورش العمل",
    nav_bootcamps: "المعسكرات",
    nav_diplomas: "شهادات معتمدة",
    nav_tracks: "المسارات التدريبية",
    logo_text: "التخصصات تدريبية/TOT<span class='highlight'>Academy</span>",
    tracks_orbit_tech: "تكنولوجيا",
    tracks_orbit_marketing: "تسويق",
    tracks_orbit_media: "إعلام واتصال",
    tracks_orbit_creativity: "ابتكار وإبداع",
    tracks_orbit_leadership: "قيادة وتدريب تنفيذي",
    tracks_orbit_ai: "ذكاء اصطناعي",
    tracks_orbit_pedagogy: "تصميم المناهج",
    tracks_orbit_speaking: "خطابة وتأثير",
    tracks_orbit_gamification: "ألعاب وتلعيب",
    tracks_orbit_consulting: "استشارات وبزنس",
    tracks_hero_badge: "🧭 دليلك نحو الاحتراف",
    tracks_hero_title: "اختر <span>مسارك</span>... وابدأ رحلتك التدريبية",
    tracks_hero_desc: "مسارات تدريبية متكاملة موزعة على تخصصات متعددة، تنقلك خطوة بخطوة من التأسيس إلى التمكين فالتمتين، بقيادة نخبة من المدربين المعتمدين.",
    stat_tracks_label: "مسارات تدريبية",
    stat_specs_label: "تخصصات",
    stat_hours_label: "ساعة تدريب لكل مسار",
    stat_trainers_label: "مدربون معتمدون",
    scroll_cue: "استعرض المسارات",
    tracks_eyebrow: "مكتبة المسارات",
    tracks_section_title: "مساراتنا التدريبية حسب التخصص",
    tracks_section_desc: "صفّح المسارات، فلترها حسب التخصص أو المدرب أو نمط التدريب، واضغط على البطاقة لاكتشاف مستوياتها الثلاثة.",
    filter_spec_label: "التخصص",
    filter_trainer_label: "المدرب",
    filter_mode_label: "نمط التدريب",
    filter_search_label: "البحث",
    filter_all_specs: "كل التخصصات",
    filter_all_trainers: "كل المدربين",
    filter_all: "الكل",
    filter_mode_remote: "عن بعد",
    filter_mode_onsite: "حضوري",
    filter_search_placeholder: "ابحث عن اسم المسار...",
    filters_reset: "↺ إعادة تعيين الفلاتر",
    no_results: "لا توجد مسارات مطابقة لبحثك حالياً، جرّب تعديل الفلاتر.",
    spec_tracks_suffix: "مسار تدريبي",
    fc_trainers_label: "المدربون",
    fc_cta: "اطلع على المقاييس والمستويات",
    fc_metrics_title: "المقاييس",
    level_foundation: "تأسيس",
    level_enable: "تمكين",
    level_reinforce: "تمتين",
    fc_back_cta: "بدأ التدريب",
    fc_close_aria: "رجوع",
    start_training_alert: "بدأ التدريب: ",
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
    bottom_nav_sections: "الأقسام",
    bottom_nav_library: "المكتبة",
    bottom_nav_schedule: "المواعيد",
    bottom_nav_videos: "الفيديوهات",
    bottom_nav_news: "الأخبار"
  },
  en: {
    top_signup: "Sign Up",
    nav_classrooms: "Classrooms",
    nav_tracks: "Training Tracks",
    logo_text: "TOT<span class='highlight'>Academy/Training specializations</span>",
    tracks_orbit_tech: "Technology",
    tracks_orbit_marketing: "Marketing",
    tracks_orbit_media: "Media & Communication",
    tracks_orbit_creativity: "Innovation & Creativity",
    tracks_orbit_leadership: "Executive Leadership",
    tracks_orbit_ai: "Artificial Intelligence",
    tracks_orbit_pedagogy: "Instructional Design",
    tracks_orbit_speaking: "Public Speaking",
    tracks_orbit_gamification: "Gamification",
    tracks_orbit_consulting: "Consulting & Business",
    tracks_hero_badge: "🧭 Your guide to mastery",
    tracks_hero_title: "Choose <span>Your Track</span>... and start your training journey",
    tracks_hero_desc: "Comprehensive training tracks across multiple specializations, guiding you step by step from foundation to enablement to reinforcement, led by a team of certified trainers.",
    stat_tracks_label: "Training Tracks",
    stat_specs_label: "Specializations",
    stat_hours_label: "training hours per track",
    stat_trainers_label: "Certified Trainers",
    scroll_cue: "Explore Tracks",
    tracks_eyebrow: "Track Library",
    tracks_section_title: "Our Training Tracks by Specialization",
    tracks_section_desc: "Browse the tracks, filter by specialization, trainer, or training mode, and click a card to discover its three levels.",
    filter_spec_label: "Specialization",
    filter_trainer_label: "Trainer",
    filter_mode_label: "Training Mode",
    filter_search_label: "Search",
    filter_all_specs: "All Specializations",
    filter_all_trainers: "All Trainers",
    filter_all: "All",
    filter_mode_remote: "Remote",
    filter_mode_onsite: "In-person",
    filter_search_placeholder: "Search track name...",
    filters_reset: "↺ Reset Filters",
    no_results: "No tracks match your search. Try adjusting the filters.",
    spec_tracks_suffix: "training tracks",
    fc_trainers_label: "Trainers",
    fc_cta: "View Metrics & Levels",
    fc_metrics_title: "Metrics",
    level_foundation: "Foundation",
    level_enable: "Enablement",
    level_reinforce: "Reinforcement",
    fc_back_cta: "Start Training",
    fc_close_aria: "Close",
    start_training_alert: "Start training: ",
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
    bottom_nav_sections: "Sections",
    bottom_nav_library: "Library",
    bottom_nav_schedule: "Schedule",
    bottom_nav_videos: "Videos",
    bottom_nav_news: "News"
  },
  fr: {
    top_signup: "S'inscrire",
    nav_classrooms: "Classrooms",
    nav_tracks: "Parcours de formation",
    logo_text: "TOT<span class='highlight'>Academy/Spécialisations de formation</span>",
    tracks_orbit_tech: "Technologie",
    tracks_orbit_marketing: "Marketing",
    tracks_orbit_media: "Médias & Communication",
    tracks_orbit_creativity: "Innovation & Créativité",
    tracks_orbit_leadership: "Leadership Exécutif",
    tracks_orbit_ai: "Intelligence Artificielle",
    tracks_orbit_pedagogy: "Ingénierie Pédagogique",
    tracks_orbit_speaking: "Art Oratoire",
    tracks_orbit_gamification: "Ludopédagogie",
    tracks_orbit_consulting: "Conseil & Business",
    tracks_hero_badge: "🧭 Votre guide vers la maîtrise",
    tracks_hero_title: "Choisissez <span>votre parcours</span>... et démarrez votre formation",
    tracks_hero_desc: "Des parcours de formation complets répartis sur plusieurs spécialités, qui vous guident étape par étape de la fondation à l'habilitation puis au renforcement, encadrés par une équipe de formateurs certifiés.",
    stat_tracks_label: "Parcours de formation",
    stat_specs_label: "Spécialités",
    stat_hours_label: "heures de formation par parcours",
    stat_trainers_label: "Formateurs certifiés",
    scroll_cue: "Explorer les parcours",
    tracks_eyebrow: "Bibliothèque des parcours",
    tracks_section_title: "Nos parcours de formation par spécialité",
    tracks_section_desc: "Parcourez les parcours, filtrez par spécialité, formateur ou mode de formation, et cliquez sur une carte pour découvrir ses trois niveaux.",
    filter_spec_label: "Spécialité",
    filter_trainer_label: "Formateur",
    filter_mode_label: "Mode de formation",
    filter_search_label: "Recherche",
    filter_all_specs: "Toutes les spécialités",
    filter_all_trainers: "Tous les formateurs",
    filter_all: "Tous",
    filter_mode_remote: "À distance",
    filter_mode_onsite: "Présentiel",
    filter_search_placeholder: "Rechercher un parcours...",
    filters_reset: "↺ Réinitialiser les filtres",
    no_results: "Aucun parcours ne correspond à votre recherche. Essayez de modifier les filtres.",
    spec_tracks_suffix: "parcours de formation",
    fc_trainers_label: "Formateurs",
    fc_cta: "Découvrir les indicateurs et niveaux",
    fc_metrics_title: "Indicateurs",
    level_foundation: "Fondation",
    level_enable: "Habilitation",
    level_reinforce: "Renforcement",
    fc_back_cta: "Commencer la formation",
    fc_close_aria: "Fermer",
    start_training_alert: "Démarrage de la formation : ",
    footer_desc: "Une académie spécialisée dans la formation des formateurs et la création de parcours professionnels de haute qualité.",
    footer_links_title: "Liens Importants",
    footer_contact_title: "Contactez-nous",
    footer_phones: "Téléphones:",
    footer_address: "Rue Col. Bougara, Bât 13, El Biar, Alger",
    footer_newsletter_title: "Newsletter",
    footer_newsletter_desc: "Abonnez-vous pour recevoir nos invitations",
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

export const TRAINER_NAMES: Record<string, { en: string; fr: string }> = {
  "كريم زروقي": { en: "Karim Zerrougui", fr: "Karim Zerrougui" },
  "نور الهدى صالحي": { en: "Nour El Houda Salhi", fr: "Nour El Houda Salhi" },
  "عادل بلحاج": { en: "Adel Belhadj", fr: "Adel Belhadj" },
  "إيمان تواتي": { en: "Imane Touati", fr: "Imane Touati" },
  "يوسف حمدي": { en: "Youcef Hamdi", fr: "Youcef Hamdi" },
  "أحمد بن الشيخ": { en: "Ahmed Bencheikh", fr: "Ahmed Bencheikh" },
  "لينة بوزيان": { en: "Lina Bouziane", fr: "Lina Bouziane" },
  "سارة مرابط": { en: "Sara Merabet", fr: "Sara Merabet" }
};

export function getTrainerName(nameAr: string, lang: 'ar' | 'en' | 'fr'): string {
  if (lang === 'ar') return nameAr;
  const entry = TRAINER_NAMES[nameAr];
  return (entry && entry[lang]) || nameAr;
}

export const METRIC_ICONS = ['🎯', '📊', '🧩', '🛠️', '📈', '🔍', '💡', '✅'];

export const SPECIALIZATIONS: Specialization[] = [
  {
    key: "tech",
    icon: "💻",
    color: "#1152cf",
    name: { ar: "تكنولوجيا", en: "Technology", fr: "Technologie" },
    tracks: [
      {
        id: "tech-ai",
        title: {
          ar: "مسار تدريب المدربين في الذكاء الاصطناعي التوليدي",
          en: "Trainer Training Track in Generative Artificial Intelligence",
          fr: "Parcours de formation des formateurs en Intelligence artificielle générative"
        },
        summary: {
          ar: "رحلة تدريبية شاملة لاحتراف الذكاء الاصطناعي التوليدي وتطبيقاته في الأتمتة والإبداع والأعمال.",
          en: "A comprehensive training journey to master generative AI and its applications in automation, creativity, and business.",
          fr: "Un parcours de formation complet pour maîtriser l'IA générative et ses applications dans l'automatisation, la créativité et les affaires."
        },
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
        status: { ar: "متاح", en: "Available", fr: "Disponible" },
        statusKey: "available",
        duration: 60,
        mode: { ar: "عن بعد", en: "Remote", fr: "À distance" },
        modeKey: "remote",
        url: "https://wa.me/213555989370?text=GenAI_Track_Enrollment",
        trainers: [
          { name: "كريم زروقي", img: "https://i.pravatar.cc/60?img=22" },
          { name: "نور الهدى صالحي", img: "https://i.pravatar.cc/60?img=44" },
          { name: "عادل بلحاج", img: "https://i.pravatar.cc/60?img=8" },
          { name: "إيمان تواتي", img: "https://i.pravatar.cc/60?img=39" }
        ],
        levels: {
          foundation: {
            ar: ["مفاهيم الذكاء", "هندسة الأوامر", "توليد النصوص", "توليد الصور", "أخلاقيات الاستخدام", "الأتمتة البسيطة", "التعلم الآلي", "التطبيقات اليومية"],
            en: ["AI Concepts", "Prompt Engineering", "Text Generation", "Image Generation", "Usage Ethics", "Basic Automation", "Machine Learning", "Everyday Applications"],
            fr: ["Concepts de l'IA", "Ingénierie des prompts", "Génération de texte", "Génération d'images", "Éthique d'utilisation", "Automatisation simple", "Apprentissage automatique", "Applications quotidiennes"]
          },
          enable: {
            ar: ["الأوامر المتقدمة", "دمج الواجهات (API)", "تحليل البيانات", "تدريب النماذج", "الذكاء التسويقي", "الذكاء التعليمي", "توليد الفيديو", "تحسين الإنتاجية"],
            en: ["Advanced Prompting", "API Integration", "Data Analysis", "Model Training", "Marketing Intelligence", "Educational Intelligence", "Video Generation", "Productivity Optimization"],
            fr: ["Prompts avancés", "Intégration d'API", "Analyse de données", "Entraînement de modèles", "Intelligence marketing", "Intelligence éducative", "Génération de vidéo", "Optimisation de la productivité"]
          },
          reinforce: {
            ar: ["بناء وكلاء الذكاء", "التحول الرقمي", "تصميم مناهج AI", "إدارة المشاريع", "تقييم النماذج", "أمن الذكاء", "ابتكار الحلول", "تقديم الاستشارات"],
            en: ["Building AI Agents", "Digital Transformation", "AI Curriculum Design", "Project Management", "Model Evaluation", "AI Security", "Solution Innovation", "Consulting"],
            fr: ["Création d'agents IA", "Transformation numérique", "Conception de programmes IA", "Gestion de projets", "Évaluation des modèles", "Sécurité de l'IA", "Innovation de solutions", "Conseil"]
          }
        }
      },
      {
        id: "tech-nocode",
        title: {
          ar: "مسار تدريب المدربين في البرمجة بدون كود",
          en: "Trainer Training Track in No-Code Development",
          fr: "Parcours de formation des formateurs en Développement sans code (No-Code)"
        },
        summary: {
          ar: "تعلم بناء تطبيقات وأنظمة متكاملة دون كتابة كود عبر أدوات اللاكود الحديثة.",
          en: "Learn to build integrated apps and systems without writing code, using modern no-code tools.",
          fr: "Apprenez à créer des applications et systèmes intégrés sans écrire de code, grâce aux outils No-Code modernes."
        },
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=80",
        status: { ar: "متاح", en: "Available", fr: "Disponible" },
        statusKey: "available",
        duration: 65,
        mode: { ar: "عن بعد", en: "Remote", fr: "À distance" },
        modeKey: "remote",
        url: "https://wa.me/213555989370?text=NoCode_Track_Enrollment",
        trainers: [
          { name: "يوسف حمدي", img: "https://i.pravatar.cc/60?img=15" },
          { name: "كريم زروقي", img: "https://i.pravatar.cc/60?img=22" },
          { name: "نور الهدى صالحي", img: "https://i.pravatar.cc/60?img=44" },
          { name: "أحمد بن الشيخ", img: "https://i.pravatar.cc/60?img=12" }
        ],
        levels: {
          foundation: {
            ar: ["مفهوم اللاكود", "قواعد البيانات", "واجهات المستخدم", "تصميم النماذج", "ربط المنصات", "صفحات الهبوط", "تطبيقات الويب", "الاستضافة"],
            en: ["No-Code Concept", "Databases", "User Interfaces", "Form Design", "Platform Integration", "Landing Pages", "Web Apps", "Hosting"],
            fr: ["Concept du No-Code", "Bases de données", "Interfaces utilisateur", "Conception de formulaires", "Intégration de plateformes", "Pages d'atterrissage", "Applications web", "Hébergement"]
          },
          enable: {
            ar: ["تطوير تطبيقات الجوال", "الأتمتة المعقدة", "إدارة البيانات", "بوابات الدفع", "تخصيص القوالب", "تحسين الأداء", "ربط التطبيقات", "اختبار الاستخدام"],
            en: ["Mobile App Development", "Complex Automation", "Data Management", "Payment Gateways", "Template Customization", "Performance Optimization", "App Integration", "Usability Testing"],
            fr: ["Développement d'applications mobiles", "Automatisation complexe", "Gestion des données", "Passerelles de paiement", "Personnalisation de modèles", "Optimisation des performances", "Intégration d'applications", "Tests d'utilisabilité"]
          },
          reinforce: {
            ar: ["بناء منصات متكاملة", "هندسة النظم", "أمان التطبيقات", "تسعير المشاريع", "تدريب المطورين", "دورة الحياة", "ابتكار المنتجات", "الاستشارات التقنية"],
            en: ["Building Integrated Platforms", "Systems Engineering", "App Security", "Project Pricing", "Developer Training", "Lifecycle Management", "Product Innovation", "Technical Consulting"],
            fr: ["Création de plateformes intégrées", "Ingénierie des systèmes", "Sécurité des applications", "Tarification de projets", "Formation des développeurs", "Gestion du cycle de vie", "Innovation produit", "Conseil technique"]
          }
        }
      },
      {
        id: "tech-data-bi",
        title: {
          ar: "مسار تدريب المدربين في تحليل البيانات وذكاء الأعمال",
          en: "Trainer Training Track in Data Analysis & Business Intelligence",
          fr: "Parcours de formation des formateurs en Analyse de données et intelligence d'affaires"
        },
        summary: {
          ar: "امتلك مهارات تحليل البيانات واتخاذ القرار الذكي عبر أدوات ولوحات القيادة.",
          en: "Master data analysis skills and smart decision-making using tools and dashboards.",
          fr: "Maîtrisez les compétences d'analyse de données et de prise de décision intelligente grâce aux outils et tableaux de bord."
        },
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=80",
        status: { ar: "متاح", en: "Available", fr: "Disponible" },
        statusKey: "available",
        duration: 62,
        mode: { ar: "حضوري", en: "In-person", fr: "Présentiel" },
        modeKey: "onsite",
        url: "https://wa.me/213555989370?text=Data_BI_Track_Enrollment",
        trainers: [
          { name: "لينة بوزيان", img: "https://i.pravatar.cc/60?img=32" },
          { name: "نور الهدى صالحي", img: "https://i.pravatar.cc/60?img=44" },
          { name: "إيمان تواتي", img: "https://i.pravatar.cc/60?img=39" },
          { name: "سارة مرابط", img: "https://i.pravatar.cc/60?img=47" }
        ],
        levels: {
          foundation: {
            ar: ["مفاهيم البيانات", "جمع البيانات", "التنظيف", "أساسيات إكسيل", "الإحصاء الوصفي", "المخططات", "لوحات القيادة", "أمان البيانات"],
            en: ["Data Concepts", "Data Collection", "Data Cleaning", "Excel Basics", "Descriptive Statistics", "Charts", "Dashboards", "Data Security"],
            fr: ["Concepts de données", "Collecte de données", "Nettoyage des données", "Bases d'Excel", "Statistiques descriptives", "Graphiques", "Tableaux de bord", "Sécurité des données"]
          },
          enable: {
            ar: ["التحليل المتقدم", "استخدام SQL", "أدوات BI", "تصور البيانات", "اكتشاف الأنماط", "التنبؤ البسيط", "إعداد التقارير", "تحليل سلوك المستخدم"],
            en: ["Advanced Analysis", "Using SQL", "BI Tools", "Data Visualization", "Pattern Discovery", "Basic Forecasting", "Reporting", "User Behavior Analysis"],
            fr: ["Analyse avancée", "Utilisation de SQL", "Outils BI", "Visualisation de données", "Découverte de tendances", "Prévision simple", "Rapports", "Analyse du comportement utilisateur"]
          },
          reinforce: {
            ar: ["علم البيانات", "النمذجة التنبؤية", "قرارات البيانات", "تدريب المحللين", "إدارة المشاريع", "حوكمة البيانات", "استشارات الأعمال", "مؤشرات الأداء"],
            en: ["Data Science", "Predictive Modeling", "Data-Driven Decisions", "Analyst Training", "Project Management", "Data Governance", "Business Consulting", "KPIs"],
            fr: ["Science des données", "Modélisation prédictive", "Décisions basées sur les données", "Formation des analystes", "Gestion de projets", "Gouvernance des données", "Conseil aux entreprises", "Indicateurs de performance (KPI)"]
          }
        }
      }
    ]
  },
  {
    key: "marketing",
    icon: "📈",
    color: "#d5803b",
    name: { ar: "تسويق", en: "Marketing", fr: "Marketing" },
    tracks: [
      {
        id: "marketing-digital",
        title: {
          ar: "مسار تدريب المدربين في التسويق الإلكتروني",
          en: "Trainer Training Track in Digital Marketing",
          fr: "Parcours de formation des formateurs en Marketing électronique"
        },
        summary: {
          ar: "دليلك العملي لبناء استراتيجيات تسويق رقمي فعّالة وقياس الأداء وتحقيق النمو.",
          en: "Your practical guide to building effective digital marketing strategies, measuring performance, and achieving growth.",
          fr: "Votre guide pratique pour élaborer des stratégies de marketing numérique efficaces, mesurer la performance et générer de la croissance."
        },
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=700&q=80",
        status: { ar: "مكتمل", en: "Completed", fr: "Complet" },
        statusKey: "completed",
        duration: 50,
        mode: { ar: "عن بعد", en: "Remote", fr: "À distance" },
        modeKey: "remote",
        url: "https://wa.me/213555989370?text=Digital_Marketing_Track_Enrollment",
        trainers: [
          { name: "سارة مرابط", img: "https://i.pravatar.cc/60?img=47" },
          { name: "لينة بوزيان", img: "https://i.pravatar.cc/60?img=32" },
          { name: "نور الهدى صالحي", img: "https://i.pravatar.cc/60?img=44" },
          { name: "إيمان تواتي", img: "https://i.pravatar.cc/60?img=39" }
        ],
        levels: {
          foundation: {
            ar: ["أساسيات التسويق", "سلوك المستهلك", "المزيج التسويقي", "إدارة المنصات", "كتابة الإعلانات", "التصميم التسويقي", "أدوات النشر", "قياس التفاعل"],
            en: ["Marketing Fundamentals", "Consumer Behavior", "Marketing Mix", "Platform Management", "Ad Copywriting", "Marketing Design", "Publishing Tools", "Engagement Measurement"],
            fr: ["Fondamentaux du marketing", "Comportement du consommateur", "Mix marketing", "Gestion des plateformes", "Rédaction publicitaire", "Design marketing", "Outils de publication", "Mesure de l'engagement"]
          },
          enable: {
            ar: ["إعلانات السوشيال", "إعلانات جوجل", "التسويق بالبريد", "التسويق بالعمولة", "مسارات البيع (Funnels)", "تحليل الحملات", "الأتمتة", "إدارة الميزانيات"],
            en: ["Social Media Ads", "Google Ads", "Email Marketing", "Affiliate Marketing", "Sales Funnels", "Campaign Analysis", "Automation", "Budget Management"],
            fr: ["Publicités sur les réseaux sociaux", "Google Ads", "Marketing par e-mail", "Marketing d'affiliation", "Tunnels de vente", "Analyse des campagnes", "Automatisation", "Gestion des budgets"]
          },
          reinforce: {
            ar: ["استراتيجيات التسويق", "اختراق النمو (Growth Hacking)", "تحليل العائد", "التسويق B2B", "إدارة الفرق", "تصميم الحملات", "الاستشارات", "بناء العلامة"],
            en: ["Marketing Strategies", "Growth Hacking", "ROI Analysis", "B2B Marketing", "Team Management", "Campaign Design", "Consulting", "Brand Building"],
            fr: ["Stratégies marketing", "Growth Hacking", "Analyse du ROI", "Marketing B2B", "Gestion d'équipes", "Conception de campagnes", "Conseil", "Construction de marque"]
          }
        }
      }
    ]
  },
  {
    key: "media",
    icon: "🎙️",
    color: "#e56458",
    name: { ar: "إعلام واتصال", en: "Media & Communication", fr: "Médias & Communication" },
    tracks: [
      {
        id: "media-journalism",
        title: {
          ar: "مسار تدريب المدربين في الإعلام الرقمي وصحافة الويب",
          en: "Trainer Training Track in Digital Media & Web Journalism",
          fr: "Parcours de formation des formateurs en Médias numériques et journalisme web"
        },
        summary: {
          ar: "مسار متكامل لتكوين صحفيين ومحتوى رقمي محترفين، من الأساسيات إلى الاستقصاء والتحرير المتقدم.",
          en: "A comprehensive track to train professional journalists and digital content creators, from basics to investigative and advanced editing.",
          fr: "Un parcours complet pour former des journalistes et créateurs de contenu numérique professionnels, des bases jusqu'à l'investigation et l'édition avancée."
        },
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80",
        status: { ar: "متاح", en: "Available", fr: "Disponible" },
        statusKey: "available",
        duration: 55,
        mode: { ar: "حضوري", en: "In-person", fr: "Présentiel" },
        modeKey: "onsite",
        url: "https://wa.me/213555989370?text=Digital_Media_Track_Enrollment",
        trainers: [
          { name: "أحمد بن الشيخ", img: "https://i.pravatar.cc/60?img=12" },
          { name: "سارة مرابط", img: "https://i.pravatar.cc/60?img=47" },
          { name: "يوسف حمدي", img: "https://i.pravatar.cc/60?img=15" },
          { name: "لينة بوزيان", img: "https://i.pravatar.cc/60?img=32" }
        ],
        levels: {
          foundation: {
            ar: ["مدخل للإعلام", "أخلاقيات النشر", "جمع الأخبار", "التحرير الأساسي", "التصوير الصحفي", "المنصات الرقمية", "تحليل الجمهور", "صياغة العناوين"],
            en: ["Introduction to Media", "Publishing Ethics", "News Gathering", "Basic Editing", "Photojournalism", "Digital Platforms", "Audience Analysis", "Headline Writing"],
            fr: ["Introduction aux médias", "Éthique de la publication", "Collecte de l'information", "Édition de base", "Photojournalisme", "Plateformes numériques", "Analyse de l'audience", "Rédaction de titres"]
          },
          enable: {
            ar: ["السرد القصصي", "صحافة الموبايل", "إدارة المقابلات", "التحقق من الأخبار", "السيو (SEO) للصحافة", "البيانات الصحفية", "البودكاست", "التفطية المباشرة"],
            en: ["Storytelling", "Mobile Journalism", "Interview Management", "Fact-Checking", "SEO for Journalism", "Press Releases", "Podcasting", "Live Coverage"],
            fr: ["Narration (Storytelling)", "Journalisme mobile", "Gestion des interviews", "Vérification des faits", "SEO pour le journalisme", "Communiqués de presse", "Podcast", "Couverture en direct"]
          },
          reinforce: {
            ar: ["إدارة فرف الأخبار", "الصحافة الاستقصائية", "استراتيجيات النشر", "تدريب المراسلين", "تقييم الأداء", "إدارة الأزمات", "تصميم المناهج", "تسويق المحتوى"],
            en: ["Newsroom Management", "Investigative Journalism", "Publishing Strategies", "Correspondent Training", "Performance Evaluation", "Crisis Management", "Curriculum Design", "Content Marketing"],
            fr: ["Gestion des salles de rédaction", "Journalisme d'investigation", "Stratégies de publication", "Formation des correspondants", "Évaluation de la performance", "Gestion de crise", "Conception de programmes", "Marketing de contenu"]
          }
        }
      }
    ]
  },
  {
    key: "creativity",
    icon: "💡",
    color: "#8b5cf6",
    name: { ar: "ابتكار وإبداع", en: "Innovation & Creativity", fr: "Innovation & Créativité" },
    tracks: [
      {
        id: "creativity-content",
        title: {
          ar: "مسار تدريب المدربين في صناعة المحتوى الإبداعي",
          en: "Trainer Training Track in Creative Content Production",
          fr: "Parcours de formation des formateurs en Production de contenu créatif"
        },
        summary: {
          ar: "اكتشف أدوات صناعة المحتوى الإبداعي من التصوير والمونتاج إلى الاستراتيجية وتحقيق الدخل.",
          en: "Discover the tools of creative content production, from filming and editing to strategy and monetization.",
          fr: "Découvrez les outils de production de contenu créatif, du tournage et du montage jusqu'à la stratégie et la monétisation."
        },
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80",
        status: { ar: "متاح", en: "Available", fr: "Disponible" },
        statusKey: "available",
        duration: 58,
        mode: { ar: "حضوري", en: "In-person", fr: "Présentiel" },
        modeKey: "onsite",
        url: "https://wa.me/213555989370?text=Creative_Content_Track_Enrollment",
        trainers: [
          { name: "أحمد بن الشيخ", img: "https://i.pravatar.cc/60?img=12" },
          { name: "يوسف حمدي", img: "https://i.pravatar.cc/60?img=15" },
          { name: "كريم زروقي", img: "https://i.pravatar.cc/60?img=22" },
          { name: "عادل بلحاج", img: "https://i.pravatar.cc/60?img=8" }
        ],
        levels: {
          foundation: {
            ar: ["أنواع المحتوى", "العصف الذهني", "كتابة السيناريو", "أساسيات التصوير", "المونتاج البسيط", "الهوية البصرية", "الإضاءة", "تسجيل الصوت"],
            en: ["Content Types", "Brainstorming", "Scriptwriting", "Photography Basics", "Basic Editing", "Visual Identity", "Lighting", "Audio Recording"],
            fr: ["Types de contenu", "Brainstorming", "Écriture de scénario", "Bases de la photographie", "Montage simple", "Identité visuelle", "Éclairage", "Enregistrement audio"]
          },
          enable: {
            ar: ["صناعة الريلز", "السرد البصري", "المونتاج المتقدم", "الصور المصفرة", "خوارزميات المنصات", "البث المباشر", "إدارة القنوات", "التفاعل الجماهيري"],
            en: ["Reels Production", "Visual Storytelling", "Advanced Editing", "Thumbnails", "Platform Algorithms", "Livestreaming", "Channel Management", "Audience Engagement"],
            fr: ["Production de Reels", "Narration visuelle", "Montage avancé", "Miniatures", "Algorithmes des plateformes", "Diffusion en direct", "Gestion des chaînes", "Engagement du public"]
          },
          reinforce: {
            ar: ["استراتيجية المحتوى", "تحقيق الدخل", "رعاية العلامات", "إدارة الفرق", "التحليل المتقدم", "تصميم ورش العمل", "حقوق الملكية", "بناء المجتمعات"],
            en: ["Content Strategy", "Monetization", "Brand Sponsorships", "Team Management", "Advanced Analytics", "Workshop Design", "Copyright", "Community Building"],
            fr: ["Stratégie de contenu", "Monétisation", "Partenariats de marque", "Gestion d'équipes", "Analyse avancée", "Conception d'ateliers", "Droits d'auteur", "Construction de communautés"]
          }
        }
      }
    ]
  }
];
