import { LessonData, QuizItem, LangKey, LocalizedString } from '@/types/curriculum';

const instKam = { ar: "د. كمال منصوري", en: "Dr. Kamel Mansouri", fr: "Dr. Kamel Mansouri" };
const instBel = { ar: "د. عبد الكريم بلخيري", en: "Dr. Abdelkrim Belkheiri", fr: "Dr. Abdelkrim Belkheiri" };
const instSou = { ar: "د. سمية العربي", en: "Dr. Soumaya El Arbi", fr: "Dr. Soumaya El Arbi" };
const instMar = { ar: "د. مريم منادي", en: "Dr. Maryam Menadi", fr: "Dr. Maryam Menadi" };
const instKar = { ar: "أ. كريم زروقي", en: "Karim Zerrougui", fr: "Karim Zerrougui" };
const instSar = { ar: "أ. سارة مرابط", en: "Sara Merabet", fr: "Sara Merabet" };

const vidId = "PHya0gprvH8";
const vidUrl = "https://youtu.be/PHya0gprvH8?si=oVZBKYFWcFVmq7Sr";
const docUrl = "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/edit?usp=sharing";
const docPrev = "https://docs.google.com/document/d/1lD7sOLC7cowcO0zqsltOWz_JPv_yBNQBfmEf9CQINeU/preview";

export const foundationLessonsDB: Record<string, LessonData[]> = {
  module_1: [
    {
      id: "ax1_l1",
      type: "video",
      title: { ar: "ملخص ومقدمة الأندراغوجيا ونظريات تعلم الكبار", en: "Intro to Andragogy & Adult Learning", fr: "Intro à l'Andragogie et Théories" },
      instructor: instMar,
      duration: { ar: "15 دقيقة", en: "15 Mins", fr: "15 Mins" },
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80",
      desc: { ar: "نظرة عامة على مبادئ تعليم الكبار لمالكولم نولز واختلافاتها الجوهرية عن البيداغوجيا التقليدية.", en: "Core overview of Knowles andragogical principles vs traditional pedagogy.", fr: "Vue d'ensemble sur les principes andragogiques de Knowles." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l2",
      type: "doc",
      title: { ar: "دليل تطبيق مبادئ نولز الستة في قاعة التدريب", en: "Guide: Applying Knowles 6 Principles", fr: "Guide: Les 6 Principes de Knowles" },
      instructor: instBel,
      duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
      desc: { ar: "خطوات عملية لربط الحاجة للمعرفة ومفهوم الذات والخبرة السابقة للمتدربين بأنشطة القاعة.", en: "Practical steps to link learner experience and autonomy to room exercises.", fr: "Étapes pratiques pour intégrer l'expérience des apprenants." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax1_l3",
      type: "video",
      title: { ar: "الأسس العصبية والإدراكية لترسيخ التعلم", en: "Neurocognitive Foundations of Learning", fr: "Bases Neurocognitives de l'Apprentissage" },
      instructor: instKam,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
      desc: { ar: "كيف يعالج الدماغ المعلومات الجديدة؟ دور اللدونة العصبية وهرمون الدوبامين في التعلم النشط.", en: "Brain processing mechanisms: role of neural plasticity and dopamine in active learning.", fr: "Traitement cérébral de l'information et plasticité neuronale." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l4",
      type: "doc",
      title: { ar: "تشريح الذاكرة وإدارة منحنى النسيان", en: "Memory Anatomy & The Forgetting Curve", fr: "Anatomie de la Mémoire et Oubli" },
      instructor: instKam,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&q=80",
      desc: { ar: "تحليل منحنى إبنجهاوس وتطبيقاته لكسر وتيرة النسيان وترسيخ الكفاءات المستهدفة.", en: "Ebbinghaus curve analysis and its role in countering cognitive decay.", fr: "Analyse de la courbe d'Ebbinghaus pour ancrer les compétences." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax1_l5",
      type: "video",
      title: { ar: "استراتيجيات الاستبقاء والتكرار المتباعد", en: "Retention Strategies & Spaced Repetition", fr: "Stratégies de Rétention et Répétition" },
      instructor: instSou,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      desc: { ar: "تقنيات عملية لجدولة المراجعات الفاصلة والاسترجاع النشط لضمان ثبات المهارات المكتسبة.", en: "Practical methods for interval reviews and active retrieval practice.", fr: "Techniques pratiques de révision espacée et rappel actif." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l6",
      type: "doc",
      title: { ar: "هندسة العبء المعرفي والذاكرة العاملة", en: "Cognitive Load Theory & Working Memory", fr: "Théorie de la Charge Cognitive" },
      instructor: instBel,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
      desc: { ar: "معايير جون سويلر لتقليل الإجهاد المعرفي الدخيل وتصميم شرائح عرض مريحة للذهن.", en: "Sweller criteria to eliminate extraneous load and design clean visual slides.", fr: "Critères de Sweller pour optimiser les supports de formation." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax1_l7",
      type: "video",
      title: { ar: "أنماط الإدراك وتمايز أساليب التعلم", en: "Perceptual Modalities & Learning Diversity", fr: "Modalités Perceptives et Diversité" },
      instructor: instMar,
      duration: { ar: "14 دقيقة", en: "14 Mins", fr: "14 Mins" },
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      desc: { ar: "فهم الفروق الفردية بين المتدربين وكيفية تصميم أنشطة تلبي الأنماط المتعددة.", en: "Addressing individual learner differences with diversified classroom activities.", fr: "Comprendre les profils variés pour adapter les exercices." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l8",
      type: "doc",
      title: { ar: "أداة تشخيص نمط المتدرب (نموذج VARK التطبيقي)", en: "VARK Diagnostic Assessment Toolkit", fr: "Outil Diagnostic du Modèle VARK" },
      instructor: instSou,
      duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "استبيان عملي وسلالم تقييمية لكشف التفضيلات البصرية والسمعية والحركية لدى المتدربين.", en: "Practical questionnaire assessing visual, auditory, reading, and kinesthetic preferences.", fr: "Questionnaire pratique d'évaluation des préférences sensorielles." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax1_l9",
      type: "video",
      title: { ar: "تصميم التجربة التعليمية الشاملة (LX Design)", en: "Comprehensive Learning Experience (LX) Design", fr: "Conception de l'Expérience Apprenant (LX)" },
      instructor: instBel,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
      desc: { ar: "دمج المفاهيم الإدراكية لبناء رحلة تدريبية متناسقة تبدأ من التهيئة وحتى التطبيق.", en: "Synthesizing cognitive concepts into a seamless end-to-end learning flow.", fr: "Concevoir un parcours pédagogique immersif du début à la fin." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l10",
      type: "doc",
      title: { ar: "دليل تهيئة البيئة النفسية والفيزيائية للقاعة", en: "Physical & Psychological Room Environment Guide", fr: "Guide d'Aménagement Physique et Psychologique" },
      instructor: instKam,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      desc: { ar: "بروتوكولات تجهيز الإضاءة والمقاعد والأمان النفسي لتعزيز المشاركة الإيجابية.", en: "Protocols for room layout, psychological safety, and friction-free engagement.", fr: "Normes d'agencement, sécurité psychologique et dynamique d'échange." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax1_l11",
      type: "video",
      title: { ar: "قياس مخرجات التعلم والتقييم التكويني", en: "Measuring Learning Outcomes & Formative Feedback", fr: "Mesure des Acquis et Feedback Formatif" },
      instructor: instSou,
      duration: { ar: "16 دقيقة", en: "16 Mins", fr: "16 Mins" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "منهجيات التحقق من تحقق الأهداف أثناء الجلسات وتصحيح المسار فورياً.", en: "Formative checks and instant remediation to guarantee learning achievement.", fr: "Méthodes de vérification continue des acquis pendant la session." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax1_l12",
      type: "doc",
      title: { ar: "نماذج التقييم المعرفي وبطاقات الملاحظة الصفيّة", en: "Cognitive Assessment Rubrics & Checklists", fr: "Grilles d'Évaluation Cognitive et Observation" },
      instructor: instBel,
      duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      desc: { ar: "قوالب قابلة للتنزيل لتقييم استيعاب المتدربين وقياس مستوى التفاعل.", en: "Downloadable templates and observation rubrics for classroom mastery.", fr: "Modèles téléchargeables pour évaluer la maîtrise des participants." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_2: [
    {
      id: "ax2_l1",
      type: "video",
      title: { ar: "سيكولوجية الحضور والكاريزما القيادية في القاعة", en: "Stage Presence & Trainer Leadership Charisma", fr: "Présence Scénique et Charisme du Formateur" },
      instructor: instKam,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
      desc: { ar: "كيف تصنع انطباعاً أولياً قوياً ومهيباً وتكتسب ثقة المتدربين منذ اللحظة الأولى.", en: "Mastering the first 90 seconds, executive poise, and establishing instant trainer authority.", fr: "Maîtriser les 90 premières secondes et instaurer une autorité bienveillante." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l2",
      type: "doc",
      title: { ar: "دليل لغة الجسد الاحترافية وقراءة إشارات القاعة", en: "Body Language & Nonverbal Classroom Mastery", fr: "Langage Corporel et Lecture Non-Verbale" },
      instructor: instBel,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      desc: { ar: "الوقفة المتزنة، حركة اليدين المفتوحة، وتفسير إشارات الملل والاعتراض الصامت.", en: "Power postures, open palm gestures, and decoding silent participant resistance.", fr: "Postures d'impact, gestuelle ouverte et décodage des réticences." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax2_l3",
      type: "video",
      title: { ar: "هندسة النبرات الصوتية والإيقاع الخطابي المؤثر", en: "Vocal Dynamics, Pitch & Monotony Control", fr: "Dynamique Vocale et Modulation du Rythme" },
      instructor: instSou,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80",
      desc: { ar: "تمارين التنفس البطني، السيطرة على الوقفات البلاغية، وتغيير طبقات الصوت لجذب الانتباه.", en: "Diaphragmatic breathing, strategic pauses, and modulation against acoustic fatigue.", fr: "Respiration diaphragmatique, silences stratégiques et modulation vocale." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l4",
      type: "doc",
      title: { ar: "مصفوفة التعامل الحازم والدبلوماسي مع الأنماط الصعبة", en: "Handling Challenging Trainee Archetypes", fr: "Gestion des Profils Difficiles en Formation" },
      instructor: instKam,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      desc: { ar: "استراتيجيات عملية للتعامل مع المشكك، الثرثار، الساخر، والمحتكر للنقاش دون إحراج.", en: "Conflict de-escalation protocols for monopolizers, skeptics, and disengaged participants.", fr: "Techniques de désescalade avec les profils perturbateurs et sceptiques." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax2_l5",
      type: "video",
      title: { ar: "فن السرد القصصي التعليمي (Storytelling in Training)", en: "Pedagogical Storytelling & Narrative Arcs", fr: "Storytelling Pédagogique et Narration" },
      instructor: instBel,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80",
      desc: { ar: "هيكل القصة المؤثرة وكيف تحول الأمثلة الجافة إلى تجارب عاطفية ملهمة لا تنسى.", en: "Structuring 3-act narrative arcs to anchor complex technical lessons memorably.", fr: "Structurer des récits captivants pour ancrer des concepts complexes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l6",
      type: "doc",
      title: { ar: "حقيبة ألعاب كسر الجليد وتجديد الطاقة الصفيّة", en: "Icebreakers & Energizers Toolkit", fr: "Kit Brise-Glace et Réactivation d'Énergie" },
      instructor: instMar,
      duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80",
      desc: { ar: "أكثر من 20 تمريناً سريعاً وممتعاً لبناء الألفة وتنشيط الذهن بعد الاستراحات الطويلة.", en: "20+ high-engagement drills to spark social bonding and combat post-lunch dips.", fr: "20+ exercices stimulants pour dynamiser le groupe et briser la glace." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax2_l7",
      type: "video",
      title: { ar: "إدارة الحوار وتوجيه الأسئلة السقراطية الذكية", en: "Facilitating Socratic Inquiry & Group Dialogues", fr: "Dialogue Socratique et Art du Questionnement" },
      instructor: instKam,
      duration: { ar: "17 دقيقة", en: "17 Mins", fr: "17 Mins" },
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
      desc: { ar: "طرح الأسئلة المفتوحة والمحفزة للتفكير وتوجيه مسار النقاش نحو مخرجات الجلسة.", en: "Formulating open-ended prompts that encourage reflection and group consensus.", fr: "Questions ouvertes et facilitation de débats orientés vers les objectifs." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l8",
      type: "doc",
      title: { ar: "دليل الإصغاء النشط والتغذية الراجعة الدقيقة", en: "Active Listening & Constructive Feedback Guide", fr: "Écoute Active et Feedback Constructif" },
      instructor: instSou,
      duration: { ar: "11 د قراءة", en: "11 Mins Read", fr: "11 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80",
      desc: { ar: "إعادة الصياغة، التحقق من الفهم، وتقديم ملاحظات تصحيحية تدعم ثقة المتدرب.", en: "Paraphrasing, validation, and using the sandwich technique constructively.", fr: "Reformulation, validation et délivrance de feedbacks bienveillants." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax2_l9",
      type: "video",
      title: { ar: "قهر رهبة المسرح والسيطرة على القلق الأدائي", en: "Conquering Stage Fright & Performance Anxiety", fr: "Surmonter le Trac et Gérer l'Anxiété Scénique" },
      instructor: instBel,
      duration: { ar: "19 دقيقة", en: "19 Mins", fr: "19 Mins" },
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
      desc: { ar: "تقنيات البرمجة اللغوية وإعادة التأطير المعرفي لتحويل التوتر إلى طاقة حضور إيجابية.", en: "Cognitive reframing and centering drills to channel nervous energy into poise.", fr: "Recadrage cognitif et exercices d'ancrage pour transformer le stress." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l10",
      type: "doc",
      title: { ar: "خريطة الحركة المكانية وتوزيع النظر في القاعة", en: "Spatial Navigation & Eye Contact Matrix", fr: "Cartographie des Déplacements et Contact Visuel" },
      instructor: instMar,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
      desc: { ar: "قواعد الحركة في مثلث التأثير، تجنب المناطق الميتة، ونظرة المسح الشاملة للجمهور.", en: "Triangle navigation, eliminating blind zones, and the lighthouse scanning method.", fr: "Navigation triangulaire, élimination des zones mortes et balayage visuel." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax2_l11",
      type: "video",
      title: { ar: "بناء الألفة والاتصال الوجداني مع الجمهور", en: "Rapport Building & Emotional Synchronization", fr: "Création du Rapport et Connexion Émotionnelle" },
      instructor: instSou,
      duration: { ar: "16 دقيقة", en: "16 Mins", fr: "16 Mins" },
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
      desc: { ar: "مواءمة الإيقاع واللغة مع المتدربين لكسر الحواجز وخلق بيئة تدريبية يسودها التناغم.", en: "Mirroring, matching tone, and fostering high-trust psychological safety.", fr: "Synchronisation verbale et non-verbale pour créer une confiance durable." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax2_l12",
      type: "doc",
      title: { ar: "بطاقة التقييم الذاتي لكاريزما التيسير", en: "Trainer Facilitation Rubric & Self-Audit", fr: "Grille d'Auto-Évaluation du Charisme et Facilitation" },
      instructor: instKam,
      duration: { ar: "10 د قراءة", en: "10 Mins Read", fr: "10 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "استمارة شاملة من 30 معياراً لتقييم الصوت، الإيماءات، التفاعل، وإدارة القاعة.", en: "30-point comprehensive audit sheet evaluating delivery, engagement, and poise.", fr: "Grille d'audit en 30 critères pour évaluer votre posture et prestation." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_3: [
    {
      id: "ax3_l1",
      type: "video",
      title: { ar: "منهجية ADDIE والتصميم التعليمي المنهجي", en: "The ADDIE Framework & Instructional Engineering", fr: "Le Modèle ADDIE et Ingénierie Pédagogique" },
      instructor: instBel,
      duration: { ar: "25 دقيقة", en: "25 Mins", fr: "25 Mins" },
      img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80",
      desc: { ar: "التحليل، التصميم، التطوير، التنفيذ، والتقويم في بناء البرامج التدريبية المعتمدة.", en: "Deep dive into Analysis, Design, Development, Implementation, and Evaluation.", fr: "Analyse, conception, développement, déploiement et évaluation des cursus." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l2",
      type: "doc",
      title: { ar: "صياغة الأهداف السلوكية وفق هرم بلوم المطور", en: "Formulating SMART Behavioral Objectives (Bloom)", fr: "Objectifs Pédagogiques SMART et Taxonomie de Bloom" },
      instructor: instKam,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
      desc: { ar: "قائمة الأفعال السلوكية القابلة للقياس ومعادلة الهدف التدريبي المحكم الخالي من الغموض.", en: "Action verbs glossary and formulation formula to craft measurable goals.", fr: "Verbes d'action et formule mathématique pour formuler des objectifs mesurables." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax3_l3",
      type: "video",
      title: { ar: "استراتيجيات تجزئة المحتوى (Chunking) والتدفق المنطقي", en: "Content Chunking Strategies & Flow Architecture", fr: "Chunking et Structuration Logique du Contenu" },
      instructor: instSou,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "كيف تقسم المادة الضخمة إلى وحدات معرفية ومهارية يسهل هضمها واسترجاعها.", en: "Transforming dense curricula into modular, digestible, and memorable units.", fr: "Découpage de programmes denses en unités modulaires digestes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l4",
      type: "doc",
      title: { ar: "دليل بناء حقيبة المدرب القياسية خطوة بخطوة", en: "Standard Trainer Manual Architecture Guide", fr: "Guide de Conception du Manuel du Formateur" },
      instructor: instBel,
      duration: { ar: "16 د قراءة", en: "16 Mins Read", fr: "16 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "هيكلية دليل المدرب: خطة الجلسة، التعليمات، التوقيت، وحلول التمارين والبدائل.", en: "Full blueprint: lesson plans, timings, facilitator notes, and contingency drills.", fr: "Structure type : scénarios, minutage, consignes et solutions de repli." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax3_l5",
      type: "video",
      title: { ar: "هندسة مذكرة المتدرب وأوراق العمل التفاعلية", en: "Trainee Workbook & Interactive Worksheets", fr: "Conception du Cahier de l'Apprenant" },
      instructor: instMar,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80",
      desc: { ar: "تصميم أنشطة تطبيقية ودراسات حالة تجعل مذكرة المتدرب مرجعاً مهنياً بعد انتهاء الدورة.", en: "Creating self-paced workbooks that serve as actionable desktop guides post-training.", fr: "Conception d'outils et d'études de cas servant de référence post-formation." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l6",
      type: "doc",
      title: { ar: "معايير تصميم العروض التقديمية وتفادي الرصاص القاتل", en: "Visual Slide Deck Design & Anti-Bullet Guidelines", fr: "Conception Visuelle des Slides et Clarté" },
      instructor: instKam,
      duration: { ar: "11 د قراءة", en: "11 Mins Read", fr: "11 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
      desc: { ar: "قاعدة شريحة واحدة لفكرة واحدة، نسب التباين، واختيار الصور والرسوم البيانية الهادفة.", en: "One-idea-per-slide rule, typographic contrast, and intentional visual hierarchy.", fr: "Règle d'une idée par slide, contrastes et hiérarchie visuelle impactante." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax3_l7",
      type: "video",
      title: { ar: "التصميم التعليمي السريع ونموذج SAM المرن", en: "Rapid Instructional Design & Agile SAM Model", fr: "Design Pédagogique Rapide et Modèle SAM" },
      instructor: instBel,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
      desc: { ar: "النماذج الأولية المتكررة لاختبار الحقيبة وتطويرها بسرعة لمواكبة متطلبات الشركات.", en: "Iterative prototyping cycles to build, test, and refine courseware in record time.", fr: "Prototypage itératif pour tester et affiner rapidement les programmes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l8",
      type: "doc",
      title: { ar: "مصفوفة الربط بين الأنشطة والمخرجات المستهدفة", en: "Activity-to-Outcome Alignment Matrix", fr: "Matrice d'Alignement Activités-Compétences" },
      instructor: instSou,
      duration: { ar: "13 د قراءة", en: "13 Mins Read", fr: "13 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      desc: { ar: "جدول تدقيق يضمن أن كل تمرين ونشاط يخدم كفاءة محددة دون إهدار للوقت التدريبي.", en: "Verification rubric guaranteeing 100% purposeful alignment with course competencies.", fr: "Grille d'audit garantissant l'utilité directe de chaque activité." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax3_l9",
      type: "video",
      title: { ar: "بناء دراسات الحالة وسيناريوهات المحاكاة الواقعية", en: "Writing High-Impact Case Studies & Simulations", fr: "Rédaction de Cas Pratiques et Simulations" },
      instructor: instKam,
      duration: { ar: "23 دقيقة", en: "23 Mins", fr: "23 Mins" },
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      desc: { ar: "كيف تكتب دراسة حالة من بيئة العمل المحلية تتضمن معضلات مهنية تحفز التفكير التحليلي.", en: "Crafting realistic workplace dilemma scenarios that drive deep critical debate.", fr: "Créer des dilemmes d'entreprise réalistes stimulant l'analyse critique." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l10",
      type: "doc",
      title: { ar: "معايير تحكيم وضمان جودة الحقائب التدريبية", en: "Courseware Accreditation & QA Audit Checklist", fr: "Audit et Contrôle Qualité des Supports" },
      instructor: instBel,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
      desc: { ar: "المعايير المعتمدة لتقييم الحقيبة التدريبية قبل طرحها للاعتماد الأكاديمي أو المؤسسي.", en: "Standardized rubric for peer-reviewing training packages prior to accreditation.", fr: "Critères officiels d'homologation avant soumission institutionnelle." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax3_l11",
      type: "video",
      title: { ar: "التخطيط الزمني للجلسات وجدول الأنشطة الدقيق", en: "Session Timing, Pacing & Facilitator Run-Sheets", fr: "Minutage des Sessions et Rythme Pédagogique" },
      instructor: instMar,
      duration: { ar: "17 دقيقة", en: "17 Mins", fr: "17 Mins" },
      img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&q=80",
      desc: { ar: "توزيع الوقت بدقة بين العرض والتطبيق والنقاش والاستراحة مع خطط طوارئ لضغط الوقت.", en: "Precision run-sheets balancing lecture, practice, reflection, and buffer margins.", fr: "Gestion rigoureuse du temps entre exposé, pratique et marges de sécurité." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax3_l12",
      type: "doc",
      title: { ar: "قالب الحقيبة التدريبية المتكاملة الجاهز للتعبئة", en: "Turnkey Professional Course Kit Template", fr: "Modèle de Kit Pédagogique Clé en Main" },
      instructor: instKam,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80",
      desc: { ar: "ملف وورد وبوربوينت مجهز بأحدث التنسيقات العالمية لبناء حقيبتك القادمة فوراً.", en: "Ready-to-use template formatted with international instructional design benchmarks.", fr: "Modèle structuré prêt à l'emploi selon les standards internationaux." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_4: [
    {
      id: "ax4_l1",
      type: "video",
      title: { ar: "فلسفة التلعيب (Gamification) في تدريب الكبار", en: "Gamification Philosophy & Adult Engagement", fr: "Philosophie de la Gamification pour Adultes" },
      instructor: instSou,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80",
      desc: { ar: "الفارق بين الألعاب والتلعيب وكيف يحفز نموذج أوكتاليسيس (Octalysis) الدوافع الجوهرية.", en: "Games vs Gamification: Leveraging the Octalysis framework for intrinsic drive.", fr: "Différence entre jeu et gamification : le modèle Octalysis." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l2",
      type: "doc",
      title: { ar: "دليل تصميم ميكانيكا الألعاب (النقاط، الشارات، ولوحات الصدارة)", en: "Game Mechanics: Points, Badges & Leaderboards", fr: "Mécaniques de Jeu : Points, Badges et Classements" },
      instructor: instKar,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&q=80",
      desc: { ar: "كيف توظف نظم المكافآت دون خلق منافسة سامة أو هدم روح التعاون بين فرق العمل.", en: "Designing healthy reward loops that avoid toxic competition and foster teamwork.", fr: "Créer des systèmes de récompense sains favorisant la coopération." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax4_l3",
      type: "video",
      title: { ar: "التفكير التصميمي (Design Thinking) في ابتكار الأنشطة", en: "Design Thinking in Pedagogical Activity Design", fr: "Design Thinking Appliqué aux Activités de Formation" },
      instructor: instBel,
      duration: { ar: "24 دقيقة", en: "24 Mins", fr: "24 Mins" },
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
      desc: { ar: "التعاطف، تحديد التحدي، توليد الأفكار، وبناء نماذج سريعة لتمارين تفاعلية فريدة.", en: "Empathy, definition, ideation, and rapid prototyping of bespoke exercises.", fr: "Empathie, idéation et prototypage rapide d'exercices sur mesure." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l4",
      type: "doc",
      title: { ar: "أدوات التعلم القائم على المشكلات (PBL Toolkit)", en: "Problem-Based Learning (PBL) Implementation", fr: "Kit d'Apprentissage par Problèmes (APP)" },
      instructor: instKam,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "صياغة التحديات المفتوحة وإرشاد المتدربين للبحث والاستكشاف الذاتي وصولاً للحلول.", en: "Formulating open challenges and scaffolding self-directed inquiry toward solutions.", fr: "Formuler des défis ouverts et guider la recherche autonome de solutions." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax4_l5",
      type: "video",
      title: { ar: "هندسة ألعاب المحاكاة ولعب الأدوار المركبة", en: "Designing Complex Simulations & Role-Playing", fr: "Simulation Pédagogique et Jeux de Rôle Complexes" },
      instructor: instSou,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
      desc: { ar: "توزيع بطاقات الأدوار، وضع قواعد اللعبة، وتوجيه المشهد التدريبي نحو الكفاءة.", en: "Role briefings, framing ground rules, and steering live scenarios toward mastery.", fr: "Attribution des rôles, règles du jeu et pilotage vers l'acquisition de compétences." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l6",
      type: "doc",
      title: { ar: "بروتوكول استخلاص الدروس (Debriefing Protocol)", en: "Structured Activity Debriefing & Reflection", fr: "Protocole de Débriefing et Métacognition" },
      instructor: instBel,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
      desc: { ar: "نموذج ماذا؟ ثم ماذا؟ والآن ماذا؟ (What? So What? Now What?) لاستخلاص المكتسبات.", en: "The 3-stage reflection framework turning classroom play into permanent professional insight.", fr: "Modèle de questionnement en 3 temps transformant le jeu en prise de conscience." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax4_l7",
      type: "video",
      title: { ar: "محفزات الإبداع وتقنيات توليد الأفكار البيداغوجية", en: "Creativity Catalysts & SCAMPER in Training", fr: "Catalyseurs de Créativité et Méthode SCAMPER" },
      instructor: instMar,
      duration: { ar: "19 دقيقة", en: "19 Mins", fr: "19 Mins" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "تطبيق استراتيجية SCAMPER وتوليد الأفكار غير المألوفة لتجديد التمارين التدريبية المعتادة.", en: "Using SCAMPER and lateral thinking to reinvent traditional, repetitive workshop drills.", fr: "Méthode SCAMPER et pensée latérale pour réinventer les exercices classiques." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l8",
      type: "doc",
      title: { ar: "بنك الألعاب التدريبية الحركية والذهنية للمدرب المحترف", en: "The Master Trainer's Games & Kinesthetic Bank", fr: "Banque de Jeux Pédagogiques et Dynamiques" },
      instructor: instKar,
      duration: { ar: "16 د قراءة", en: "16 Mins Read", fr: "16 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
      desc: { ar: "دليل مصنف يشمل 25 لعبة تدريبية جاهزة بالتوقيت، الأدوات، والأهداف التعليمية.", en: "Categorized directory of 25 ready-to-run activities with timing and debrief cues.", fr: "Répertoire de 25 activités prêtes à l'emploi avec minutage et consignes." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax4_l9",
      type: "video",
      title: { ar: "التعلم التجريبي وحلقة كولب (Kolb's Experiential Cycle)", en: "Kolb's Experiential Learning Cycle in Action", fr: "Cycle d'Apprentissage Expérientiel de Kolb" },
      instructor: instKam,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      desc: { ar: "التجربة الملموسة، الملاحظة التأملية، المفاهيم المجردة، والتجريب الفعلي في قاعة التدريب.", en: "Concrete experience, reflective observation, abstract concepts, and active experimentation.", fr: "Expérience concrète, observation réflexive et expérimentation active." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l10",
      type: "doc",
      title: { ar: "مصفوفة قياس أثر التلعيب على الاستيعاب والدافعية", en: "Evaluating Gamification ROI & Learner Drive", fr: "Évaluation de l'Impact de la Ludification" },
      instructor: instSou,
      duration: { ar: "11 د قراءة", en: "11 Mins Read", fr: "11 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "مؤشرات موضوعية لقياس استبقاء المعلومات ومعدلات المشاركة ومقارنتها بالتدريب التقليدي.", en: "Quantitative indicators tracking retention improvements vs traditional instructional styles.", fr: "Indicateurs mesurant le gain de mémorisation par rapport au cours classique." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax4_l11",
      type: "video",
      title: { ar: "استراتيجيات الترفيه الهادف (Edutainment with Purpose)", en: "Intentional Edutainment & Humor Boundaries", fr: "Edutainment Stratégique et Rires Pédagogiques" },
      instructor: instBel,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80",
      desc: { ar: "كيف تستخدم الدعابة الذكية والوسائط الفنية دون المساس برصانة وهيبة المحتوى التدريبي.", en: "Using intelligent humor and multimedia without trivializing core curriculum rigor.", fr: "Intégrer l'humour intelligent sans dénaturer la rigueur scientifique." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax4_l12",
      type: "doc",
      title: { ar: "دليل تصميم غرف الهروب التدريبية (Educational Escape Rooms)", en: "Designing Educational Training Escape Rooms", fr: "Conception d'Escape Games Pédagogiques" },
      instructor: instKar,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
      desc: { ar: "خطوات تحويل قاعة التدريب إلى تحدي ألغاز يحل بواسطة المعارف والمهارات المكتسبة.", en: "Step-by-step room conversion into collaborative puzzle challenges solved via new skills.", fr: "Transformer la salle en énigmes coopératives résolues par les compétences du cours." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_5: [
    {
      id: "ax5_l1",
      type: "video",
      title: { ar: "هندسة الأوامر (Prompt Engineering) المتقدمة للمدربين", en: "Prompt Engineering for Curriculum Architecture", fr: "Prompt Engineering pour Concepteurs Pédagogiques" },
      instructor: instKar,
      duration: { ar: "25 دقيقة", en: "25 Mins", fr: "25 Mins" },
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      desc: { ar: "صياغة أوامر برمجية دقيقة للنماذج اللغوية لتوليد الحقائب والخطط وجداول التوقيت بدقة فائقة.", en: "Constructing multi-stage prompts to draft syllabus frameworks, lesson rubrics, and exams.", fr: "Rédiger des prompts complexes pour générer plans de cours et grilles d'évaluation." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l2",
      type: "doc",
      title: { ar: "دليل أفضل 30 أداة ذكاء اصطناعي للمدرب المعاصر", en: "Top 30 AI Tools for Modern Trainers Handbook", fr: "Guide des 30 Meilleurs Outils IA pour Formateurs" },
      instructor: instKam,
      duration: { ar: "18 د قراءة", en: "18 Mins Read", fr: "18 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=80",
      desc: { ar: "دليل مصنف لأدوات توليد العروض، المحاكاة الصوتية، تحويل النص إلى فيديو، وصناعة الاختبارات.", en: "Classified directory: slide generation, voice synthesis, automated test authoring, and video AI.", fr: "Annuaire complet : création de slides, synthèse vocale, quiz IA et vidéo." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax5_l3",
      type: "video",
      title: { ar: "إدارة القاعات الافتراضية التفاعلية (Zoom & Teams Mastery)", en: "Virtual Classroom Management & Facilitation", fr: "Animation de Salles Virtuelles (Zoom & Teams)" },
      instructor: instSar,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&q=80",
      desc: { ar: "الغرف الفرعية (Breakout Rooms)، استطلاعات الرأي الفورية، والسبورات التعاونية لمضاعفة التفاعل.", en: "Breakout room orchestration, live polls, whiteboard collaborations, and keeping cameras on.", fr: "Gestion des sous-salles, sondages instantanés et tableaux blancs partagés." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l4",
      type: "doc",
      title: { ar: "مقارنة منصات التعلم (LMS vs LXP) ومعايير الاختيار", en: "LMS vs LXP: Educational Platform Selection", fr: "LMS vs LXP : Guide de Choix de Plateforme" },
      instructor: instBel,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      desc: { ar: "الفرق بين إدارة التعلم وتجربة التعلم التكيفية ومتطلبات تتبع مؤشرات استكمال المتدربين.", en: "Core differences, SCORM/xAPI compliance, and tracking granular learner analytics.", fr: "Différences majeures, compatibilité SCORM et suivi analytique des apprenants." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax5_l5",
      type: "video",
      title: { ar: "أدوات التفاعل اللحظي (Mentimeter, Kahoot, Miro, Padlet)", en: "Live Polling & Visual Collaboration Tools", fr: "Outils d'Interaction en Direct (Menti, Miro, Kahoot)" },
      instructor: instSou,
      duration: { ar: "19 دقيقة", en: "19 Mins", fr: "19 Mins" },
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
      desc: { ar: "كيف تصنع سحب الكلمات، المسابقات الحية، وخرائط العصف الذهني التعاونية أثناء المحاضرة.", en: "Building word clouds, live gamified quizzes, and collaborative sticky-note mind maps.", fr: "Créer des nuages de mots, des quiz compétitifs et des brainstormings visuels." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l6",
      type: "doc",
      title: { ar: "أتمتة مهام المدرب والمتابعة الذكية للتقارير", en: "Workflow Automation for Trainer Administration", fr: "Automatisation des Tâches Administratives du Formateur" },
      instructor: instKar,
      duration: { ar: "13 د قراءة", en: "13 Mins Read", fr: "13 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "استخدام Zapier و Make لربط استمارات التسجيل بإرسال الشهادات التلقائي ورسائل المتابعة.", en: "Connecting registration forms with automated certificate generation and follow-up emails.", fr: "Lier formulaires, délivrance automatique d'attestations et emails de suivi." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax5_l7",
      type: "video",
      title: { ar: "إنتاج الفيديو التعليمي عالي الجودة بالذكاء الاصطناعي", en: "AI Video Production & Digital Avatars", fr: "Production Vidéo IA et Avatars Numériques" },
      instructor: instSar,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
      desc: { ar: "توظيف الأفاتار الرقمي وتحويل النصوص المكتوبة إلى فيديوهات تعليمية احترافية بأقل جهد.", en: "Using AI avatars, automated subtitle generation, and video synthesis for bite-sized lessons.", fr: "Utilisation d'avatars IA, sous-titrage automatique et vidéos pédagogiques courtes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l8",
      type: "doc",
      title: { ar: "ميثاق أخلاقيات الذكاء الاصطناعي وحماية بيانات المتدربين", en: "AI Ethics & Data Privacy in Learning Environments", fr: "Éthique de l'IA et Confidentialité des Données" },
      instructor: instBel,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
      desc: { ar: "الشفافية في استخدام المحتوى المولد بالذكاء الاصطناعي وحماية سرية الأعمال والشركات.", en: "Transparency in AI usage, copyright considerations, and corporate NDA compliance.", fr: "Transparence pédagogique, propriété intellectuelle et respect du RGPD/confidentialité." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax5_l9",
      type: "video",
      title: { ar: "بناء الاختبارات التكيفية وبنوك الأسئلة الذكية", en: "Adaptive Assessments & AI Question Banks", fr: "Tests Adaptatifs et Banques de Questions Intelligentes" },
      instructor: instKam,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
      desc: { ar: "توليد أسئلة تتباين صعوبتها تلقائياً بحسب إجابة المتدرب لتقييم عميق وموثوق للكفاءات.", en: "Algorithmically shifting question difficulty based on learner mastery in real time.", fr: "Génération de quiz adaptatifs modulant la difficulté selon les réponses de l'apprenant." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l10",
      type: "doc",
      title: { ar: "دليل تصميم التعلم المدمج (Blended Learning Architecture)", en: "Blended Learning Blueprint & Inverted Classrooms", fr: "Architecture de la Formation Hybride (Blended Learning)" },
      instructor: instSou,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      desc: { ar: "استراتيجية الفصل المقلوب والمزج المتوازن بين التعلم الذاتي غير المتزامن واللقاءات الحية.", en: "Flipped classroom implementation: balancing asynchronous self-paced drill with live coaching.", fr: "Stratégie de classe inversée articulant distanciel asynchrone et ateliers synchrones." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax5_l11",
      type: "video",
      title: { ar: "بناء المساعد الذكي الشخصي للمدرب (Custom GPTs)", en: "Building Custom AI Tutor Bots for Your Courses", fr: "Créer un Tuteur Virtuel IA Personnalisé (Custom GPT)" },
      instructor: instKar,
      duration: { ar: "23 دقيقة", en: "23 Mins", fr: "23 Mins" },
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      desc: { ar: "تدريب نموذج ذكاء اصطناعي على حقيبتك التدريبية ليجيب المتدربين على مدار الساعة.", en: "Knowledge grounding an AI agent with your course PDFs to provide 24/7 personalized tutoring.", fr: "Nourrir un bot IA avec vos supports pour offrir un tuteur disponible 24/7." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax5_l12",
      type: "doc",
      title: { ar: "خطة التحول الرقمي الشاملة للمؤسسات التدريبية", en: "Digital Transformation Roadmap for Academies", fr: "Feuille de Route de la Transformation Numérique" },
      instructor: instBel,
      duration: { ar: "16 د قراءة", en: "16 Mins Read", fr: "16 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      desc: { ar: "مراحل رقمنة العمليات الأكاديمية والترقية التكنولوجية للحقائب والشهادات والتقييم.", en: "Phased implementation plan for digitizing course delivery, credentialing, and tracking.", fr: "Plan d'action par étapes pour numériser catalogue, diplomation et suivi des cohortes." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_6: [
    {
      id: "ax6_l1",
      type: "video",
      title: { ar: "المستويات الأربعة لنموذج كيركباتريك (Kirkpatrick Model)", en: "Kirkpatrick 4-Level Evaluation Architecture", fr: "Le Modèle de Kirkpatrick à 4 Niveaux" },
      instructor: instBel,
      duration: { ar: "24 دقيقة", en: "24 Mins", fr: "24 Mins" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "التفاعل (Reaction)، التعلم (Learning)، السلوك (Behavior)، والنتائج (Results) بالتطبيق العملي.", en: "Detailed drill into Reaction, Learning, Behavior change, and Organizational Results.", fr: "Étude approfondie : Réaction, Apprentissage, Comportement et Résultats." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l2",
      type: "doc",
      title: { ar: "معادلة جاك فيليبس لحساب العائد المالي (Phillips ROI Formula)", en: "Jack Phillips ROI Methodology & Financial Calculation", fr: "Formule du ROI Financier de Jack Phillips" },
      instructor: instKam,
      duration: { ar: "17 د قراءة", en: "17 Mins Read", fr: "17 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
      desc: { ar: "حساب صافي المنافع المالية للبرنامج التدريبي مطروحاً منها التكاليف مقسومة على التكلفة الإجمالية.", en: "Mathematical calculation of net financial benefits vs full loaded program costs.", fr: "Calcul mathématique des bénéfices nets par rapport aux coûts complets de formation." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax6_l3",
      type: "video",
      title: { ar: "منهجيات عزل أثر التدريب عن المتغيرات الخارجية", en: "Isolating Training Impact from External Factors", fr: "Isolation Statistique des Effets de la Formation" },
      instructor: instSou,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "المجموعات الضابطة، تحليل الانحدار، وتقديرات المشرفين لعزل أثر التدريب بثقة علمية.", en: "Control groups, trend line analysis, and participant-supervisor estimation protocols.", fr: "Groupes témoins, analyse de régression et estimation fiabilisée des impacts." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l4",
      type: "doc",
      title: { ar: "دليل تصميم الاختبارات القبلية والبعدية المعيارية", en: "Pre & Post Test Design & Normalization Guide", fr: "Conception de Pré/Post Tests Normalisés" },
      instructor: instBel,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
      desc: { ar: "قياس الاكتساب المعرفي الفعلي بدقة دون الوقوع في انحياز الحفظ الآلي أو سهولة الأسئلة.", en: "Measuring true cognitive delta without testing fatigue or memorization biases.", fr: "Mesurer le gain réel de compétences sans biais d'apprentissage superficiel." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax6_l5",
      type: "video",
      title: { ar: "تصميم استبيانات رد الفعل وتجنب انحياز المجاملة", en: "Reaction Survey Design & Eliminating Politeness Bias", fr: "Enquêtes de Satisfaction et Biais de Complaisance" },
      instructor: instSar,
      duration: { ar: "18 دقيقة", en: "18 Mins", fr: "18 Mins" },
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      desc: { ar: "صياغة أسئلة تقييمية نوعية تكشف الجوانب الواجب تحسينها بموضوعية وتجرد تام.", en: "Designing psychometric survey prompts that surface actionable constructive critiques.", fr: "Formuler des questions qualitatives révélant les vrais points d'amélioration." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l6",
      type: "doc",
      title: { ar: "مصفوفة مؤشرات الأداء الرئيسية (KPIs) للبرامج التدريبية", en: "Comprehensive Training KPI Dashboard Matrix", fr: "Matrice des Indicateurs Clés de Performance (KPI)" },
      instructor: instKam,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "مؤشرات سرعة الاستيعاب، نسبة إكمال المسار، جودة الأداء الميداني، ومعدل دوران المتدربين.", en: "Dashboard metrics: time-to-competence, completion rates, error drops, and retention.", fr: "Indicateurs de temps d'acquisition, taux d'achèvement et baisse des erreurs." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax6_l7",
      type: "video",
      title: { ar: "تقييم التغير السلوكي ونقل أثر التدريب لبيئة العمل", en: "Transfer of Learning & On-the-Job Behavioral Audit", fr: "Transfert des Acquis en Situation de Travail" },
      instructor: instBel,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "متابعة المتدرب بعد 30 و 60 و 90 يوماً للتأكد من تطبيق المهارات في مهامه اليومية.", en: "30-60-90 day milestone audits with managers to verify behavioral integration.", fr: "Suivi à 30, 60 et 90 jours avec la hiérarchie pour vérifier l'application des gestes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l8",
      type: "doc",
      title: { ar: "تحويل المهارات الناعمة إلى قيم مالية قابلة للقياس", en: "Monetizing Soft Skills & Intangible Benefits", fr: "Monétisation des Soft Skills et Bénéfices Immatériels" },
      instructor: instSou,
      duration: { ar: "13 د قراءة", en: "13 Mins Read", fr: "13 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
      desc: { ar: "كيف تحول تحسن التواصل وتقليل النزاعات إلى وفورات مالية وساعات عمل مسترجعة.", en: "Converting reduced conflict, morale boosts, and communication gains into dollar values.", fr: "Traduire la baisse des conflits et le gain de temps en économies mesurables." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax6_l9",
      type: "video",
      title: { ar: "صياغة التقارير التنفيذية التحليلية لأصحاب القرار", en: "Executive Reporting & Pitching Training Value to C-Suite", fr: "Rédaction de Rapports Stratégiques pour la Direction" },
      instructor: instKam,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
      desc: { ar: "كيف تعرض نتائج التدريب بلغة الأعمال والأرقام لإقناع الإدارة بجدوى الاستثمار.", en: "Presenting learning impact using business vernacular to win executive budget expansions.", fr: "Présenter le bilan de formation en langage financier pour pérenniser les budgets." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l10",
      type: "doc",
      title: { ar: "حساب التكاليف الكاملة المباشرة وغير المباشرة للتدريب", en: "Fully Loaded Cost Accounting in Training Programs", fr: "Calcul des Coûts Complets Directs et Indirects" },
      instructor: instBel,
      duration: { ar: "16 د قراءة", en: "16 Mins Read", fr: "16 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
      desc: { ar: "حساب أتعاب المدربين، تكلفة غياب المتدربين عن العمل، المطبوعات، والإهلاك اللوجستي.", en: "Tabulating trainer fees, trainee opportunity cost, facility rentals, and software licenses.", fr: "Intégrer honoraires, temps passé hors poste, location de salle et logistique." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax6_l11",
      type: "video",
      title: { ar: "بناء لوحة تحكم أثر التدريب التفاعلية (Power BI & Looker)", en: "Building Interactive Impact Dashboards (BI)", fr: "Créer un Tableau de Bord d'Impact Interactif (BI)" },
      instructor: instKar,
      duration: { ar: "25 دقيقة", en: "25 Mins", fr: "25 Mins" },
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      desc: { ar: "ربط بيانات التقييم بلوحة رقمية حية تظهر مسار تطور المتدربين في الوقت الفعلي.", en: "Connecting evaluation feeds to live graphical dashboards displaying cohort trends.", fr: "Connecter les données d'évaluation à un dashboard dynamique en temps réel." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax6_l12",
      type: "doc",
      title: { ar: "نموذج تقييم العائد الاستراتيجي والسمعة المؤسسية", en: "Strategic Brand & Organizational Capital Assessment", fr: "Évaluation du Capital Marque et Réputation" },
      instructor: instSou,
      duration: { ar: "11 د قراءة", en: "11 Mins Read", fr: "11 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "قياس مساهمة البرامج التدريبية في تعزيز سمعة الشركة واستقطاب الكفاءات المميزة.", en: "Gauging employer branding impact and talent attraction driven by training excellence.", fr: "Mesurer le renforcement de la marque employeur grâce à l'excellence formative." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_7: [
    {
      id: "ax7_l1",
      type: "video",
      title: { ar: "تحليل الاحتياجات التدريبية الشامل (TNA Architecture)", en: "Comprehensive Training Needs Analysis (TNA)", fr: "Ingénierie de l'Analyse des Besoins (TNA)" },
      instructor: instBel,
      duration: { ar: "26 دقيقة", en: "26 Mins", fr: "26 Mins" },
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      desc: { ar: "تحليل المنظمة، تحليل الوظيفة، وتحليل الفرد لتحديد فجوات الكفاءة الحقيقية.", en: "Organizational, task, and individual analysis to diagnose genuine competency gaps.", fr: "Analyse organisationnelle, opérationnelle et individuelle des écarts de compétence." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l2",
      type: "doc",
      title: { ar: "مواصفة الأيزو ISO 10015 لإدارة الجودة في التدريب", en: "ISO 10015 Quality Management in Training Standard", fr: "Norme ISO 10015 : Management de la Qualité en Formation" },
      instructor: instKam,
      duration: { ar: "16 د قراءة", en: "16 Mins Read", fr: "16 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
      desc: { ar: "دليل الامتثال لمتطلبات الجودة الدولية في تخطيط وتنفيذ وتوثيق العمليات التدريبية.", en: "Compliance roadmap: standards, audit checklists, and procedural documentation.", fr: "Guide de mise en conformité aux exigences internationales de qualité." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax7_l3",
      type: "video",
      title: { ar: "إدارة مشاريع التدريب والتحكم في النطاق والميزانية", en: "Training Project Management: Scope, Budget & Schedule", fr: "Gestion de Projets de Formation : Cadrage et Budget" },
      instructor: instSou,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "تطبيق مبادئ PMP في إدارة العقود التدريبية وتفادي تضخم النطاق واختناقات الجدول.", en: "Applying PMP workflows to deliver multi-cohort corporate training contracts on time.", fr: "Application des principes PMP pour piloter des contrats de formation complexes." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l4",
      type: "doc",
      title: { ar: "مصفوفة الأدوار والمسؤوليات (RACI Matrix) لفرق التدريب", en: "RACI Governance Matrix for L&D Departments", fr: "Matrice RACI des Rôles et Responsabilités L&D" },
      instructor: instBel,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
      desc: { ar: "تحديد المسؤول، الخاضع للمساءلة، المستشار، والمطّلع في كل مرحلة تدريبية لمنع التضارب.", en: "Defining Responsible, Accountable, Consulted, and Informed stakeholders across delivery.", fr: "Définition précise des responsabilités pour éviter les conflits d'attribution." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax7_l5",
      type: "video",
      title: { ar: "استراتيجيات تسعير العقود والحلول التدريبية للشركات (B2B)", en: "Pricing B2B Training Contracts & Solutions", fr: "Tarification des Contrats de Formation B2B" },
      instructor: instKam,
      duration: { ar: "24 دقيقة", en: "24 Mins", fr: "24 Mins" },
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
      desc: { ar: "التسعير القائم على القيمة المضافة مقابل التسعير بالساعة وتفادي حرق الأسعار في السوق.", en: "Value-based pricing models vs cost-plus models to capture premium corporate margins.", fr: "Tarification basée sur la valeur ajoutée plutôt que sur le taux horaire." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l6",
      type: "doc",
      title: { ar: "معايير اختيار وتأهيل واعتماد المدربين بالأكاديميات", en: "Trainer Selection, Vetting & Onboarding Protocols", fr: "Sélection, Habilitation et Intégration des Formateurs" },
      instructor: instBel,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
      desc: { ar: "مقابلات المحاكاة الأدائية، فحص المراجع، وعقود التفرغ والالتزام الأخلاقي للمدربين.", en: "Audition rubric, reference checking, and master service agreements (MSA) for faculty.", fr: "Grille d'audition pédagogique, vérification des références et contractualisation." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax7_l7",
      type: "video",
      title: { ar: "الحوكمة الرشيدة للمراكز التدريبية والامتثال القانوني", en: "Good Governance & Legal Compliance in Training", fr: "Gouvernance et Conformité Légale des Organismes" },
      instructor: instKam,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "اللوائح الداخلية، حفظ السجلات، عقود الملكية الفكرية، وحماية حقوق المتدربين والعملاء.", en: "Bylaws, student record retention, IP ownership agreements, and regulatory adherence.", fr: "Règlements intérieurs, archivage des registres et protection de la propriété intellectuelle." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l8",
      type: "doc",
      title: { ar: "إعداد كراسات الشروط والعروض الفنية والمالية للمناقصات", en: "RFP Drafting & Winning Technical Proposals", fr: "Réponse aux Appels d'Offres et Offres Techniques" },
      instructor: instBel,
      duration: { ar: "18 د قراءة", en: "18 Mins Read", fr: "18 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
      desc: { ar: "هندسة العرض الفني المتكامل الذي يجيب على معايير اللجان ويفوز بالمناقصات الحكومية.", en: "Structuring winning bid responses that satisfy evaluation grids and secure multi-year RFPs.", fr: "Structurer des propositions techniques convaincantes répondant aux critères des jurys." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax7_l9",
      type: "video",
      title: { ar: "التخطيط الاستراتيجي للمؤسسات التدريبية وبناء الميزة التنافسية", en: "Strategic Planning & Competitive Advantage for Academies", fr: "Planification Stratégique et Avantage Concurrentiel" },
      instructor: instSou,
      duration: { ar: "23 دقيقة", en: "23 Mins", fr: "23 Mins" },
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      desc: { ar: "تحليل سوات (SWOT)، قوى بورتر الخمس، وبناء تموضع سوقي مميز يصعب تقليده.", en: "SWOT analysis, Porter's 5 Forces, and market positioning in the adult education landscape.", fr: "Analyse SWOT, forces de Porter et positionnement stratégique distinctif." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l10",
      type: "doc",
      title: { ar: "إدارة المخاطر واستمرارية التدريب في الأزمات والطوارئ", en: "Risk Management & Business Continuity in Training", fr: "Gestion des Risques et Continuité d'Activité" },
      instructor: instKam,
      duration: { ar: "13 د قراءة", en: "13 Mins Read", fr: "13 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "خطط الطوارئ للتعامل مع غياب المدرب، تعطل التكنولوجيا، أو إلغاء القاعات في اللحظة الأخيرة.", en: "Contingency protocols for sudden trainer illness, EdTech blackouts, and venue closures.", fr: "Plans d'urgence pour indisponibilité formateur, pannes informatiques ou annulations." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax7_l11",
      type: "video",
      title: { ar: "ميثاق شرف وأخلاقيات المهنة ومكافحة الانتحال المعرفي", en: "Code of Ethics & Plagiarism Prevention in Training", fr: "Code de Déontologie et Lutte Contre le Plagiat" },
      instructor: instBel,
      duration: { ar: "19 دقيقة", en: "19 Mins", fr: "19 Mins" },
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
      desc: { ar: "احترام مصادر المعرفة، النزاهة العلمية، والمسؤولية المهنية للمدرب تجاه المتدربين والمهنة.", en: "Citation hygiene, academic rigor, professional integrity, and learner confidentiality.", fr: "Respect des sources, rigueur scientifique et intégrité envers la profession." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax7_l12",
      type: "doc",
      title: { ar: "دليل إدارة الاعتمادات والشهادات وسجلات الخريجين الرقمية", en: "Accreditation Management & Digital Credentialing", fr: "Gestion des Certifications et Registres Numériques" },
      instructor: instKam,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80",
      desc: { ar: "إصدار الشهادات المزودة برمز الاستجابة السريعة (QR Code) والتحقق التلقائي من الخريجين.", en: "Deploying tamper-proof digital certificates with QR validation and automated registry sync.", fr: "Émission de diplômes infalsifiables avec QR code et registre d'anciens auditable." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ],

  module_8: [
    {
      id: "ax8_l1",
      type: "video",
      title: { ar: "استراتيجية بناء العلامة الشخصية الموثوقة للمدرب الخبير", en: "Personal Branding Strategy for Expert Trainers", fr: "Stratégie de Marque Personnelle du Formateur Expert" },
      instructor: instKam,
      duration: { ar: "22 دقيقة", en: "22 Mins", fr: "22 Mins" },
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
      desc: { ar: "كيف تصنع اسماً مهنياً يقترن بالتميز والحلول الاستشارية الموثوقة في تخصصك الدقيق.", en: "Crafting a distinctive reputation that positions you as the go-to authority in your niche.", fr: "Créer une notoriété d'expert référent incontournable dans votre domaine spécifique." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l2",
      type: "doc",
      title: { ar: "صياغة الوعد التحويلي وتحديد التخصص الدقيق (Niche Mastery)", en: "Niche Mastery & Crafting the Transformation Promise", fr: "Spécialisation Pointue et Promesse Transformative" },
      instructor: instBel,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
      desc: { ar: "لماذا يفشل المدرب العام وينجح المتخصص؟ معادلة صياغة رسالتك وقيمتك الفريدة.", en: "Why generalists struggle and niche authorities thrive: formulating your UVP clearly.", fr: "Pourquoi l'expert pointu gagne toujours face au généraliste : formuler son UVP." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax8_l3",
      type: "video",
      title: { ar: "احتراف منصة لينكدإن (LinkedIn) لجذب عقود الشركات والمؤتمرات", en: "LinkedIn Mastery for Corporate B2B Training Contracts", fr: "LinkedIn pour Formateurs : Attirer les Contrats B2B" },
      instructor: instSar,
      duration: { ar: "25 دقيقة", en: "25 Mins", fr: "25 Mins" },
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      desc: { ar: "تحسين الملف الشخصي، نشر المحتوى القيادي، والتواصل المباشر مع مدراء الموارد البشرية.", en: "Profile optimization, publishing thought leadership, and inbound inbound lead generation.", fr: "Optimisation de profil, publications d'autorité et prospection ciblée des DRH." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l4",
      type: "doc",
      title: { ar: "تصميم الملف التعريفي الاحترافي للمدرب (Trainer Media Kit)", en: "Designing the Trainer Portfolio & Executive Media Kit", fr: "Conception du Kit Média et Dossier de Présentation" },
      instructor: instKam,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
      desc: { ar: "العناصر الأساسية لملف المدرب: السيرة الذاتية المركزة، آراء العملاء، وأبرز البرامج.", en: "Key sections of a high-converting speaker one-sheet, client social proof, and bio.", fr: "Composition d'un dossier de presse percutant : témoignages, références et bio." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax8_l5",
      type: "video",
      title: { ar: "صناعة المحتوى المعرفي القيادي وتأليف المقالات المتخصصة", en: "Thought Leadership Content Creation & Article Publishing", fr: "Création de Contenu d'Autorité et Articles d'Impact" },
      instructor: instBel,
      duration: { ar: "20 دقيقة", en: "20 Mins", fr: "20 Mins" },
      img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80",
      desc: { ar: "كيف تكتب مقالات رأي وأدلة عملية تجذب مدراء التدريب وتؤكد مصداقيتك العلمية.", en: "Authoring deep-dive guides and industry op-eds that attract decision-makers naturally.", fr: "Rédiger des articles de fond et guides pratiques attirant les prescripteurs." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l6",
      type: "doc",
      title: { ar: "حماية الملكية الفكرية وتوثيق الحقائب والمناهج التدريبية", en: "Intellectual Property Protection & Copyright Registration", fr: "Protection de la Propriété Intellectuelle des Supports" },
      instructor: instSou,
      duration: { ar: "13 د قراءة", en: "13 Mins Read", fr: "13 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&q=80",
      desc: { ar: "خطوات تسجيل العلامة وحماية حقوق المؤلف وتراخيص استخدام المادة التعليمية للغير.", en: "Copyright registration, watermarking, and licensing frameworks for your IP assets.", fr: "Dépôt de marque, droits d'auteur et contrats de licence d'exploitation de vos cours." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax8_l7",
      type: "video",
      title: { ar: "هندسة العروض الاستشارية وتحويل المعرفة لخدمات مدفوعة", en: "Consulting Packaging & Productizing Training Expertise", fr: "Packaging de Conseil et Monétisation du Savoir" },
      instructor: instKam,
      duration: { ar: "23 دقيقة", en: "23 Mins", fr: "23 Mins" },
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
      desc: { ar: "الانتقال من التدريب النمطي إلى تقديم حلول استشارية متكاملة ذات قيمة مالية عالية.", en: "Shifting from training hours to advisory retainers and strategic organizational consulting.", fr: "Passer de la simple prestation de formation au contrat de conseil stratégique." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l8",
      type: "doc",
      title: { ar: "استراتيجيات التسويق بالمحتوى والظهور الإعلامي للمدرب", en: "Content Marketing & Media Appearances Strategy", fr: "Marketing de Contenu et Présence Médias" },
      instructor: instSar,
      duration: { ar: "12 د قراءة", en: "12 Mins Read", fr: "12 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      desc: { ar: "المشاركة في البودكاستات المتخصصة، المؤتمرات، والتلفزيون لترسيخ صورتك الذهنية.", en: "Guest podcasting, panel speaking, and press outreach to multiply brand reach.", fr: "Interventions en podcasts, tables rondes et presse pour démultiplier votre visibilité." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax8_l9",
      type: "video",
      title: { ar: "تسعير الذات والتفاوض الاحترافي على الأتعاب التدريبية", en: "Self-Pricing & High-Stakes Fee Negotiation", fr: "Négociation Tarifaire et Valorisation de ses Honoraires" },
      instructor: instBel,
      duration: { ar: "21 دقيقة", en: "21 Mins", fr: "21 Mins" },
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
      desc: { ar: "كيف تطلب أتعابك بثقة دون تردد وتتفاوض على الميزانيات الكبرى مع إدارات الشركات.", en: "Negotiating premium daily rates with confidence and handling enterprise price objections.", fr: "Défendre son tarif journalier avec assurance et traiter les objections de prix." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l10",
      type: "doc",
      title: { ar: "بناء شبكة العلاقات الاستراتيجية والتحالف مع المراكز", en: "Strategic Networking & Academy Alliance Building", fr: "Réseautage Stratégique et Alliances avec les Organismes" },
      instructor: instKam,
      duration: { ar: "14 د قراءة", en: "14 Mins Read", fr: "14 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
      desc: { ar: "بناء علاقات رابح-رابح مع مدراء الأكاديميات ومكاتب الاستشارات لتأمين عقود مستمرة.", en: "Cultivating win-win partnerships with academy executives for recurring business flow.", fr: "Nouer des relations gagnant-gagnant avec les directeurs d'organismes pour un flux continu." },
      action_url: docUrl,
      doc_preview: docPrev
    },
    {
      id: "ax8_l11",
      type: "video",
      title: { ar: "الهوية البصرية وتوحيد الرسالة عبر كافة المنصات", en: "Visual Identity & Multi-Channel Brand Consistency", fr: "Identité Visuelle et Cohérence Omnicanale" },
      instructor: instSar,
      duration: { ar: "17 دقيقة", en: "17 Mins", fr: "17 Mins" },
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
      desc: { ar: "الألوان، الخطوط، الصور الشخصية الاحترافية، وتناسق الرسالة عبر الموقع والشبكات.", en: "Palette coherence, headshot quality, and delivering one aligned message across channels.", fr: "Cohérence graphique, photos pro et harmonie du message sur tous les supports." },
      video_id: vidId,
      action_url: vidUrl
    },
    {
      id: "ax8_l12",
      type: "doc",
      title: { ar: "خارطة طريق المدرب نحو العالمية والمؤتمرات الدولية", en: "The Roadmap to International Speaking & Keynotes", fr: "Feuille de Route vers les Conférences Internationales" },
      instructor: instBel,
      duration: { ar: "15 د قراءة", en: "15 Mins Read", fr: "15 Mins Lecture" },
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80",
      desc: { ar: "تقديم أوراق العمل في المؤتمرات العالمية والحصول على الزمالات والاعتمادات الدولية.", en: "Call for papers (CFP) pitching, winning international fellowships, and global keynoting.", fr: "Répondre aux appels à conférenciers internationaux et obtenir des accréditations mondiales." },
      action_url: docUrl,
      doc_preview: docPrev
    }
  ]
};
