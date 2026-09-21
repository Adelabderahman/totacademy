'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AcademyEventItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  Globe,
  Award,
  Sparkles,
  Filter,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Check,
  X,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Link2,
  Copy,
  AlertCircle,
  Share2,
  Tag,
  DollarSign,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Grid,
  List,
  Flame,
  ShieldCheck,
  Compass,
  Briefcase,
  FileText,
  ListOrdered,
  Building,
  Monitor,
  HelpCircle,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. SECTIONS & DIVISIONS METADATA                                            */
/* -------------------------------------------------------------------------- */
export interface EventSectionMeta {
  key: string;
  name: { ar: string; en: string; fr: string };
  subtitle: { ar: string; en: string; fr: string };
  icon: string;
  accentColor: string;
  badgeBg: string;
  description: { ar: string; en: string; fr: string };
}

export const APPOINTMENT_SECTIONS_LIST: EventSectionMeta[] = [
  {
    key: 'workshops',
    name: { ar: 'الورشات التدريبية', en: 'Training Workshops', fr: 'Ateliers de Formation' },
    subtitle: {
      ar: 'تطبيق مهاراتي مركز ونتائج قابلة للاستخدام الفوري',
      en: 'Focused practice and immediately usable skills',
      fr: 'Pratique ciblée et compétences utiles',
    },
    icon: '🛠️',
    accentColor: '#1152cf',
    badgeBg: '#e9f2ff',
    description: {
      ar: 'ورش عمل تطبيقية مكثفة تركز على المهارات الميدانية وبناء الحقائب والأدوات التفاعلية وتصميم الأنشطة البيداغوجية.',
      en: 'Intensive hands-on workshops focused on practical skills, kits, and interactive tools.',
      fr: 'Ateliers pratiques intensifs axés sur les compétences de terrain et kits.',
    },
  },
  {
    key: 'days',
    name: { ar: 'الأيام التدريبية', en: 'Training Days', fr: 'Journées de Formation' },
    subtitle: {
      ar: 'يوم مكثف متكامل يجمع المعرفة بالتجربة الحية',
      en: 'An intensive day blending knowledge and live practice',
      fr: 'Une journée intensive entre savoir et pratique',
    },
    icon: '📅',
    accentColor: '#059669',
    badgeBg: '#e8faf3',
    description: {
      ar: 'أيام دراسية وتدريبية متخصصة تبحث موضوعاً جوهرياً وتنتج مخرجات بيداغوجية فورية وقابلة للقياس الميداني.',
      en: 'Specialized training days addressing core educational themes with measurable outputs.',
      fr: 'Journées de formation spécialisées avec livrables immédiats.',
    },
  },
  {
    key: 'bootcamps',
    name: { ar: 'المعسكرات التدريبية', en: 'Training Bootcamps', fr: 'Bootcamps de Formation' },
    subtitle: {
      ar: 'مسار تدريبي مكثف لإنجاز مشروع واقعي متكامل',
      en: 'An intensive path to deliver a real project',
      fr: 'Un parcours intensif pour réaliser un projet concret',
    },
    icon: '🚀',
    accentColor: '#d5803b',
    badgeBg: '#fff2e6',
    description: {
      ar: 'معسكرات مهنية تمتد لعدة أيام متتابعة لبناء هوية المدرب المحترف، تصميم الحقيبة، وإنجاز مشروع التخرج الواقعي.',
      en: 'Multi-day immersive bootcamps building professional trainer identities and capstone projects.',
      fr: 'Bootcamps immersifs de plusieurs jours pour formateurs professionnels.',
    },
  },
  {
    key: 'camps',
    name: { ar: 'المخيمات التدريبية', en: 'Training Camps', fr: 'Camps de Formation' },
    subtitle: {
      ar: 'تعلم غامر، تجارب قيادية، وعلاقات مهنية ملهمة',
      en: 'Immersive learning, leadership, and inspiring professional bonds',
      fr: 'Apprentissage immersif et liens professionnels inspirants',
    },
    icon: '⛺',
    accentColor: '#8b5cf6',
    badgeBg: '#f3edff',
    description: {
      ar: 'مخيمات تدريبية ميدانية في بيئات ملهمة تجمع بين التعلم التجريبي والتأمل القيادي والتواصل المشترك بين الخبراء.',
      en: 'Experiential training camps in inspiring environments blending outdoor practice and leadership.',
      fr: 'Camps de formation combinant apprentissage expérientiel et leadership.',
    },
  },
  {
    key: 'meetups',
    name: { ar: 'اللقاءات التدريبية', en: 'Training Meetups', fr: 'Rencontres de Formation' },
    subtitle: {
      ar: 'حوارات مهنية مركزة وشبكات تعاون مستدامة',
      en: 'Focused conversations and lasting professional networks',
      fr: 'Échanges ciblés et réseaux professionnels durables',
    },
    icon: '🤝',
    accentColor: '#e56458',
    badgeBg: '#fff0ee',
    description: {
      ar: 'لقاءات دورية وقهوة المدربين لمناقشة أحدث اتجاهات صناعة التدريب واستكشاف فرص الشراكة والتكليفات التدريبية.',
      en: 'Periodic meetups and trainers’ coffee to explore trends and collaborative projects.',
      fr: 'Rencontres régulières pour explorer les opportunités de partenariat.',
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 2. PRESETS: COVERS, TRAINERS, PERIODS, MODES                              */
/* -------------------------------------------------------------------------- */
const EVENT_COVER_PRESETS = [
  { label: 'ورشة تفاعلية وقاعة', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=88' },
  { label: 'مختبر تصميم وحقائب', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=88' },
  { label: 'تيسير وإدارة مجموعات', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=88' },
  { label: 'إلقاء وتأثير جماهيري', url: 'https://images.unsplash.com/photo-1475721027767-f42a3632b48e?auto=format&fit=crop&w=1200&q=88' },
  { label: 'تحول رقمي وأدوات ذكية', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88' },
  { label: 'جودة وقياس الأثر', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=88' },
  { label: 'معسكر صناعة المدرب', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=88' },
  { label: 'مخيم في الطبيعة والقيادة', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88' },
  { label: 'لقاء حواري وقهوة مدربين', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=88' },
  { label: 'بث افتراضي عن بعد', url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=88' },
];

const TRAINER_PRESETS = [
  { name: 'د. عبد الكريم بلخيري', role: 'خبير تدريب دولي ورئيس مجلس التدريب' },
  { name: 'أ. مروان بن زيان', role: 'مستشار التطوير المؤسسي وتصميم الحقائب' },
  { name: 'د. سارة المنصوري', role: 'خبيرة هندسة تجارب التعلم الرقمي' },
  { name: 'نخبة خبراء الأكاديمية', role: 'فريق الإشراف البيداغوجي والتدريب' },
];

const PERIOD_OPTIONS = [
  { key: 'all', label: 'كافة المواعيد والتواريخ' },
  { key: '2026-09', label: 'سبتمبر 2026' },
  { key: '2026-10', label: 'أكتوبر 2026' },
  { key: '2026-11', label: 'نوفمبر 2026' },
  { key: '2026-12', label: 'ديسمبر 2026' },
  { key: '2027', label: 'مواعيد وفعاليات 2027' },
];

/* -------------------------------------------------------------------------- */
/* 3. MAIN COMPONENT: EventsEditor                                            */
/* -------------------------------------------------------------------------- */
export const EventsEditor: React.FC = () => {
  const {
    eventsList,
    saveEvent,
    deleteEvent,
    syncAllEventsToFirestore,
    trainersList,
  } = useCurriculum();

  // Navigation & Filtering
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'compact' | 'grid' | 'table'>('compact');

  // Sync to Firestore State
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  // Editor Modal State
  const [selectedEvent, setSelectedEvent] = useState<AcademyEventItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<'details' | 'trainer_agenda' | 'preview'>('details');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Custom Dropdown State for Section Selection
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState<boolean>(false);
  const [sectionDropdownSearch, setSectionDropdownSearch] = useState<string>('');

  // Reader Preview Modal State
  const [previewEvent, setPreviewEvent] = useState<AcademyEventItem | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target as Node)) {
        setIsSectionDropdownOpen(false);
      }
    };
    if (isSectionDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSectionDropdownOpen]);

  // Current active section meta for the editor modal
  const currentSectionMeta = useMemo(() => {
    if (!selectedEvent) return APPOINTMENT_SECTIONS_LIST[0];
    const cat = selectedEvent.category || 'workshops';
    return (
      APPOINTMENT_SECTIONS_LIST.find((s) => s.key === cat) ||
      APPOINTMENT_SECTIONS_LIST[0]
    );
  }, [selectedEvent]);

  // Section Counts
  const sectionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    APPOINTMENT_SECTIONS_LIST.forEach((s) => {
      map[s.key] = 0;
    });
    eventsList.forEach((ev) => {
      const cat = ev.category || 'workshops';
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [eventsList]);

  // General Metrics
  const stats = useMemo(() => {
    const total = eventsList.length;
    const upcoming = eventsList.filter((e) => e.status === 'upcoming').length;
    const ongoing = eventsList.filter((e) => e.status === 'ongoing').length;
    const completed = eventsList.filter((e) => e.status === 'completed').length;
    const online = eventsList.filter((e) => e.mode === 'online').length;
    const inperson = eventsList.filter((e) => e.mode === 'inperson').length;
    const hybrid = eventsList.filter((e) => e.mode === 'hybrid').length;
    const totalSeats = eventsList.reduce((acc, curr) => acc + (curr.seats || 0), 0);

    return { total, upcoming, ongoing, completed, online, inperson, hybrid, totalSeats };
  }, [eventsList]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return eventsList.filter((ev) => {
      // 1. Section
      if (selectedSectionKey !== 'all' && (ev.category || 'workshops') !== selectedSectionKey) {
        return false;
      }
      // 2. Mode
      if (selectedMode !== 'all' && ev.mode !== selectedMode) {
        return false;
      }
      // 3. Period
      if (selectedPeriod !== 'all' && !ev.date.startsWith(selectedPeriod)) {
        return false;
      }
      // 4. Status
      if (selectedStatus !== 'all' && ev.status !== selectedStatus) {
        return false;
      }
      // 5. Query
      if (q) {
        const titleAr = (ev.title?.ar || '').toLowerCase();
        const titleEn = (ev.title?.en || '').toLowerCase();
        const trainerAr = (ev.trainerName?.ar || '').toLowerCase();
        const locAr = (ev.location?.ar || '').toLowerCase();
        const descAr = (ev.desc?.ar || '').toLowerCase();

        const match =
          titleAr.includes(q) ||
          titleEn.includes(q) ||
          trainerAr.includes(q) ||
          locAr.includes(q) ||
          descAr.includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [eventsList, selectedSectionKey, selectedMode, selectedPeriod, selectedStatus, searchQuery]);

  // Handler: Create New Event
  const handleCreateNew = () => {
    const targetCategory = selectedSectionKey !== 'all' ? selectedSectionKey : 'workshops';
    const newId = `ev-${Date.now()}`;
    const newEv: AcademyEventItem = {
      id: newId,
      title: {
        ar: 'ورشة تدريبية تطبيقية جديدة',
        en: 'New Applied Training Workshop',
        fr: 'Nouvel Atelier Pratique',
      },
      date: '2026-10-20',
      time: '18:00 - 21:00 (GMT+1)',
      location: {
        ar: 'عن بُعد (قاعة زووم التفاعلية للأكاديمية)',
        en: 'Online (Interactive Zoom Room)',
        fr: 'En Ligne (Zoom)',
      },
      mode: 'online',
      trainerName: {
        ar: 'د. عبد الكريم بلخيري',
        en: 'Dr. Abdelkrim Belkheiri',
        fr: 'Dr. Abdelkrim Belkheiri',
      },
      seats: 35,
      coverImage: EVENT_COVER_PRESETS[0].url,
      desc: {
        ar: 'ورشة عمل تدريبية تفاعلية ومكثفة تركز على المهارات العملية والأدوات البيداغوجية، مع نماذج تطبيقية قابلة للتنفيذ الفوري ومتابعة مستمرة.',
        en: 'Intensive interactive training workshop focusing on practical skills and pedagogical tools.',
        fr: 'Atelier de formation interactif et intensif axé sur les compétences pratiques.',
      },
      status: 'upcoming',
      category: targetCategory,
      registrationUrl: 'https://sites.google.com/view/totacademya/totf126',
      meetingUrl: 'https://zoom.us/j/tot-academy-room',
      price: {
        amount: 0,
        currency: 'DZD',
        isFree: true,
      },
      targetAudience: {
        ar: 'المدربون المعتمدون، المستشارون، مسؤولو التدريب والتطوير، ورواد الأعمال التعليمية.',
        en: 'Certified trainers, consultants, and L&D managers.',
        fr: 'Formateurs certifiés et responsables formation.',
      },
    };

    setSelectedEvent(newEv);
    setEditorTab('details');
    setIsEditing(true);
  };

  // Handler: Save Event
  const handleSave = async () => {
    if (!selectedEvent) return;
    if (!selectedEvent.title?.ar?.trim()) {
      setStatusMessage('⚠️ يرجى إدخال عنوان الموعد التدريبي (باللغة العربية)');
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveEvent(selectedEvent);
      if (res.success) {
        setStatusMessage('✅ تم حفظ ونشر الموعد التدريبي بنجاح في الأجندة وقاعدة البيانات.');
        setTimeout(() => {
          setIsEditing(false);
          setStatusMessage(null);
        }, 800);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل حفظ الموعد'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'حدث خطأ غير متوقع أثناء الحفظ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Handler: Delete Event
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف الموعد التدريبي:\n"${title}"؟\nسيتم حذفه من الأجندة وقاعدة البيانات.`)) {
      return;
    }
    await deleteEvent(id);
    if (selectedEvent?.id === id) {
      setIsEditing(false);
      setSelectedEvent(null);
    }
  };

  // Handler: Duplicate Event
  const handleDuplicate = async (ev: AcademyEventItem) => {
    const copyId = `ev-${Date.now()}`;
    const duplicated: AcademyEventItem = {
      ...ev,
      id: copyId,
      title: {
        ...ev.title,
        ar: `${ev.title.ar} (نسخة جديدة)`,
      },
      status: 'upcoming',
    };
    await saveEvent(duplicated);
  };

  // Handler: Batch Sync All Events to Firestore
  const handleSyncAllFirestore = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncAllEventsToFirestore();
      if (res.success) {
        setSyncFeedback({
          message: `تمت مزامنة كافة الفعاليات والمواعيد (${res.count} موعد) بنجاح مع Cloud Firestore!`,
          isSuccess: true,
        });
      } else {
        setSyncFeedback({
          message: res.error || 'تعذرت المزامنة مع قاعدة البيانات',
          isSuccess: false,
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        message: err.message || 'خطأ أثناء المزامنة',
        isSuccess: false,
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. STUDIO HEADER & ACTION BAR                                             */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Title & Slogan */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  استوديو إدارة المواعيد والفعاليات (Events & Appointments Studio)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  نظام جدولة متكامل للورشات، الأيام التدريبية، المعسكرات، المخيمات، واللقاءات التفاعلية مع مزامنة سحابية فورية.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Sync to Firestore + Add New */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Firestore Batch Sync */}
            <button
              onClick={handleSyncAllFirestore}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:border-slate-400 active:bg-slate-100 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              title="مزامنة كافة مواعيد الأكاديمية والورشات مع قاعدة بيانات Firestore"
            >
              <RefreshCw className={`w-4 h-4 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'جاري المزامنة...' : 'مزامنة المواعيد مع Firestore'}</span>
            </button>

            {/* + Add New Event */}
            <button
              onClick={handleCreateNew}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer hover:shadow-lg active:scale-98"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إضافة موعد تدريبي جديد</span>
            </button>
          </div>
        </div>

        {/* Sync Toast Feedback */}
        {syncFeedback && (
          <div
            className={`mt-4 p-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all ${
              syncFeedback.isSuccess
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            {syncFeedback.isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{syncFeedback.message}</span>
          </div>
        )}

        {/* Quick KPI Stat Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 mt-5 pt-5 border-t border-slate-100">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold text-slate-600 uppercase block">إجمالي المواعيد</span>
            <span className="text-lg font-black text-slate-900">{stats.total}</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80">
            <span className="text-[10px] font-bold text-blue-700 uppercase block">🛠️ ورشات عمل</span>
            <span className="text-lg font-black text-blue-900">{sectionCounts['workshops'] || 0}</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block">📅 أيام تدريبية</span>
            <span className="text-lg font-black text-emerald-900">{sectionCounts['days'] || 0}</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-[10px] font-bold text-amber-700 uppercase block">🚀 معسكرات ومخيمات</span>
            <span className="text-lg font-black text-amber-900">
              {(sectionCounts['bootcamps'] || 0) + (sectionCounts['camps'] || 0)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/80">
            <span className="text-[10px] font-bold text-rose-700 uppercase block">🤝 لقاءات حوارية</span>
            <span className="text-lg font-black text-rose-900">{sectionCounts['meetups'] || 0}</span>
          </div>
          <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
            <span className="text-[10px] font-bold text-indigo-700 uppercase block">👥 إجمالي المقاعد</span>
            <span className="text-lg font-black text-indigo-900">{stats.totalSeats}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTIONS & DIVISIONS PILLS NAVIGATION                                   */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide">
              أقسام وتقسيمات المواعيد والفعاليات المعتمدة
            </h4>
          </div>
          <span className="text-xs text-slate-600 font-semibold">
            معروض {filteredEvents.length} من أصل {eventsList.length} موعد
          </span>
        </div>

        {/* 5 Core Section Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* 'All' Pill */}
          <button
            onClick={() => setSelectedSectionKey('all')}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border transition-all cursor-pointer ${
              selectedSectionKey === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <span>🌟</span>
            <span>كافة الأقسام والمواعيد</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                selectedSectionKey === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {eventsList.length}
            </span>
          </button>

          {/* Section Pills */}
          {APPOINTMENT_SECTIONS_LIST.map((sec) => {
            const isSelected = selectedSectionKey === sec.key;
            const count = sectionCounts[sec.key] || 0;

            return (
              <button
                key={sec.key}
                onClick={() => setSelectedSectionKey(sec.key)}
                className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 border transition-all cursor-pointer ${
                  isSelected
                    ? 'text-white shadow-md ring-2 ring-offset-1'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: isSelected ? sec.accentColor : undefined,
                  borderColor: isSelected ? sec.accentColor : undefined,
                }}
              >
                <span>{sec.icon}</span>
                <span>{sec.name.ar}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Section Info Banner */}
        {selectedSectionKey !== 'all' && (
          (() => {
            const meta = APPOINTMENT_SECTIONS_LIST.find((s) => s.key === selectedSectionKey);
            if (!meta) return null;
            return (
              <div
                className="rounded-2xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-200"
                style={{
                  backgroundColor: meta.badgeBg,
                  borderColor: `${meta.accentColor}35`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-black text-slate-900 text-sm sm:text-base">
                        قسم {meta.name.ar}
                      </h5>
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-md font-bold text-white"
                        style={{ backgroundColor: meta.accentColor }}
                      >
                        {meta.subtitle.ar}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-0.5 leading-relaxed">
                      {meta.description.ar}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSectionKey('all')}
                  className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 border border-slate-200 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  عرض كافة الأقسام
                </button>
              </div>
            );
          })()
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. SEARCH & SMART FILTER TOOLBAR                                          */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالعنوان، اسم المدرب المشرف، المدينة، أو الكلمات المفتاحية..."
              className="w-full pr-10 pl-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white text-slate-900 font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters & View Mode */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Mode Filter */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="all">كل الأنماط (حضوري / عن بعد / هجين)</option>
              <option value="inperson">🏢 حضوري فقط</option>
              <option value="online">🌐 عن بُعد (Zoom)</option>
              <option value="hybrid">🔄 هجين (Hybrid)</option>
            </select>

            {/* Period Filter */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:border-indigo-600 cursor-pointer"
            >
              {PERIOD_OPTIONS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="all">كل الحالات</option>
              <option value="upcoming">⏳ قادم للتسجيل</option>
              <option value="ongoing">🟢 جاري الآن</option>
              <option value="completed">🏁 مكتمل</option>
            </select>

            {/* View Mode Toggle: Compact / Grid / Table */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="بطاقات مصغرة متناسقة (Small Compact Cards)"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="عرض شبكي موسع"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="عرض جدول البيانات"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EVENTS LISTING: COMPACT CARDS / GRID / TABLE                           */}
      {/* ========================================================================= */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            📅
          </div>
          <div className="space-y-1">
            <h5 className="text-base font-extrabold text-slate-900">
              لا توجد مواعيد أو فعاليات مطابقة للبحث أو الفلتر
            </h5>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              جرب تغيير عبارة البحث، اختيار قسم آخر، أو إعادة تعيين الفلاتر لعرض كافة مواعيد الأكاديمية.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedSectionKey('all');
              setSelectedMode('all');
              setSelectedPeriod('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            إعادة تعيين كافة الفلاتر
          </button>
        </div>
      ) : viewMode === 'compact' ? (
        /* ------------------------------------------------------------- */
        /* COMPACT CARDS VIEW (Requested: small & compact on large screens) */
        /* ------------------------------------------------------------- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEvents.map((ev) => {
            const sec =
              APPOINTMENT_SECTIONS_LIST.find((s) => s.key === (ev.category || 'workshops')) ||
              APPOINTMENT_SECTIONS_LIST[0];

            return (
              <div
                key={ev.id}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group shadow-2xs"
              >
                {/* Compact Card Cover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={ev.coverImage}
                    alt={ev.title.ar}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

                  {/* Section Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span
                      className="px-2 py-0.5 rounded-lg text-[10px] font-black text-white shadow-xs flex items-center gap-1"
                      style={{ backgroundColor: sec.accentColor }}
                    >
                      <span>{sec.icon}</span>
                      <span>{sec.name.ar}</span>
                    </span>
                  </div>

                  {/* Mode Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-900/80 text-white backdrop-blur-xs border border-white/20">
                      {ev.mode === 'online'
                        ? '🌐 عن بُعد'
                        : ev.mode === 'inperson'
                        ? '🏢 حضوري'
                        : '🔄 هجين'}
                    </span>
                  </div>

                  {/* Date Chip */}
                  <div className="absolute bottom-2 right-2.5 left-2.5 flex items-center justify-between text-white text-[11px] font-bold">
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>{ev.date}</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        ev.status === 'upcoming'
                          ? 'bg-emerald-500 text-white'
                          : ev.status === 'ongoing'
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-500 text-white'
                      }`}
                    >
                      {ev.status === 'upcoming'
                        ? 'قادم'
                        : ev.status === 'ongoing'
                        ? 'جاري الآن'
                        : 'مكتمل'}
                    </span>
                  </div>
                </div>

                {/* Compact Card Body */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {/* Title */}
                    <h5
                      className="font-black text-slate-900 text-sm leading-snug line-clamp-2 hover:text-indigo-600 transition-colors"
                      title={ev.title.ar}
                    >
                      {ev.title.ar}
                    </h5>

                    {/* Trainer & Location */}
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-semibold text-slate-800 truncate">
                          {ev.trainerName?.ar || 'نخبة خبراء الأكاديمية'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ev.location?.ar || 'قاعة الأكاديمية'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seats & Price */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-600">
                      المقاعد: <span className="text-slate-900 font-black">{ev.seats || 30}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[10px]">
                      {ev.price?.isFree || !ev.price?.amount
                        ? 'مجاني'
                        : `${ev.price.amount} ${ev.price.currency || 'دج'}`}
                    </span>
                  </div>
                </div>

                {/* Compact Card Actions */}
                <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => setPreviewEvent(ev)}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs font-bold transition-colors cursor-pointer"
                    title="معاينة حية للموعد"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDuplicate(ev)}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs font-bold transition-colors cursor-pointer"
                    title="تكرار / نسخ هذا الموعد"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 ms-auto">
                    <button
                      onClick={() => {
                        setSelectedEvent(ev);
                        setEditorTab('details');
                        setIsEditing(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title.ar)}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                      title="حذف الموعد"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'grid' ? (
        /* ------------------------------------------------------------- */
        /* EXTENDED GRID VIEW                                            */
        /* ------------------------------------------------------------- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((ev) => {
            const sec =
              APPOINTMENT_SECTIONS_LIST.find((s) => s.key === (ev.category || 'workshops')) ||
              APPOINTMENT_SECTIONS_LIST[0];

            return (
              <div
                key={ev.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={ev.coverImage}
                    alt={ev.title.ar}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-3 py-1 rounded-xl text-xs font-black text-white shadow-xs"
                      style={{ backgroundColor: sec.accentColor }}
                    >
                      {sec.icon} {sec.name.ar}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 text-white">
                    <span className="text-xs text-amber-300 font-bold block mb-1">
                      📅 {ev.date} • {ev.time || '18:00 (GMT+1)'}
                    </span>
                    <h5 className="font-black text-base leading-snug line-clamp-1">
                      {ev.title.ar}
                    </h5>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {ev.desc?.ar}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold">المدرب المشرف:</span>
                      <span className="font-semibold">{ev.trainerName?.ar}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold">المكان:</span>
                      <span className="truncate max-w-[180px]">{ev.location?.ar}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold">المقاعد المتاحة:</span>
                      <span className="font-extrabold text-indigo-600">{ev.seats} مقعد</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewEvent(ev)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة</span>
                    </button>
                    <button
                      onClick={() => handleDuplicate(ev)}
                      className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                      title="تكرار"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedEvent(ev);
                        setEditorTab('details');
                        setIsEditing(true);
                      }}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل الموعد</span>
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title.ar)}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* TABLE VIEW                                                    */
        /* ------------------------------------------------------------- */
        <div className="bg-white border border-slate-200 rounded-3xl overflow-x-auto shadow-xs">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3.5">الموعد والفعالية</th>
                <th className="p-3.5">القسم</th>
                <th className="p-3.5">المدرب</th>
                <th className="p-3.5">التاريخ والتوقيت</th>
                <th className="p-3.5">النمط</th>
                <th className="p-3.5">المقاعد</th>
                <th className="p-3.5">الحالة</th>
                <th className="p-3.5 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((ev) => {
                const sec =
                  APPOINTMENT_SECTIONS_LIST.find((s) => s.key === (ev.category || 'workshops')) ||
                  APPOINTMENT_SECTIONS_LIST[0];

                return (
                  <tr key={ev.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={ev.coverImage}
                          alt={ev.title.ar}
                          className="w-12 h-10 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 line-clamp-1 block">
                            {ev.title.ar}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {ev.location?.ar || 'قاعة الأكاديمية'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                        <span>{sec.icon}</span>
                        <span>{sec.name.ar}</span>
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">
                      {ev.trainerName?.ar || 'نخبة الخبراء'}
                    </td>
                    <td className="p-3.5 font-mono text-slate-800">{ev.date}</td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-700">
                        {ev.mode === 'online' ? '🌐 عن بُعد' : ev.mode === 'inperson' ? '🏢 حضوري' : '🔄 هجين'}
                      </span>
                    </td>
                    <td className="p-3.5 font-extrabold text-slate-900">{ev.seats}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          ev.status === 'upcoming'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ev.status === 'ongoing'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {ev.status === 'upcoming' ? 'قادم' : ev.status === 'ongoing' ? 'جاري' : 'مكتمل'}
                      </span>
                    </td>
                    <td className="p-3.5 text-left">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewEvent(ev)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          title="معاينة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEvent(ev);
                            setEditorTab('details');
                            setIsEditing(true);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold cursor-pointer"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ev.id, ev.title.ar)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: APPOINTMENT / EVENT EDITOR                                      */}
      {/* ========================================================================= */}
      {isEditing && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header: العنوان وحده في الأعلى وتحته زري الإلغاء والحفظ والنشر */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white border-b border-slate-800 space-y-3 shrink-0">
              {/* 1. العنوان وحده في الأعلى */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2.5 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs"
                    style={{
                      backgroundColor: `${currentSectionMeta.accentColor}30`,
                      color: '#ffffff',
                      border: `1px solid ${currentSectionMeta.accentColor}60`,
                    }}
                  >
                    <span>{currentSectionMeta.icon}</span>
                    <span>قسم {currentSectionMeta.name.ar}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {selectedEvent.id?.startsWith('ev-')
                      ? 'إضافة موعد تدريبي جديد في الأجندة'
                      : 'تعديل بيانات وجدولة الموعد والفعالية'}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white leading-snug break-words">
                  {selectedEvent.title?.ar
                    ? selectedEvent.title.ar
                    : 'موعد تدريبي جديد (بدون عنوان)'}
                </h3>
              </div>

              {/* 2. تحته زرين: إلغاء وحفظ ونشر الموعد في الأجندة */}
              <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2.5 px-3 sm:px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-400" />
                  <span>إلغاء</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-2.5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>حفظ ونشر الموعد في الأجندة</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Tabs Bar: في صفين (المحتوى والقسم في صف، ومعاينة حية في الصف الثاني) */}
            <div className="bg-slate-100 p-2 sm:p-2.5 border-b border-slate-200 shrink-0 space-y-1.5">
              {/* الصف الأول: المعلومات والجدولة + المدرب والمحاور والتسجيل */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditorTab('details')}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === 'details'
                      ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-500/20'
                      : 'bg-slate-200/80 hover:bg-white text-slate-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>المعلومات والجدولة</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditorTab('trainer_agenda')}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === 'trainer_agenda'
                      ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-500/20'
                      : 'bg-slate-200/80 hover:bg-white text-slate-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>المدرب والمحاور والتسجيل</span>
                </button>
              </div>

              {/* الصف الثاني: معاينة حية منفصلة بحجم مخصص ومميز */}
              <div>
                <button
                  type="button"
                  onClick={() => setEditorTab('preview')}
                  className={`w-full py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    editorTab === 'preview'
                      ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-600/30'
                      : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة حية للموعد التدريبي (Live Preview)</span>
                </button>
              </div>
            </div>

            {/* Status Message feedback if any */}
            {statusMessage && (
              <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
              {/* TAB 1: DETAILS & SCHEDULING */}
              {editorTab === 'details' && (
                <div className="space-y-5">
                  {/* Section Selector: Custom Dropdown */}
                  <div className="relative" ref={sectionDropdownRef}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      قسم وتصنيف الموعد / الفعالية <span className="text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
                      className="w-full px-4 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl flex items-center justify-between text-right hover:border-indigo-500 focus:border-indigo-600 transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{currentSectionMeta.icon}</span>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-slate-900 block">
                            {currentSectionMeta.name.ar}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block">
                            {currentSectionMeta.subtitle.ar}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isSectionDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>

                    {/* Floating Dropdown */}
                    {isSectionDropdownOpen && (
                      <div className="absolute z-50 mt-1.5 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-right">
                        <div className="relative mb-2 px-1">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={sectionDropdownSearch}
                            onChange={(e) => setSectionDropdownSearch(e.target.value)}
                            placeholder="ابحث عن قسم..."
                            className="w-full pr-8 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white text-slate-800 font-bold"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="space-y-1">
                          {APPOINTMENT_SECTIONS_LIST.filter(
                            (s) =>
                              !sectionDropdownSearch.trim() ||
                              s.name.ar.includes(sectionDropdownSearch) ||
                              s.name.en.toLowerCase().includes(sectionDropdownSearch.toLowerCase())
                          ).map((sec) => {
                            const isSelected = (selectedEvent.category || 'workshops') === sec.key;
                            return (
                              <button
                                key={sec.key}
                                type="button"
                                onClick={() => {
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    category: sec.key,
                                  });
                                  setIsSectionDropdownOpen(false);
                                  setSectionDropdownSearch('');
                                }}
                                className={`w-full px-3 py-2.5 rounded-xl text-start flex items-center justify-between transition-colors text-xs font-semibold cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-lg shrink-0">{sec.icon}</span>
                                  <div>
                                    <span className="font-black text-slate-900 block text-xs">
                                      {sec.name.ar}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium block">
                                      {sec.subtitle.ar}
                                    </span>
                                  </div>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title Arabic */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      عنوان الفعالية / الموعد التدريبي (بالعربية) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.title?.ar || ''}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          title: { ...selectedEvent.title, ar: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 font-extrabold text-slate-900 text-sm sm:text-base focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 outline-none bg-white transition-all shadow-2xs placeholder:text-slate-400"
                      placeholder="مثال: ورشة الذكاء الاصطناعي للمدربين وصناع المحتوى..."
                    />
                  </div>

                  {/* Date, Time, Attendance Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Date */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        تاريخ الموعد <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={selectedEvent.date}
                          onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">التوقيت والمدة</label>
                      <input
                        type="text"
                        value={selectedEvent.time || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                        placeholder="18:00 - 21:00 (GMT+1)"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none shadow-2xs"
                      />
                    </div>

                    {/* Attendance Mode */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">نمط الحضور</label>
                      <select
                        value={selectedEvent.mode}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            mode: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none shadow-2xs cursor-pointer"
                      >
                        <option value="online">🌐 عن بُعد (Interactive Zoom)</option>
                        <option value="inperson">🏢 حضوري (قاعة تدريبية)</option>
                        <option value="hybrid">🔄 هجين (قاعة + بث مباشر)</option>
                      </select>
                    </div>
                  </div>

                  {/* Location & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        الموقع أو المدينة أو القاعة التفاعلية
                      </label>
                      <input
                        type="text"
                        value={selectedEvent.location?.ar || ''}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            location: { ...selectedEvent.location, ar: e.target.value },
                          })
                        }
                        placeholder="الجزائر العاصمة، وهران، قسنطينة، أو مباشر عبر زووم..."
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">حالة الموعد</label>
                      <select
                        value={selectedEvent.status}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none shadow-2xs cursor-pointer"
                      >
                        <option value="upcoming">⏳ قادم (التسجيل متاح)</option>
                        <option value="ongoing">🟢 جاري ومباشر الآن</option>
                        <option value="completed">🏁 منتهي ومكتمل</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Image & Presets */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        رابط صورة الغلاف (Cover Image)
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        اختر من المعرض الجاهز بنقرة واحدة
                      </span>
                    </div>

                    <input
                      type="text"
                      value={selectedEvent.coverImage}
                      onChange={(e) => setSelectedEvent({ ...selectedEvent, coverImage: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-slate-50 focus:bg-white text-slate-800 outline-none"
                    />

                    {/* Presets Chips */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">
                        نماذج صور أغلفة معتمدة في الأكاديمية:
                      </span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        {EVENT_COVER_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedEvent({ ...selectedEvent, coverImage: preset.url })}
                            className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[11px] font-bold text-slate-700 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>📷</span>
                            <span>{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Preview */}
                    {selectedEvent.coverImage && (
                      <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={selectedEvent.coverImage}
                          alt="معاينة الغلاف"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: TRAINER, REGISTRATION & PEDAGOGICAL AGENDA */}
              {editorTab === 'trainer_agenda' && (
                <div className="space-y-5">
                  {/* Trainer Selection */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-800">
                        المدرب المشرف والميسر للفعالية
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        اختيار سريع أو إدخال يدوي
                      </span>
                    </div>

                    <input
                      type="text"
                      value={selectedEvent.trainerName?.ar || ''}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          trainerName: { ...selectedEvent.trainerName, ar: e.target.value },
                        })
                      }
                      placeholder="اسم المدرب أو الخبير المشرف..."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                    />

                    {/* Trainer Quick Selectors */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 block">
                        مدربو ومستشارو الأكاديمية:
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {TRAINER_PRESETS.map((tp, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setSelectedEvent({
                                ...selectedEvent,
                                trainerName: { ...selectedEvent.trainerName, ar: tp.name },
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 text-[11px] font-bold border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Users className="w-3 h-3 text-indigo-600" />
                            <span>{tp.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seats & Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Seats */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        عدد المقاعد المتاحة
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={1000}
                        value={selectedEvent.seats || 30}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            seats: Math.max(1, parseInt(e.target.value) || 1),
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                      />
                    </div>

                    {/* Price Amount */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        رسوم المشاركة (0 = مجاني)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={selectedEvent.price?.amount || 0}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            price: {
                              amount: parseFloat(e.target.value) || 0,
                              currency: selectedEvent.price?.currency || 'DZD',
                              isFree: (parseFloat(e.target.value) || 0) === 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                      />
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">العملة</label>
                      <select
                        value={selectedEvent.price?.currency || 'DZD'}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            price: {
                              amount: selectedEvent.price?.amount || 0,
                              currency: e.target.value,
                              isFree: (selectedEvent.price?.amount || 0) === 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none cursor-pointer"
                      >
                        <option value="DZD">دينار جزائري (DZD)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                      </select>
                    </div>
                  </div>

                  {/* URLs: Registration & Zoom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        رابط الحجز / الاستمارة الرسمية
                      </label>
                      <input
                        type="text"
                        value={selectedEvent.registrationUrl || ''}
                        onChange={(e) =>
                          setSelectedEvent({ ...selectedEvent, registrationUrl: e.target.value })
                        }
                        placeholder="https://sites.google.com/... أو رابط الحجز المباشر"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        رابط اللقاء الافتراضي (Zoom / Meet)
                      </label>
                      <input
                        type="text"
                        value={selectedEvent.meetingUrl || ''}
                        onChange={(e) =>
                          setSelectedEvent({ ...selectedEvent, meetingUrl: e.target.value })
                        }
                        placeholder="https://zoom.us/j/... للمشاركين المسجلين"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      الفئة المستهدفة والمتطلبات المسبقة
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.targetAudience?.ar || ''}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          targetAudience: {
                            ...selectedEvent.targetAudience,
                            ar: e.target.value,
                            en: e.target.value,
                            fr: e.target.value,
                          },
                        })
                      }
                      placeholder="المدربون المعتمدون، المستشارون، مسؤولو التدريب والتطوير..."
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                    />
                  </div>

                  {/* Description & Pedagogical Agenda */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-800">
                        الوصف والمحاور البيداغوجية للفعالية <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {(selectedEvent.desc?.ar || '').length} حرف
                      </span>
                    </div>

                    <textarea
                      rows={5}
                      value={selectedEvent.desc?.ar || ''}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          desc: { ...selectedEvent.desc, ar: e.target.value },
                        })
                      }
                      placeholder="اكتب المحاور التدريبية، الأهداف المهارية، والمخرجات العملية المتوقعة..."
                      className="w-full p-3.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs sm:text-sm leading-relaxed bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400"
                    />

                    {/* Quick Bullet Point Helper */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-500">إضافة سريعة:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedEvent.desc?.ar || '';
                          setSelectedEvent({
                            ...selectedEvent,
                            desc: {
                              ...selectedEvent.desc,
                              ar: `${current}\n• المحور 1: بناء وتصميم المحتوى التفاعلي`,
                            },
                          });
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                      >
                        + محور تدريبي
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedEvent.desc?.ar || '';
                          setSelectedEvent({
                            ...selectedEvent,
                            desc: {
                              ...selectedEvent.desc,
                              ar: `${current}\n• الهدف البيداغوجي: تمكين المشارك من تصميم حقيبة تدريبية متكاملة`,
                            },
                          });
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                      >
                        + هدف بيداغوجي
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE PREVIEW INSIDE MODAL */}
              {editorTab === 'preview' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>معاينة حية فورية لكيفية ظهور بطاقة الموعد للزوار والمتدربين</span>
                    </span>
                    <span className="text-[11px] text-indigo-700 font-semibold">
                      قسم {currentSectionMeta.name.ar}
                    </span>
                  </div>

                  {/* Card Simulation */}
                  <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                      <img
                        src={selectedEvent.coverImage}
                        alt="الغلاف"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-black text-white shadow-xs"
                          style={{ backgroundColor: currentSectionMeta.accentColor }}
                        >
                          {currentSectionMeta.icon} {currentSectionMeta.name.ar}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                          {selectedEvent.mode === 'online'
                            ? '🌐 عن بُعد'
                            : selectedEvent.mode === 'inperson'
                            ? '🏢 حضوري'
                            : '🔄 هجين'}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 left-3 text-white">
                        <span className="text-xs text-amber-300 font-bold block mb-1">
                          📅 {selectedEvent.date} • {selectedEvent.time || '18:00 (GMT+1)'}
                        </span>
                        <h4 className="font-black text-base line-clamp-2">
                          {selectedEvent.title?.ar || 'عنوان الموعد التدريبي'}
                        </h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {selectedEvent.desc?.ar || 'وصف ومحاور الفعالية...'}
                      </p>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">المشرف:</span>
                          <span className="font-semibold text-slate-900">
                            {selectedEvent.trainerName?.ar}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">المكان:</span>
                          <span className="truncate max-w-[200px]">
                            {selectedEvent.location?.ar}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">المقاعد المتاحة:</span>
                          <span className="font-extrabold text-indigo-600">
                            {selectedEvent.seats} مقعد
                          </span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5"
                        >
                          <span>حجز مقعد في هذه الفعالية</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. READER / DETAIL MODAL (Quick Interactive Inspection)                   */}
      {/* ========================================================================= */}
      {previewEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto text-right animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Cover Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={previewEvent.coverImage}
                alt={previewEvent.title.ar}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <button
                onClick={() => setPreviewEvent(null)}
                className="absolute top-3 left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 right-4 left-4 text-white space-y-1">
                <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-indigo-500 text-white inline-block">
                  {previewEvent.category || 'ورشات تدريبية'}
                </span>
                <h3 className="text-lg sm:text-xl font-black leading-snug">
                  {previewEvent.title.ar}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-7 space-y-5">
              {/* Timing & Location Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">التاريخ</span>
                  <span className="font-extrabold text-slate-900">{previewEvent.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">التوقيت</span>
                  <span className="font-extrabold text-slate-900">{previewEvent.time || '18:00 (GMT+1)'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">النمط</span>
                  <span className="font-extrabold text-indigo-700">
                    {previewEvent.mode === 'online' ? 'عن بُعد' : previewEvent.mode === 'inperson' ? 'حضوري' : 'هجين'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">المقاعد</span>
                  <span className="font-extrabold text-emerald-700">{previewEvent.seats} مقعد</span>
                </div>
              </div>

              {/* Trainer */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  <Users className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] text-indigo-700 font-bold block">المدرب المشرف</span>
                  <h5 className="font-black text-slate-900 text-sm">
                    {previewEvent.trainerName?.ar}
                  </h5>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h6 className="font-black text-slate-900 text-xs sm:text-sm">
                  المحاور البيداغوجية وتفاصيل الفعالية:
                </h6>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-200/70 font-medium">
                  {previewEvent.desc?.ar}
                </p>
              </div>

              {/* Target Audience */}
              {previewEvent.targetAudience?.ar && (
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-800">الفئة المستهدفة:</span>
                  <p className="text-slate-600 font-medium">{previewEvent.targetAudience.ar}</p>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const toEdit = previewEvent;
                    setPreviewEvent(null);
                    setSelectedEvent(toEdit);
                    setEditorTab('details');
                    setIsEditing(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>تعديل هذا الموعد</span>
                </button>

                <button
                  onClick={() => setPreviewEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  إغلاق المعاينة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
