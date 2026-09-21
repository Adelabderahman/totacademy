'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TrainerDirectoryItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Check,
  X,
  RefreshCw,
  ChevronDown,
  Globe,
  Mail,
  Phone,
  Award,
  BookOpen,
  Sparkles,
  ExternalLink,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  FileText,
  Copy,
  Tag,
  Share2,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. TRAINER CATEGORIES METADATA                                             */
/* -------------------------------------------------------------------------- */
export interface TrainerCategoryMeta {
  key: string;
  name: { ar: string; en: string; fr: string };
  subtitle: { ar: string; en: string; fr: string };
  icon: string;
  color: string;
  badgeBg: string;
}

export const TRAINER_CATEGORIES: TrainerCategoryMeta[] = [
  {
    key: 'tot',
    name: { ar: 'مدربو برامج TOT وتأهيل المدربين', en: 'TOT & Trainer Qualification', fr: 'Formation de Formateurs' },
    subtitle: { ar: 'إعداد وتأهيل مدربي المدربين وهندسة الحقائب التفاعلية', en: 'Master training & instructional kit design', fr: 'Formation des maîtres et conception de kits' },
    icon: '🎓',
    color: '#2563eb',
    badgeBg: '#eff6ff',
  },
  {
    key: 'tech',
    name: { ar: 'مدربو مدربين متعددو التخصصات', en: 'Multidisciplinary Master Trainers', fr: 'Maîtres-formateurs multidisciplinaires' },
    subtitle: { ar: 'هندسة التكوين والقيادة البيداغوجية والتحول التدريبي', en: 'Learning architecture & pedagogical leadership', fr: 'Ingénierie de formation et leadership' },
    icon: '🌐',
    color: '#1152cf',
    badgeBg: '#e9f2ff',
  },
  {
    key: 'marketing',
    name: { ar: 'مدربو التكنولوجيا والتسويق الرقمي', en: 'Tech & Digital Marketing Trainers', fr: 'Technologie & Marketing Digital' },
    subtitle: { ar: 'استراتيجيات التسويق والذكاء الاصطناعي وبناء العلامة التدريبية', en: 'AI tools, marketing & personal branding', fr: 'Outils IA, marketing et image de marque' },
    icon: '📈',
    color: '#059669',
    badgeBg: '#e8faf3',
  },
  {
    key: 'media',
    name: { ar: 'مدربو الإعلام والاتصال وصناعة المحتوى', en: 'Media & Content Creation Trainers', fr: 'Médias & Création de Contenu' },
    subtitle: { ar: 'فن الإلقاء والتحدث الجماهيري والظهور الرقمي المؤثر', en: 'Public speaking, charisma & media influence', fr: 'Prise de parole, charisme et impact' },
    icon: '🎙️',
    color: '#d5803b',
    badgeBg: '#fff2e6',
  },
  {
    key: 'creativity',
    name: { ar: 'مدربو التدريب والاستشارات والتطوير المؤسسي', en: 'Consulting & Org Development Trainers', fr: 'Conseil & Développement Organisationnel' },
    subtitle: { ar: 'تطوير المنظمات، الحوكمة البيداغوجية، واستشارات الموارد البشرية', en: 'Organizational growth, governance & HR consulting', fr: 'Développement organisationnel et conseil RH' },
    icon: '💡',
    color: '#8b5cf6',
    badgeBg: '#f3edff',
  },
];

/* -------------------------------------------------------------------------- */
/* 2. PRESETS: AVATARS, COUNTRIES, LANGUAGES, SUGGESTED SKILLS                */
/* -------------------------------------------------------------------------- */
const TRAINER_AVATAR_PRESETS = [
  { label: 'د. بلال عويش', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=88' },
  { label: 'د. عبد الكريم بلخيري', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { label: 'أ. مروان بن زيان', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { label: 'د. سارة المنصوري', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { label: 'مستشار تدريب (أناقة)', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80' },
  { label: 'مدربة دولية (رسمي)', url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'خبير تقني واستشاري', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'مدربة محترفة وباحثة', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80' },
];

const COUNTRY_PRESETS = [
  { name: 'الجزائر', flag: '🇩🇿' },
  { name: 'تونس', flag: '🇹🇳' },
  { name: 'المغرب', flag: '🇲🇦' },
  { name: 'مصر', flag: '🇪🇬' },
  { name: 'السعودية', flag: '🇸🇦' },
  { name: 'الإمارات', flag: '🇦🇪' },
  { name: 'قطر', flag: '🇶🇦' },
  { name: 'فرنسا', flag: '🇫🇷' },
  { name: 'كندا', flag: '🇨🇦' },
];

const LANGUAGE_PRESETS = ['العربية', 'English', 'Français'];

const SUGGESTED_SKILLS = [
  'هندسة الحقائب التدريبية',
  'تدريب المدربين TOT',
  'الكاريزما والإلقاء والتأثير',
  'التيسير البيداغوجي وإدارة القاعات',
  'الذكاء الاصطناعي في التدريب',
  'تقييم وقياس أثر التدريب',
  'التدريب عن بعد والمنصات الرقمية',
  'بناء الكفايات والتطوير المؤسسي',
];

/* -------------------------------------------------------------------------- */
/* 3. MAIN COMPONENT: TrainersEditor                                          */
/* -------------------------------------------------------------------------- */
export const TrainersEditor: React.FC = () => {
  const { trainersList, saveTrainer, deleteTrainer } = useCurriculum();

  // Selected trainer & editor modal state
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerDirectoryItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<'personal_professional' | 'bio_credentials' | 'preview'>('personal_professional');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Studio List Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Custom Category Dropdown in Modal
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [categoryDropdownSearch, setCategoryDropdownSearch] = useState<string>('');

  // Interactive inputs for lists inside modal
  const [newCertificateInput, setNewCertificateInput] = useState<string>('');
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  // Close custom dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    if (isCategoryDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  // Current active category meta for selected trainer
  const currentCategoryMeta = useMemo(() => {
    if (!selectedTrainer) return TRAINER_CATEGORIES[0];
    const catKey = selectedTrainer.category || 'tot';
    return (
      TRAINER_CATEGORIES.find((c) => c.key === catKey) ||
      TRAINER_CATEGORIES[0]
    );
  }, [selectedTrainer]);

  // Filtered trainers for Studio list
  const filteredTrainers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return trainersList.filter((tr) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && (tr.category || 'tot') !== selectedCategoryFilter) {
        return false;
      }
      // Search query
      if (q) {
        const arName = (tr.name?.ar || '').toLowerCase();
        const enName = (tr.name?.en || '').toLowerCase();
        const arRole = (tr.role?.ar || '').toLowerCase();
        const country = (tr.country || '').toLowerCase();
        const email = (tr.email || '').toLowerCase();

        const match =
          arName.includes(q) ||
          enName.includes(q) ||
          arRole.includes(q) ||
          country.includes(q) ||
          email.includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [trainersList, searchQuery, selectedCategoryFilter]);

  // Create new trainer handler
  const handleCreateNew = () => {
    const targetCategory = selectedCategoryFilter !== 'all' ? selectedCategoryFilter : 'tot';
    const newId = `trainer-${Date.now()}`;
    const newTrainer: TrainerDirectoryItem = {
      id: newId,
      name: {
        ar: 'المدرب المعتمد الجديد',
        en: 'New Certified Master Trainer',
        fr: 'Nouveau Maître-Formateur',
      },
      role: {
        ar: 'خبير تدريب دولي ومستشار معتمد في تأهيل المدربين',
        en: 'International Master Trainer & Consultant',
        fr: 'Maître-formateur international et consultant certifié',
      },
      category: targetCategory,
      image: TRAINER_AVATAR_PRESETS[1].url,
      country: 'الجزائر',
      languages: ['العربية', 'English'],
      bio: {
        ar: 'خبير معتمد في هندسة التكوين وتأهيل المدربين، يتمتع بخبرة ريادية في تصميم الحقائب البيداغوجية التفاعلية وتطوير كفايات المدرب المحترف.',
        en: 'Certified master trainer and consultant in learning architecture and interactive instructional design.',
        fr: 'Expert certifié en ingénierie de formation et développement des compétences des formateurs.',
      },
      email: 'trainer@tot-academy.org',
      phone: '+213 555 000 000',
      experienceYears: '10 سنوات',
      status: 'active',
      certificates: {
        ar: ['دكتوراه / ماستر في علوم التربية والتكوين', 'مدرب مدربين دولي معتمد (TOT Master)', 'مستشار معتمد في تصميم الحقائب'],
      },
      skills: {
        ar: ['هندسة الحقائب التدريبية', 'تدريب المدربين TOT', 'الكاريزما والإلقاء والتأثير', 'التيسير البيداغوجي'],
      },
      socialLinks: {
        linkedin: 'https://linkedin.com',
        website: 'https://tot-academy.org',
      },
    };

    setSelectedTrainer(newTrainer);
    setEditorTab('personal_professional');
    setIsEditing(true);
  };

  // Save trainer handler
  const handleSave = async () => {
    if (!selectedTrainer) return;
    if (!selectedTrainer.name?.ar?.trim()) {
      setStatusMessage('⚠️ يرجى إدخال اسم المدرب (باللغة العربية)');
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveTrainer(selectedTrainer);
      if (res.success) {
        setStatusMessage('✅ تم حفظ ونشر ملف المدرب بنجاح في قاعدة البيانات.');
        setTimeout(() => {
          setIsEditing(false);
          setStatusMessage(null);
        }, 800);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل حفظ بيانات المدرب'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'حدث خطأ غير متوقع أثناء الحفظ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete trainer handler
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف المدرب:\n"${name}" من الدليل؟\nسيتم حذفه من قاعدة البيانات وقوائم الاستوديو.`)) {
      return;
    }
    await deleteTrainer(id);
    if (selectedTrainer?.id === id) {
      setIsEditing(false);
      setSelectedTrainer(null);
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. TOP ACTION & METRICS BAR                                               */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                دليل نخبة المدربين والمستشارين (Trainers Directory)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                إدارة وتحديث ملفات المدربين المعتمدين في صفحة المدربين وفي القوائم المنسدلة للورشات والمسارات التدريبية.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer hover:shadow-lg active:scale-98 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ إضافة مدرب جديد للمنصة</span>
        </button>
      </div>

      {/* Global Status Message Toast */}
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. RECTANGULAR CARDS LISTING (As explicitly requested by user)              */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن مدرب بالاسم أو الصفة أو البلد أو البريد..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-indigo-600 focus:bg-white text-slate-900 font-medium transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-indigo-600 cursor-pointer"
            >
              <option value="all">كافة التخصصات والتصنيفات</option>
              {TRAINER_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.icon} {c.name.ar}
                </option>
              ))}
            </select>

            <span className="text-xs text-slate-600 font-bold shrink-0">
              إجمالي المدربين: <span className="text-indigo-600 font-black">{filteredTrainers.length}</span>
            </span>
          </div>
        </div>

        {/* Rectangular Cards Grid (الابقاء على عرض المدربين في الاستوديو بنفس الطريقة يعني بطاقات مستطيلة) */}
        {filteredTrainers.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2">
            <span className="text-3xl block">👨‍🏫</span>
            <h5 className="font-extrabold text-slate-800 text-sm">لا يوجد مدربون مطابقون للبحث</h5>
            <p className="text-xs text-slate-500">جرب البحث بكلمات مختلفة أو قم بإضافة مدرب جديد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrainers.map((tr) => {
              const cat =
                TRAINER_CATEGORIES.find((c) => c.key === tr.category) ||
                TRAINER_CATEGORIES[0];

              return (
                <div
                  key={tr.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 shadow-xs group"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={tr.image}
                      alt={tr.name.ar}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0 group-hover:scale-103 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-black"
                          style={{
                            backgroundColor: cat.badgeBg,
                            color: cat.color,
                          }}
                        >
                          {cat.icon} {cat.name.ar.split(' ')[0]}
                        </span>
                        <span className="text-[11px] font-bold text-primary-blue bg-blue-50 px-2 py-0.5 rounded-md">
                          📍 {tr.country}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 text-sm truncate mt-1">
                        {tr.name.ar}
                      </h5>
                      <p className="text-xs text-slate-500 line-clamp-1">{tr.role.ar}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setSelectedTrainer(tr);
                        setEditorTab('personal_professional');
                        setIsEditing(true);
                      }}
                      className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل الملف المهني</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tr.id, tr.name.ar)}
                      className="font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL: PROFESSIONAL & COMPREHENSIVE ADD/EDIT TRAINER MODAL             */}
      {/* ========================================================================= */}
      {isEditing && selectedTrainer && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header: العنوان وحده في الأعلى وتحته زري الإلغاء والحفظ */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white border-b border-slate-800 space-y-3 shrink-0">
              {/* 1. العنوان وحده في الأعلى */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="px-2.5 py-0.5 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-xs"
                    style={{
                      backgroundColor: `${currentCategoryMeta.color}30`,
                      color: '#ffffff',
                      border: `1px solid ${currentCategoryMeta.color}60`,
                    }}
                  >
                    <span>{currentCategoryMeta.icon}</span>
                    <span>{currentCategoryMeta.name.ar}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {selectedTrainer.id?.startsWith('trainer-')
                      ? 'إضافة مدرب معتمد جديد لدليل الأكاديمية'
                      : 'تعديل الملف المهني والاعتمادات البيداغوجية للمدرب'}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white leading-snug break-words">
                  {selectedTrainer.name?.ar
                    ? selectedTrainer.name.ar
                    : 'مدرب معتمد جديد (بدون اسم)'}
                </h3>
              </div>

              {/* 2. تحته زرين: إلغاء وحفظ ونشر ملف المدرب */}
              <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2.5 px-3 sm:px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-400" />
                  <span>إلغاء وتراجع</span>
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
                      <span>حفظ ونشر ملف المدرب</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Tabs Bar: في صفين (البيانات في صف، ومعاينة حية في الصف الثاني) */}
            <div className="bg-slate-100 p-2 sm:p-2.5 border-b border-slate-200 shrink-0 space-y-1.5">
              {/* الصف الأول: البيانات الشخصية والمهنية + السيرة والشهادات والاتصال */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setEditorTab('personal_professional')}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === 'personal_professional'
                      ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-500/20'
                      : 'bg-slate-200/80 hover:bg-white text-slate-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>البيانات الشخصية والمهنية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditorTab('bio_credentials')}
                  className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    editorTab === 'bio_credentials'
                      ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200 ring-1 ring-indigo-500/20'
                      : 'bg-slate-200/80 hover:bg-white text-slate-700'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>السيرة والشهادات والاتصال</span>
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
                  <span>معاينة حية لبطاقة المدرب (Live Preview)</span>
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
              {/* ------------------------------------------------------------- */}
              {/* TAB 1: PERSONAL & PROFESSIONAL DETAILS                        */}
              {/* ------------------------------------------------------------- */}
              {editorTab === 'personal_professional' && (
                <div className="space-y-5">
                  {/* Category Selector: Custom Dropdown */}
                  <div className="relative" ref={categoryDropdownRef}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      تصنيف ومجال التخصص التدريبي <span className="text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      className="w-full px-4 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-xl flex items-center justify-between text-right hover:border-indigo-500 focus:border-indigo-600 transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{currentCategoryMeta.icon}</span>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-slate-900 block">
                            {currentCategoryMeta.name.ar}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block">
                            {currentCategoryMeta.subtitle.ar}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isCategoryDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </button>

                    {/* Floating Dropdown */}
                    {isCategoryDropdownOpen && (
                      <div className="absolute z-50 mt-1.5 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-right">
                        <div className="relative mb-2 px-1">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={categoryDropdownSearch}
                            onChange={(e) => setCategoryDropdownSearch(e.target.value)}
                            placeholder="ابحث عن تصنيف..."
                            className="w-full pr-8 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white text-slate-800 font-bold"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="space-y-1">
                          {TRAINER_CATEGORIES.filter(
                            (c) =>
                              !categoryDropdownSearch.trim() ||
                              c.name.ar.includes(categoryDropdownSearch) ||
                              c.name.en.toLowerCase().includes(categoryDropdownSearch.toLowerCase())
                          ).map((cat) => {
                            const isSelected = (selectedTrainer.category || 'tot') === cat.key;
                            return (
                              <button
                                key={cat.key}
                                type="button"
                                onClick={() => {
                                  setSelectedTrainer({
                                    ...selectedTrainer,
                                    category: cat.key,
                                  });
                                  setIsCategoryDropdownOpen(false);
                                  setCategoryDropdownSearch('');
                                }}
                                className={`w-full px-3 py-2.5 rounded-xl text-start flex items-center justify-between transition-colors text-xs font-semibold cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="text-lg shrink-0">{cat.icon}</span>
                                  <div>
                                    <span className="font-black text-slate-900 block text-xs">
                                      {cat.name.ar}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium block">
                                      {cat.subtitle.ar}
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

                  {/* Name Fields (Arabic, English, French) */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <label className="block text-xs sm:text-sm font-bold text-slate-900">
                      اسم المدرب (الاسم واللقب) <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">بالعربية *</span>
                        <input
                          type="text"
                          value={selectedTrainer.name?.ar || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              name: { ...selectedTrainer.name, ar: e.target.value },
                            })
                          }
                          placeholder="مثال: د. عبد الكريم بلخيري"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-extrabold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">English</span>
                        <input
                          type="text"
                          value={selectedTrainer.name?.en || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              name: { ...selectedTrainer.name, en: e.target.value },
                            })
                          }
                          placeholder="e.g. Dr. Abdelkrim Belkheiri"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">Français</span>
                        <input
                          type="text"
                          value={selectedTrainer.name?.fr || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              name: { ...selectedTrainer.name, fr: e.target.value },
                            })
                          }
                          placeholder="ex. Dr Abdelkrim Belkheiri"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role / Professional Title */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <label className="block text-xs sm:text-sm font-bold text-slate-900">
                      الصفة واللقب المهني للمدرب <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">الصفة بالعربية *</span>
                        <input
                          type="text"
                          value={selectedTrainer.role?.ar || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              role: { ...selectedTrainer.role, ar: e.target.value },
                            })
                          }
                          placeholder="كبير مدربي المدربين ومستشار تطوير الأكاديميات..."
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">English Role</span>
                        <input
                          type="text"
                          value={selectedTrainer.role?.en || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              role: { ...selectedTrainer.role, en: e.target.value },
                            })
                          }
                          placeholder="Senior Master Trainer & Consultant..."
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs sm:text-sm bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo / Avatar & Presets Gallery */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-900">
                        الصورة الشخصية للمدرب (Avatar / Photo URL)
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        اختر من النماذج الجاهزة أو ضع رابط صورتك
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={selectedTrainer.image}
                        alt="معاينة"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30 shrink-0 shadow-xs"
                      />
                      <input
                        type="text"
                        value={selectedTrainer.image}
                        onChange={(e) => setSelectedTrainer({ ...selectedTrainer, image: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-mono text-xs bg-slate-50 focus:bg-white text-slate-800 outline-none"
                      />
                    </div>

                    {/* Presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">
                        نماذج صور جاهزة للاختيار السريع:
                      </span>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        {TRAINER_AVATAR_PRESETS.map((av, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedTrainer({ ...selectedTrainer, image: av.url })}
                            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                          >
                            <img
                              src={av.url}
                              alt={av.label}
                              className="w-6 h-6 rounded-lg object-cover"
                            />
                            <span>{av.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Country & Experience & Languages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Country Selector */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <label className="block text-xs font-bold text-slate-900">
                        الدولة وبلد الإقامة
                      </label>
                      <input
                        type="text"
                        value={selectedTrainer.country}
                        onChange={(e) => setSelectedTrainer({ ...selectedTrainer, country: e.target.value })}
                        placeholder="الجزائر، تونس، مصر، المغرب..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white focus:border-indigo-600 outline-none"
                      />

                      {/* Quick Country Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {COUNTRY_PRESETS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedTrainer({ ...selectedTrainer, country: c.name })}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                              selectedTrainer.country === c.name
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span>{c.flag}</span> <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Languages Selector */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                      <label className="block text-xs font-bold text-slate-900">
                        لغات التدريب المعتمدة
                      </label>
                      <div className="flex items-center gap-2 pt-1">
                        {LANGUAGE_PRESETS.map((lang) => {
                          const isSelected = selectedTrainer.languages?.includes(lang);
                          return (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => {
                                const current = selectedTrainer.languages || [];
                                const updated = isSelected
                                  ? current.filter((l) => l !== lang)
                                  : [...current, lang];
                                setSelectedTrainer({ ...selectedTrainer, languages: updated });
                              }}
                              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                              <span>{lang}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-500 block mb-1">
                          سنوات الخبرة التدريبية:
                        </span>
                        <input
                          type="text"
                          value={selectedTrainer.experienceYears || '10 سنوات'}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              experienceYears: e.target.value,
                            })
                          }
                          placeholder="مثال: أكثر من 12 سنة"
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-xs bg-white focus:border-indigo-600 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 2: BIO, CREDENTIALS, SKILLS & CONTACT                      */}
              {/* ------------------------------------------------------------- */}
              {editorTab === 'bio_credentials' && (
                <div className="space-y-5">
                  {/* Bio Description (خلفية بيضاء وخط عالي التباين) */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-900">
                        النبذة المهنية والإنجازات البيداغوجية <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {(selectedTrainer.bio?.ar || '').length} حرف
                      </span>
                    </div>

                    <textarea
                      rows={4}
                      value={selectedTrainer.bio?.ar || ''}
                      onChange={(e) =>
                        setSelectedTrainer({
                          ...selectedTrainer,
                          bio: { ...selectedTrainer.bio, ar: e.target.value },
                        })
                      }
                      placeholder="اكتب نبذة شاملة عن الخبرات الميدانية للمدرب، المؤسسات التي تعامل معها، وأبرز البرامج التي يقدمها..."
                      className="w-full p-3.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs sm:text-sm leading-relaxed bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Certificates / Accreditations List */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-900">
                        الشهادات والاعتمادات الأكاديمية والمهنية
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {(selectedTrainer.certificates?.ar || []).length} شهادات مسجلة
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newCertificateInput}
                        onChange={(e) => setNewCertificateInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newCertificateInput.trim()) {
                              const cur = selectedTrainer.certificates?.ar || [];
                              setSelectedTrainer({
                                ...selectedTrainer,
                                certificates: { ...selectedTrainer.certificates, ar: [...cur, newCertificateInput.trim()] },
                              });
                              setNewCertificateInput('');
                            }
                          }
                        }}
                        placeholder="أدخل شهادة جديدة (مثلاً: دكتوراه في علوم التربية، مدرب معتمد من TOT Academy)..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-indigo-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newCertificateInput.trim()) {
                            const cur = selectedTrainer.certificates?.ar || [];
                            setSelectedTrainer({
                              ...selectedTrainer,
                              certificates: { ...selectedTrainer.certificates, ar: [...cur, newCertificateInput.trim()] },
                            });
                            setNewCertificateInput('');
                          }
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        + إضافة
                      </button>
                    </div>

                    {/* Certificates Chips */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {(selectedTrainer.certificates?.ar || []).map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold"
                        >
                          <Award className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{cert}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const cur = selectedTrainer.certificates?.ar || [];
                              setSelectedTrainer({
                                ...selectedTrainer,
                                certificates: { ...selectedTrainer.certificates, ar: cur.filter((_, i) => i !== idx) },
                              });
                            }}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Training Skills */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs sm:text-sm font-bold text-slate-900">
                        المهارات التدريبية الأساسية (Skills)
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {(selectedTrainer.skills?.ar || []).length} مهارات
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (newSkillInput.trim()) {
                              const cur = selectedTrainer.skills?.ar || [];
                              setSelectedTrainer({
                                ...selectedTrainer,
                                skills: { ...selectedTrainer.skills, ar: [...cur, newSkillInput.trim()] },
                              });
                              setNewSkillInput('');
                            }
                          }
                        }}
                        placeholder="أضف مهارة تدريبية واضغط Enter..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:border-indigo-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newSkillInput.trim()) {
                            const cur = selectedTrainer.skills?.ar || [];
                            setSelectedTrainer({
                              ...selectedTrainer,
                              skills: { ...selectedTrainer.skills, ar: [...cur, newSkillInput.trim()] },
                            });
                            setNewSkillInput('');
                          }
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        + إضافة
                      </button>
                    </div>

                    {/* Current Skills Chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {(selectedTrainer.skills?.ar || []).map((sk, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold"
                        >
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const cur = selectedTrainer.skills?.ar || [];
                              setSelectedTrainer({
                                ...selectedTrainer,
                                skills: { ...selectedTrainer.skills, ar: cur.filter((_, i) => i !== idx) },
                              });
                            }}
                            className="text-indigo-400 hover:text-rose-600 transition-colors p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Suggested Skills to add by click */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">
                        مهارات مقترحة بنقرة واحدة:
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {SUGGESTED_SKILLS.map((sug) => {
                          const alreadyAdded = (selectedTrainer.skills?.ar || []).includes(sug);
                          if (alreadyAdded) return null;
                          return (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => {
                                const cur = selectedTrainer.skills?.ar || [];
                                setSelectedTrainer({
                                  ...selectedTrainer,
                                  skills: { ...selectedTrainer.skills, ar: [...cur, sug] },
                                });
                              }}
                              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[10px] font-bold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                            >
                              + {sug}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                    <label className="block text-xs sm:text-sm font-bold text-slate-900">
                      بيانات التواصل والحسابات المهنية
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">
                          البريد الإلكتروني الرسمي
                        </span>
                        <div className="relative">
                          <input
                            type="email"
                            value={selectedTrainer.email || ''}
                            onChange={(e) =>
                              setSelectedTrainer({ ...selectedTrainer, email: e.target.value })
                            }
                            placeholder="trainer@tot-academy.org"
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">
                          رقم الهاتف / الواتساب المباشر
                        </span>
                        <input
                          type="text"
                          value={selectedTrainer.phone || ''}
                          onChange={(e) =>
                            setSelectedTrainer({ ...selectedTrainer, phone: e.target.value })
                          }
                          placeholder="+213 555 123 456"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">
                          رابط LinkedIn المهني
                        </span>
                        <input
                          type="text"
                          value={selectedTrainer.socialLinks?.linkedin || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              socialLinks: { ...selectedTrainer.socialLinks, linkedin: e.target.value },
                            })
                          }
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block">
                          رابط الموقع الشخصي أو المنصة
                        </span>
                        <input
                          type="text"
                          value={selectedTrainer.socialLinks?.website || ''}
                          onChange={(e) =>
                            setSelectedTrainer({
                              ...selectedTrainer,
                              socialLinks: { ...selectedTrainer.socialLinks, website: e.target.value },
                            })
                          }
                          placeholder="https://personal-portfolio.com"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white focus:border-indigo-600 outline-none text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 3: LIVE PREVIEW INSIDE MODAL                              */}
              {/* ------------------------------------------------------------- */}
              {editorTab === 'preview' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>معاينة حية لبطاقة المدرب كما تظهر للزوار والباحثين في دليل الأكاديمية</span>
                    </span>
                    <span className="text-[11px] text-indigo-700 font-semibold">
                      {currentCategoryMeta.name.ar}
                    </span>
                  </div>

                  {/* Live Card Mockup */}
                  <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={selectedTrainer.image}
                        alt={selectedTrainer.name.ar}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-md shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-black"
                            style={{
                              backgroundColor: currentCategoryMeta.badgeBg,
                              color: currentCategoryMeta.color,
                            }}
                          >
                            {currentCategoryMeta.icon} {currentCategoryMeta.name.ar.split(' ')[0]}
                          </span>
                          <span className="text-[11px] font-bold text-primary-blue bg-blue-50 px-2 py-0.5 rounded-md">
                            📍 {selectedTrainer.country}
                          </span>
                        </div>

                        <h4 className="font-black text-slate-900 text-base leading-snug">
                          {selectedTrainer.name?.ar || 'اسم المدرب'}
                        </h4>
                        <p className="text-xs text-slate-600 leading-snug font-medium">
                          {selectedTrainer.role?.ar || 'الصفة المهنية للمدرب'}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                      {selectedTrainer.bio?.ar || 'النبذة المهنية...'}
                    </p>

                    {/* Languages & Experience */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="font-bold text-slate-500">لغات التدريب:</span>
                      <span className="font-black text-slate-800">
                        {(selectedTrainer.languages || []).join(' • ')}
                      </span>
                    </div>

                    {/* Certificates preview */}
                    {(selectedTrainer.certificates?.ar || []).length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[11px] font-bold text-slate-700 block">أبرز الشهادات:</span>
                        <div className="space-y-1">
                          {(selectedTrainer.certificates?.ar || []).slice(0, 2).map((c, i) => (
                            <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                              <Award className="w-3 h-3 text-indigo-600 shrink-0" />
                              <span className="truncate">{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact CTA buttons */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                      {selectedTrainer.phone && (
                        <a
                          href={`https://wa.me/${selectedTrainer.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تواصل واتساب</span>
                        </a>
                      )}
                      {selectedTrainer.email && (
                        <a
                          href={`mailto:${selectedTrainer.email}`}
                          className="py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-indigo-600" />
                          <span>إرسال بريد</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
