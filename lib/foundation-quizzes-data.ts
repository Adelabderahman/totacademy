import type { LangKey, LocalizedString } from '@/types/curriculum';

export interface FoundationQuizOutput {
  title: string;
  questions: {
    q: string;
    options: string[];
    ans: number;
    hint?: string;
    explanation?: string;
  }[];
}

export interface ModuleAxisQuizQuestion {
  q: LocalizedString;
  options: { ar: string[]; en: string[]; fr: string[] };
  ans: number;
  hint: LocalizedString;
  explanation: LocalizedString;
}

export const foundationModuleQuizzesDB: Record<string, ModuleAxisQuizQuestion[]> = {
  // Module 1: معمارية التعلم وسيكولوجية المتدرب
  module_1: [
    {
      q: {
        ar: "وفق مبادئ الأندراغوجيا لمالكولم نولز، ما هو الدافع الرئيسي للمتدرب الراشد للإقبال على التعلم؟",
        en: "According to Malcolm Knowles' andragogy principles, what is the primary motivation for adult learners?",
        fr: "Selon les principes d'andragogie de Knowles, quelle est la principale motivation des adultes ?"
      },
      options: {
        ar: ["الحاجة المباشرة لتطبيق المعرفة لحل مشكلات واقعية في عمله", "الرغبة في نيل علامات دراسية مرتفعة لإرضاء المحاضر", "الحفظ الآلي للمعلومات النظرية المجردة", "التواجد في القاعة دون هدف محدد"],
        en: ["Immediate need to apply knowledge to solve workplace problems", "Desire for high test scores to please teachers", "Rote memorization of abstract concepts", "Attending class without specific goals"],
        fr: ["Besoin immédiat d'appliquer le savoir pour résoudre des problèmes", "Désir d'obtenir de bonnes notes pour plaire", "Mémorisation brute de notions abstraites", "Présence passive sans objectif"]
      },
      ans: 0,
      hint: {
        ar: "الكبار يركزون على الحلول العملية الآنية أكثر من التركيز على المادة المجردة.",
        en: "Adults focus on practical solutions rather than abstract theories.",
        fr: "Les adultes privilégient les solutions concrètes aux théories."
      },
      explanation: {
        ar: "يمتاز المتدرب الراشد بتوجهه نحو حل المشكلات الواقعية (Problem-Centered) والحاجة المباشرة للمعرفة.",
        en: "Adults are problem-centered and motivated by immediate applicability.",
        fr: "L'adulte est centré sur la résolution de problèmes réels et l'utilité immédiate."
      }
    },
    {
      q: {
        ar: "ما الآلية الأفضل للتغلب على منحنى النسيان (Forgetting Curve) لإبنجهاوس وترسيخ المهارة؟",
        en: "What is the best mechanism to overcome Ebbinghaus's forgetting curve and solidify skills?",
        fr: "Quel est le meilleur mécanisme pour contrer la courbe de l'oubli d'Ebbinghaus ?"
      },
      options: {
        ar: ["التكرار المتباعد والاسترجاع النشط على فترات متفرقة", "حشو كافة المعلومات في جلسة واحدة طويلة دون استراحة", "إلغاء المراجعات والاعتماد على قراءة واحدة", "التركيز على الشرح النظري فقط دون ممارسة"],
        en: ["Spaced repetition and active retrieval over intervals", "Cramming everything into one long session without breaks", "Skipping reviews after first read", "Focusing strictly on lecturing without practice"],
        fr: ["Répétition espacée et rappel actif par intervalles", "Tout concentrer dans une longue session sans pause", "Supprimer les révisions après lecture", "Théorie pure sans aucune pratique"]
      },
      ans: 0,
      hint: {
        ar: "تكرار استدعاء المعلومة على فترات متباعدة يقوي الروابط العصبية في الدماغ.",
        en: "Retrieving knowledge across intervals strengthens neural pathways.",
        fr: "Le rappel à intervalles renforce les connexions synaptiques."
      },
      explanation: {
        ar: "التكرار المتباعد مع الاسترجاع النشط يكسر وتيرة التحلل المعرفي وينقل المهارة للذاكرة طويلة الأمد.",
        en: "Spaced repetition counters cognitive decay and anchors learning in long-term memory.",
        fr: "La répétition espacée sécurise le transfert vers la mémoire à long terme."
      }
    },
    {
      q: {
        ar: "في دراسة حالة لمتدرب ذي خبرة 15 عاماً يظهر عدم اكتراث في القاعة، كيف يتعامل المدرب الماهر معه؟",
        en: "In a case where a 15-year veteran shows disinterest, how should a skilled trainer respond?",
        fr: "Face à un participant chevronné désengagé, comment réagit un formateur habile ?"
      },
      options: {
        ar: ["استثمار رصيد خبرته بتكليفه بإدارة حلقة نقاش أو تحليل تحديات ميدانية", "تجاهله تماماً وإبعاده عن المشاركة", "توبيخه علناً أمام زملائه لإلزامه بالاستماع", "مطالبته بالصمت حتى نهاية المحاضرة"],
        en: ["Leveraging his rich experience by facilitating debates or analyzing field challenges", "Completely ignoring and isolating him", "Publicly reprimanding him before peers", "Demanding his absolute silence"],
        fr: ["Valoriser son expertise en lui confiant l'animation d'un cas ou d'un débat", "L'ignorer totalement et l'isoler", "Le réprimander en public", "Lui imposer le silence"]
      },
      ans: 0,
      hint: {
        ar: "تعليم الكبار يقتضي احترام رصيد خبرة المتدرب وإشراكه كشريك في التعلم.",
        en: "Adult learning requires respecting prior experience as a valuable asset.",
        fr: "L'andragogie valorise l'expérience préalable des apprenants."
      },
      explanation: {
        ar: "وفق نولز، المتدرب ذو الخبرة يمتلك رصيداً غنياً؛ إشراكه في التيسير يحوله من مقاوم إلى داعم قوي للجلسة.",
        en: "Experienced adults become strong allies when their institutional knowledge is acknowledged.",
        fr: "Impliquer l'expert transforme sa résistance en un puissant levier d'apprentissage collectif."
      }
    },
    {
      q: {
        ar: "وفق نظرية العبء المعرفي (Cognitive Load Theory)، ما الإجراء الأمثل لتصميم شرائح العرض؟",
        en: "According to Cognitive Load Theory, what is the best practice for slide deck design?",
        fr: "Selon la théorie de la charge cognitive, quelle est la bonne pratique pour les slides ?"
      },
      options: {
        ar: ["تقليل العبء الدخيل بتجنب النصوص الكثيفة والتركيز على فكرة محورية لكل شريحة", "ملء كل شريحة بأكبر قدر من الفقرات والمؤثرات الصوتية", "استخدام 5 ألوان فسفورية مختلفة لجذب الانتباه", "قراءة النص حرفياً من الشريحة دون توضيح"],
        en: ["Minimizing extraneous load by avoiding heavy text and focusing on one core idea per slide", "Packing every slide with maximum text and sound effects", "Using 5 neon colors to catch eyes", "Reading word-for-word from slides"],
        fr: ["Réduire la charge inutile en évitant les pavés de texte et en ciblant une idée par diapo", "Remplir chaque slide de texte et de sons", "Utiliser plein de couleurs criardes", "Lire mot à mot chaque écran"]
      },
      ans: 0,
      hint: {
        ar: "الذاكرة العاملة محدودة السعة ويجب حمايتها من التشتت البصري.",
        en: "Working memory has finite bandwidth and must be protected from clutter.",
        fr: "La mémoire de travail est limitée et doit être préservée des distractions."
      },
      explanation: {
        ar: "تقليل العبء المعرفي الدخيل يتيح للذاكرة العاملة التركيز على معالجة المفاهيم الجوهرية (Germane Load).",
        en: "Eliminating extraneous clutter frees mental bandwidth for deep schema integration.",
        fr: "Éliminer la charge superflue libère l'attention pour l'assimilation en profondeur."
      }
    },
    {
      q: {
        ar: "ما دور التغذية الراجعة التكوينية (Formative Feedback) أثناء مسار الجلسة التدريبية؟",
        en: "What is the primary role of formative feedback during a training session?",
        fr: "Quel est le rôle primordial du feedback formatif durant la session ?"
      },
      options: {
        ar: ["تصحيح مسار الفهم فورياً ومساعدة المتدرب على التأمل الذاتي وإتقان الكفاءة", "إعطاء علامة إقصائية نهائية غير قابلة للتعديل", "تأجيل التوجيه حتى نهاية الدورة بأسابيع", "المقارنة المحرجة بين المتدربين"],
        en: ["Instant course-correction, enabling self-reflection and competency mastery", "Assigning an irreversible failing grade", "Delaying remarks until weeks after completion", "Embarrassing peers through negative comparison"],
        fr: ["Corriger la trajectoire immédiatement, favorisant l'autoréflexion et la maîtrise", "Donner une note sanction définitive", "Reporter les retours à plusieurs semaines après", "Faire des comparaisons dévalorisantes"]
      },
      ans: 0,
      hint: {
        ar: "التقييم التكويني يعمل كبوصلة توجه التعلم خطوة بخطوة أثناء الممارسة.",
        en: "Formative evaluation acts as a compass guiding progress during practice.",
        fr: "L'évaluation formative sert de boussole guidant l'apprentissage en continu."
      },
      explanation: {
        ar: "التغذية الراجعة الفورية تعزز الاستبقاء وتمنع ترسيخ المفاهيم الخاطئة في أذهان المشاركين.",
        en: "Immediate feedback prevents error anchoring and reinforces correct mental models.",
        fr: "Le retour constructif immédiat prévient l'ancrage d'idées fausses."
      }
    },
    {
      q: {
        ar: "كيف نضمن عدم حدوث تراجع في الأداء الميداني بعد انتهاء التدريب (Post-Training Drift)؟",
        en: "How do we prevent post-training performance drift in real work environments?",
        fr: "Comment prévenir la régression des acquis en situation de travail ?"
      },
      options: {
        ar: ["بوضع خطة متابعة دورية، وتكليفات ميدانية، وجلسات كوتشينج داعمة للتطبيق", "بإنهاء كافة الاتصالات بالمتدربين فور تسليم الشهادات", "بالاكتفاء باختبار ورقي نظري وحيد", "بتغيير موضوع التدريب كلياً كل شهر"],
        en: ["Establishing follow-up workflows, on-the-job tasks, and post-course coaching", "Terminating contact immediately after certificate handover", "Relying on a single theoretical paper test", "Changing training topics randomly every month"],
        fr: ["Plan de suivi régulier, missions de terrain et séances de coaching d'ancrage", "Rompre le contact dès la remise des attestations", "Se contenter d'un simple examen écrit", "Changer de thématique au hasard"]
      },
      ans: 0,
      hint: {
        ar: "الاستدامة تتطلب دعماً ومرافقة في الميدان لتثبيت العادات الجديدة.",
        en: "Sustainability requires on-the-ground coaching to anchor new habits.",
        fr: "La durabilité exige un accompagnement de terrain pour ancrer les pratiques."
      },
      explanation: {
        ar: "المتابعة اللاحقة والمجتمعات التشاركية تحول التدريب من حدث معزول إلى مسار نمو وتطوير مستمر.",
        en: "Follow-up workflows transform training from an isolated event into ongoing mastery.",
        fr: "Le suivi d'application transforme la formation en un véritable levier de transformation."
      }
    }
  ],

  // Module 2: التيسير الكاريزمي ولغة الجسد
  module_2: [
    {
      q: {
        ar: "ما هي القاعدة الذهبية لبناء الألفة والانطباع الأول الإيجابي في أول 90 ثانية من الجلسة؟",
        en: "What is the golden rule for creating rapport and a strong first impression in the first 90 seconds?",
        fr: "Quelle est la règle d'or pour instaurer le contact dès les 90 premières secondes ?"
      },
      options: {
        ar: ["الوقفة المتزنة، الابتسامة الصادقة، التواصل البصري الشامل، وافتتاحية محفزة للانتباه", "البدء فوراً بسرد السيرة الذاتية المفصلة للمدرب لمدة 20 دقيقة", "النظر إلى الأرض أو السقف لتجنب التوتر", "الحديث بنبرة صوت خافتة وغير مسموعة"],
        en: ["Poised posture, genuine smile, sweeping eye contact, and an attention-grabbing hook", "Spending the first 20 minutes listing trainer accolades", "Staring at the floor or ceiling to dodge anxiety", "Speaking in an inaudible, whisper tone"],
        fr: ["Posture ancrée, sourire sincère, regard circulaire et accroche percutante", "Réciter son CV pendant 20 minutes", "Regarder le sol pour masquer son anxiété", "Parler à voix basse de manière inaudible"]
      },
      ans: 0,
      hint: {
        ar: "الانطباع الأول يتشكل عبر لغة الجسد قبل بدء المحتوى المعرفي.",
        en: "First impressions are shaped by nonverbal signals before content delivery.",
        fr: "La première impression repose d'abord sur la posture non-verbale."
      },
      explanation: {
        ar: "التواصل البصري الدافئ والوقفة الواثقة يمنحان المتدربين شعوراً بالأمان والاحترافية منذ اللحظة الأولى.",
        en: "Balanced posture and sweeping eye contact project confidence and immediate credibility.",
        fr: "Un regard circulaire et une posture ouverte instaurent une confiance immédiate."
      }
    },
    {
      q: {
        ar: "كيف يوظف المدرب نبرات الصوت والإيقاع الخطابي لكسر الرتابة والملل في القاعة؟",
        en: "How does a trainer use vocal dynamics and pacing to break classroom monotony?",
        fr: "Comment moduler sa voix et son rythme pour dynamiser la salle ?"
      },
      options: {
        ar: ["بالتنويع بين النبرة الحماسية والوقفات التأملية وتغيير السرعة بحسب أهمية الفكرة", "بالاستمرار على وتيرة صوت واحدة ثابتة طوال 4 ساعات", "بالصراخ الدائم لإبقاء الجميع مستيقظين", "بالتحدث بسرعة فائقة تمنع المتدربين من التدوين"],
        en: ["Varying energetic tones with reflective pauses and modulating speed intentionally", "Maintaining a single flat monotone frequency for 4 hours", "Shouting continuously to keep participants awake", "Speaking at extreme speeds that hinder note-taking"],
        fr: ["Varier intonations, silences stratégiques et rythme selon l'importance de l'idée", "Garder une voix monocorde pendant des heures", "Crier constamment pour éviter l'endormissement", "Débiter à toute vitesse sans pause"]
      },
      ans: 0,
      hint: {
        ar: "الوقفات الذكية (Strategic Pauses) لها أثر بلاغي يفوق الكلمات أحياناً.",
        en: "Strategic pauses create dramatic emphasis and stimulate mental processing.",
        fr: "Le silence stratégique donne du relief aux messages clés."
      },
      explanation: {
        ar: "التنويع الصوتي يمنع الإرهاق السمعي لدى المتدربين ويبرز المفاهيم الحاسمة بشكل طبيعي.",
        en: "Vocal modulation eliminates auditory fatigue and highlights critical focal points.",
        fr: "La modulation vocale maintient l'éveil et souligne les points clés."
      }
    },
    {
      q: {
        ar: "في حال وجود متدرب ثرثار يحتكر المداخلات ويضيع وقت الجلسة، ما الإجراء الدبلوماسي الحازم؟",
        en: "When dealing with a monopolizer who dominates discussion, what is the best diplomatic response?",
        fr: "Face à un participant bavard qui monopolise la parole, quelle attitude adopter ?"
      },
      options: {
        ar: ["شكره بلطف على مداخلته، وتلخيص نقطته، ثم توجيه السؤال بالاسم لمتدرب آخر لم يشارك", "إهانته علناً وأمره بالصمت التام", "إنهاء الورشة فوراً والانسحاب من القاعة", "تركه يتحدث حتى نهاية وقت الجلسة"],
        en: ["Thank him politely, summarize his core point, and direct a prompt to a silent peer by name", "Publicly insult him and demand complete silence", "Cancel the workshop immediately and walk out", "Let him talk uninterrupted until session end"],
        fr: ["Le remercier courtoisement, synthétiser son point et passer la parole à un autre collègue", "L'insulter devant le groupe", "Clore brutalement l'atelier", "Le laisser parler jusqu'à la fin du cours"]
      },
      ans: 0,
      hint: {
        ar: "قاعدة: اعترف بالمساهمة ثم أعد توجيه دفة الحوار لشخص آخر.",
        en: "Acknowledge the thought, validate briefly, then redirect to another learner.",
        fr: "Valider l'apport, synthétiser et rediriger vers un participant silencieux."
      },
      explanation: {
        ar: "إعادة توجيه الدفة بالاسم لشخص آخر يضمن مشاركة الجميع ويحفظ وقت الجلسة دون إحراج أي متدرب.",
        en: "Redirection respects the speaker while maintaining workshop equity and schedule.",
        fr: "Cette technique rééquilibre la dynamique de groupe sans froisser l'orateur."
      }
    },
    {
      q: {
        ar: "ما هي عناصر القصة التدريبية المؤثرة (Storytelling) التي تجعل العبرة لا تُنسى؟",
        en: "What are the core elements of impactful storytelling that make lessons unforgettable?",
        fr: "Quels sont les piliers d'un storytelling pédagogique percutant ?"
      },
      options: {
        ar: ["بطل مألوف، صراع وتحدي واقعي، ذروة ولحظة تحول، ثم عبرة تعليمية واضحة مرتبطة بالهدف", "سرد خيالي لا صلة له ببيئة العمل ولا يخرج بأي نتيجة", "أرقام إحصائية جافة ومجردة دون أي سياق إنساني", "قصة طويلة مجهولة الهدف تستغرق نصف وقت الدورة"],
        en: ["Relatable protagonist, genuine workplace struggle, climax/transformation, and a clear moral tied to the goal", "Far-fetched fantasy with no workplace relevance", "Dry statistical tables stripped of human context", "Endless rambling narrative consuming half the workshop"],
        fr: ["Protagoniste crédible, défi d'entreprise, moment de bascule et enseignement direct", "Fable irréaliste sans lien avec le travail", "Série de chiffres sans trame humaine", "Longue digression sans rapport avec le thème"]
      },
      ans: 0,
      hint: {
        ar: "القصة الناجحة تبني جسراً بين المشاعر الإنسانية والتطبيق الوظيفي.",
        en: "A great story bridges emotion with professional competency.",
        fr: "Une bonne histoire relie l'émotion à la compétence opérationnelle."
      },
      explanation: {
        ar: "القصص التدريبية تحفز الذاكرة الانفعالية للمتدربين وتسهل استرجاع الكفاءات المعقدة عند الحاجة.",
        en: "Narratives stimulate emotional memory, drastically improving retrieval under stress.",
        fr: "Le récit sollicite la mémoire émotionnelle pour un ancrage durable."
      }
    },
    {
      q: {
        ar: "كيف يتحكم المدرب في الحركة المكانية في القاعة لتغطية كافة المشاركين؟",
        en: "How does a trainer navigate room geometry to engage all attendees evenly?",
        fr: "Comment occuper l'espace scénique pour inclure l'ensemble des apprenants ?"
      },
      options: {
        ar: ["التحرك في مثلث التأثير، تجنب المناطق الميتة، وتوزيع النظرات بنمط المنارة الشاملة", "التسمر خلف منصة الإلقاء دون حركة طوال اليوم", "المشي المتواصل السريع ذهاباً وإياباً لإرباك الحضور", "التركيز على الصف الأول فقط وتجاهل باقي القاعة"],
        en: ["Moving across the power triangle, clearing blind spots, and using lighthouse eye sweeps", "Remaining frozen behind the lectern all day", "Pacing back and forth frantically", "Focusing strictly on the front row and ignoring the back"],
        fr: ["Se déplacer en triangle d'influence, éliminer les zones mortes et balayer du regard", "Rester figé derrière son pupitre", "Faire les cent pas de façon stressante", "Regarder uniquement le premier rang"]
      },
      ans: 0,
      hint: {
        ar: "التحرك الهادف في زوايا القاعة يشعر كل متدرب بأنه في بؤرة الاهتمام.",
        en: "Purposeful spatial movement makes every seat feel like the front row.",
        fr: "Une présence spatiale équilibrée valorise chaque participant."
      },
      explanation: {
        ar: "توزيع الحركة يكسر الحواجز المكانية ويقلل من حالات التشتت والتسرب الذهني في المقاعد الخلفية.",
        en: "Purposeful navigation prevents rear-row disengagement and commands the entire room.",
        fr: "Le balayage spatial maintient l'engagement même au fond de la salle."
      }
    },
    {
      q: {
        ar: "ما الطريقة العلمية لإعادة تأطير رهبة المسرح والتوتر قبل الصعود للمنصة؟",
        en: "What is the evidence-based method to reframe stage fright and pre-presentation nerves?",
        fr: "Quelle méthode éprouvée permet de surmonter le trac avant de monter sur scène ?"
      },
      options: {
        ar: ["التنفس البطني العميق وإعادة تأطير ضربات القلب كطاقة حماس وتركيز لخدمة المتدربين", "تناول المهدئات الدوائية القوية دون استشارة", "الاستسلام للخوف والاعتذار للجمهور عن ضعف الجلسة مقدماً", "تجنب التحضير المسبق لتقليل القلق"],
        en: ["Deep diaphragmatic breathing and cognitive reframing of arousal as readiness to serve", "Taking unprescribed sedatives", "Yielding to fear and preemptively apologizing for poor delivery", "Skipping preparation to avoid stress"],
        fr: ["Respiration ventrale et recadrage du stress en énergie positive au service du groupe", "Prendre des sédatifs sans avis médical", "S'excuser d'avance auprès du public pour son stress", "Ne pas préparer son cours pour ne pas angoisser"]
      },
      ans: 0,
      hint: {
        ar: "التوتر هو مجرد استجابة فيزيولوجية يمكن تحويلها إلى طاقة إلقاء وحضور.",
        en: "Arousal is physiological fuel that can be channeled into dynamic presence.",
        fr: "L'excitation physique peut être canalisée en dynamisme d'animation."
      },
      explanation: {
        ar: "إعادة التأطير المعرفي يحول الخوف من الذات إلى التركيز على تقديم قيمة حقيقية للجمهور.",
        en: "Cognitive reframing shifts focus from self-consciousness to audience service.",
        fr: "Le recadrage mental déplace l'attention de l'ego vers le service rendu au public."
      }
    }
  ],

  // Module 3: الهندسة التعليمية وتصميم الحقائب
  module_3: [
    {
      q: {
        ar: "ما هي المراحل الخمس لنموذج ADDIE الشهير في التصميم التعليمي؟",
        en: "What are the five phases of the ADDIE instructional design model?",
        fr: "Quelles sont les 5 phases du modèle d'ingénierie pédagogique ADDIE ?"
      },
      options: {
        ar: ["التحليل (Analysis)، التصميم (Design)، التطوير (Development)، التنفيذ (Implementation)، والتقويم (Evaluation)", "التأليف، الطباعة، البيع، التدريب، والاستراحة", "العرض، التلخيص، الاختبار، التهنئة، والشهادة", "الاستماع، التدوين، الحفظ، التكرار، والنسيان"],
        en: ["Analysis, Design, Development, Implementation, and Evaluation", "Writing, printing, selling, delivering, and resting", "Presenting, summarizing, testing, congratulating, certifying", "Listening, noting, memorizing, repeating, forgetting"],
        fr: ["Analyse, Design, Développement, Implémentation, et Évaluation", "Rédaction, impression, vente, animation et repos", "Exposé, résumé, test, félicitations et diplôme", "Écoute, prise de notes, par cœur et oubli"]
      },
      ans: 0,
      hint: {
        ar: "ADDIE هو اختصار الحروف الأولى للمراحل الخمس باللغة الإنجليزية.",
        en: "ADDIE is an acronym of the five sequential systematic stages.",
        fr: "ADDIE est l'acronyme des 5 étapes séquentielles."
      },
      explanation: {
        ar: "يعد ADDIE النموذج المعياري الأكثر رسوخاً لبناء البرامج التدريبية الممنهجة وضمان مواءمة الأهداف.",
        en: "ADDIE is the foundational standard for systematic, outcome-aligned courseware development.",
        fr: "ADDIE est le standard de référence garantissant l'alignement des compétences."
      }
    },
    {
      q: {
        ar: "أي من الأهداف التدريبية التالية صيغ صياغة سلوكية قياسية وفق معايير SMART؟",
        en: "Which of the following training objectives is properly framed according to SMART behavioral standards?",
        fr: "Lequel de ces objectifs est formulé selon les normes comportementales SMART ?"
      },
      options: {
        ar: ["أن يصمم المتدرب خطة درس من 3 مراحل باستخدام نموذج ADDIE في 30 دقيقة بدقة لا تقل عن 80%", "أن يفهم المتدرب أهمية التدريب الحديث", "أن يحب المتدرب مهنة التدريب ويكون سعيداً", "أن يتعرف المتدرب على بعض الأمور العامة"],
        en: ["Trainee will draft a 3-phase lesson plan using ADDIE within 30 minutes with at least 80% accuracy", "Trainee will understand the importance of modern training", "Trainee will love the training profession and feel happy", "Trainee will discover some general things"],
        fr: ["L'apprenant élaborera un plan de cours en 3 étapes avec ADDIE en 30 min avec 80% d'exactitude", "L'apprenant comprendra l'importance de la formation", "L'apprenant aimera son métier de formateur", "L'apprenant découvrira quelques notions générales"]
      },
      ans: 0,
      hint: {
        ar: "الأهداف السلوكية تتطلب فعلاً إجرائياً قابلاً للملاحظة والقياس الدقيق.",
        en: "Behavioral objectives require measurable action verbs and defined success criteria.",
        fr: "Un objectif pédagogique exige un verbe d'action mesurable et un seuil de réussite."
      },
      explanation: {
        ar: "كلمات مثل 'يفهم' أو 'يحب' غير قابلة للقياس المباشر؛ الصياغة السلوكية تحدد الفعل والشرط ومعيار الإتقان.",
        en: "Words like 'understand' are vague; SMART objectives state performance, conditions, and criteria.",
        fr: "Les verbes flous comme 'comprendre' doivent être remplacés par des actions observables."
      }
    },
    {
      q: {
        ar: "ما الفائدة الأساسية من تطبيق استراتيجية التجزئة (Chunking) في المحتوى التدريبي؟",
        en: "What is the primary benefit of applying content chunking in training kits?",
        fr: "Quel est l'avantage principal de la technique de découpage (Chunking) ?"
      },
      options: {
        ar: ["تسهيل استيعاب المفاهيم المعقدة بتفكيكها إلى كتل معرفية مترابطة تناسب سعة الذاكرة", "زيادة عدد صفحات الحقيبة لتبدو أضخم للعميل", "حذف نصف المادة العلمية لتوفير الوقت", "فصل المتدربين عن بعضهم البعض في القاعة"],
        en: ["Facilitating digestion of complex concepts by breaking them into manageable, connected units", "Inflating page count to impress corporate clients", "Omitting half the curriculum to save time", "Physically separating trainees in the room"],
        fr: ["Faciliter l'assimilation en scindant les notions en modules digestes adaptés au cerveau", "Gonfler artificiellement le nombre de pages", "Supprimer la moitié du programme pour aller vite", "Isoler physiquement les apprenants"]
      },
      ans: 0,
      hint: {
        ar: "العقل البشري يتعامل مع المعلومات في حزم صغيرة تتراوح بين 3 و 5 عناصر.",
        en: "Human cognition processes information best in small clusters of 3-5 elements.",
        fr: "Le cerveau traite l'information de manière optimale par blocs de 3 à 5 éléments."
      },
      explanation: {
        ar: "التجزئة المنطقية تخفض العبء المعرفي الزائد وتمنح المتدربين شعوراً بالإنجاز التدريجي في كل خطوة.",
        en: "Chunking prevents cognitive overload and builds progressive sense of mastery.",
        fr: "Le découpage prévient la saturation et crée un sentiment de progression continue."
      }
    },
    {
      q: {
        ar: "ما العنصر الأكثر جوهرية الذي يميز 'دليل المدرب' عن 'مذكرة المتدرب'؟",
        en: "What is the essential component distinguishing a Trainer's Manual from a Trainee Workbook?",
        fr: "Quel élément clé différencie le Guide du Formateur du Livret de l'Apprenant ?"
      },
      options: {
        ar: ["سيناريو التيسير، إرشادات إدارة الأنشطة، التوقيتات الدقيقة، وحلول التمارين وبدائل الطوارئ", "تطابق المحتويين حرفياً دون أي فارق بينهما", "دليل المدرب لا يحتوي على أي معلومات تدريبية", "مذكرة المتدرب تحتوي على الإجابات النموذجية للامتحان مقدماً"],
        en: ["Facilitation script, timing rubrics, exercise solutions, and contingency drills", "Complete word-for-word duplication between both documents", "Trainer manual has no educational notes", "Trainee workbook has pre-filled exam answer keys"],
        fr: ["Scénario d'animation, minutage rigoureux, corrigés des cas et options de repli", "Identité stricte mot à mot des deux supports", "Le guide du formateur ne contient rien d'utile", "Le livret apprenant donne les corrigés de l'examen"]
      },
      ans: 0,
      hint: {
        ar: "دليل المدرب هو بمثابة نص المخرج المسرحي الذي يقود الكواليس والتفاصيل.",
        en: "The facilitator manual is like a director's script detailing behind-the-scenes cues.",
        fr: "Le guide du formateur est la partition détaillée qui pilote le déroulement."
      },
      explanation: {
        ar: "دليل المدرب وثيقة مهنية تشرح كيفية توجيه النقاش وإدارة الوقت والمواقف الصعبة بحرفية.",
        en: "A trainer manual equips any qualified instructor to facilitate the courseware uniformly.",
        fr: "Ce guide permet à tout formateur d'animer la session avec une qualité constante."
      }
    },
    {
      q: {
        ar: "عند تصميم سلم تقييم (Rubric) لقياس كفاءة أداء عملي، ما الذي يجب أن يتضمنه السلم؟",
        en: "When designing a performance evaluation rubric, what core components must it include?",
        fr: "Quels éléments essentiels doit comporter une grille d'évaluation (Rubric) ?"
      },
      options: {
        ar: ["معايير أداء واضحة، ومستويات إتقان متدرجة (مبتدئ، ممارس، متمكن)، مع مؤشرات سلوكية محددة", "مجرد درجة رقمية عامة من 10 دون أي تفاصيل أو معايير", "آراء انطباعية شخصية خالية من الأدلة", "أسئلة صح وخطأ فقط"],
        en: ["Clear performance criteria, stepped mastery levels, and defined behavioral indicators", "A single generic grade out of 10 without criteria", "Subjective personal impressions without evidence", "Only true/false tick boxes"],
        fr: ["Critères clairs, niveaux de maîtrise gradués et descripteurs observables", "Une simple note sur 10 sans critère", "Des impressions subjectives sans preuve", "Uniquement des cases vrai/faux"]
      },
      ans: 0,
      hint: {
        ar: "الروبرك الموضوعي يضمن أن أي مقيّم سيعطي نفس النتيجة لنفس الأداء.",
        en: "An objective rubric ensures inter-rater reliability across evaluators.",
        fr: "Une grille critériée garantit l'équité et la reproductibilité du jugement."
      },
      explanation: {
        ar: "سلالم التقييم تحدد مؤشرات النجاح بدقة وتزيل الغموض والانحياز الذاتي في تقييم المهارات العملية.",
        en: "Rubrics provide transparent benchmarks and remove subjective bias in skill evaluation.",
        fr: "Les rubrics clarifient les attentes et éliminent la subjectivité de l'évaluation."
      }
    },
    {
      q: {
        ar: "كيف يضمن مصمم الحقيبة التدريبية جودتها واعتمادها وفق المعايير المؤسسية؟",
        en: "How does a courseware designer validate package quality for institutional accreditation?",
        fr: "Comment valider la qualité d'un kit pédagogique avant homologation ?"
      },
      options: {
        ar: ["بإجراء تدريب تجريبي (Pilot Run)، وتحكيم الحقيبة بواسطة خبراء نظراء، وتعديل الملاحظات", "بطباعة الحقيبة مباشرة دون مراجعة وبيعها للشركات", "بالاعتماد على محتوى منسوخ من الإنترنت دون تدقيق", "بإلغاء مرحلة التحليل والتصميم"],
        en: ["Conducting a pilot test, peer-reviewing with domain experts, and iterating on feedback", "Printing and selling unreviewed drafts directly to clients", "Relying on unverified online copy-paste", "Skipping analysis and design phases"],
        fr: ["Animation pilote (test à blanc), relecture par des pairs experts et itération", "Imprimer et vendre directement sans relecture", "Copier-coller des contenus web non vérifiés", "Zapper les phases de cadrage"]
      },
      ans: 0,
      hint: {
        ar: "التشغيل التجريبي (Pilot Testing) يكشف فجوات التوقيت والاستيعاب قبل الطرح الرسمي.",
        en: "Pilot testing uncovers timing snags and comprehension gaps before commercial rollout.",
        fr: "Le test à blanc révèle les dysfonctionnements de timing avant le lancement."
      },
      explanation: {
        ar: "التحكيم المهني والتجريب الميداني يضمنان فاعلية الحقيبة ومطابقتها للمتطلبات الأكاديمية.",
        en: "Peer validation and pilot calibration protect institutional reputation and client ROI.",
        fr: "La validation par les pairs et le pilote garantissent la rigueur pédagogique."
      }
    }
  ],

  // Module 4: الابتكار البيداغوجي والتلعيب
  module_4: [
    {
      q: {
        ar: "ما هو الفارق الجوهري بين 'الألعاب التدريبية' و 'التلعيب (Gamification)'؟",
        en: "What is the core distinction between educational games and gamification?",
        fr: "Quelle est la distinction fondamentale entre jeux sérieux et gamification ?"
      },
      options: {
        ar: ["التلعيب هو توظيف آليات الألعاب في سياقات حقيقية غير ترفيهية لتعزيز السلوك والتعلم", "لا يوجد أي فارق، كلاهما مجرد تسلية لإضاعة الوقت", "الألعاب مخصصة للأطفال فقط ولا تناسب التدريب", "التلعيب يعني إجبار الجميع على لعب كرة القدم"],
        en: ["Gamification integrates game mechanics into non-game contexts to drive behavior and learning", "No difference, both are merely time-wasting entertainment", "Games are strictly for children, never for corporate training", "Gamification means forcing learners to play soccer"],
        fr: ["La gamification applique les mécaniques de jeu à des contextes réels pour motiver", "Aucune différence, ce sont de simples distractions", "Le jeu est réservé aux enfants, pas aux pros", "La gamification consiste à faire du sport"]
      },
      ans: 0,
      hint: {
        ar: "التلعيب يستخدم عناصر مثل النقاط والشارات والتحديات لتحقيق أهداف تعليمية جادة.",
        en: "Gamification leverages reward loops and challenges to achieve serious learning outcomes.",
        fr: "La gamification utilise leviers et défis pour atteindre des objectifs sérieux."
      },
      explanation: {
        ar: "التلعيب يحفز الدوافع الجوهرية (Intrinsic Motivation) ويحول الممارسات الروتينية إلى تجارب تنافسية مثمرة.",
        en: "Gamification engages intrinsic motivators to elevate adult participation and retention.",
        fr: "La gamification stimule la motivation intrinsèque pour maximiser l'engagement."
      }
    },
    {
      q: {
        ar: "في مرحلة استخلاص الدروس (Debriefing) بعد نشاط تفاعلي، ما هو التسلسل المنطقي للأسئلة؟",
        en: "During debriefing following an interactive drill, what is the logical questioning sequence?",
        fr: "Lors d'un débriefing après une activité, quel est l'ordre logique des questions ?"
      },
      options: {
        ar: ["ماذا حدث؟ (الملاحظة) -> ثم ماذا؟ (المعنى والتحليل) -> والآن ماذا؟ (التطبيق في بيئة العمل)", "ماذا حدث فقط دون تحليل أو تطبيق", "من أخطأ ومن يستحق العقاب؟", "القفز فوراً للاستراحة دون نقاش"],
        en: ["What happened? (Observation) -> So what? (Meaning/Analysis) -> Now what? (Workplace application)", "Only what happened without reflection", "Who made a mistake and deserves blame?", "Skipping straight to coffee break without debriefing"],
        fr: ["Que s'est-il passé ? (Faits) -> Qu'est-ce que ça implique ? (Sens) -> Et maintenant ? (Action)", "Décrire les faits sans analyser", "Chercher qui a fait des erreurs pour le blâmer", "Partir en pause sans aucun retour réflexif"]
      },
      ans: 0,
      hint: {
        ar: "نموذج (What? So What? Now What?) يربط التجربة الميدانية بالواقع المهني.",
        en: "The classic 3-stage reflection model bridges game dynamics to operational reality.",
        fr: "Le modèle en 3 étapes transforme l'expérience vécue en compétence de travail."
      },
      explanation: {
        ar: "النشاط بدون استخلاص دروس منظم يفقد 80% من قيمته البيداغوجية؛ الدبريفينج هو جوهر التعلم.",
        en: "An activity without structured debrief loses 80% of its learning value; reflection is the core.",
        fr: "Une activité sans débriefing perd l'essentiel de sa portée pédagogique."
      }
    },
    {
      q: {
        ar: "كيف يوظف المدرب التفكير التصميمي (Design Thinking) في حل مشكلات الأداء للمتدربين؟",
        en: "How does a trainer apply Design Thinking to resolve learner performance bottlenecks?",
        fr: "Comment appliquer le Design Thinking pour résoudre les blocages des apprenants ?"
      },
      options: {
        ar: ["بالتعاطف مع احتياجات المتدرب، تحديد التحدي الجوهري، ابتكار حلول، وبناء نماذج أنشطة سريعة", "بفرض حلول مسبقة دون الاستماع لمعاناة المتدربين", "بالاكتفاء بتوزيع نماذج ورقية قديمة", "بإلقاء اللوم على المتدربين في ضعف النتائج"],
        en: ["Empathizing with learner needs, defining the core bottleneck, ideating solutions, and rapid prototyping", "Imposing pre-set formulas without listening to trainee struggles", "Relying strictly on outdated photocopied forms", "Blaming trainees for poor metrics"],
        fr: ["Empathie avec l'apprenant, cadrage du problème, idéation et prototypage d'activités", "Plaquer des recettes toutes faites sans écouter", "Distribuer de vieux polycopiés dépassés", "Accuser les stagiaires de mauvaise volonté"]
      },
      ans: 0,
      hint: {
        ar: "التفكير التصميمي يتمحور حول الإنسان (Human-Centered) ويبدأ دائماً بالتعاطف العميق.",
        en: "Design thinking is human-centered and fundamentally begins with empathetic listening.",
        fr: "Le Design Thinking est centré sur l'humain et démarre par l'écoute empathique."
      },
      explanation: {
        ar: "مقاربة التفكير التصميمي تضمن أن الحلول التدريبية تجيب بدقة على المشكلات الحقيقية لبيئة العمل.",
        en: "Human-centered design guarantees educational interventions solve actual field pain points.",
        fr: "Cette approche garantit des réponses sur mesure aux difficultés réelles du terrain."
      }
    },
    {
      q: {
        ar: "ما الشرط الأساسي لنجاح التعلم القائم على المشكلات (Problem-Based Learning - PBL)؟",
        en: "What is the critical prerequisite for successful Problem-Based Learning (PBL)?",
        fr: "Quelle est la condition clé de réussite de l'Apprentissage par Problèmes (APP) ?"
      },
      options: {
        ar: ["صياغة مشكلة واقعية غير محددة الحل سلفاً، تثير الفضول وتتطلب بحثاً وتحليلاً جماعياً", "إعطاء المتدربين الحل الجاهز في بداية التمرين", "طرح أسئلة بسيطة إجابتها بنعم أو لا فقط", "منع المشاركين من التحدث مع بعضهم البعض"],
        en: ["Crafting an ill-structured, authentic dilemma that sparks curiosity and demands collaborative inquiry", "Handing out pre-solved answers at drill kickoff", "Asking superficial yes/no questions", "Forbidding participants from speaking with peers"],
        fr: ["Problème complexe et réaliste sans solution unique, stimulant l'investigation collective", "Donner la solution dès le départ", "Poser des questions fermées par oui ou non", "Interdire aux apprenants d'échanger entre eux"]
      },
      ans: 0,
      hint: {
        ar: "المشكلات الواقعية المعقدة تنشط التفكير النقدي والعمل الجماعي.",
        en: "Messy, real-world problems force critical thinking and cross-functional teamwork.",
        fr: "Les situations complexes déclenchent la réflexion critique et la coopération."
      },
      explanation: {
        ar: "في منهجية PBL، يعمل المدرب كميسر موجه (Facilitator) وليس كملقن، مما يبني استقلالية المتعلم.",
        en: "In PBL, the trainer acts as an inquiring guide rather than a lecturer, cultivating autonomy.",
        fr: "Le formateur agit en facilitateur bienveillant, stimulant l'autonomie des apprenants."
      }
    },
    {
      q: {
        ar: "ما المحذور الأكبر الذي يجب تجنبه عند إدخال التلعيب ونظم النقاط في تدريب القيادات؟",
        en: "What is the biggest pitfall to avoid when introducing gamification to executive training?",
        fr: "Quel écueil majeur éviter lors de la gamification de formations exécutives ?"
      },
      options: {
        ar: ["التحول إلى منافسة سطحية طفولية تشتت الانتباه عن عمق المفاهيم وتهدد الكرامة المهنية", "جعل الورشة ممتعة وتفاعلية", "مكافأة الحلول الابتكارية المتميزة", "استخدام التكنولوجيا الحديثة"],
        en: ["Trivializing sessions into childish competition that distracts from core strategic depth", "Making workshops engaging and interactive", "Rewarding creative and impactful solutions", "Deploying modern collaborative technology"],
        fr: ["Infantiliser la formation avec des jeux superficiels nuisant à la dignité et au fond", "Rendre l'atelier vivant et dynamique", "Récompenser les idées novatrices", "Utiliser des outils modernes"]
      },
      ans: 0,
      hint: {
        ar: "التلعيب الموجه للمدراء التنفيذيين يجب أن يحاكي تحديات استراتيجية راقية وواقعية.",
        en: "Executive gamification must simulate high-stakes, realistic boardroom scenarios.",
        fr: "La ludification pour dirigeants doit simuler des défis stratégiques matures."
      },
      explanation: {
        ar: "التلعيب السطحي ينفر الفئات القيادية؛ التلعيب الاحترافي يركز على المحاكاة المعقدة واتخاذ القرار.",
        en: "Childish mechanics alienate executives; professional gamification hinges on nuanced simulation.",
        fr: "Les mécaniques enfantines décrédibilisent la session auprès des cadres dirigeants."
      }
    },
    {
      q: {
        ar: "كيف توظف حلقة كولب (Kolb's Experiential Cycle) لضمان تجربة تعلم متكاملة؟",
        en: "How do you leverage Kolb's Experiential Cycle to ensure a complete learning journey?",
        fr: "Comment articuler les 4 phases du cycle d'apprentissage expérientiel de Kolb ?"
      },
      options: {
        ar: ["التدرج عبر: تجربة ملموسة -> ملاحظة تأملية -> صياغة مفاهيم مجردة -> تجريب نشط في سياق جديد", "الاكتفاء بالتجربة دون تأمل أو مفاهيم", "البدء والانتهاء بحفظ المصطلحات النظرية فقط", "إلغاء التطبيق العملي"],
        en: ["Progressing through: Concrete Experience -> Reflective Observation -> Abstract Conceptualization -> Active Experimentation", "Stopping at experience without reflection or models", "Beginning and ending with rote theory", "Completely skipping practical trials"],
        fr: ["Enchaîner : Expérience concrète -> Observation réfléchie -> Conceptualisation abstraite -> Expérimentation active", "S'arrêter au jeu sans théoriser", "Faire uniquement du cours magistral", "Supprimer la mise en pratique"]
      },
      ans: 0,
      hint: {
        ar: "دورة كولب تضمن اكتمال الفهم من خلال المرور بالمراحل الأربع بلا استثناء.",
        en: "Kolb's four-stage cycle ensures holistic comprehension and behavioral transfer.",
        fr: "Les 4 étapes de Kolb bouclent la boucle de l'acquisition durable."
      },
      explanation: {
        ar: "إتمام حلقة كولب يمكن المتدرب من تحويل التجربة الميدانية إلى نموذج ذهني وتطبيقه في مواقف جديدة.",
        en: "Completing Kolb's loop transforms raw experience into adaptive professional capability.",
        fr: "Ce cycle complet permet de transposer l'expérience vécue à de nouveaux contextes."
      }
    }
  ],

  // Module 5: التحول الرقمي والذكاء الاصطناعي في التدريب
  module_5: [
    {
      q: {
        ar: "ما هو الإطار الهيكلي الأفضل لصياغة أمر ذكي (Prompt) لتوليد حقيبة تدريبية بالذكاء الاصطناعي؟",
        en: "What is the best structural prompting framework for generating course curricula via AI?",
        fr: "Quel cadre de prompt est idéal pour générer un syllabus de formation via l'IA ?"
      },
      options: {
        ar: ["إطار R-C-T-C: تحديد الدور (Role)، السياق (Context)، المهمة المحددة (Task)، والقيود والمعايير (Constraints)", "كتابة سطر واحد مثل 'اكتب لي دورة تدريبية'", "تكرار نفس الكلمة عدة مرات دون توضيح", "عدم تحديد الفئة المستهدفة أو المدة الزمنية"],
        en: ["R-C-T-C framework: defining Role, Context, Task, and Constraints", "Writing a vague single-line request like 'make me a course'", "Repeating one word endlessly", "Never specifying target audience or time parameters"],
        fr: ["Cadre R-C-T-C : Rôle, Contexte, Tâche précise et Contraintes de forme", "Demander 'fais-moi un cours' en 4 mots sans détail", "Répéter un mot sans consigne", "Omettre le public cible et la durée"]
      },
      ans: 0,
      hint: {
        ar: "النماذج اللغوية تعطي نتائج مبهرة عندما تزودها بسياق غني وقيود صارمة.",
        en: "LLMs yield exceptional outputs when anchored with rich role-context constraints.",
        fr: "L'IA excelle quand elle est guidée par un rôle d'expert et des contraintes claires."
      },
      explanation: {
        ar: "تحديد الدور والسياق والقيود يمنع هلوسة الذكاء الاصطناعي وينتج حقائب احترافية تطابق المعايير.",
        en: "Structured prompting prevents generic hallucinations and produces accredited-grade outlines.",
        fr: "La structuration du prompt évite les banalités et produit des supports pointus."
      }
    },
    {
      q: {
        ar: "ما الفرق الجوهري بين أنظمة إدارة التعلم (LMS) ومنصات تجربة التعلم (LXP)؟",
        en: "What is the core difference between a Learning Management System (LMS) and a Learning Experience Platform (LXP)?",
        fr: "Quelle est la différence majeure entre un LMS classique et une plateforme LXP ?"
      },
      options: {
        ar: ["LMS يركز على الامتثال وتتبع الإدارة للمسارات، بينما LXP تركز على التخصيص الذاتي والمحتوى التكيفي للمتعلم", "لا يوجد أي فارق، مجرد أسماء تجارية مترادفة", "LMS مخصصة للهواتف فقط و LXP للحواسيب", "LXP لا تتيح مشاهدة الفيديوهات إطلاقاً"],
        en: ["LMS focuses on compliance and admin tracking; LXP centers on learner-driven discovery and adaptive paths", "No difference, just interchangeable marketing buzzwords", "LMS is strictly for mobile and LXP for desktop", "LXPs cannot host video media"],
        fr: ["Le LMS est axé sur le suivi administratif ; le LXP mise sur la personnalisation et l'expérience apprenant", "Aucune différence, juste du jargon marketing", "LMS sur smartphone et LXP sur PC", "Le LXP ne supporte pas la vidéo"]
      },
      ans: 0,
      hint: {
        ar: "LXP تشبه تجربة نتفليكس أو يوتيوب في ترشيح المحتوى بحسب اهتمامات المتعلم.",
        en: "LXPs mimic Netflix-like adaptive content recommendations tailored to individual curiosity.",
        fr: "Le LXP fonctionne comme un flux personnalisé recommandant les contenus adaptés."
      },
      explanation: {
        ar: "منصات LXP تدمج الذكاء الاصطناعي لتقديم مسارات تعلم تكيفية مرنة تعزز استقلالية المتدرب.",
        en: "LXPs leverage AI and social learning to put the employee at the center of skill discovery.",
        fr: "Le LXP offre un parcours sur mesure valorisant l'apprentissage autodirigé."
      }
    },
    {
      q: {
        ar: "كيف يحافظ المدرب على تفاعل المتدربين في القاعات الافتراضية عبر منصات مثل Zoom أو Teams؟",
        en: "How does an instructor maintain high engagement in virtual classrooms (Zoom/Teams)?",
        fr: "Comment maintenir l'attention des participants en classe virtuelle (Zoom/Teams) ?"
      },
      options: {
        ar: ["تطبيق قاعدة التفاعل كل 4 دقائق عبر الغرف الفرعية، استطلاعات الرأي اللحظية، والسبورات التشاركية", "إغلاق الميكروفونات والكاميرات وإلقاء محاضرة متصلة لمدة 3 ساعات", "الحديث دون التفاعل مع الدردشة الكتابية", "إلغاء التمارين الجماعية والاكتفاء بشرائح العرض"],
        en: ["Applying the 4-minute touchpoint rule via breakout rooms, live polling, and digital whiteboards", "Muting all cameras and microphones for 3 hours of uninterrupted monologue", "Completely ignoring text chat and questions", "Eliminating group exercises to save screen time"],
        fr: ["Règle de l'interaction toutes les 4 min : sous-salles, sondages en direct et tableaux collaboratifs", "Couper micros et caméras pour un monologue de 3 heures", "Ignorer totalement le chat et les questions", "Supprimer les travaux de groupe virtuels"]
      },
      ans: 0,
      hint: {
        ar: "الشاشات الافتراضية تتطلب وتيرة تفاعل أسرع بكثير من القاعات الحضورية.",
        en: "Virtual classrooms require interactive triggers twice as frequently as in-person rooms.",
        fr: "Le distanciel exige des micro-interactions beaucoup plus fréquentes qu'en salle."
      },
      explanation: {
        ar: "التفاعل المتكرر واستخدام الغرف الفرعية يقضي على التشتت والملل الرقمي (Zoom Fatigue).",
        en: "Frequent interactive touchpoints and breakout sessions neutralize Zoom fatigue.",
        fr: "Les interactions fréquentes maintiennent l'éveil et combattent la lassitude d'écran."
      }
    },
    {
      q: {
        ar: "ما هو الالتزام الأخلاقي الأهم عند توظيف أدوات الذكاء الاصطناعي في إعداد المحتوى والتقييم؟",
        en: "What is the paramount ethical imperative when deploying AI for course generation and grading?",
        fr: "Quel est l'impératif éthique majeur lors de l'utilisation de l'IA en formation ?"
      },
      options: {
        ar: ["الشفافية الكاملة، التحقق البشري من صحة المخرجات، وحماية سرية بيانات المؤسسات والمتدربين", "نسب كافة المحتوى للذكاء الاصطناعي وإخلاء مسؤولية المدرب من الأخطاء", "مشاركة بيانات سرية لعملاء الشركات مع النماذج العامة دون إذن", "الاعتماد الأعمى على إجابات الموديل دون مراجعة"],
        en: ["Full transparency, human-in-the-loop verification, and strict confidentiality of corporate data", "Blaming the AI for any errors while abandoning professional accountability", "Pasting client trade secrets into public LLMs without authorization", "Blindly trusting AI outputs without domain vetting"],
        fr: ["Transparence, contrôle humain des contenus et stricte confidentialité des données d'entreprise", "Se dédouaner des erreurs sur l'IA sans assumer", "Diffuser des données confidentielles sur des serveurs publics", "Faire une confiance aveugle aux réponses du modèle"]
      },
      ans: 0,
      hint: {
        ar: "المدرب هو الضامن النهائي لدقة المحتوى وسلامة البيانات الحساسة.",
        en: "The human facilitator remains solely liable for pedagogical accuracy and privacy.",
        fr: "Le formateur reste le garant final de l'éthique et de la véracité scientifique."
      },
      explanation: {
        ar: "المبدأ الإنساني في التدريب (Human-in-the-loop) يقتضي تدقيق كل ما يولده الذكاء الاصطناعي وحفظ الخصوصية.",
        en: "Human oversight ensures hallucinations are weeded out and intellectual property is safeguarded.",
        fr: "La supervision humaine évite les biais et protège le secret professionnel."
      }
    },
    {
      q: {
        ar: "كيف تفيد أدوات الأتمتة (مثل Zapier أو Make) في تحسين تجربة المتدرب والمدرب؟",
        en: "How do automation platforms like Zapier/Make optimize the learning workflow?",
        fr: "Comment les outils d'automatisation (Zapier, Make) fluidifient-ils la formation ?"
      },
      options: {
        ar: ["بربط التسجيل بإرسال التذكيرات التقويمية، إصدار الشهادات التلقائي، ومتابعة الواجبات بسلاسة", "بتعطيل التواصل بين المدرب والمتدربين", "بحذف حسابات المشاركين تلقائياً دون سبب", "بزيادة المهام الورقية اليدوية المرهقة"],
        en: ["Connecting registration with calendar invites, automated certificates, and follow-ups", "Severing communication between facilitator and trainees", "Arbitrarily deleting student accounts", "Multiplying manual administrative paperwork"],
        fr: ["Lier inscription, rappels agenda, émission d'attestations et relances automatisées", "Couper toute communication avec les stagiaires", "Supprimer les comptes sans prévenir", "Multiplier les paperasses manuelles"]
      },
      ans: 0,
      hint: {
        ar: "الأتمتة توفر وقت المدرب الإداري ليركز على جودة التيسير والتفاعل الإنساني.",
        en: "Automating clerical tasks frees trainer bandwidth to focus purely on high-touch mentorship.",
        fr: "L'automatisation libère du temps pour l'accompagnement humain de qualité."
      },
      explanation: {
        ar: "توفير المهام الروتينية يرفع من احترافية المركز التدريبي ويضمن تجربة خالية من التعطيل للمتدرب.",
        en: "Workflow automation delivers a frictionless, premium onboarding and graduation experience.",
        fr: "Les flux automatisés valorisent l'image de l'organisme et sécurisent le parcours."
      }
    },
    {
      q: {
        ar: "ما هي الميزة الجوهرية لبناء مساعد ذكي مدرب على حقيبتك (Custom AI Tutor Bot)؟",
        en: "What is the key advantage of training a custom AI tutor on your specific course materials?",
        fr: "Quel est l'atout majeur d'un tuteur virtuel IA entraîné sur vos propres cours ?"
      },
      options: {
        ar: ["تقديم إجابات مخصصة مستندة حصراً لمنهجيتك وتوفير دعم تدريبي فوري للمتدربين على مدار 24/7", "استبدال المدرب البشري وإلغاء الجلسات الحية كلياً", "إعطاء إجابات عشوائية عامة لا علاقة لها بالدورة", "إجبار المتدربين على دفع رسوم إضافية لكل سؤال"],
        en: ["Providing 24/7 personalized answers grounded exclusively in your proprietary course syllabus", "Completely replacing human trainers and ending live workshops", "Giving erratic off-topic answers", "Charging participants micro-fees per question"],
        fr: ["Réponses 24/7 ancrées strictement dans vos supports de cours pour guider l'apprenant", "Remplacer totalement le formateur humain", "Fournir des réponses hors sujet et imprécises", "Facturer chaque question à l'apprenant"]
      },
      ans: 0,
      hint: {
        ar: "المساعد المخصص يضمن أن الإجابات مستقاة من مراجعك المعتمدة دون تشتت خارجي.",
        en: "Grounding an AI on your course PDFs ensures contextual fidelity and aligned tutoring.",
        fr: "Le tuteur personnalisé garantit la conformité doctrinale avec vos supports."
      },
      explanation: {
        ar: "الذكاء الاصطناعي الموجه يعزز الاستبقاء عبر إتاحة المساعدة الفورية كلما واجه المتدرب صعوبة في التطبيق.",
        en: "Domain-grounded AI tutors provide on-demand scaffolding, accelerating skill mastery post-class.",
        fr: "L'assistant sur mesure offre un étayage permanent facilitant la mise en pratique."
      }
    }
  ],

  // Module 6: تحليلات الأثر وعائد التدريب (ROI)
  module_6: [
    {
      q: {
        ar: "وفق نموذج كيركباتريك (Kirkpatrick)، ما الفرق بين المستوى الثاني (التعلم) والمستوى الثالث (السلوك)؟",
        en: "In Kirkpatrick's model, what separates Level 2 (Learning) from Level 3 (Behavior)?",
        fr: "Dans le modèle de Kirkpatrick, quelle différence entre Niveau 2 et Niveau 3 ?"
      },
      options: {
        ar: ["المستوى 2 يقيس المعرفة والمهارة المكتسبة بالقاعة، بينما المستوى 3 يقيس تطبيقها الفعلي في بيئة العمل", "المستوى 2 يقيس رضا المتدربين والمستوى 3 يقيس أرباح الشركة", "لا يوجد أي فرق بينهما", "المستوى 2 يخص المدرب والمستوى 3 يخص المنظمين"],
        en: ["Level 2 evaluates in-class knowledge and skill acquisition; Level 3 evaluates on-the-job application", "Level 2 measures coffee satisfaction and Level 3 measures gross corporate profit", "No difference whatsoever", "Level 2 is for instructors and Level 3 is for venue staff"],
        fr: ["Le Niveau 2 évalue les acquis en salle ; le Niveau 3 mesure l'application réelle au poste", "Niveau 2 mesure la satisfaction et Niveau 3 les bénéfices", "Aucune différence notable", "Niveau 2 pour le prof et Niveau 3 pour l'accueil"]
      },
      ans: 0,
      hint: {
        ar: "كثيرون ينجحون في اختبار القاعة (L2) لكنهم يفشلون في تغيير ممارساتهم الوظيفية (L3).",
        en: "Many pass classroom quizzes (L2) but fail to alter daily work behaviors (L3).",
        fr: "On peut réussir l'examen en salle (L2) sans changer ses habitudes de travail (L3)."
      },
      explanation: {
        ar: "نقل أثر التعلم (Transfer of Learning) إلى بيئة العمل هو جوهر المستوى الثالث وأصعب مراحل التقييم.",
        en: "Behavioral transfer to the job (Level 3) is the true litmus test of meaningful training impact.",
        fr: "Le transfert au poste de travail est la pierre angulaire de l'efficacité opérationnelle."
      }
    },
    {
      q: {
        ar: "ما هي معادلة جاك فيليبس (Jack Phillips) لحساب العائد على الاستثمار التدريبي (ROI)؟",
        en: "What is Jack Phillips' formula for calculating Training Return on Investment (ROI)?",
        fr: "Quelle est la formule du ROI de formation selon Jack Phillips ?"
      },
      options: {
        ar: ["ROI (%) = ((صافي المنافع المالية للبرنامج - التكاليف الإجمالية) / التكاليف الإجمالية) × 100", "ROI = عدد المتدربين مقسوماً على عدد الساعات التدريبية", "ROI = نسبة النجاح في الاختبار النهائي مطروحاً منها 10%", "ROI = تكلفة القاعة مضروبة في سعر التذاكر"],
        en: ["ROI (%) = ((Net Monetary Benefits - Total Program Costs) / Total Program Costs) * 100", "ROI = Trainees count divided by total training hours", "ROI = Exam pass rate minus 10%", "ROI = Venue rental multiplied by ticket price"],
        fr: ["ROI (%) = ((Bénéfices nets de la formation - Coûts complets) / Coûts complets) x 100", "ROI = Nombre de stagiaires divisé par les heures", "ROI = Taux de réussite moins 10%", "ROI = Coût de la salle multiplié par le prix"]
      },
      ans: 0,
      hint: {
        ar: "المعادلة تحسب النسبة المئوية لصافي الربح المسترجع لكل دولار تم استثماره في البرنامج.",
        en: "The formula calculates the net financial gain yielded per dollar invested in training.",
        fr: "La formule exprime le gain net en pourcentage des dépenses engagées."
      },
      explanation: {
        ar: "معادلة فيليبس تمثل المستوى الخامس وتبرهن بالأرقام المالية القاطعة جدوى التدريب للإدارات التنفيذية.",
        en: "Phillips Level 5 ROI quantifies bottom-line business value in undeniable CFO financial language.",
        fr: "Ce calcul financier prouve la rentabilité de la formation auprès des directions générales."
      }
    },
    {
      q: {
        ar: "كيف يعزل المدرب ومسؤول التدريب أثر البرنامج التدريبي إحصائياً عن العوامل التسويقية والسوقية الأخرى؟",
        en: "How do L&D analysts statistically isolate training impact from external market variables?",
        fr: "Comment isoler statistiquement l'effet formation des autres variables de marché ?"
      },
      options: {
        ar: ["باستخدام طريقة المجموعات الضابطة (Control Groups) ومقارنة أداء المتدربين بنظرائهم غير المتدربين", "بافتراض أن كل التحسن ناتج عن التدريب بنسبة 100% دون دليل", "بتجاهل المؤشرات والاعتماد على التخمين", "بإلغاء قياس المبيعات والأداء كلياً"],
        en: ["Using control groups and comparing trained cohort metrics against an identical untrained group", "Assuming 100% of business growth is purely due to training without proof", "Relying on gut instinct rather than empirical metrics", "Discarding sales and performance metrics altogether"],
        fr: ["Utilisation de groupes témoins comparant la cohorte formée à un groupe non formé identique", "Décréter arbitrairement que 100% des gains viennent du cours", "Faire des suppositions intuitives sans chiffre", "Supprimer tout suivi des performances"]
      },
      ans: 0,
      hint: {
        ar: "المجموعة الضابطة هي المعيار الذهبي في البحث العلمي لإثبات السببية.",
        en: "A matched control group is the empirical gold standard for proving causality.",
        fr: "Le groupe témoin est le standard scientifique pour prouver la causalité."
      },
      explanation: {
        ar: "عزل الأثر يمنح مصداقية علمية للتقارير ويمنع التشكيك من قِبل مدراء المالية وأصحاب القرار.",
        en: "Isolating effects builds bulletproof credibility with executive boards and audit committees.",
        fr: "Isoler l'impact protège l'analyse contre les contestations de la direction financière."
      }
    },
    {
      q: {
        ar: "ما المؤشر الأنسب لقياس جودة التدريب من خلال سرعة إتقان المتدرب لمهامه (Time-to-Competence)؟",
        en: "What metric evaluates training quality through time-to-competence?",
        fr: "Quel indicateur mesure la vitesse d'accès à l'autonomie opérationnelle ?"
      },
      options: {
        ar: ["انخفاض عدد الأيام المطلوبة للموظف الجديد للوصول إلى معدل الإنتاجية القياسي للوظيفة", "زيادة عدد الساعات التي يقضيها في قراءة الكتيبات", "عدد الشكاوى التي يقدمها المتدرب ضد زملائه", "حجم المصروفات اليومية للوجبات الغذائية"],
        en: ["Reduction in days needed for a hire to reach baseline operational standard productivity", "Increasing hours spent passively reading booklets", "Number of complaints filed against peers", "Total daily cafeteria meal budget"],
        fr: ["Diminution du nombre de jours pour qu'une recrue atteigne la productivité standard", "Nombre d'heures passées à lire des polycopiés", "Plaintes déposées contre les collègues", "Budget repas dépensé par jour"]
      },
      ans: 0,
      hint: {
        ar: "التدريب الممتاز يختصر زمن التعلم ويجعل الموظف منتجاً ومستقلاً في وقت قياسي.",
        en: "High-caliber training shrinks ramp-up periods, unlocking earlier employee productivity.",
        fr: "Une bonne formation réduit la durée d'adaptation et accélère la rentabilité."
      },
      explanation: {
        ar: "تقليص زمن الوصول للكفاءة يوفر آلاف الساعات الإنتاجية للمؤسسة ويوضح العائد غير المباشر للتدريب.",
        en: "Compressing onboarding ramp-up represents massive payroll efficiency and business velocity.",
        fr: "Gagner du temps sur la montée en compétence représente une économie substantielle."
      }
    },
    {
      q: {
        ar: "كيف يمكن تحويل المنافع غير الملموسة للمهارات الناعمة (مثل مهارات التواصل وحل النزاعات) إلى قيم مالية؟",
        en: "How can soft skill intangible benefits (e.g., conflict resolution) be converted into financial values?",
        fr: "Comment convertir des soft skills (gestion de conflit) en valeur financière mesurable ?"
      },
      options: {
        ar: ["بحساب ساعات العمل المهدرة في النزاعات ومعدل دوران الموظفين وتكلفة إعادة التوظيف المسترجعة", "لا يمكن قياس المهارات الناعمة بأي شكل ويجب إهمالها", "بوضع أرقام خيالية عشوائية دون أي سند", "بفرض عقوبات مالية على كل متدرب"],
        en: ["Tabulating recaptured work hours previously lost to disputes, reduced turnover, and hiring costs saved", "Soft skills cannot be quantified and should be disregarded", "Fabricating arbitrary fantasy figures without basis", "Penalizing trainees financially"],
        fr: ["Valoriser les heures de travail perdues en litiges, la baisse du turnover et les coûts de recrutement évités", "Les soft skills sont impossibles à chiffrer", "Inventer des chiffres imaginaires au hasard", "Taxer financièrement les participants"]
      },
      ans: 0,
      hint: {
        ar: "كل ساعة صراع وظيفي تُحل توفر تكلفة أجر مباشر وتمنع استقالات مكلفة للمؤسسة.",
        en: "Every eliminated conflict hour preserves paid wages and mitigates expensive employee turnover.",
        fr: "Chaque heure de conflit résolue préserve du temps productif et évite des démissions coûteuses."
      },
      explanation: {
        ar: "حساب التكلفة البديلة وتفادي الخسائر يترجم الأثر النفسي والسلوكي إلى أرقام مقنعة للمدير المالي.",
        en: "Opportunity cost accounting translates emotional culture shifts into rigorous business cases.",
        fr: "Le calcul des coûts évités traduit le climat social en arguments budgétaires solides."
      }
    },
    {
      q: {
        ar: "ما العنصر الأهم الذي يطلبه مجلس الإدارة في التقرير التنفيذي لنتائج البرنامج التدريبي؟",
        en: "What is the single most critical element executive boards look for in a training program report?",
        fr: "Quel est l'élément le plus scruté par un comité de direction dans un bilan de formation ?"
      },
      options: {
        ar: ["الأثر الملموس على مؤشرات الأداء الحيوية للشركة (KPIs)، والوفورات المحققة، وخطة استدامة النتائج", "قائمة أسماء الحضور وتوقيعاتهم اليومية فقط", "صور الحفلة الختامية وبوفيه الغداء", "تقرير نظري من 300 صفحة بدون ملخص تنفيذي"],
        en: ["Tangible impact on organizational business KPIs, cost savings realized, and sustainability roadmap", "A raw roster of attendee signatures", "Photos of the banquet and certificate cake", "A 300-page academic text with no executive summary"],
        fr: ["L'impact mesurable sur les KPI business, les économies dégagées et la pérennité des acquis", "La simple feuille d'émargement", "Les photos du buffet de clôture", "Un mémoire théorique de 300 pages sans synthèse"]
      },
      ans: 0,
      hint: {
        ar: "القيادات العليا تفضل ملخصاً مركزاً من صفحة واحدة يربط التدريب بأهداف المؤسسة الكبرى.",
        en: "Top executives want a high-impact dashboard connecting learning directly to bottom-line goals.",
        fr: "La direction veut une synthèse d'une page reliant la formation aux résultats de l'entreprise."
      },
      explanation: {
        ar: "التقارير التنفيذية الاحترافية تركز على النتائج والأثر الاستراتيجي وتبرر ميزانيات التدريب المستقبلية.",
        en: "Executive-focused reporting frames L&D not as an overhead cost center, but as a strategic profit driver.",
        fr: "Présenter la formation comme un investissement créateur de valeur pérennise les financements."
      }
    }
  ],

  // Module 7: الحوكمة الاستراتيجية وإدارة المؤسسات
  module_7: [
    {
      q: {
        ar: "ما هي الركيزة الأساسية لمواصفة الجودة الدولية ISO 10015 في التدريب؟",
        en: "What is the core pillar of the ISO 10015 international standard for training quality?",
        fr: "Quel est le pilier central de la norme internationale ISO 10015 en formation ?"
      },
      options: {
        ar: ["إدارة التدريب كعملية منهجية مستمرة تبدأ من تحديد الاحتياجات الفعلية وتنتهي بقياس الأثر وتوثيقه", "طباعة شهادات ورقية مزخرفة بغض النظر عن جودة المحتوى", "إلغاء المعايير الإدارية وترك كل مدرب يعمل بمفرده", "تقليل تكلفة التدريب لأدنى حد ممكن حتى لو انعدمت الجودة"],
        en: ["Managing training as a systematic continuous process from needs analysis to verified impact documentation", "Printing decorative certificates irrespective of instructional quality", "Abolishing administrative procedures and operating ad hoc", "Slashing budgets to the bottom regardless of quality collapse"],
        fr: ["Gérer la formation comme un processus d'amélioration continue du besoin à la mesure d'impact", "Imprimer de beaux diplômes dorés sans se soucier du contenu", "Supprimer toute procédure et laisser improviser", "Brader les coûts au détriment absolu de la qualité"]
      },
      ans: 0,
      hint: {
        ar: "ISO 10015 تركز على دورة الجودة (PDCA): خطط، نفذ، تحقق، وحسن باستمرار.",
        en: "ISO 10015 aligns with the PDCA cycle: Plan, Do, Check, and Act continuously.",
        fr: "La norme ISO 10015 repose sur le cycle d'amélioration continue PDCA."
      },
      explanation: {
        ar: "تطبيق معايير ISO 10015 يضمن الشفافية والاتساق في تقديم الخدمات التدريبية ويؤهل للاعتراف الدولي.",
        en: "ISO 10015 accreditation certifies institutional excellence and operational repeatability.",
        fr: "Cette conformité garantit la rigueur méthodologique et la reconnaissance internationale."
      }
    },
    {
      q: {
        ar: "في إدارة مشاريع التدريب، ماذا يعني حرف 'A' في مصفوفة الأدوار والمسؤوليات (RACI Matrix)؟",
        en: "In project governance, what does the letter 'A' stand for in the RACI Matrix?",
        fr: "Dans la gouvernance de projet, que signifie la lettre 'A' dans la matrice RACI ?"
      },
      options: {
        ar: ["الخاضع للمساءلة والمالك النهائي للقرار (Accountable) - شخص واحد فقط", "المساعد العام (Assistant)", "المتدرب العادي (Attendee)", "المحاسب المالي (Accountant)"],
        en: ["Accountable (the sole ultimate decision maker and owner of outcomes)", "Assistant (general helper)", "Attendee (course participant)", "Accountant (bookkeeper)"],
        fr: ["Accountable (l'unique décideur final responsable du résultat)", "Assistant (aide ponctuelle)", "Apprenant (stagiaire du cours)", "Comptable (gestion financière)"]
      },
      ans: 0,
      hint: {
        ar: "بينما يمكن أن يتعدد المنفذون (R)، فإن الخاضع للمساءلة (A) يجب أن يكون شخصاً واحداً منعاً للضياع.",
        en: "While multiple people can be Responsible (R), only ONE individual can be Accountable (A).",
        fr: "Il peut y avoir plusieurs exécutants (R), mais un seul décideur redevable (A)."
      },
      explanation: {
        ar: "وضوح المسؤولية عبر مصفوفة RACI يمنع تضارب الصلاحيات وتأخر إطلاق البرامج التدريبية الكبرى.",
        en: "Singular accountability eliminates cross-functional confusion and ensures punctual project execution.",
        fr: "La clarté des rôles RACI évite les blocages décisionnels dans les grands projets."
      }
    },
    {
      q: {
        ar: "ما أفضل استراتيجية لتسعير العقود التدريبية الموجهة للشركات الكبرى (B2B)؟",
        en: "What is the best pricing strategy for enterprise B2B training contracts?",
        fr: "Quelle est la meilleure stratégie de tarification pour les contrats B2B d'entreprise ?"
      },
      options: {
        ar: ["التسعير القائم على القيمة والعائد المتوقع للمؤسسة (Value-Based Pricing) بدلاً من التسعير بالساعة", "تسعير بأقل من سعر التكلفة لكسر المنافسين دون النظر للربح", "تحديد سعر عشوائي يختلف كل يوم حسب المزاج", "بيع الدورة مجاناً على أمل أن يتبرع العميل"],
        en: ["Value-Based Pricing tied to client business outcomes and ROI, rather than billable hours", "Selling below cost to undercut peers without considering solvency", "Setting random prices that fluctuate wildly by daily whim", "Delivering for free hoping for voluntary tips"],
        fr: ["Tarification basée sur la valeur ajoutée et le ROI client plutôt que sur le taux horaire", "Casser les prix à perte pour éliminer les rivaux", "Fixer des tarifs arbitraires au hasard du jour", "Travailler gratuitement en espérant un pourboire"]
      },
      ans: 0,
      hint: {
        ar: "المؤسسات الكبرى تدفع بسخاء مقابل حل مشاكلها الجذرية وليس مقابل عدد الدقائق المستغرقة.",
        en: "Enterprises gladly pay premiums for solved high-stakes problems, not generic clock hours.",
        fr: "Les entreprises investissent dans la solution à leurs problèmes, pas dans un nombre d'heures."
      },
      explanation: {
        ar: "التسعير القائم على القيمة يحمي مكانة المدرب كشريك استراتيجي ويحقق هوامش ربحية مستدامة للأكاديمية.",
        en: "Value pricing establishes the trainer as a strategic partner and guarantees healthy margins.",
        fr: "La tarification à la valeur ancre votre statut d'expert partenaire stratégique."
      }
    },
    {
      q: {
        ar: "عند إعداد كراسة الشروط والعرض الفني لمناقصة تدريب حكومية، ما المعيار الأكثر حسماً للفوز؟",
        en: "When submitting technical proposals for government training tenders, what is the winning factor?",
        fr: "Quel facteur est déterminant pour remporter un appel d'offres technique de formation ?"
      },
      options: {
        ar: ["المواءمة الدقيقة لدفتر الشروط، وضوح خطة العمل والجدول الزمني، وسير ذاتية معتمدة لخبراء مؤهلين", "تقديم عرض سطحي غير مفصل مكون من صفحة واحدة", "تجاهل الشروط المكتوبة والاعتماد على العلاقات الشخصية فقط", "استخدام خطوط غير مقروءة وألوان مبهرجة"],
        en: ["Meticulous compliance with tender specs, precise work plan/timeline, and certified expert CVs", "Submitting a generic, unformatted one-page draft", "Ignoring RFP criteria and relying solely on informal networking", "Using illegible fonts and clashing graphics"],
        fr: ["Conformité rigoureuse au cahier des charges, calendrier maîtrisé et CV d'experts certifiés", "Proposer une offre superficielle d'une page", "Ignorer les critères écrits en comptant sur des relations", "Mettre des polices illisibles et des couleurs criardes"]
      },
      ans: 0,
      hint: {
        ar: "لجان الفحص تتبع جدول تنقيط دقيق؛ الإجابة المنهجية على كل بند تضمن العلامة الفنية القصوى.",
        en: "Tender audit committees score against a rigid rubric; matching each criterion wins the bid.",
        fr: "Les jurys notent selon une grille stricte ; répondre point par point garantit la note maximale."
      },
      explanation: {
        ar: "العرض الفني الرصين الذي يوضح منهجية إدارة المخاطر وسجل الإنجازات السابقة يتفوق دائماً.",
        en: "A thorough technical bid demonstrating risk mitigation and proven track record wins top scores.",
        fr: "Une offre technique solide démontrant la maîtrise des risques emporte l'adhésion."
      }
    },
    {
      q: {
        ar: "كيف تتعامل إدارة الأكاديمية مع مخاطر الطوارئ (مثل اعتذار المدرب المفاجئ قبل الدورة بيوم)؟",
        en: "How does academy governance mitigate critical emergencies (e.g., sudden trainer illness 24h prior)?",
        fr: "Comment anticiper un aléa majeur (ex: désistement du formateur 24h avant) ?"
      },
      options: {
        ar: ["بتفعيل خطة استمرارية الأعمال (Business Continuity) ووجود مدرب بديل مؤهل ومطّلع مسبقاً على الحقيبة", "بإلغاء الدورة فجأة دون إبلاغ المتدربين وإغلاق الهاتف", "بإحضار شخص غير مختص لإلقاء أي كلام عشوائي", "باتهام المتدربين بأنهم سبب المشكلة"],
        en: ["Triggering the business continuity plan with a vetted backup trainer pre-briefed on courseware", "Canceling abruptly without notice and switching off phones", "Throwing an unqualified bystander to improvise nonsense", "Accusing attendees of causing the emergency"],
        fr: ["Déclencher le plan de continuité avec un formateur remplaçant qualifié briefé à l'avance", "Annuler sans prévenir et éteindre ses téléphones", "Improviser avec une personne non qualifiée", "Accuser les clients d'être responsables de l'aléa"]
      },
      ans: 0,
      hint: {
        ar: "الحوكمة الاحترافية تتوقع الأزمات وتضع سيناريوهات بديلة معتمدة مسبقاً.",
        en: "Mature governance anticipates vulnerabilities and maintains pre-approved contingency plans.",
        fr: "Une gouvernance mature anticipe les imprévus avec des protocoles de secours validés."
      },
      explanation: {
        ar: "وجود مدرب بديل مدرب على نفس الحقيبة يحمي سمعة المؤسسة ويمنع الخسائر المالية والتعويضات.",
        en: "Having certified shadow trainers safeguards institutional credibility and avoids costly penalties.",
        fr: "Disposer d'un formateur relais préserve la réputation et évite les indemnités d'annulation."
      }
    },
    {
      q: {
        ar: "ما الإجراء النظامي لحفظ سجلات المتدربين وضمان صحة الشهادات الصادرة من المركز؟",
        en: "What is the standard procedure to safeguard trainee records and verify certificate authenticity?",
        fr: "Quelle procédure garantit l'archivage sécurisé et la traçabilité des diplômes émis ?"
      },
      options: {
        ar: ["أرشفة رقمية مشفرة برمز QR فريد لكل شهادة مع ربطها بقاعدة بيانات الخريجين الرسمية للتحقق الفوري", "تسجيل الأسماء على أوراق عادية قد تضيع أو تتلف بسهولة", "عدم الاحتفاظ بأي سجل للخريجين بعد انتهاء الدورة", "إصدار شهادات بدون أرقام تسلسلية أو أختام رسمية"],
        en: ["Encrypted digital archiving with unique QR verification linked to an auditable graduate database", "Writing names on loose scrap sheets prone to loss", "Destroying all trainee records right after graduation", "Issuing unnumbered certificates without institutional seals"],
        fr: ["Archivage numérique chiffré avec QR code infalsifiable connecté à la base des lauréats", "Noter les noms sur des feuilles volantes faciles à perdre", "Ne garder aucune trace des promotions passées", "Délivrer des attestations sans numéro de série ni sceau"]
      },
      ans: 0,
      hint: {
        ar: "رمز الاستجابة السريعة (QR) يتيح لجهات التوظيف التحقق من صحة المؤهل بضغطة زر واحدة.",
        en: "QR-coded tamper-proof credentials allow employers to authenticate awards in real time.",
        fr: "Le QR code permet aux employeurs de vérifier l'authenticité du diplôme en un clic."
      },
      explanation: {
        ar: "التحقق الرقمي يمنع التزوير ويعزز القيمة السوقية لشهادات الأكاديمية أمام الشركات والمؤسسات.",
        en: "Digital verification prevents credential fraud and bolsters certificate market currency.",
        fr: "La traçabilité numérique élimine la fraude et valorise le certificat sur le marché."
      }
    }
  ],

  // Module 8: العلامة الشخصية للمدرب وبناء الهوية
  module_8: [
    {
      q: {
        ar: "لماذا يعد 'التخصص الدقيق (Niche Mastery)' أكثر ربحية وتأثيراً للمدرب من التوسع العشوائي العام؟",
        en: "Why is niche specialization drastically more profitable and impactful than generalist training?",
        fr: "Pourquoi l'hyper-spécialisation est-elle plus rentable que le généralisme en formation ?"
      },
      options: {
        ar: ["لأنه يرسخ المدرب كمرجع أول وخبير لا غنى عنه في مشكلة محددة مما يتيح له فرض أتعاب استشارية عليا", "لأنه يمنع المدرب من الحصول على أي عميل جديد", "لأن التخصص سهل ولا يحتاج إلى قراءة أو اطلاع", "لأن الشركات تفضل من يدعي فهم كل شيء دون عمق"],
        en: ["It positions the trainer as the definitive, indispensable authority on a distinct problem, commanding premium fees", "It blocks the trainer from ever gaining new clients", "Because specialization requires zero study or reading", "Because enterprises prefer people who claim to know everything shallowly"],
        fr: ["Elle érige le formateur en autorité incontournable sur un défi précis, justifiant des tarifs élevés", "Elle empêche de trouver des clients", "Parce que se spécialiser ne demande aucun effort", "Parce que les clients préfèrent les généralistes superficiels"]
      },
      ans: 0,
      hint: {
        ar: "الشركات تبحث عن الجرّاح المتخصص لعلاج مشاكلها الحساسة، وليس عن الطبيب العام.",
        en: "Clients seek out neurosurgeons for acute problems, not generic family practitioners.",
        fr: "Pour une opération délicate, on fait appel au spécialiste de pointe, pas au généraliste."
      },
      explanation: {
        ar: "التركيز على نيتش محدد يقلل تكلفة التسويق ويجعل المدرب الخيار الأول تلقائياً في مجاله.",
        en: "Niche authority slashes customer acquisition friction and commands uncontested market pricing.",
        fr: "L'expertise ciblée réduit les coûts de prospection et génère des recommandations naturelles."
      }
    },
    {
      q: {
        ar: "ما الاستراتيجية الأكثر فاعلية لاستقطاب عقود التدريب المؤسسي عبر منصة لينكدإن (LinkedIn)؟",
        en: "What is the most potent strategy for securing enterprise training contracts via LinkedIn?",
        fr: "Quelle est la stratégie LinkedIn la plus efficace pour décrocher des contrats B2B ?"
      },
      options: {
        ar: ["نشر دراسات حالة معمقة، تحليل أخطاء شائعة في القطاع، والتواصل الاستشاري المهني مع مدراء الموارد البشرية", "إرسال رسائل سبام مزعجة وبيع مباشر غير لائق للجميع", "نشر صور شخصية غير مهنية خالية من الفائدة المعرفية", "تجاهل المنصة والاعتماد على الملصقات الورقية في الشوارع"],
        en: ["Publishing deep-dive case studies, diagnosing industry missteps, and consultative outreach to HRDs", "Blasting spam sales pitches blindly into strangers' DMs", "Posting unprofessional personal memes with zero business value", "Ignoring digital networks completely in favor of street posters"],
        fr: ["Publier des cas d'étude fouillés, analyser les erreurs sectorielles et contacter les DRH en conseil", "Spammer des messages de vente directe agressifs à des inconnus", "Poster des contenus personnels hors sujet sans valeur ajoutée", "Ignorer les réseaux et coller des affiches dans la rue"]
      },
      ans: 0,
      hint: {
        ar: "مدراء التدريب يشترون الخبرة المثبتة بالمحتوى التحليلي الرصين وليس بالإعلانات المباشرة.",
        en: "L&D directors buy documented authority proven through rigorous thought leadership.",
        fr: "Les prescripteurs achètent l'expertise démontrée par des réflexions de fond."
      },
      explanation: {
        ar: "قيادة الفكر (Thought Leadership) تبني الثقة قبل التواصل، مما يحول الاستقطاب من مطاردة إلى استدعاء.",
        en: "Consistent thought leadership turns sales outreach into warm inbound advisory invitations.",
        fr: "Le leadership d'opinion transforme la prospection en demandes spontanées d'intervention."
      }
    },
    {
      q: {
        ar: "ما هي المكونات الأساسية للملف التعريفي المهني للمدرب (Speaker Media Kit)؟",
        en: "What are the vital components of an executive Trainer/Speaker Media Kit?",
        fr: "Quels sont les composants clés d'un kit média de formateur professionnel ?"
      },
      options: {
        ar: ["السيرة الذاتية المركزة، مجالات التخصص، شهادات وتوصيات العملاء السابقين، ونماذج مرئية من الإلقاء", "شهادة الميلاد وبطاقة الهوية الوطنية فقط", "قائمة طويلة بالمقررات الدراسية في المرحلة الابتدائية", "كتيب من 100 صفحة يروي قصة الطفولة"],
        en: ["Focused bio, core specialty domains, client testimonials, and video reel snippets of delivery", "Only a national ID card and birth certificate", "A list of elementary school grade cards", "A 100-page memoir of early childhood memories"],
        fr: ["Bio percutante, domaines d'expertise, témoignages clients et extraits vidéo d'animation", "Uniquement un extrait d'acte de naissance", "Ses bulletins de notes d'école primaire", "Un roman autobiographique de 100 pages"]
      },
      ans: 0,
      hint: {
        ar: "الملف الإعلامي هو أداة تسويقية سريعة من صفحتين أو ثلاث تقدم دليلاً قاطعاً على كفاءتك.",
        en: "A speaker media kit is a concise 2-3 page proof document showcasing your presence and credibility.",
        fr: "Le kit média est une synthèse percutante de 2 à 3 pages attestant de votre légitimité."
      },
      explanation: {
        ar: "يوفر الميديا كيت لصانع القرار في المؤتمرات والشركات انطباعاً فورياً عن جودة حضور المدرب وأثره.",
        en: "An executive one-sheet provides conference organizers immediate confidence in your delivery.",
        fr: "Ce document rassure instantanément les organisateurs d'événements sur votre prestation."
      }
    },
    {
      q: {
        ar: "كيف يحمي المدرب المحترف حقوق الملكية الفكرية لحقائبه ومناهجه التعليمية؟",
        en: "How does a professional trainer safeguard intellectual property (IP) for their courseware?",
        fr: "Comment protéger la propriété intellectuelle de ses kits de formation ?"
      },
      options: {
        ar: ["بالإيداع القانوني وتوثيق حقوق المؤلف، توقيع اتفاقيات عدم الإفصاح (NDA)، وصياغة تراخيص استخدام واضحة", "بإتاحة الملفات المفتوحة القابلة للتعديل للجميع دون أي شروط", "بعدم وضع اسمه أو شعاره على أي مستند تدريبي", "بالاكتفاء بالتمني دون أي إجراء قانوني"],
        en: ["Legal copyright deposit, binding NDAs, watermarks, and explicit user licensing agreements", "Distributing editable raw master files freely to everyone without conditions", "Omitting name and trademark from all training collateral", "Hoping passively without taking legal precautions"],
        fr: ["Dépôt légal des droits d'auteur, accords de confidentialité (NDA) et contrats de licence", "Donner ses fichiers sources modifiables sans condition", "Ne mettre ni son nom ni son logo sur les supports", "Ne rien faire en espérant que personne ne copie"]
      },
      ans: 0,
      hint: {
        ar: "حماية الملكية الفكرية تحول المعرفة من مجرد جهد زائل إلى أصل استثماري ذي قيمة تجارية.",
        en: "Legal IP protection transforms transient teaching hours into valuable, licensable capital.",
        fr: "Protéger ses supports transforme le savoir en actif commercial valorisable."
      },
      explanation: {
        ar: "توثيق الحقائب يتيح للمدرب بيع تراخيص الاستخدام للأكاديميات الأخرى وتأمين حقوقه الأدبية والمالية.",
        en: "Proper IP protection unlocks multi-market licensing revenues while preserving brand integrity.",
        fr: "Le dépôt officiel permet de concéder des licences d'exploitation rémunératrices en toute sécurité."
      }
    },
    {
      q: {
        ar: "كيف ينتقل المدرب من تقديم 'ساعات تدريبية' إلى تقديم 'حلول استشارية متكاملة'؟",
        en: "How does a trainer pivot from selling hourly classroom sessions to strategic consulting solutions?",
        fr: "Comment passer de la vente d'heures de formation à la vente de solutions de conseil ?"
      },
      options: {
        ar: ["بربط التدريب بتشخيص المشكلات الميدانية، ومرافقة التطبيق، وبناء أدلة عمل مؤسسية ومتابعة الأثر", "بزيادة عدد الساعات اليومية من 6 إلى 12 ساعة", "بخفض السعر لجذب عدد أكبر من المتدربين", "بالاكتفاء بإلقاء المحاضرة ومغادرة الشركة فوراً"],
        en: ["Pairing training with diagnostic audits, implementation coaching, SOP development, and impact monitoring", "Expanding daily lecture marathons from 6 to 12 hours", "Slashing daily rates to attract high volume", "Giving a quick lecture and rushing out the door"],
        fr: ["Associer la formation à l'audit préalable, au coaching de terrain et à la refonte des processus", "Allonger les cours magistraux de 6 à 12 heures", "Baisser ses prix pour faire du volume", "Faire son exposé et s'en aller immédiatement"]
      },
      ans: 0,
      hint: {
        ar: "الاستشارة تتناول المنظومة ككل وتضمن أن التدريب يحدث تغييراً ملموساً في السياسات والأداء.",
        en: "Consulting diagnoses the entire ecosystem, ensuring learning changes workplace behavior.",
        fr: "Le conseil traite l'écosystème global pour que la formation transforme réellement l'organisation."
      },
      explanation: {
        ar: "تقديم الحلول المتكاملة يضاعف العائد المالي للمدرب ويرسخه كشريك استراتيجي طويل الأمد للإدارة.",
        en: "End-to-end consulting retainers multiply revenue and build multi-year institutional partnerships.",
        fr: "L'offre intégrée multiplie la valeur perçue et fidélise les grands comptes sur le long terme."
      }
    },
    {
      q: {
        ar: "ما هي الخطوة الأولى للمدرب الوطني للوصول إلى العالمية والمشاركة في المؤتمرات الدولية؟",
        en: "What is the primary step for a national trainer to break into international keynote speaking?",
        fr: "Quelle est la première étape pour un formateur souhaitant rayonner à l'international ?"
      },
      options: {
        ar: ["نشر أوراق بحثية ودراسات حالة مبتكرة، إتقان لغة أجنبية، والتقديم على دعوات المتحدثين (Call for Speakers)", "السفر العشوائي بدون أي تحضير مسبق", "الانتظار حتى يتصل به منظمو المؤتمرات من تلقاء أنفسهم", "تغيير اسمه وإخفاء هويته الحقيقية"],
        en: ["Publishing peer-reviewed case studies, mastering an international language, and applying to Calls for Speakers (CFP)", "Traveling internationally with zero planning or assets", "Waiting idly for world conference organizers to discover him magically", "Changing his identity and hiding his origins"],
        fr: ["Publier des cas novateurs, maîtriser une langue internationale et postuler aux Calls for Speakers (CFP)", "Partir à l'étranger sans aucun réseau ni support", "Attendre passivement qu'on vienne le chercher", "Changer de nom et dissimuler son parcours"]
      },
      ans: 0,
      hint: {
        ar: "المؤتمرات الدولية تبحث عن أفكار أصيلة وأبحاث تطبيقية جديدة تقدم إضافة حقيقية للمهنة.",
        en: "Global summits seek novel, empirical case studies that bring fresh insight to the craft.",
        fr: "Les colloques mondiaux recherchent des retours d'expérience inédits à forte valeur ajoutée."
      },
      explanation: {
        ar: "التقديم المنهجي على مؤتمرات التدريب العالمية مع وجود أوراق عمل رصينة هو البوابة الحقيقية للعالمية.",
        en: "Structured CFP submissions backed by validated data open doors to international speaking circuits.",
        fr: "Répondre avec rigueur aux appels à communication bâtit une notoriété internationale pérenne."
      }
    }
  ]
};

export function getFoundationQuizzes(moduleId: string, lang: LangKey = 'ar'): FoundationQuizOutput[] {
  const questionsList = foundationModuleQuizzesDB[moduleId];
  const axisTitles: Record<'ar' | 'en' | 'fr', string[]> = {
    ar: [
      "المفاهيم والأسس الجوهرية",
      "المنهجيات والآليات التطبيقية",
      "دراسات الحالة ونمذجة المواقف",
      "الأدوات والاستراتيجيات المتقدمة",
      "التحسين المستمر وضمان الجودة",
      "التطبيقات الميدانية والقياس"
    ],
    en: [
      "Core Concepts & Foundations",
      "Methodologies & Applied Mechanisms",
      "Case Studies & Situational Modeling",
      "Advanced Tools & Strategies",
      "Continuous Improvement & QA",
      "Field Applications & Measurement"
    ],
    fr: [
      "Concepts Fondamentaux et Principes",
      "Méthodologies et Mécanismes Appliqués",
      "Études de Cas et Modélisation",
      "Outils et Stratégies Avancés",
      "Amélioration Continue et Assurance Qualité",
      "Applications Terrain et Mesure"
    ]
  };

  const titles = axisTitles[lang] || axisTitles.ar;

  const getStr = (obj: LocalizedString): string => {
    if (lang === 'en') return obj.en || obj.ar;
    if (lang === 'fr') return obj.fr || obj.en || obj.ar;
    return obj.ar;
  };

  const getOpts = (optObj: { ar: string[]; en: string[]; fr: string[] }): string[] => {
    if (lang === 'en') return optObj.en || optObj.ar;
    if (lang === 'fr') return optObj.fr || optObj.en || optObj.ar;
    return optObj.ar;
  };

  if (questionsList && questionsList.length >= 6) {
    return questionsList.map((item, idx) => ({
      title: `${lang === 'ar' ? 'تقييم' : lang === 'fr' ? 'Quiz' : 'Quiz'} ${idx + 1}: ${titles[idx] || titles[0]}`,
      questions: [
        {
          q: getStr(item.q),
          options: getOpts(item.options),
          ans: item.ans,
          hint: getStr(item.hint),
          explanation: getStr(item.explanation)
        }
      ]
    }));
  }

  // Fallback for any other module
  return titles.map((title: string, idx: number) => ({
    title: `${lang === 'ar' ? 'تقييم' : 'Quiz'} ${idx + 1}: ${title}`,
    questions: [
      {
        q: `${lang === 'ar' ? 'ما المبدأ التطبيقي الجوهري المرتبط بمحور' : 'What is the core principle related to'} ${title}؟`,
        options: lang === 'ar'
          ? [
              "التطبيق المنهجي الميداني وفق معايير الجودة المعتمدة",
              "التنفيذ العشوائي دون تخطيط مسبق",
              "الاعتماد على النظريات المجردة فقط دون ممارسة",
              "تجاهل التقييم والقياس المستمر"
            ]
          : [
              "Systematic on-the-ground application meeting QA standards",
              "Random unorganized execution",
              "Abstract theory without empirical practice",
              "Ignoring ongoing assessment and evaluation"
            ],
        ans: 0,
        hint: lang === 'ar' ? "التطبيق المنهجي يضمن استدامة الأثر التدريبي." : "Systematic execution ensures lasting impact.",
        explanation: lang === 'ar' ? "الالتزام بالمعايير المهنية والتطبيق المنهجي هو المعيار الحاسم لنجاح البرامج التدريبية." : "Adherence to professional standards is the decisive factor."
      }
    ]
  }));
}
