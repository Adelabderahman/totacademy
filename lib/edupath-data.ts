// TOT Academy - Comprehensive Educational Pathway Data Store
// Contains all levels (Foundation, Empowerment, Consolidation), modules, lessons, quizzes, and translations

export type LangKey = 'ar' | 'en' | 'fr';

export interface LocalizedString {
  ar: string;
  en: string;
  fr: string;
}

export interface ModuleData {
  id: string;
  num: string;
  icon: string;
  gradient: string;
  moduleLabel: LocalizedString;
  title: LocalizedString;
  desc: LocalizedString;
}

export interface LessonData {
  id: string;
  type: 'video' | 'doc';
  title: LocalizedString;
  instructor: LocalizedString;
  duration: LocalizedString;
  img: string;
  desc: LocalizedString;
  video_id?: string;
  action_url?: string;
  doc_preview?: string;
}

export interface QuizQuestionItem {
  q: string;
  options: string[];
  ans: number;
  hint?: string;
  explanation?: string;
}

export interface QuizItem {
  title: string;
  questions: QuizQuestionItem[];
}

// -------------------------------------------------------------
// Core Interface Translations
// -------------------------------------------------------------
export const coreI18n: Record<LangKey, Record<string, string>> = {
  ar: {
    course_category: "قسم تدريب المدربين / الأساسيات",
    course_title: "البرنامج التأسيسي الشامل لتدريب المدربين",
    course_desc: "نقطة انطلاقك نحو احتراف التدريب. يقدم لك هذا البرنامج الأسس العلمية والمهارات التطبيقية لبناء حضور مؤثر وتصميم حقائب تدريبية متكاملة تتوافق مع أحدث المعايير العالمية.",
    btn_contact: "تعرف على مدربي المدربين",
    btn_catalog: "تجول في الأقسام والمسارات",
    pathway_title: "المسار التأصيلي / TOTF126",
    pathway_desc: "مسار مصمم خصيصاً لتأسيس المدربين من الصفر، يركز على بناء القواعد المعرفية والمهارية الصلبة. مثالي للمبتدئين ومن يخطو خطواته الأولى في عالم التدريب.",
    doc_title: "وثيقة المسار",
    doc_desc: "دليل شامل يحتوي على تفاصيل ومعايير المسار.",
    btn_download: "قراءة وتحميل",
    form_title: "التسجيل في المسار",
    form_alert: "اختيارك لهذا المسار والتسجيل فيه يقتضي الالتزام بالإكمال فيه، حيث سيتم تقييمك لامتحانك النهائي ومنحك الشهادة بناءً على هذا المسار.",
    form_note: "ملاحظة: يمكن التسجيل في المسار قبل أو بعد الاستماع للدروس وقراءة المحتوى والقيام بالتطبيقات، لكن لا ينصح بأداء الامتحان الخاص بنهاية المسار (والذي تجدونه في نهاية هذا المسار) إلا بعد تأكيد التسجيل.",
    label_name: "الاسم واللقب",
    ph_name: "أدخل اسمك الكامل",
    label_email: "البريد الإلكتروني",
    ph_email: "example@email.com",
    label_whatsapp: "رقم الواتساب",
    ph_whatsapp: "+213 555 000 000",
    label_pathway: "اسم المسار (تلقائي)",
    pathway_name_value: "المسار التأصيلي / TOTF126",
    label_terms: "أوافق على الشروط وأوقع على ميثاق التعلم",
    btn_submit_pathway: "تأكيد التسجيل في المسار",
    level_select_title: "اختر المستوى المناسب",
    level_foundation: "مستوى التأسيس",
    level_empowerment: "مستوى التمكين",
    level_consolidation: "مستوى التمتين",
    modules_title: "مقاييس المسار",
    btn_start_study: "ابدأ الدراسة",
    module_prefix: "مقياس",
    quiz_section_title: "اختبارات المقياس",
    interrogation_section_title: "استجواب المقياس",
    interrogation_intro: "هذا الاستجواب هو عبارة عن استجواب مكون من سؤال واحد تلخيصي للمقياس لا يجب أن يتجاوز عدد كلماته 1000 كلمة ولا تقل عن 500 كلمة . كما يفضل أن يكون التلخيص عبارة عن خريطة ذهنية أو شجرة أو تقسيمات أو حتى فيديو أو صوتية",
    label_phone: "رقم الهاتف",
    label_module_name: "اسم المقياس",
    interrogation_file_upload: "إطار لتحميل الملف إذا كانت الإجابة عبارة عن تحميل ملف",
    btn_submit_interrogation: "إرسال الاستجواب",
    fe_title: "امتحان نهاية المسار",
    fe_tab_intro: "📋 المقدمة والتنبيهات",
    fe_tab_personal: "👤 البيانات الشخصية",
    fe_tab_submit: "✅ إرسال الامتحان",
    fe_intro_header: "المقدمة والبيانات",
    fe_intro_desc: "هذا النموذج الشامل مخصص لاختبار قدراتك ومدى استيعابك العميق للمفاهيم الأساسية والمهارات التطبيقية المكتسبة خلال مسارك التدريبي. يرجى قراءة الأسئلة بعناية والتركيز التام قبل الإجابة.",
    fe_intro_alert: "تنبيه هام جداً: هذا الامتحان هو تدريب عملي لتقييم المكتسبات، وليس امتحاناً نهائياً للحصول على الشهادة. تذكر أن النظام يسمح بإرسال الإجابات مرة واحدة فقط، وسيتم اعتماد الإرسال الأول وإهمال أي محاولات متكررة أو لاحقة تلقائياً.",
    fe_label_id: "التعريف/الجواز *",
    fe_label_whatsapp: "الواتساب *",
    fe_label_pathway: "اسم المسار *",
    fe_label_supervisor: "الأستاذ المشرف *",
    fe_next_m1: "التالي: المحور الأول",
    fe_next_m2: "التالي: المحور الثاني",
    fe_next_m3: "التالي: المحور الثالث",
    fe_next_m4: "التالي: المحور الرابع",
    fe_next_m5: "التالي: المحور الخامس",
    fe_next_m6: "التالي: المحور السادس",
    fe_next_m7: "التالي: المحور السابع",
    fe_next_m8: "التالي: المحور الثامن",
    fe_next_end: "التالي: إنهاء الامتحان",
    fe_file_upload_opt: "رفع ملف إضافي (اختياري)",
    fe_placeholder_ans: "اكتب إجابتك هنا...",
    fe_end_title: "نهاية الامتحان",
    fe_end_desc: "لقد وصلت إلى نهاية الامتحان. يرجى مراجعة إجاباتك جيداً وملء جميع الحقول الإلزامية في المحاور السابقة قبل الإرسال.",
    fe_btn_submit_exam: "إرسال امتحان نهاية المسار",
    badge_new: "جديد",
    badge_accreditation: "إعتماد",
    direct_training_title: "التدريب المباشر والحضوري",
    dt_part1_title: "طلب لقاء تفاعلي",
    dt_part1_alert: "⚠️ توضيح هام: لا يتم تفعيل طلبات اللقاء التفاعلي والورش الحضوريه إلا بعد الدفع المستحق للامتحان النهائي وإتمام المسار. يرجى التأكد من أن رقم الهاتف مرتبط بتطبيق الواتساب.",
    dt_whatsapp_label: "رقم الهاتف (الواتساب) *",
    label_pathway_name: "اسم المسار *",
    label_supervisor: "الأستاذ المشرف *",
    label_request_type: "نوع الطلب",
    val_interactive_meeting: "طلب لقاء تفاعلي",
    btn_submit_meeting: "إرسال طلب اللقاء",
    dt_part2_title: "طلب ورشة حضورية",
    dt_location_label: "ولاية ومكان الإقامة بدقة *",
    dt_days_label: "أيام التفرغ *",
    dt_days_opt_0: "اختر الأيام",
    dt_days_opt_1: "عطلة نهاية الأسبوع",
    dt_days_opt_2: "وسط الأسبوع",
    dt_days_opt_3: "متفرغ دائماً",
    dt_times_label: "الأوقات المناسبة *",
    dt_times_opt_0: "اختر الفترة",
    dt_times_opt_1: "صباحاً",
    dt_times_opt_2: "مساءً",
    dt_travel_label: "إمكانية التنقل للعاصمة؟ *",
    dt_travel_opt_0: "اختر الإجابة",
    dt_travel_opt_1: "نعم، يمكنني التنقل",
    dt_travel_opt_2: "لا، في ولايتي فقط",
    btn_submit_workshop: "تسجيل طلب الورشة",
    consultant_title: "الاستشارة المباشرة مع الخبراء",
    consultant_desc: "هل لديك استفسارات حول مسارك أو التدريب الحضوري؟ تواصل معنا فوراً للحصول على توجيه دقيق.",
    btn_request_consultant: "طلب مستشار",
    cert_title: "طلب الشهادة والإعتماد النهائي",
    cert_alert: "📜 تنبيه شروط التقدم: لا يمكن التقدم لطلب هذا الامتحان والشهادة إلا بعد استكمال كافة الدروس والاختبارات والاستجوابات الخاصة بالمسار. بمجرد إتمام الدفع، يتم تفعيل طلبات اللقاء والورشة الخاصة بك.",
    cert_id_label: "رقم الهوية / جواز السفر *",
    cert_address_label: "العنوان الكامل *",
    cert_age_label: "السن *",
    cert_gender_label: "الجنس *",
    cert_gender_opt_0: "اختر الجنس",
    cert_gender_opt_1: "ذكر",
    cert_gender_opt_2: "أنثى",
    cert_job_label: "المهنة الحالية *",
    cert_type_label: "نوع الشهادة المطلوبة *",
    cert_type_opt_0: "اختر نوع الشهادة",
    cert_type_opt_1: "إتمام مسار تدريبي",
    cert_type_opt_2: "مدرب محترف معتمد",
    cert_type_opt_3: "خبير معتمد",
    cert_accreditation_label: "نوع الاعتماد *",
    cert_acc_opt_0: "اختر الاعتماد",
    cert_acc_opt_1: "أكاديمي محلي",
    cert_acc_opt_2: "دولي",
    cert_acc_opt_3: "مشترك (محلي ودولي)",
    cert_payment_label: "طريقة الدفع المختارة *",
    cert_pay_opt_0: "اختر وسيلة الدفع",
    cert_pay_opt_1: "دفع مباشر (يداً بيد)",
    cert_pay_opt_2: "تحويل بريدي (CCP / BaridiMob)",
    cert_agree_terms: "أوافق على الشروط والأحكام وسياسة الخصوصية الخاصة بالأكاديمية.",
    cert_agree_ethics: "أتعهد بالالتزام والتقيد الكامل بأخلاقيات المهنة والمعايير المعتمدة.",
    btn_submit_cert: "تأكيد طلب الشهادة والاعتماد النهائي 🎓",
    progress_title: "التقدم الإجمالي للمسار",
    progress_note: "يشمل جميع المستويات والدروس والاختبارات. التدريب الحضوري يفتح عند 25%، والشهادة والاعتماد عند 50%.",
    locked_inperson_title: "التدريب الحضوري مقفل",
    locked_inperson_sub: "يُفتح هذا القسم بعد إكمال 25% من إجمالي التدريب والاختبارات.",
    locked_cert_title: "طلب الشهادة والاعتماد مقفل",
    locked_cert_sub: "يُفتح هذا القسم بعد إكمال 50% من إجمالي التدريب والاختبارات.",
  },
  en: {
    course_category: "Train the Trainer / Fundamentals",
    course_title: "Comprehensive Foundational TOT Program",
    course_desc: "Your starting point towards professional training. This program provides you with the scientific foundations and practical skills to build an influential presence and design comprehensive training packages aligned with global standards.",
    btn_contact: "Meet the Master Trainers",
    btn_catalog: "Explore Modules & Pathways",
    pathway_title: "Foundational Pathway / TOTF126",
    pathway_desc: "A pathway designed to build trainers from scratch, focusing on solid cognitive and practical foundations. Ideal for beginners taking their first steps in training.",
    doc_title: "Pathway Document",
    doc_desc: "Comprehensive guide containing pathway details and standards.",
    btn_download: "Read & Download",
    form_title: "Pathway Registration",
    form_alert: "Choosing this pathway requires commitment to complete it, as your evaluation and certification will be based on it.",
    form_note: "Note: You can register for the pathway before or after listening to the lessons, reading the content, and doing the practical exercises. However, it is not recommended to take the final exam until registration is confirmed.",
    label_name: "Full Name",
    ph_name: "Enter your full name",
    label_email: "Email Address",
    ph_email: "example@email.com",
    label_whatsapp: "WhatsApp Number",
    ph_whatsapp: "+1 234 567 890",
    label_pathway: "Pathway Name (Auto)",
    pathway_name_value: "Foundational Pathway / TOTF126",
    label_terms: "I agree to the terms and sign the learning charter",
    btn_submit_pathway: "Confirm Registration",
    level_select_title: "Select Appropriate Level",
    level_foundation: "Foundation Level",
    level_empowerment: "Empowerment Level",
    level_consolidation: "Consolidation Level",
    modules_title: "Pathway Modules",
    btn_start_study: "Start Studying",
    module_prefix: "Module",
    quiz_section_title: "Module Quizzes",
    interrogation_section_title: "Module Interrogation",
    interrogation_intro: "This interrogation consists of a single summary question for the module (500 - 1000 words). The summary can also be a mind map, tree, diagram, video, or audio.",
    label_phone: "Phone Number",
    label_module_name: "Module Name",
    interrogation_file_upload: "Upload file (if the answer is a file submission)",
    btn_submit_interrogation: "Submit Interrogation",
    fe_title: "Final Pathway Exam",
    fe_tab_intro: "📋 Intro & Alerts",
    fe_tab_personal: "👤 Personal Data",
    fe_tab_submit: "✅ Submit Exam",
    fe_intro_header: "Intro & Data",
    fe_intro_desc: "This comprehensive form is designed to test your abilities and deep understanding of the core concepts and practical skills acquired during your training. Please read the questions carefully and focus before answering.",
    fe_intro_alert: "Very Important Alert: This exam is a practical training to assess your gains, not a final certification exam. The system allows submitting answers only once. Only the first submission will be considered.",
    fe_label_id: "ID / Passport *",
    fe_label_whatsapp: "WhatsApp *",
    fe_label_pathway: "Pathway Name *",
    fe_label_supervisor: "Supervisor Name *",
    fe_next_m1: "Next: Module 1",
    fe_next_m2: "Next: Module 2",
    fe_next_m3: "Next: Module 3",
    fe_next_m4: "Next: Module 4",
    fe_next_m5: "Next: Module 5",
    fe_next_m6: "Next: Module 6",
    fe_next_m7: "Next: Module 7",
    fe_next_m8: "Next: Module 8",
    fe_next_end: "Next: Finish Exam",
    fe_file_upload_opt: "Upload additional file (optional)",
    fe_placeholder_ans: "Write your answer here...",
    fe_end_title: "End of Exam",
    fe_end_desc: "You have reached the end of the exam. Please review your answers carefully and fill in all required fields in the previous modules before submitting.",
    fe_btn_submit_exam: "Submit Final Pathway Exam",
    badge_new: "New",
    badge_accreditation: "Accreditation",
    direct_training_title: "Direct & Face-to-Face Training",
    dt_part1_title: "Interactive Meeting Request",
    dt_part1_alert: "⚠️ Important Note: Meeting and face-to-face workshop requests will not be activated until the final exam payment is completed. Ensure your phone number is linked to WhatsApp.",
    dt_whatsapp_label: "Phone Number (WhatsApp) *",
    label_pathway_name: "Pathway Name *",
    label_supervisor: "Supervisor Name *",
    label_request_type: "Request Type",
    val_interactive_meeting: "Interactive Meeting Request",
    btn_submit_meeting: "Submit Meeting Request",
    dt_part2_title: "Face-to-Face Workshop Request",
    dt_location_label: "Exact State & Residency *",
    dt_days_label: "Available Days *",
    dt_days_opt_0: "Select Days",
    dt_days_opt_1: "Weekends",
    dt_days_opt_2: "Weekdays",
    dt_days_opt_3: "Always Available",
    dt_times_label: "Preferred Times *",
    dt_times_opt_0: "Select Time",
    dt_times_opt_1: "Morning",
    dt_times_opt_2: "Afternoon",
    dt_travel_label: "Can you travel to Algiers? *",
    dt_travel_opt_0: "Select Answer",
    dt_travel_opt_1: "Yes, I can travel",
    dt_travel_opt_2: "No, only in my state",
    btn_submit_workshop: "Register for Workshop",
    consultant_title: "Direct Consultation with Experts",
    consultant_desc: "Do you have questions about your pathway or face-to-face training? Contact us immediately for precise guidance.",
    btn_request_consultant: "Request Consultant",
    cert_title: "Certificate & Final Accreditation Request",
    cert_alert: "📜 Application Terms: You cannot apply for this final exam and certificate until you have completed all lessons, quizzes, and interrogations for the pathway. Once payment is complete, your meeting and workshop requests will be activated.",
    cert_id_label: "ID / Passport Number *",
    cert_address_label: "Full Address *",
    cert_age_label: "Age *",
    cert_gender_label: "Gender *",
    cert_gender_opt_0: "Select Gender",
    cert_gender_opt_1: "Male",
    cert_gender_opt_2: "Female",
    cert_job_label: "Current Occupation *",
    cert_type_label: "Requested Certificate Type *",
    cert_type_opt_0: "Select Certificate Type",
    cert_type_opt_1: "Training Pathway Completion",
    cert_type_opt_2: "Certified Professional Trainer",
    cert_type_opt_3: "Certified Expert",
    cert_accreditation_label: "Accreditation Type *",
    cert_acc_opt_0: "Select Accreditation",
    cert_acc_opt_1: "Local Academic",
    cert_acc_opt_2: "International",
    cert_acc_opt_3: "Joint (Local & International)",
    cert_payment_label: "Selected Payment Method *",
    cert_pay_opt_0: "Select Payment Method",
    cert_pay_opt_1: "Direct Cash (Hand to Hand)",
    cert_pay_opt_2: "Postal Transfer (CCP / BaridiMob)",
    cert_agree_terms: "I agree to the Academy's terms, conditions, and privacy policy.",
    cert_agree_ethics: "I pledge full commitment and adherence to professional ethics and approved standards.",
    btn_submit_cert: "Confirm Certificate Request 🎓",
    progress_title: "Overall Pathway Progress",
    progress_note: "Includes all levels, lessons and quizzes. In-person training unlocks at 25%, certificate & accreditation at 50%.",
    locked_inperson_title: "In-Person Training Locked",
    locked_inperson_sub: "This section unlocks after completing 25% of total training and quizzes.",
    locked_cert_title: "Certificate & Accreditation Locked",
    locked_cert_sub: "This section unlocks after completing 50% of total training and quizzes.",
  },
  fr: {
    course_category: "Formation des Formateurs / Fondamentaux",
    course_title: "Programme Fondamental Complet de FdF",
    course_desc: "Votre point de départ vers la formation professionnelle. Ce programme vous fournit les bases scientifiques et les compétences pratiques pour bâtir une présence influente et concevoir des kits de formation complets selon les normes mondiales.",
    btn_contact: "Rencontrez les Formateurs",
    btn_catalog: "Explorez les Parcours",
    pathway_title: "Parcours Fondamental / TOTF126",
    pathway_desc: "Un parcours conçu pour former les formateurs à partir de zéro, en se concentrant sur de solides bases cognitives et pratiques. Idéal pour les débutants.",
    doc_title: "Document du Parcours",
    doc_desc: "Guide complet contenant les détails et les normes du parcours.",
    btn_download: "Lire et Télécharger",
    form_title: "Inscription au Parcours",
    form_alert: "Le choix de ce parcours implique de s'engager à le terminer, car votre évaluation et votre certification en dépendront.",
    form_note: "Remarque : Vous pouvez vous inscrire au parcours avant ou après avoir écouté les leçons, lu le contenu et effectué les exercices. Cependant, il n'est pas recommandé de passer l'examen final avant de confirmer votre inscription.",
    label_name: "Nom et Prénom",
    ph_name: "Entrez votre nom complet",
    label_email: "Adresse E-mail",
    ph_email: "example@email.com",
    label_whatsapp: "Numéro WhatsApp",
    ph_whatsapp: "+33 6 12 34 56 78",
    label_pathway: "Nom du Parcours (Auto)",
    pathway_name_value: "Parcours Fondamental / TOTF126",
    label_terms: "J'accepte les conditions et signe la charte d'apprentissage",
    btn_submit_pathway: "Confirmer l'inscription",
    level_select_title: "Sélectionnez le niveau",
    level_foundation: "Niveau Fondation",
    level_empowerment: "Niveau Autonomisation",
    level_consolidation: "Niveau Consolidation",
    modules_title: "Modules du Parcours",
    btn_start_study: "Commencer l'étude",
    module_prefix: "Module",
    quiz_section_title: "Quiz du Module",
    interrogation_section_title: "Interrogation du Module",
    interrogation_intro: "Cette interrogation consiste en une question de résumé pour le module (500 à 1000 mots). Le résumé peut également être une carte mentale, un schéma, une vidéo ou un fichier audio.",
    label_phone: "Numéro de téléphone",
    label_module_name: "Nom du module",
    interrogation_file_upload: "Télécharger un fichier (si la réponse est un fichier)",
    btn_submit_interrogation: "Soumettre l'interrogation",
    fe_title: "Examen Final du Parcours",
    fe_tab_intro: "📋 Intro et Alertes",
    fe_tab_personal: "👤 Données Personnelles",
    fe_tab_submit: "✅ Soumettre l'Examen",
    fe_intro_header: "Intro et Données",
    fe_intro_desc: "Ce formulaire complet est conçu pour tester vos capacités et votre compréhension approfondie des concepts de base acquis. Veuillez lire attentivement les questions avant de répondre.",
    fe_intro_alert: "Alerte Très Importante : Cet examen est une formation pratique pour évaluer vos acquis, et non un examen final de certification. Le système permet de soumettre les réponses une seule fois.",
    fe_label_id: "ID / Passeport *",
    fe_label_whatsapp: "WhatsApp *",
    fe_label_pathway: "Nom du Parcours *",
    fe_label_supervisor: "Nom du Superviseur *",
    fe_next_m1: "Suivant : Module 1",
    fe_next_m2: "Suivant : Module 2",
    fe_next_m3: "Suivant : Module 3",
    fe_next_m4: "Suivant : Module 4",
    fe_next_m5: "Suivant : Module 5",
    fe_next_m6: "Suivant : Module 6",
    fe_next_m7: "Suivant : Module 7",
    fe_next_m8: "Suivant : Module 8",
    fe_next_end: "Suivant : Terminer l'Examen",
    fe_file_upload_opt: "Télécharger un fichier (facultatif)",
    fe_placeholder_ans: "Écrivez votre réponse ici...",
    fe_end_title: "Fin de l'Examen",
    fe_end_desc: "Vous avez atteint la fin de l'examen. Veuillez revoir attentivement vos réponses et remplir tous les champs obligatoires avant de soumettre.",
    fe_btn_submit_exam: "Soumettre l'Examen Final",
    badge_new: "Nouveau",
    badge_accreditation: "Accréditation",
    direct_training_title: "Formation Directe et en Présentiel",
    dt_part1_title: "Demande de Réunion Interactive",
    dt_part1_alert: "⚠️ Remarque Importante: Les demandes de réunion et d'atelier en présentiel ne seront activées qu'après le paiement de l'examen final. Assurez-vous que votre numéro est lié à WhatsApp.",
    dt_whatsapp_label: "Numéro de téléphone (WhatsApp) *",
    label_pathway_name: "Nom du Parcours *",
    label_supervisor: "Nom du Superviseur *",
    label_request_type: "Type de Demande",
    val_interactive_meeting: "Demande de Réunion Interactive",
    btn_submit_meeting: "Soumettre la Demande",
    dt_part2_title: "Demande d'Atelier en Présentiel",
    dt_location_label: "Wilaya et Résidence exacte *",
    dt_days_label: "Jours de Disponibilité *",
    dt_days_opt_0: "Sélectionnez les Jours",
    dt_days_opt_1: "Week-ends",
    dt_days_opt_2: "En Semaine",
    dt_days_opt_3: "Toujours Disponible",
    dt_times_label: "Horaires Préférés *",
    dt_times_opt_0: "Sélectionnez l'Horaire",
    dt_times_opt_1: "Matin",
    dt_times_opt_2: "Après-midi",
    dt_travel_label: "Pouvez-vous voyager à Alger? *",
    dt_travel_opt_0: "Sélectionnez la Réponse",
    dt_travel_opt_1: "Oui, je peux voyager",
    dt_travel_opt_2: "Non, seulement dans ma wilaya",
    btn_submit_workshop: "S'inscrire à l'Atelier",
    consultant_title: "Consultation Directe avec les Experts",
    consultant_desc: "Avez-vous des questions sur votre parcours ou la formation en présentiel? Contactez-nous immédiatement pour des conseils précis.",
    btn_request_consultant: "Demander un Consultant",
    cert_title: "Demande de Certificat et Accréditation Finale",
    cert_alert: "📜 Conditions de Candidature: Vous ne pouvez pas postuler à cet examen final et à ce certificat tant que vous n'avez pas terminé toutes les leçons, quiz et interrogations. Une fois le paiement effectué, vos demandes seront activées.",
    cert_id_label: "N° de Carte d'Identité / Passeport *",
    cert_address_label: "Adresse Complète *",
    cert_age_label: "Âge *",
    cert_gender_label: "Genre *",
    cert_gender_opt_0: "Sélectionnez le Genre",
    cert_gender_opt_1: "Homme",
    cert_gender_opt_2: "Femme",
    cert_job_label: "Profession Actuelle *",
    cert_type_label: "Type de Certificat Demandé *",
    cert_type_opt_0: "Sélectionnez le Type",
    cert_type_opt_1: "Achèvement du Parcours",
    cert_type_opt_2: "Formateur Professionnel Certifié",
    cert_type_opt_3: "Expert Certifié",
    cert_accreditation_label: "Type d'Accréditation *",
    cert_acc_opt_0: "Sélectionnez l'Accréditation",
    cert_acc_opt_1: "Académique Locale",
    cert_acc_opt_2: "Internationale",
    cert_acc_opt_3: "Conjointe (Locale et Internationale)",
    cert_payment_label: "Mode de Paiement Choisi *",
    cert_pay_opt_0: "Sélectionnez le Mode de Paiement",
    cert_pay_opt_1: "Paiement en Espèces (Main à main)",
    cert_pay_opt_2: "Virement Postal (CCP / BaridiMob)",
    cert_agree_terms: "J'accepte les termes, conditions et la politique de confidentialité de l'Académie.",
    cert_agree_ethics: "Je m'engage à respecter pleinement l'éthique professionnelle et les normes approuvées.",
    btn_submit_cert: "Confirmer la Demande de Certificat 🎓",
    progress_title: "Progression globale du parcours",
    progress_note: "Inclut tous les niveaux, leçons et quiz. La formation en présentiel s’ouvre à 25 %, le certificat et l’accréditation à 50 %.",
    locked_inperson_title: "Formation en présentiel verrouillée",
    locked_inperson_sub: "Cette section se déverrouille après 25 % de l’ensemble de la formation et des quiz.",
    locked_cert_title: "Demande de certificat et accréditation verrouillée",
    locked_cert_sub: "Cette section se déverrouille après 50 % de l’ensemble de la formation et des quiz.",
  }
};

// -------------------------------------------------------------
// Modules Definitions per Level
// -------------------------------------------------------------
export const levelModules: Record<string, ModuleData[]> = {
  foundation: [
    { id: "module_1", num: "01", icon: "🧠", gradient: "linear-gradient(135deg, #FF6B6B, #FFA07A)", moduleLabel: { ar: "مقياس 01", en: "Module 01", fr: "Module 01" }, title: { ar: "معمارية التعلم", en: "Architecture of Learning", fr: "L'Architecture de l'Apprentissage" }, desc: { ar: "يغوص في علم الأندراغوجيا والأسس العصبية لتمكين المدربين من فهم سيكولوجية المتدرب وبناء تجارب راسخة.", en: "Delves into andragogy and neurocognitive foundations to decode trainee psychology and build impactful experiences.", fr: "Explore l'andragogie et les bases neurocognitives pour décoder la psychologie et bâtir des expériences impactantes." } },
    { id: "module_2", num: "02", icon: "🗣️", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", moduleLabel: { ar: "مقياس 02", en: "Module 02", fr: "Module 02" }, title: { ar: "التيسير الكاريزمي", en: "Charismatic Facilitation", fr: "Facilitation Charismatique" }, desc: { ar: "يركز على الكاريزما القيادية والذكاء العاطفي، ويزودك بمهارات الاتصال لإدارة المجموعات وبناء حضور مؤثر.", en: "Focuses on leadership charisma and emotional intelligence, equipping you with communication skills for an influential presence.", fr: "Axé sur le charisme et l'intelligence émotionnelle, vous dotant de compétences en communication pour une présence influente." } },
    { id: "module_3", num: "03", icon: "📐", gradient: "linear-gradient(135deg, #43e97b, #38f9d7)", moduleLabel: { ar: "مقياس 03", en: "Module 03", fr: "Module 03" }, title: { ar: "الهندسة التعليمية", en: "Instructional Engineering", fr: "Ingénierie Pédagogique" }, desc: { ar: "تطبيق نماذج التصميم التعليمي لابتكار حقائب متكاملة، وتحويل المعرفة النظرية إلى تطبيقات عملية قياسية.", en: "Apply instructional design models to create comprehensive packages, turning theory into practical, measurable applications.", fr: "Appliquez des modèles de conception pour créer des kits complets, transformant la théorie en applications pratiques." } },
    { id: "module_4", num: "04", icon: "🎲", gradient: "linear-gradient(135deg, #fa709a, #fee140)", moduleLabel: { ar: "مقياس 04", en: "Module 04", fr: "Module 04" }, title: { ar: "الابتكار البيداغوجي", en: "Pedagogical Innovation", fr: "Innovation Pédagogique" }, desc: { ar: "يكسر القوالب التقليدية عبر 'التلعيب' والتفكير التصميمي لهندسة ألعاب ومحاكاة تحفز الإبداع وترفع التفاعل.", en: "Breaks traditional molds via gamification and design thinking to engineer games that stimulate creativity and engagement.", fr: "Brise les moules traditionnels via la ludification pour concevoir des jeux stimulant la créativité et l'engagement." } },
    { id: "module_5", num: "05", icon: "🤖", gradient: "linear-gradient(135deg, #667eea, #764ba2)", moduleLabel: { ar: "مقياس 05", en: "Module 05", fr: "Module 05" }, title: { ar: "التحول الرقمي", en: "Digital Transformation", fr: "Transformation Numérique" }, desc: { ar: "توظيف أدوات الذكاء الاصطناعي في التدريب لأتمتة المهام، تخصيص التعلم، وخلق بيئات تدريبية استشرافية.", en: "Utilizing AI tools in training to automate tasks, personalize learning, and create visionary educational environments.", fr: "Utilisation de l'IA pour automatiser les tâches, personnaliser l'apprentissage et créer des environnements visionnaires." } },
    { id: "module_6", num: "06", icon: "📊", gradient: "linear-gradient(135deg, #f77062, #fe5196)", moduleLabel: { ar: "مقياس 06", en: "Module 06", fr: "Module 06" }, title: { ar: "تحليلات الأثر", en: "Impact Analytics", fr: "Analytique d'Impact" }, desc: { ar: "منهجية علمية لقياس عائد التدريب باستخدام مؤشرات الأداء (KPIs) لضمان جودة المخرجات والتحسين المستمر.", en: "A scientific methodology to measure training ROI using KPIs, ensuring output quality and continuous improvement.", fr: "Méthodologie scientifique pour mesurer le ROI via des KPI, garantissant la qualité et l'amélioration continue." } },
    { id: "module_7", num: "07", icon: "🏢", gradient: "linear-gradient(135deg, #13547a, #80d0c7)", moduleLabel: { ar: "مقياس 07", en: "Module 07", fr: "Module 07" }, title: { ar: "الحوكمة الاستراتيجية", en: "Strategic Governance", fr: "Gouvernance Stratégique" }, desc: { ar: "رؤى استراتيجية لإدارة المؤسسات التدريبية بكفاءة، تشمل التخطيط وإدارة الموارد لضمان الاستدامة والتنافسية.", en: "Strategic insights for efficiently managing training institutions, covering planning and resources for sustainability.", fr: "Visions stratégiques pour gérer efficacement les institutions, couvrant la planification pour la durabilité." } },
    { id: "module_8", num: "08", icon: "🚀", gradient: "linear-gradient(135deg, #ff0844, #ffb199)", moduleLabel: { ar: "مقياس 08", en: "Module 08", fr: "Module 08" }, title: { ar: "العلامة الشخصية للمدرب", en: "Trainer's Branding", fr: "Branding du Formateur" }, desc: { ar: "هندسة الهوية والتسويق الاستراتيجي لتحويل خبراتك إلى علامة تجارية موثوقة ومربحة ذات انتشار واسع.", en: "Engineering identity and strategic marketing to transform your expertise into a trusted, profitable brand.", fr: "Ingénierie de l'identité et marketing stratégique pour transformer votre expertise en une marque de confiance." } }
  ],
  empowerment: [
    { id: "emp_1", num: "01", icon: "👥", gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", moduleLabel: { ar: "مقياس 01", en: "Module 01", fr: "Module 01" }, title: { ar: "ديناميكيات المجموعات المتقدمة وإدارة الصراعات", en: "Advanced Group Dynamics", fr: "Dynamiques de Groupe Avancées" }, desc: { ar: "احتراف إدارة القاعات الصعبة وتفكيك النزاعات المعقدة.", en: "Mastering difficult rooms and conflict resolution.", fr: "Maîtriser les salles difficiles et la résolution de conflits." } },
    { id: "emp_2", num: "02", icon: "🧩", gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", moduleLabel: { ar: "مقياس 02", en: "Module 02", fr: "Module 02" }, title: { ar: "التصميم التعليمي الرشيق (Agile & SAM)", en: "Agile Instructional Design", fr: "Design Pédagogique Agile" }, desc: { ar: "تجاوز ADDIE نحو نماذج التصميم السريع لبناء حقائب مرنة.", en: "Moving beyond ADDIE to agile models for flexible design.", fr: "Au-delà d'ADDIE vers des modèles agiles et flexibles." } },
    { id: "emp_3", num: "03", icon: "🧭", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", moduleLabel: { ar: "مقياس 03", en: "Module 03", fr: "Module 03" }, title: { ar: "الكوتشينج والتوجيه في التدريب", en: "Coaching & Mentoring", fr: "Coaching et Mentorat" }, desc: { ar: "دمج مهارات الكوتشينج لإحداث تحول عميق في أداء الأفراد.", en: "Integrating coaching skills to transform performance.", fr: "Intégrer les compétences de coaching pour transformer la performance." } },
    { id: "emp_4", num: "04", icon: "🎨", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", moduleLabel: { ar: "مقياس 04", en: "Module 04", fr: "Module 04" }, title: { ar: "التيسير البصري والمحاكاة المتقدمة", en: "Visual Facilitation", fr: "Facilitation Visuelle" }, desc: { ar: "تحويل الأفكار لرسومات حية وبناء سيناريوهات محاكاة واقعية.", en: "Transforming ideas into graphic recordings & simulations.", fr: "Transformer les idées en enregistrements graphiques." } },
    { id: "emp_5", num: "05", icon: "💻", gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", moduleLabel: { ar: "مقياس 05", en: "Module 05", fr: "Module 05" }, title: { ar: "تصميم تجارب التعلم المدمج", en: "Blended Learning Design", fr: "Conception du Blended Learning" }, desc: { ar: "بناء رحلات تدمج بين التدريب الحضوري، الافتراضي والذاتي.", en: "Designing journeys blending physical, virtual, and self-paced learning.", fr: "Concevoir des parcours mixant présentiel, virtuel et autonome." } },
    { id: "emp_6", num: "06", icon: "🧠", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", moduleLabel: { ar: "مقياس 06", en: "Module 06", fr: "Module 06" }, title: { ar: "علم الأعصاب الإدراكي للمدربين", en: "Neuroscience in Training", fr: "Neurosciences en Formation" }, desc: { ar: "تعمق في وظائف الدماغ وكيمياء الهرمونات لتعظيم التعلم.", en: "Deep dive into brain functions and hormones to maximize learning.", fr: "Plongée dans les fonctions cérébrales pour optimiser l'apprentissage." } },
    { id: "emp_7", num: "07", icon: "📈", gradient: "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)", moduleLabel: { ar: "مقياس 07", en: "Module 07", fr: "Module 07" }, title: { ar: "تسويق الخدمات وبناء النماذج الربحية", en: "Consulting & Monetization", fr: "Consulting et Monétisation" }, desc: { ar: "الانتقال لمربع المستشار الخبير وبناء نماذج (B2B) للشركات.", en: "Transitioning to expert consultant and building B2B models.", fr: "Transition vers consultant expert et modèles B2B." } },
    { id: "emp_8", num: "08", icon: "💰", gradient: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)", moduleLabel: { ar: "مقياس 08", en: "Module 08", fr: "Module 08" }, title: { ar: "قياس العائد على الاستثمار المعمق", en: "Advanced ROI Analytics", fr: "ROI Avancé" }, desc: { ar: "تحويل التغير السلوكي إلى عائد مالي بمنهجية (Phillips).", en: "Converting behavioral change to financial ROI via Phillips methodology.", fr: "Convertir le changement comportemental en ROI financier." } }
  ],
  consolidation: [
    { id: "con_1", num: "01", icon: "🏛️", gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", moduleLabel: { ar: "مقياس 01", en: "Module 01", fr: "Module 01" }, title: { ar: "إدارة وتأسيس الأكاديميات التدريبية", en: "Training Academy Management", fr: "Gestion des Académies" }, desc: { ar: "استراتيجيات تحويل التدريب إلى مؤسسة ناجحة من النمذجة المالية للتشغيل.", en: "Strategies to build and run a successful training institution.", fr: "Stratégies pour fonder et diriger une institution de formation." } },
    { id: "con_2", num: "02", icon: "🏢", gradient: "linear-gradient(135deg, #093028 0%, #237a57 100%)", moduleLabel: { ar: "مقياس 02", en: "Module 02", fr: "Module 02" }, title: { ar: "هندسة التعلم والتطوير المؤسسي (L&D)", en: "Corporate L&D Engineering", fr: "Ingénierie L&D d'Entreprise" }, desc: { ar: "ربط مسارات التدريب بأهداف البيزنس وإدارة المواهب والتعاقب.", en: "Aligning training paths with business goals and talent management.", fr: "Aligner la formation sur les objectifs business et les talents." } },
    { id: "con_3", num: "03", icon: "👑", gradient: "linear-gradient(135deg, #141e30 0%, #243b55 100%)", moduleLabel: { ar: "مقياس 03", en: "Module 03", fr: "Module 03" }, title: { ar: "الكوتشينج التنفيذي والقيادي", en: "Executive Coaching", fr: "Coaching Exécutif" }, desc: { ar: "دمج مهارات الكوتشينج لإحداث تحول عميق في أداء الأفراد وتطوير القيادات.", en: "Integrating coaching skills to transform performance.", fr: "Intégrer les compétences de coaching pour transformer la performance." } },
    { id: "con_4", num: "04", icon: "🌐", gradient: "linear-gradient(135deg, #3a1c71 0%, #d76d77 100%)", moduleLabel: { ar: "مقياس 04", en: "Module 04", fr: "Module 04" }, title: { ar: "الاعتمادات الدولية وضمان الجودة", en: "Global Accreditations & QA", fr: "Accréditations Mondiales & QA" }, desc: { ar: "تطبيق معايير الجودة الدولية لضمان استيفاء شروط الاعتمادات الأكاديمية والمهنية.", en: "Applying ISO quality standards and ensuring compliance.", fr: "Application des normes de qualité ISO et conformité." } },
    { id: "con_5", num: "05", icon: "🎯", gradient: "linear-gradient(135deg, #4b1248 0%, #f0c27b 100%)", moduleLabel: { ar: "مقياس 05", en: "Module 05", fr: "Module 05" }, title: { ar: "المناهج المبنية على الكفاءات", en: "Competency-Based Curricula", fr: "Programmes Basés sur les Compétences" }, desc: { ar: "تصميم وتقييم مسارات تعليمية مبنية على إتقان الكفاءات والمهارات الفعلية.", en: "Designing educational pathways based on actual mastery of skills.", fr: "Conception de parcours basés sur la maîtrise réelle." } },
    { id: "con_6", num: "06", icon: "⚡", gradient: "linear-gradient(135deg, #283048 0%, #859398 100%)", moduleLabel: { ar: "مقياس 06", en: "Module 06", fr: "Module 06" }, title: { ar: "قيادة التحول الرقمي المتقدم", en: "Leading EdTech Transformation", fr: "Leadership en Transformation Numérique" }, desc: { ar: "قيادة التحول الرقمي وتوظيف الذكاء الاصطناعي والأتمتة في التدريب.", en: "Leading digital transformation and utilizing AI in training.", fr: "Mener la transformation numérique et utiliser l'IA en formation." } },
    { id: "con_7", num: "07", icon: "⚖️", gradient: "linear-gradient(135deg, #000000 0%, #434343 100%)", moduleLabel: { ar: "مقياس 07", en: "Module 07", fr: "Module 07" }, title: { ar: "اقتصاديات المعرفة والملكية الفكرية", en: "Knowledge Economics & IP", fr: "Économie du Savoir et PI" }, desc: { ar: "حماية وتسويق الملكية الفكرية وتحويل الخبرات إلى أصول معرفية تدر دخلاً.", en: "Protecting and marketing IP, turning expertise into revenue assets.", fr: "Protéger et commercialiser la PI, transformant l'expertise en revenus." } },
    { id: "con_8", num: "08", icon: "🔬", gradient: "linear-gradient(135deg, #314755 0%, #26a0da 100%)", moduleLabel: { ar: "مقياس 08", en: "Module 08", fr: "Module 08" }, title: { ar: "البحث العلمي والابتكار البيداغوجي", en: "Scientific Research in L&D", fr: "Recherche Scientifique en L&D" }, desc: { ar: "استخدام المنهجية العلمية والابتكار البيداغوجي لقياس وتطوير أثر التدريب.", en: "Using scientific methodology to measure and develop training impact.", fr: "Utiliser la méthodologie pour mesurer l'impact de la formation." } }
  ]
};

const _inst: LocalizedString = { ar: "د. بلال عويش", en: "Dr. Bilal Aouiche", fr: "Dr. Bilal Aouiche" };
const _dV: LocalizedString = { ar: "15 دقيقة", en: "15 Mins", fr: "15 Mins" };
const _dD: LocalizedString = { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" };
const _iV = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80";
const _iD = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80";

// Standard Generator for repetitive modules to keep payload pristine and high-performance
function generateModuleLessons(modPrefix: string, baseTopic: LocalizedString, count = 12): LessonData[] {
  const list: LessonData[] = [];
  for (let i = 1; i <= count; i++) {
    const isVideo = i % 2 !== 0;
    const pad = String(i).padStart(2, '0');
    list.push({
      id: `${modPrefix}_l${i}`,
      type: isVideo ? 'video' : 'doc',
      title: {
        ar: isVideo ? `الدرس ${pad}: استراتيجيات ${baseTopic.ar}` : `تطبيق ${pad}: نماذج ${baseTopic.ar}`,
        en: isVideo ? `Lesson ${pad}: ${baseTopic.en} Strategies` : `Practice ${pad}: ${baseTopic.en} Models`,
        fr: isVideo ? `Leçon ${pad} : Stratégies de ${baseTopic.fr}` : `Pratique ${pad} : Modèles de ${baseTopic.fr}`
      },
      instructor: _inst,
      duration: isVideo ? _dV : _dD,
      img: isVideo ? _iV : _iD,
      desc: {
        ar: `محتوى تعليمي تطبيقي شامل يغطي أهم النماذج والتطبيقات العملية لهذا المحور.`,
        en: `Comprehensive applied learning content covering core models and practical applications.`,
        fr: `Contenu pédagogique appliqué couvrant les modèles clés et applications pratiques.`
      },
      video_id: isVideo ? "PHya0gprvH8" : undefined,
      action_url: isVideo ? "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" : "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing",
      doc_preview: !isVideo ? "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" : undefined
    });
  }
  return list;
}

// -------------------------------------------------------------
// Detailed Lessons Database
// -------------------------------------------------------------
export const allLessonsDB: Record<string, LessonData[]> = {
  // Foundation Module 1 (The canonical detailed lessons)
  module_1: [
    { id: "ax1_l2", type: "doc", title: { ar: "نظريات تعلم الكبار", en: "Adult Learning Theories", fr: "Théories d'Apprentissage" }, instructor: _inst, duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" }, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80", desc: { ar: "ملف يشرح نظرية نولز وتطبيقاتها العملية في قاعة التدريب.", en: "Document explaining Knowles theory and practical applications.", fr: "Document expliquant la théorie de Knowles et ses applications." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l3", type: "video", title: { ar: "الأسس العصبية للتعلم", en: "Neuro foundations", fr: "Bases Neurocognitives" }, instructor: _inst, duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" }, img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80", desc: { ar: "كيف يعمل الدماغ أثناء التعلم؟ دور الحصين واللدونة العصبية.", en: "How the brain works during learning. The role of hippocampus and plasticity.", fr: "Le fonctionnement du cerveau durant l'apprentissage." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
    { id: "ax1_l4", type: "doc", title: { ar: "تشريح الذاكرة والانتباه", en: "Memory Anatomy", fr: "Anatomie de la Mémoire" }, instructor: _inst, duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" }, img: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&q=80", desc: { ar: "مقال معمق حول حدود الانتباه وكيفية الحفاظ عليه في الجلسات الطويلة.", en: "In-depth article on attention limits and engagement in long sessions.", fr: "Article approfondi sur les limites de l'attention." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l5", type: "video", title: { ar: "استراتيجيات الاستبقاء", en: "Retention Strategies", fr: "Stratégies de Rétention" }, instructor: _inst, duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" }, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80", desc: { ar: "تطبيق التكرار المتباعد وتقنيات الاسترجاع النشط لضمان عدم النسيان.", en: "Spaced repetition and active retrieval techniques to consolidate memory.", fr: "Répétition espacée et rappel actif." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
    { id: "ax1_l6", type: "doc", title: { ar: "تطبيقات الذاكرة العاملة", en: "Working Memory", fr: "Mémoire de Travail" }, instructor: _inst, duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" }, img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80", desc: { ar: "كيفية تقليل العبء المعرفي وتصميم شرائح مريحة للذاكرة.", en: "Reducing cognitive load and structuring memory-friendly slides.", fr: "Réduire la charge cognitive et structurer les diapos." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l7", type: "video", title: { ar: "أنماط التعلم المفضلة", en: "Learning Styles", fr: "Styles d'Apprentissage" }, instructor: _inst, duration: { ar: "14 دقيقة", en: "14 Mins", fr: "14 Mins" }, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", desc: { ar: "فهم أنماط التعلم المختلفة وكيفية تلبية احتياجات الجميع.", en: "Understanding various learning styles and addressing diverse audience needs.", fr: "Comprendre les profils et styles d'apprentissage." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
    { id: "ax1_l8", type: "doc", title: { ar: "مقياس VARK وتحليله", en: "VARK Model", fr: "Modèle VARK" }, instructor: _inst, duration: { ar: "8 د قراءة", en: "8 Mins Read", fr: "8 Mins Lecture" }, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80", desc: { ar: "استبيان وتحليل علمي لاكتشاف النمط الغالب لدى متدربيك.", en: "Assessment questionnaire to detect dominant modalities in your audience.", fr: "Questionnaire d'analyse des modalités sensorielles." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l9", type: "video", title: { ar: "تصميم التجربة التعليمية", en: "Experience Design", fr: "Design de l'Expérience" }, instructor: _inst, duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" }, img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80", desc: { ar: "دمج المفاهيم لبناء رحلة تدريبية متكاملة عالية التفاعل.", en: "Synthesizing concepts into a cohesive, high-engagement learning journey.", fr: "Conception d'une expérience d'apprentissage complète." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
    { id: "ax1_l10", type: "doc", title: { ar: "دليل البيئة المحفزة", en: "Motivating Environment", fr: "Environnement Motivant" }, instructor: _inst, duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" }, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", desc: { ar: "خطوات عملية لتهيئة القاعة فيزيائياً ونفسياً للتحفيز.", en: "Practical steps to optimize physical and psychological safety in the room.", fr: "Guide d'aménagement de l'environnement physique et psychologique." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l11", type: "video", title: { ar: "قياس مخرجات التعلم", en: "Measuring Outcomes", fr: "Mesurer les Résultats" }, instructor: _inst, duration: { ar: "16 دقيقة", en: "16 Mins", fr: "16 Mins" }, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", desc: { ar: "كيف تتأكد أن متدربيك قد تعلموا بالفعل؟ استراتيجيات التقييم.", en: "Authentic assessment strategies to verify real-world competence.", fr: "Stratégies d'évaluation et de mesure des acquis." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
    { id: "ax1_l12", type: "doc", title: { ar: "نماذج التقييم المعرفي", en: "Assessment Models", fr: "Modèles d'Évaluation" }, instructor: _inst, duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" }, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", desc: { ar: "قوالب جاهزة لتقييم الأداء يمكن استخدامها مباشرة في دوراتك.", en: "Ready-to-use rubrics and performance evaluation templates.", fr: "Grilles d'évaluation et modèles pratiques." }, action_url: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing", doc_preview: "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview" },
    { id: "ax1_l1", type: "video", title: { ar: "ملخص ومقدمة الأندراغوجيا", en: "Intro to Andragogy", fr: "Intro à l'Andragogie" }, instructor: { ar: "د. مريم منادي", en: "Dr. Maryam Menadi", fr: "Dr. Maryam Menadi" }, duration: { ar: "15 دقيقة", en: "15 Mins", fr: "15 Mins" }, img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80", desc: { ar: "نظرة عامة على مبادئ تعليم الكبار واختلافاتها الجوهرية عن البيداغوجيا.", en: "Core overview of andragogical paradigms vs traditional pedagogy.", fr: "Vue d'ensemble sur l'andragogie et ses distinctions fondamentales." }, video_id: "PHya0gprvH8", action_url: "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr" },
  ],
  module_2: generateModuleLessons('ax2', { ar: "التيسير الكاريزمي ولغة الجسد", en: "Charismatic Facilitation & Body Language", fr: "Facilitation Charismatique" }),
  module_3: generateModuleLessons('ax3', { ar: "الهندسة التعليمية وتصميم الحقائب", en: "Instructional Engineering & Package Design", fr: "Ingénierie Pédagogique" }),
  module_4: generateModuleLessons('ax4', { ar: "الابتكار البيداغوجي والتلعيب", en: "Pedagogical Innovation & Gamification", fr: "Innovation et Ludification" }),
  module_5: generateModuleLessons('ax5', { ar: "التحول الرقمي والذكاء الاصطناعي", en: "Digital Transformation & AI", fr: "Transformation Numérique & IA" }),
  module_6: generateModuleLessons('ax6', { ar: "تحليلات الأثر وعائد التدريب", en: "Impact Analytics & ROI", fr: "Analytique d'Impact & ROI" }),
  module_7: generateModuleLessons('ax7', { ar: "الحوكمة الاستراتيجية وإدارة المؤسسات", en: "Strategic Governance & Academy Management", fr: "Gouvernance Stratégique" }),
  module_8: generateModuleLessons('ax8', { ar: "العلامة الشخصية وبناء الهوية", en: "Trainer Branding & Influence", fr: "Branding du Formateur" }),

  // Empowerment Modules
  emp_1: generateModuleLessons('e1', { ar: "ديناميكيات المجموعات وإدارة الصراعات", en: "Group Dynamics & Conflict Resolution", fr: "Dynamiques de Groupe" }),
  emp_2: generateModuleLessons('e2', { ar: "التصميم التعليمي الرشيق (Agile & SAM)", en: "Agile & SAM Instructional Design", fr: "Design Agile & SAM" }),
  emp_3: generateModuleLessons('e3', { ar: "الكوتشينج والتوجيه التنفيذي", en: "Executive Coaching & Mentoring", fr: "Coaching et Mentorat" }),
  emp_4: generateModuleLessons('e4', { ar: "التيسير البصري والمحاكاة الميدانية", en: "Visual Facilitation & Simulation", fr: "Facilitation Visuelle" }),
  emp_5: generateModuleLessons('e5', { ar: "تصميم رحلات التعلم المدمج", en: "Blended Learning Architecture", fr: "Architecture Blended Learning" }),
  emp_6: generateModuleLessons('e6', { ar: "علوم الأعصاب الإدراكية في التدريب", en: "Cognitive Neuroscience in Training", fr: "Neurosciences Cognitives" }),
  emp_7: generateModuleLessons('e7', { ar: "تسويق الحلول واستشارات الشركات", en: "Corporate Solutions & Consulting", fr: "Consulting et Solutions B2B" }),
  emp_8: generateModuleLessons('e8', { ar: "التحليل المالي المتقدم للعائد", en: "Advanced Financial ROI & Phillips", fr: "Analytique Avancée du ROI" }),

  // Consolidation Modules
  con_1: generateModuleLessons('c1', { ar: "تأسيس وتشغيل الأكاديميات الاحترافية", en: "Founding & Operating Training Academies", fr: "Gestion des Académies" }),
  con_2: generateModuleLessons('c2', { ar: "هندسة التعلم والتطوير المؤسسي (L&D)", en: "Corporate L&D Engineering", fr: "Ingénierie L&D d'Entreprise" }),
  con_3: generateModuleLessons('c3', { ar: "الكوتشينج القيادي المتقدم ومعايير ICF", en: "ICF Executive Leadership Coaching", fr: "Coaching Exécutif ICF" }),
  con_4: generateModuleLessons('c4', { ar: "الاعتمادات الدولية ونظم الجودة ISO", en: "International Accreditations & ISO", fr: "Accréditations & Normes ISO" }),
  con_5: generateModuleLessons('c5', { ar: "هندسة المناهج المبنية على الكفاءات CBE", en: "Competency-Based Education Engineering", fr: "Ingénierie des Cursus CBE" }),
  con_6: generateModuleLessons('c6', { ar: "قيادة التحول الرقمي وأتمتة التعليم", en: "Leading Digital EdTech & Automation", fr: "Transformation Numérique & EdTech" }),
  con_7: generateModuleLessons('c7', { ar: "اقتصاديات المعرفة وتثمين الملكية الفكرية", en: "Knowledge Economics & IP Licensing", fr: "Économie du Savoir et Propriété Intellectuelle" }),
  con_8: generateModuleLessons('c8', { ar: "البحث العلمي والنشر في المجلات المحكمة", en: "Scientific Research & Peer-Reviewed Publishing", fr: "Recherche Scientifique & Publications" }),
};

// -------------------------------------------------------------
// Quizzes Database generator
// -------------------------------------------------------------
export function getQuizzesForModule(moduleId: string, lang: LangKey): QuizItem[] {
  // Return 6 distinct quizzes for any given module
  const titles = {
    ar: [
      "تقييم 1: المفاهيم والأسس الجوهرية",
      "تقييم 2: المنهجيات والآليات التطبيقية",
      "تقييم 3: دراسات الحالة ونمذجة المواقف",
      "تقييم 4: الأدوات والاستراتيجيات المتقدمة",
      "تقييم 5: التحسين المستمر وضمان الجودة",
      "تقييم 6: التطبيقات الميدانية والقياس"
    ],
    en: [
      "Quiz 1: Core Concepts & Foundations",
      "Quiz 2: Methodologies & Applied Mechanisms",
      "Quiz 3: Case Studies & Situational Modeling",
      "Quiz 4: Advanced Tools & Strategies",
      "Quiz 5: Continuous Improvement & QA",
      "Quiz 6: Field Execution & Measurement"
    ],
    fr: [
      "Quiz 1 : Concepts et Fondements Clés",
      "Quiz 2 : Méthodologies et Mécanismes Appliqués",
      "Quiz 3 : Études de Cas et Modélisation",
      "Quiz 4 : Outils et Stratégies Avancées",
      "Quiz 5 : Amélioration Continue et Qualité",
      "Quiz 6 : Déploiement Terrain et Mesure"
    ]
  };

  const pool = [
    {
      q: {
        ar: "ما هي الركيزة الأساسية لتحقيق أعلى مستويات الفاعلية في هذا المحور التدريبي؟",
        en: "What is the core pillar to achieve maximum effectiveness in this training domain?",
        fr: "Quel est le pilier fondamental pour garantir une efficacité maximale dans ce domaine ?"
      },
      options: {
        ar: ["الاستناد إلى المنهج العلمي وربط النظريات بالتطبيق الميداني", "الحفظ النظري للمفاهيم دون ممارسة", "الاعتماد الحصري على الأدوات التكنولوجية فقط", "تجاهل التغذية الراجعة من المتدربين"],
        en: ["Relying on scientific foundations and bridging theory with practice", "Pure theoretical memorization without application", "Exclusively relying on technology tools alone", "Ignoring participant feedback"],
        fr: ["L'ancrage scientifique et la liaison directe entre théorie et pratique", "La mémorisation théorique sans mise en situation", "L'usage exclusif de la technologie seule", "Ignorer les retours des apprenants"]
      },
      ans: 0,
      hint: {
        ar: "ابحث عن الخيار الذي يجمع بين الأساس العلمي الرصين والتطبيق العملي.",
        en: "Look for the option bridging scientific rigour with real-world application.",
        fr: "Cherchez l'option combinant rigueur scientifique et application concrète."
      },
      explanation: {
        ar: "التكامل بين المعرفة العلمية والممارسة التطبيقية هو الضمان الأوحد لترسيخ المهارات وإحداث أثر مستدام.",
        en: "The integration between scientific insights and practical drill is the primary driver of sustainable impact.",
        fr: "L'intégration entre fondements scientifiques et pratique concrète garantit un impact pérenne."
      }
    },
    {
      q: {
        ar: "كيف يسهم القياس الدوري لمؤشرات الأداء في حوكمة العملية التدريبية؟",
        en: "How does periodic KPI measurement contribute to training governance?",
        fr: "Comment la mesure périodique des KPI contribue-t-elle à la gouvernance de la formation ?"
      },
      options: {
        ar: ["يساعد في معاقبة المقصرين فقط", "يكتشف الفجوات مبكراً ويوجه التحسين المستمر وإعادة توجيه الموارد", "يزيد من الأعباء البيروقراطية دون فائدة", "يقتصر دوره على مرحلة التخطيط المبدئي"],
        en: ["It only serves to punish low performers", "Detects gaps early, guiding continuous improvement and resource allocation", "Increases bureaucratic overhead with no real value", "Is strictly confined to initial planning"],
        fr: ["Ne sert qu'à sanctionner les participants", "Détecte les écarts tôt, guidant l'amélioration continue et l'allocation des ressources", "Augmente la bureaucratie sans valeur ajoutée", "Se limite à la phase de planification initiale"]
      },
      ans: 1,
      hint: {
        ar: "فكر في دور المتابعة الاستباقية في اتخاذ القرارات القائمة على البيانات.",
        en: "Think about proactive decision-making driven by verified metrics.",
        fr: "Pensez au rôle proactif de la prise de décision guidée par les données."
      },
      explanation: {
        ar: "المؤشرات الكمية والنوعية تمكن القائمين على التدريب من إجراء تدخلات تصحيحية استباقية قبل تفاقم الانحرافات.",
        en: "Metrics empower stakeholders to apply proactive corrective interventions before deviations compound.",
        fr: "Les indicateurs permettent d'effectuer des ajustements proactifs avant que les écarts ne s'amplifient."
      }
    },
    {
      q: {
        ar: "ما المعيار الحاسم لتقييم نجاح نقل أثر التعلم إلى بيئة العمل الفعلية؟",
        en: "What is the critical criterion for evaluating training transfer to the workplace?",
        fr: "Quel est le critère critique pour évaluer le transfert des acquis en milieu de travail ?"
      },
      options: {
        ar: ["نسبة الحضور في القاعة فقط", "ابتسامة المتدربين أثناء الاستراحة", "ظهور سلوكيات ومهارات جديدة ومستدامة تنعكس على جودة الأداء والنتائج", "حجم الحقيبة التدريبية المطبوعة"],
        en: ["Attendance rate alone", "Participant smiles during the break", "Emergence of new, sustainable on-the-job behaviors reflecting on quality and results", "Physical thickness of the training manual"],
        fr: ["Le taux de présence uniquement", "La satisfaction immédiate pendant la pause", "L'apparition de nouveaux comportements professionnels durables améliorant la qualité et les résultats", "L'épaisseur du manuel imprimé"]
      },
      ans: 2,
      hint: {
        ar: "المعيار الحقيقي يُقاس دائماً بالتغير السلوكي الملموس والمستدام في الميدان.",
        en: "True impact is measured by visible, sustained behavioral shift on the job.",
        fr: "Le véritable impact se mesure par un changement comportemental durable sur le terrain."
      },
      explanation: {
        ar: "الغاية الكبرى للتدريب الاحترافي تتجاوز استيعاب المعرفة إلى التطبيق اليومي الفاعل في بيئة العمل.",
        en: "The primary objective of training transcends comprehension to daily operational execution.",
        fr: "L'objectif ultime de la formation dépasse l'assimilation pour atteindre la pratique quotidienne."
      }
    },
    {
      q: {
        ar: "عند تصميم الأنشطة والتمارين، ما المبدأ البيداغوجي الذي يجب احترامه بالدرجة الأولى؟",
        en: "When designing activities and exercises, which pedagogical principle must be respected primarily?",
        fr: "Lors de la conception d'activités, quel principe pédagogique doit primer ?"
      },
      options: {
        ar: ["تعقيد الأسئلة لإرباك المتدرب", "التدرج من السهل إلى المركب مع وضوح الهدف ومعايير التقييم", "إلغاء التفاعل الجماعي والاعتماد على الفردية", "تقديم الإجابات الجاهزة مسبقاً"],
        en: ["Complicating questions to confuse learners", "Scaffolding from simple to complex with clear objectives and rubrics", "Eliminating group interaction in favor of pure isolation", "Providing ready-made answers upfront"],
        fr: ["Complexifier pour déstabiliser l'apprenant", "La progressivité pédagogique du simple au complexe avec des critères limpides", "Supprimer le travail de groupe au profit de l'isolement", "Fournir les réponses toutes faites d'avance"]
      },
      ans: 1,
      hint: {
        ar: "التدرج المعرفي يبني الثقة ويحفز الانتقال السلس نحو حل المشكلات المركبة.",
        en: "Cognitive progression fosters confidence and guides smooth transitions to complex problem solving.",
        fr: "La progression cognitive renforce la confiance vers la résolution de cas complexes."
      },
      explanation: {
        ar: "التدرج المنهجي يضمن ترسيخ المكتسبات ويمنع حدوث الإحباط أو العبء المعرفي الزائد.",
        en: "Systematic scaffolding ensures concept retention and prevents cognitive overload.",
        fr: "La progression méthodique sécurise l'ancrage et prévient la surcharge cognitive."
      }
    },
    {
      q: {
        ar: "ما دور التغذية الراجعة التكوينية (Formative Feedback) أثناء مسار التعلم؟",
        en: "What is the role of formative feedback during the learning journey?",
        fr: "Quel est le rôle du feedback formatif durant le parcours d'apprentissage ?"
      },
      options: {
        ar: ["تصحيح المسار فورياً وتمكين المتدرب من التأمل الذاتي وإتقان الكفاءة", "إعطاء علامة إقصائية غير قابلة للمراجعة", "تأجيل التوجيه حتى نهاية البرنامج السنوي", "المقارنة السلبية بين المشاركين لإثارة التوتر"],
        en: ["Immediate course correction, empowering self-reflection and competency mastery", "Assigning irreversible failing grades", "Delaying guidance until year-end", "Negative peer comparisons to induce stress"],
        fr: ["Corriger la trajectoire immédiatement, stimulant l'autoréflexion et la maîtrise de la compétence", "Attribuer une note éliminatoire définitive", "Reporter le guidage à la fin de l'année", "Faire des comparaisons négatives entre pairs"]
      },
      ans: 0,
      hint: {
        ar: "التغذية الراجعة التكوينية تعمل كمرآة ذكية توجه المتعلم خطوة بخطوة.",
        en: "Formative feedback acts as an adaptive mirror guiding the learner step-by-step.",
        fr: "Le feedback formatif agit comme un miroir guidant l'apprenant pas à pas."
      },
      explanation: {
        ar: "تعد التغذية الراجعة المستمرة أحد أهم عوامل تسريع التعلم وبناء الاستقلالية المهنية لدى المتدربين.",
        en: "Continuous formative feedback is a top accelerator of learning agility and learner autonomy.",
        fr: "Le feedback continu est l'un des plus puissants accélérateurs de l'autonomie professionnelle."
      }
    },
    {
      q: {
        ar: "كيف نضمن الاستدامة وتجنب تراجع الأداء بعد انتهاء التدريب (Post-Training Drift)؟",
        en: "How do we ensure sustainability and prevent post-training performance drift?",
        fr: "Comment assurer la durabilité et prévenir la régression post-formation ?"
      },
      options: {
        ar: ["بإنهاء العلاقة فور توزيع الشهادات", "بوضع آليات متابعة منتظمة، وجلسات كوتشينج، ومجتمعات ممارسة مهنية", "بالاكتفاء باختبار ورقي وحيد", "بتغيير موضوع التدريب كلياً"],
        en: ["Terminating all contact immediately upon certificate distribution", "Establishing regular follow-up mechanisms, coaching sessions, and communities of practice", "Relying strictly on a single paper quiz", "Completely changing the training topic"],
        fr: ["En rompant tout contact dès la remise des diplômes", "En instaurant des mécanismes de suivi, des séances de coaching et des communautés de pratique", "En se contentant d'un seul examen sur table", "En changeant totalement d'objet de formation"]
      },
      ans: 1,
      hint: {
        ar: "الاستدامة تتطلب دعماً ومرافقة في الميدان لتثبيت العادات الجديدة.",
        en: "Sustainability requires on-the-ground reinforcement to anchor new habits.",
        fr: "La durabilité exige un accompagnement de terrain pour ancrer les nouvelles habitudes."
      },
      explanation: {
        ar: "المتابعة اللاحقة والمجتمعات التشاركية تحول التدريب من حدث معزول إلى مسار نمو وتطوير مستمر.",
        en: "Follow-up workflows and peer communities transform training from an isolated event into ongoing mastery.",
        fr: "Le suivi et les communautés collaboratives transforment la formation en un continuum de développement."
      }
    }
  ];

  return titles[lang].map((title, quizIdx) => ({
    title,
    questions: pool.map((item, qIdx) => ({
      q: `${qIdx + 1}. ${item.q[lang]}`,
      options: item.options[lang],
      ans: item.ans,
      hint: item.hint[lang],
      explanation: item.explanation[lang]
    }))
  }));
}

// -------------------------------------------------------------
// Final Exam Modules Essay Questions
// -------------------------------------------------------------
export const finalExamQuestions: Record<string, LocalizedString[]> = {
  m1: [
    { ar: "كيف توظف مبدأ الحاجة للمعرفة لدى المتدربين؟ *", en: "How do you apply adult need-to-know principle? *", fr: "Comment appliquer le besoin d'apprendre des adultes ? *" },
    { ar: "كيف تعالج انخفاض انتباه المتدربين أثناء الجلسة؟ *", en: "How to manage trainee attention drop in session? *", fr: "Comment gérer la baisse d'attention en session ? *" },
    { ar: "كيف تطبق التكرار المتباعد لترسيخ المهارات؟ *", en: "How to apply spaced repetition for skills? *", fr: "Comment appliquer la répétition espacée des compétences ? *" },
    { ar: "كيف تكيف تدريبك مع النمط الحركي؟ *", en: "How to adapt training to kinesthetic style? *", fr: "Comment adapter la formation au style kinesthésique ? *" },
    { ar: "ما أثر التغذية الراجعة على دافعية المتدربين؟ *", en: "How does formative feedback boost trainee motivation? *", fr: "Quel est l'impact du feedback sur la motivation ? *" }
  ],
  m2: [
    { ar: "كيف توظف لغة الجسد لبناء الألفة؟ *", en: "How to use body language for rapport? *", fr: "Comment utiliser le langage corporel pour le contact ? *" },
    { ar: "كيف تتحكم بنبرات صوتك لكسر الرتابة؟ *", en: "How to control voice pitch against monotony? *", fr: "Comment moduler sa voix contre la monotonie ? *" },
    { ar: "كيف تبني قصة تدريبية متكاملة الأركان؟ *", en: "How to structure an impactful training story? *", fr: "Comment structurer une histoire pédagogique percutante ? *" },
    { ar: "كيف تتعامل بحزم ودبلوماسية مع المتعالي؟ *", en: "How to diplomatically handle arrogant participant? *", fr: "Comment gérer diplomatiquement un apprenant arrogant ? *" },
    { ar: "كيف تتغلب على رهبة المسرح قبل التدريب؟ *", en: "How to conquer stage fright before presenting? *", fr: "Comment surmonter le trac avant de former ? *" }
  ],
  m3: [
    { ar: "قارن بين نموذج ADDIE ونماذج التصميم السريع. *", en: "Compare ADDIE model with rapid instructional design. *", fr: "Comparez le modèle ADDIE et le design rapide. *" },
    { ar: "صغ هدفاً تدريبياً مركباً بمعايير SMART. *", en: "Formulate a composite SMART training objective. *", fr: "Formulez un objectif de formation SMART. *" },
    { ar: "كيف تطبق استراتيجية التجزئة بالحقيبة التدريبية؟ *", en: "How to apply chunking in training kits? *", fr: "Comment appliquer le chunking au kit pédagogique ? *" },
    { ar: "ما أهم عناصر دليل المدرب لنجاحه؟ *", en: "What are key elements of trainer manual? *", fr: "Quels sont les éléments clés du manuel ? *" },
    { ar: "صمم سلم تقييم لقياس جودة الإلقاء. *", en: "Design an evaluation rubric for delivery quality. *", fr: "Créez une grille d'évaluation de la présentation. *" }
  ],
  m4: [
    { ar: "كيف تطبق التلعيب في تدريب القيادات؟ *", en: "How to implement gamification in executive training? *", fr: "Comment intégrer la ludification en formation leadership ? *" },
    { ar: "حدد معايير صياغة مشكلة بالتعلم التفاعلي. *", en: "Define criteria for formulating PBL problem. *", fr: "Définissez les critères d'un problème d'apprentissage. *" },
    { ar: "كيف تصمم سيناريو محاكاة واقعي متعدد؟ *", en: "How to design realistic branching simulation scenario? *", fr: "Comment concevoir un scénario de simulation réaliste ? *" },
    { ar: "ما ضوابط نجاح الترفيه التعليمي بالتدريب؟ *", en: "What ensures edutainment success in corporate training? *", fr: "Quelles conditions garantissent le succès de l'edutainment ? *" },
    { ar: "كيف توظف التفكير التصميمي لعلاج التسرب؟ *", en: "How to use design thinking against dropouts? *", fr: "Comment utiliser le design thinking contre l'abandon ? *" }
  ],
  m5: [
    { ar: "كيف تدمج الذكاء الاصطناعي بإعداد الأنشطة التدريبية؟ *", en: "How to integrate generative AI into activities? *", fr: "Comment intégrer l'IA dans les activités ? *" },
    { ar: "قارن بين أنظمة LMS ومنصات LXP التفاعلية. *", en: "Compare traditional LMS with interactive LXP platforms. *", fr: "Comparez les LMS traditionnels aux plateformes LXP. *" },
    { ar: "ما بروتوكولات حماية بيانات قاعة التدريب الافتراضية؟ *", en: "What protocols protect virtual classroom trainee data? *", fr: "Quels protocoles sécurisent les données en classe virtuelle ? *" },
    { ar: "كيف توظف أدوات الأتمتة بالمتابعة بعد التدريب؟ *", en: "How to deploy automation for post-training follow-up? *", fr: "Comment automatiser le suivi après la formation ? *" },
    { ar: "ما المعايير الأخلاقية لاستخدام الذكاء الاصطناعي بالتدريب؟ *", en: "What ethical rules govern AI in training? *", fr: "Quelles règles éthiques encadrent l'IA en formation ? *" }
  ],
  m6: [
    { ar: "اشرح معادلة العائد على الاستثمار التدريبي. *", en: "Explain Jack Phillips training ROI formula clearly. *", fr: "Expliquez la formule du ROI de formation. *" },
    { ar: "كيف تعزل أثر التدريب إحصائياً بدقة؟ *", en: "How to statistically isolate training business impact? *", fr: "Comment isoler statistiquement l'impact de la formation ? *" },
    { ar: "كيف تحول المهارات الناعمة لعائد مالي؟ *", en: "How to monetize soft skills training outcomes? *", fr: "Comment monétiser les acquis des soft skills ? *" },
    { ar: "صمم لوحة مؤشرات لقياس أثر التدريب. *", en: "Design a dashboard measuring leadership training impact. *", fr: "Concevez un tableau de bord d'impact. *" },
    { ar: "كيف تقنع الإدارة بزيادة ميزانية التدريب؟ *", en: "How to pitch executives for budget expansion? *", fr: "Comment convaincre la direction d'augmenter le budget ? *" }
  ],
  m7: [
    { ar: "ما مرتكزات الحوكمة الرشيدة للمؤسسات التدريبية؟ *", en: "What are core pillars of training governance? *", fr: "Quels sont les piliers de la gouvernance ? *" },
    { ar: "ما مراحل نيل اعتماد ISO 10015 التدريبي؟ *", en: "What are stages for ISO 10015 certification? *", fr: "Quelles étapes pour la certification ISO 10015 ? *" },
    { ar: "كيف تبني مصفوفة RACI لمشروع تدريبي؟ *", en: "How to build RACI matrix for training? *", fr: "Comment construire une matrice RACI de formation ? *" },
    { ar: "ما استراتيجيات تسعير الخدمات التدريبية B2B؟ *", en: "What are effective corporate B2B pricing strategies? *", fr: "Quelles stratégies pour la tarification formation B2B ? *" },
    { ar: "كيف تبني شراكات استراتيجية لفتح أسواق؟ *", en: "How to build partnerships opening new markets? *", fr: "Comment nouer des partenariats ouvrant des marchés ? *" }
  ],
  m8: [
    { ar: "كيف يصنع التخصص الدقيق تميزك التدريبي؟ *", en: "How does niche specialization establish trainer authority? *", fr: "Comment la spécialisation établit l'autorité du formateur ? *" },
    { ar: "كيف تستقطب عملاء تدريب عبر LinkedIn؟ *", en: "How to convert LinkedIn followers into clients? *", fr: "Comment convertir des abonnés LinkedIn en clients ? *" },
    { ar: "كيف توظف قصص النجاح لبناء موثوقيتك؟ *", en: "How to use success stories for credibility? *", fr: "Comment utiliser les témoignages pour sa réputation ? *" },
    { ar: "كيف تحمي الملكية الفكرية لحقائبك التدريبية؟ *", en: "How to protect IP of training courses? *", fr: "Comment protéger la propriété intellectuelle des kits ? *" },
    { ar: "كيف تحول خبرتك لأصول رقمية مدرة؟ *", en: "How to turn trainer expertise into digital assets? *", fr: "Comment convertir son expertise en actifs numériques ? *" }
  ]
};
