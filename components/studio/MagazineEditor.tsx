'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MagazineArticleItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';
import {
  MAGAZINE_SECTIONS_LIST,
  MAGAZINE_GROUPS_LIST,
  MagazineSectionMeta,
} from '@/lib/magazine-seed';
import {
  BookOpen,
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  Eye,
  Copy,
  Clock,
  User,
  Tag,
  Video,
  FileText,
  SlidersHorizontal,
  Grid,
  List,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronDown,
  X,
  ExternalLink,
  Star,
  AlertCircle,
  Image as ImageIcon,
  Table as TableIcon,
  Lightbulb,
  Link2,
  Bold,
  Italic,
  Underline,
  ListOrdered,
  Quote,
  Check,
  Film,
} from 'lucide-react';

const COVER_IMAGE_PRESETS = [
  { label: 'ذكاء اصطناعي', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { label: 'قاعة تدريب', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80' },
  { label: 'استراتيجية ورؤية', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'كتب وبحوث', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80' },
  { label: 'بزنس وريادة', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'قيادة وتمكين', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80' },
  { label: 'تفاعل ومجتمع', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80' },
  { label: 'منصة وجمهور', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80' },
];

const ARTICLE_MEDIA_PRESETS = [
  { label: 'ورشة تدريب تفاعلية', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80', caption: 'تفاعل المتدربين في ورشة العمل البيداغوجية' },
  { label: 'ذكاء اصطناعي وتكنولوجيا', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80', caption: 'تطبيقات الذكاء الاصطناعي في هندسة التدريب' },
  { label: 'استراتيجية ورؤية', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80', caption: 'بناء استراتيجيات التدريب المؤسسي' },
  { label: 'إنفوجرافيك وبيانات', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80', caption: 'تحليل مؤشرات قياس أثر التدريب' },
  { label: 'منصة ومحاضرة', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80', caption: 'منصة التدريب وعرض المهارات المتقدمة' },
  { label: 'عصف ذهني ونقاش', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80', caption: 'جلسة عصف ذهني لحل المشكلات التدريبية' },
];

const AUTHOR_PRESETS = [
  {
    name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
    role: { ar: 'رئيس التحرير وخبير تدريب دولي', en: 'Editor-in-Chief & Master Trainer', fr: 'Rédacteur en chef' },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: { ar: 'أ. مروان بن زيان', en: 'Mr. Marouane Ben Ziane', fr: 'M. Marouane Ben Ziane' },
    role: { ar: 'مستشار التطوير المؤسسي وتصميم الحقائب', en: 'Organizational Development Consultant', fr: 'Consultant en Développement' },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: { ar: 'هيئة تحرير مجلة المدرب', en: 'Editorial Board', fr: 'Comité de Rédaction' },
    role: { ar: 'فريق البحوث والتوثيق المهني', en: 'Research & Documentation Team', fr: 'Équipe de Recherche' },
    avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: { ar: 'د. سارة المنصوري', en: 'Dr. Sara Al-Mansouri', fr: 'Dr. Sara Al-Mansouri' },
    role: { ar: 'خبيرة هندسة تجارب التعلم الرقمي', en: 'Digital Learning Experience Expert', fr: 'Experte en Apprentissage Numérique' },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
];

export const MagazineEditor: React.FC = () => {
  const { magazineArticles, saveArticle, deleteArticle, syncAllArticlesToFirestore } = useCurriculum();

  // Navigation & Filtering
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedSectionSlug, setSelectedSectionSlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'compact' | 'grid' | 'table'>('compact');

  // Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  // Editor Modal State
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticleItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<'content' | 'metadata' | 'preview'>('content');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Custom Section Dropdown & Media Tool States
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [sectionDropdownSearch, setSectionDropdownSearch] = useState('');
  const [activeMediaTool, setActiveMediaTool] = useState<'none' | 'image' | 'video'>('none');
  const [mediaImageUrl, setMediaImageUrl] = useState('');
  const [mediaImageCaption, setMediaImageCaption] = useState('');
  const [mediaVideoUrl, setMediaVideoUrl] = useState('');
  const [mediaVideoTitle, setMediaVideoTitle] = useState('');

  // Reader Preview Modal State
  const [previewArticle, setPreviewArticle] = useState<MagazineArticleItem | null>(null);

  // Current active section for the editor
  const currentSection = useMemo(() => {
    if (!selectedArticle) return MAGAZINE_SECTIONS_LIST[0];
    return (
      MAGAZINE_SECTIONS_LIST.find(
        (s) => s.slug === (selectedArticle.sectionSlug || 'training-radar')
      ) || MAGAZINE_SECTIONS_LIST[0]
    );
  }, [selectedArticle]);

  // Close custom dropdown when clicking outside
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

  // Map of article counts per section slug
  const sectionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    magazineArticles.forEach((art) => {
      const slug = art.sectionSlug || 'training-radar';
      map[slug] = (map[slug] || 0) + 1;
    });
    return map;
  }, [magazineArticles]);

  // Filtered sections according to selected group
  const displayedSections = useMemo(() => {
    if (selectedGroup === 'all') return MAGAZINE_SECTIONS_LIST;
    return MAGAZINE_SECTIONS_LIST.filter((sec) => sec.group === selectedGroup);
  }, [selectedGroup]);

  // Current active section metadata if one is specifically selected
  const activeSectionMeta = useMemo(() => {
    if (selectedSectionSlug === 'all') return null;
    return MAGAZINE_SECTIONS_LIST.find((s) => s.slug === selectedSectionSlug) || null;
  }, [selectedSectionSlug]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return magazineArticles.filter((art) => {
      // 1. Section Filter
      if (selectedSectionSlug !== 'all' && art.sectionSlug !== selectedSectionSlug) {
        return false;
      }
      // 2. Group Filter (if 'all' sections selected, but group is narrowed)
      if (selectedSectionSlug === 'all' && selectedGroup !== 'all') {
        const secMeta = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === art.sectionSlug);
        if (secMeta && secMeta.group !== selectedGroup) return false;
      }
      // 3. Status Filter
      if (statusFilter !== 'all' && art.status !== statusFilter) {
        return false;
      }
      // 4. Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (art.title.ar || '').toLowerCase().includes(q) || (art.title.en || '').toLowerCase().includes(q);
        const matchAuthor = (art.author?.name?.ar || '').toLowerCase().includes(q);
        const matchCat = (art.category || '').toLowerCase().includes(q);
        const matchTags = Array.isArray(art.tags) && art.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchAuthor && !matchCat && !matchTags) return false;
      }
      return true;
    });
  }, [magazineArticles, selectedSectionSlug, selectedGroup, statusFilter, searchQuery]);

  // Synchronize all articles to Firestore
  const handleSyncToFirestore = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncAllArticlesToFirestore();
      if (res.success) {
        setSyncFeedback({
          message: `تمت مزامنة وحفظ كافة مقالات الأقسام الـ 18 (${res.count} مقال) في قاعدة بيانات Firestore بنجاح!`,
          isSuccess: true,
        });
      } else {
        setSyncFeedback({
          message: res.error || 'تعذر استكمال المزامنة السحابية مع Firestore.',
          isSuccess: false,
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        message: err.message || 'حدث خطأ أثناء المزامنة.',
        isSuccess: false,
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 7000);
    }
  };

  // Create new article pre-assigned to the currently active section
  const handleCreateNew = (targetSectionSlug?: string) => {
    const chosenSlug = targetSectionSlug || (selectedSectionSlug !== 'all' ? selectedSectionSlug : 'training-radar');
    const secMeta = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === chosenSlug) || MAGAZINE_SECTIONS_LIST[0];

    const newId = `art-${Date.now().toString().slice(-6)}`;
    const newArt: MagazineArticleItem = {
      id: newId,
      slug: `${secMeta.slug}-${Date.now().toString().slice(-4)}`,
      sectionSlug: secMeta.slug,
      sectionNumber: secMeta.n,
      sectionGroup: secMeta.group,
      issueNumber: 5,
      title: {
        ar: `دراسة جديدة: تطبيقات ${secMeta.name.ar} في التدريب المعاصر`,
        en: `New Study: Applications of ${secMeta.name.en || 'Training'}`,
        fr: `Nouvelle étude: Applications dans la formation`,
      },
      excerpt: {
        ar: `رؤية تحليلية وإجرائية تسلط الضوء على ركائز ${secMeta.name.ar} وأثرها في رفع كفاءة المدرب والمؤسسة.`,
        en: `An analytical and procedural perspective highlighting the pillars of this section.`,
        fr: `Une perspective analytique et procédurale.`,
      },
      content: `## مدخل منهجي في ${secMeta.name.ar}

يمثل هذا المحور ركيزة جوهرية في منظومة تمكين المدرب وتطوير الممارسات الميدانية وفق معايير الأكاديمية الدولية لتدريب المدربين.

### المحاور الأساسية
1. **التحليل الميداني الدقيق**: تشخيص الواقع واستقراء الاحتياجات الحقيقية.
2. **التصميم الإجرائي التفاعلي**: صياغة الأدوات والسيناريوهات البيداغوجية المتقدمة.
3. **قياس الأثر ونقل المهارة**: ضمان تحقيق التغيير السلوكي المستدام لدى المتدربين.

> «معرفة المدرب... بصوت المدرب» - نافذة تجمع الرؤية والابتكار المهني.`,
      author: {
        name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
        role: { ar: 'رئيس التحرير وخبير تدريب دولي', en: 'Editor-in-Chief & Master Trainer', fr: 'Rédacteur en chef' },
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      category: secMeta.name.ar,
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTimeMinutes: 6,
      status: 'published',
      featured: false,
      contentType: 'article',
      videoUrl: '',
      tags: [secMeta.name.ar, 'مجلة المدرب', 'TOT'],
    };

    setSelectedArticle(newArt);
    setEditorTab('content');
    setIsEditing(true);
    setStatusMessage(null);
  };

  // Duplicate an article
  const handleDuplicate = (art: MagazineArticleItem) => {
    const dupId = `art-${Date.now().toString().slice(-6)}`;
    const duplicated: MagazineArticleItem = {
      ...art,
      id: dupId,
      slug: `${art.slug}-copy`,
      title: {
        ...art.title,
        ar: `${art.title.ar} (نسخة معدلة)`,
      },
      status: 'draft',
    };
    setSelectedArticle(duplicated);
    setEditorTab('content');
    setIsEditing(true);
    setStatusMessage('تم إنشاء نسخة من المقال بنجاح. يمكنك تعديلها وحفظها.');
  };

  // Save changes to Firestore
  const handleSave = async () => {
    if (!selectedArticle) return;
    if (!selectedArticle.title.ar.trim()) {
      setStatusMessage('يرجى إدخال عنوان المقال بالعربية.');
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);
    try {
      // Ensure sectionSlug is linked to sectionNumber and sectionGroup
      const secMeta = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === selectedArticle.sectionSlug);
      const articleToSave: MagazineArticleItem = {
        ...selectedArticle,
        sectionNumber: secMeta ? secMeta.n : selectedArticle.sectionNumber || 1,
        sectionGroup: secMeta ? secMeta.group : selectedArticle.sectionGroup || 'strategy',
        category: secMeta ? secMeta.name.ar : selectedArticle.category || 'مجلة المدرب',
      };

      const res = await saveArticle(articleToSave);
      if (res.success) {
        setStatusMessage('✅ تم حفظ المقال وتحديثه في مجلة المدرب وقاعدة البيانات بنجاح.');
        setTimeout(() => {
          setIsEditing(false);
          setSelectedArticle(null);
          setStatusMessage(null);
        }, 1200);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل حفظ المقال'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ أثناء الحفظ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete an article
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`هل أنت متأكد من حذف مقال "${title}" من مجلة المدرب وقاعدة البيانات؟`)) return;
    await deleteArticle(id);
    if (selectedArticle?.id === id) {
      setIsEditing(false);
      setSelectedArticle(null);
    }
  };

  // Markdown Quick Format helper
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    if (!selectedArticle) return;
    const textarea = document.getElementById('article-content-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = selectedArticle.content;
    const selected = current.substring(start, end);
    const replacement = prefix + (selected || 'نص توضيحي') + suffix;

    const nextContent = current.substring(0, start) + replacement + current.substring(end);
    setSelectedArticle({ ...selectedArticle, content: nextContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. Creative Studio Header with Stats & Firestore Sync */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/50 relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>استوديو التحرير والنشر الرقمي • مجلة المدرب العربي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              إدارة مقالات الأقسام الـ 18 والمزامنة السحابية
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              تحكم كامل في مقالات المجلة، كتابة وتعديل وتحرير المقالات حسب الأقسام الـ 18 المعتمدة، مع المزامنة اللحظية مع Firestore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Sync All to Firestore Button */}
            <button
              onClick={handleSyncToFirestore}
              disabled={isSyncing}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-900/40 border border-indigo-400/30 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              title="مزامنة كافة المقالات والمسودات مع Firestore"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'جاري المزامنة مع Firestore...' : 'مزامنة المقالات مع Firestore'}</span>
            </button>

            {/* Add New Article Button */}
            <button
              onClick={() => handleCreateNew()}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>كتابة مقال جديد</span>
            </button>
          </div>
        </div>

        {/* Studio Stats Counter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-2xl p-3 border border-slate-700/40">
            <span className="text-slate-400 text-[11px] font-medium block">إجمالي المقالات</span>
            <span className="text-xl sm:text-2xl font-black text-white">{magazineArticles.length}</span>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-2xl p-3 border border-slate-700/40">
            <span className="text-slate-400 text-[11px] font-medium block">أقسام المجلة</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">18 قسماً</span>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-2xl p-3 border border-slate-700/40">
            <span className="text-slate-400 text-[11px] font-medium block">مقالات منشورة</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">
              {magazineArticles.filter((a) => a.status === 'published').length}
            </span>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-2xl p-3 border border-slate-700/40">
            <span className="text-slate-400 text-[11px] font-medium block">مقالات مميزة (غلاف)</span>
            <span className="text-xl sm:text-2xl font-black text-purple-400">
              {magazineArticles.filter((a) => a.featured).length}
            </span>
          </div>
        </div>
      </div>

      {/* Sync Feedback Toast Banner */}
      {syncFeedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-bold shadow-md transition-all ${
            syncFeedback.isSuccess
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {syncFeedback.isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{syncFeedback.message}</span>
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="text-xs px-2 py-1 rounded-lg bg-black/5 hover:bg-black/10"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. The 18 Sections Interactive Hub (Top Categorization) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                تصفح وإدارة مقالات الأقسام الـ 18
              </h3>
              <p className="text-[11px] text-slate-500">
                اختر قسماً لعرض مقالاته المخصصة حصرياً، أو أضف مقالاً جديداً مرتبطاً به مباشرة.
              </p>
            </div>
          </div>

          {/* Group Tabs (All / Strategy / Practice / Innovation / Community) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl">
            {MAGAZINE_GROUPS_LIST.map((grp) => {
              const isActive = selectedGroup === grp.key;
              return (
                <button
                  key={grp.key}
                  onClick={() => {
                    setSelectedGroup(grp.key);
                    // If switching group, reset specific section if not in that group
                    if (grp.key !== 'all') {
                      const inGroup = MAGAZINE_SECTIONS_LIST.filter((s) => s.group === grp.key);
                      if (!inGroup.some((s) => s.slug === selectedSectionSlug)) {
                        setSelectedSectionSlug('all');
                      }
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {grp.title.ar}
                </button>
              );
            })}
          </div>
        </div>

        {/* 18 Sections Pills Slider / Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {/* 'All Sections' Pill */}
          <button
            onClick={() => setSelectedSectionSlug('all')}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
              selectedSectionSlug === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>كافة الأقسام الـ 18</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                selectedSectionSlug === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {magazineArticles.length}
            </span>
          </button>

          {/* Individual Section Pills (1 to 18) */}
          {displayedSections.map((sec) => {
            const isSelected = selectedSectionSlug === sec.slug;
            const count = sectionCounts[sec.slug] || 0;

            return (
              <button
                key={sec.slug}
                onClick={() => setSelectedSectionSlug(sec.slug)}
                className={`shrink-0 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all group ${
                  isSelected
                    ? 'text-white shadow-md ring-2 ring-offset-1'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                style={{
                  backgroundColor: isSelected ? sec.accentColor : undefined,
                  borderColor: isSelected ? sec.accentColor : undefined,
                }}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {sec.n}
                </span>
                <span>{sec.name.ar}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Section Info Banner (if a single section is selected) */}
        {activeSectionMeta && (
          <div
            className="rounded-2xl p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{
              backgroundColor: `${activeSectionMeta.accentColor}0D`,
              borderColor: `${activeSectionMeta.accentColor}40`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs"
                style={{ backgroundColor: activeSectionMeta.accentColor }}
              >
                #{activeSectionMeta.n}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    قسم {activeSectionMeta.name.ar}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-600">
                    {activeSectionMeta.groupTitle.ar}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  يحتوي هذا القسم حالياً على{' '}
                  <strong className="text-slate-800">{sectionCounts[activeSectionMeta.slug] || 0} مقالات</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleCreateNew(activeSectionMeta.slug)}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                style={{ backgroundColor: activeSectionMeta.accentColor }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ إضافة مقال في قسم ({activeSectionMeta.name.ar})</span>
              </button>
              <button
                onClick={() => setSelectedSectionSlug('all')}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
              >
                عرض كافة الأقسام
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. Search, Status Filter & View Mode Controls */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث بالعنوان، الكاتب، أو الكلمات المفتاحية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-9 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter by Status */}
        <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              الكل ({magazineArticles.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'published' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              منشور ({magazineArticles.filter((a) => a.status === 'published').length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === 'draft' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              مسودة ({magazineArticles.filter((a) => a.status === 'draft').length})
            </button>
          </div>

          {/* View Mode Toggle (Compact small cards on large screens by default!) */}
          <div className="flex items-center gap-1 border border-slate-200 p-1 rounded-xl bg-slate-50">
            <button
              onClick={() => setViewMode('compact')}
              title="بطاقات مدمجة وصغيرة للشاشات الكبيرة"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'compact' ? 'bg-white text-indigo-700 shadow-xs border border-slate-200' : 'text-slate-500'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مدمج صغير</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="شبكة عادية"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-white text-indigo-700 shadow-xs border border-slate-200' : 'text-slate-500'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">شبكة</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="جدول تفصيلي"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' ? 'bg-white text-indigo-700 shadow-xs border border-slate-200' : 'text-slate-500'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">جدول</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Article Cards Grid / Compact List */}
      {/* ========================================================================= */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-800">لا توجد مقالات مطابقة للبحث أو القسم المحدد</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              يمكنك كتابة مقال جديد وتخصيصه مباشرة لهذا القسم، أو ضبط خيارات البحث والتصفية.
            </p>
          </div>
          <button
            onClick={() => handleCreateNew(selectedSectionSlug !== 'all' ? selectedSectionSlug : undefined)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ إضافة أول مقال في هذا القسم</span>
          </button>
        </div>
      ) : viewMode === 'compact' ? (
        /* ------------------------------------------------------------- */
        /* COMPACT CARDS (Specifically optimized & small for large screens) */
        /* ------------------------------------------------------------- */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3.5">
          {filteredArticles.map((art) => {
            const sec = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === art.sectionSlug);
            const accent = sec ? sec.accentColor : '#3b82f6';

            return (
              <div
                key={art.id}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Compact Thumbnail Container (height: 96px) */}
                <div className="h-24 bg-slate-100 overflow-hidden relative">
                  <img
                    src={art.coverImage}
                    alt={art.title.ar}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Section Badge */}
                  <span
                    className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-black text-white shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    #{sec?.n || 1} {sec?.name.ar || art.category}
                  </span>

                  {/* Featured / Video Icons */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    {art.featured && (
                      <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-xs" title="مقال غلاف مميز">
                        <Star className="w-3 h-3 fill-current" />
                      </span>
                    )}
                    {art.contentType === 'video' && (
                      <span className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs" title="فيديو تدريبي">
                        <Video className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Bottom overlay: Read time & Issue */}
                  <div className="absolute bottom-1.5 right-2 left-2 flex items-center justify-between text-[10px] text-white/90 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readingTimeMinutes || 5} د</span>
                    </span>
                    <span>العدد #{art.issueNumber || 5}</span>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h5
                      className="font-extrabold text-slate-900 text-xs line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors"
                      title={art.title.ar}
                    >
                      {art.title.ar}
                    </h5>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {art.excerpt.ar || 'مقال مهني تخصصي في منهجيات التدريب وتطوير الكفاءات.'}
                    </p>
                  </div>

                  {/* Author Mini Row */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <img
                        src={art.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                        alt={art.author?.name?.ar || 'الكاتب'}
                        className="w-5 h-5 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <span className="text-[10px] font-bold text-slate-700 truncate">
                        {art.author?.name?.ar || 'هيئة التحرير'}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        art.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {art.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </div>

                  {/* Quick Compact Action Buttons */}
                  <div className="pt-1.5 grid grid-cols-4 gap-1 border-t border-slate-100 text-[11px]">
                    <button
                      onClick={() => {
                        setSelectedArticle(art);
                        setEditorTab('content');
                        setIsEditing(true);
                        setStatusMessage(null);
                      }}
                      className="py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center gap-1 transition-colors"
                      title="تعديل المقال"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span className="text-[10px]">تعديل</span>
                    </button>

                    <button
                      onClick={() => setPreviewArticle(art)}
                      className="py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center gap-1 transition-colors"
                      title="معاينة المقال"
                    >
                      <Eye className="w-3 h-3" />
                      <span className="text-[10px]">عرض</span>
                    </button>

                    <button
                      onClick={() => handleDuplicate(art)}
                      className="py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium flex items-center justify-center transition-colors"
                      title="تكرار المقال"
                    >
                      <Copy className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => handleDelete(art.id, art.title.ar)}
                      className="py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium flex items-center justify-center transition-colors"
                      title="حذف المقال"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'grid' ? (
        /* ------------------------------------------------------------- */
        /* STANDARD GRID VIEW */
        /* ------------------------------------------------------------- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.map((art) => {
            const sec = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === art.sectionSlug);
            const accent = sec ? sec.accentColor : '#3b82f6';

            return (
              <div
                key={art.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img src={art.coverImage} alt={art.title.ar} className="w-full h-full object-cover" />
                  <span
                    className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-black text-white shadow-md"
                    style={{ backgroundColor: accent }}
                  >
                    #{sec?.n || 1} {sec?.name.ar || art.category}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                    {art.readingTimeMinutes} دقيقة قراءة
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-black text-slate-900 text-base line-clamp-2 mb-1.5">
                      {art.title.ar}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {art.excerpt.ar}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={art.author?.avatar}
                        alt={art.author?.name?.ar}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-800 block">
                          {art.author?.name?.ar}
                        </span>
                        <span className="text-[10px] text-slate-400">العدد #{art.issueNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewArticle(art)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                        title="معاينة"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedArticle(art);
                          setEditorTab('content');
                          setIsEditing(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>
                      <button
                        onClick={() => handleDelete(art.id, art.title.ar)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* TABLE VIEW */
        /* ------------------------------------------------------------- */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">المقال</th>
                <th className="p-3">القسم (1 - 18)</th>
                <th className="p-3">الكاتب</th>
                <th className="p-3">وقت القراءة</th>
                <th className="p-3">النوع</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.map((art) => {
                const sec = MAGAZINE_SECTIONS_LIST.find((s) => s.slug === art.sectionSlug);
                return (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={art.coverImage}
                          alt={art.title.ar}
                          className="w-12 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 line-clamp-1">{art.title.ar}</span>
                          <span className="text-[10px] text-slate-400">العدد #{art.issueNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: sec?.accentColor || '#3b82f6' }}
                        />
                        #{sec?.n || 1} {sec?.name.ar || art.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">{art.author?.name?.ar}</td>
                    <td className="p-3 text-slate-600">{art.readingTimeMinutes} دقائق</td>
                    <td className="p-3">
                      <span className="text-[11px] font-semibold text-slate-600">
                        {art.contentType === 'video' ? 'فيديو' : 'مقال'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {art.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="p-3 text-left">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewArticle(art)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="معاينة"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedArticle(art);
                            setEditorTab('content');
                            setIsEditing(true);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold"
                          title="تعديل"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(art.id, art.title.ar)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
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
      {/* 5. Full-Featured Article Editor Modal / Drawer */}
      {/* ========================================================================= */}
      {isEditing && selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header: العنوان وحده في الأعلى وتحته زري الإلغاء والحفظ */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white border-b border-slate-800 space-y-3 shrink-0">
              {/* 1. العنوان وحده في الأعلى */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <Edit3 className="w-3 h-3" />
                    {selectedArticle.id?.startsWith('art-') ? 'كتابة مقال جديد' : 'تعديل المقال'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    مجلة المدرب العربي • القسم #{selectedArticle.sectionNumber || currentSection.n}: {currentSection.name.ar}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white leading-snug break-words">
                  {selectedArticle.title.ar ? selectedArticle.title.ar : 'كتابة مقال جديد (بدون عنوان)'}
                </h3>
              </div>

                {/* 2. تحته زرين: إلغاء وحفظ ونشر المقال */}
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
                    className="w-full py-2.5 px-3 sm:px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span className="truncate">{isSaving ? 'جاري الحفظ...' : 'حفظ ونشر المقال'}</span>
                  </button>
                </div>
              </div>

              {/* Status Message if any */}
              {statusMessage && (
                <div className="p-3 bg-blue-50 border-b border-blue-200 text-blue-900 text-xs font-bold text-center shrink-0">
                  {statusMessage}
                </div>
              )}

              {/* Editor Tabs: صفين - الصف الأول: المحتوى والقسم | الصف الثاني: معاينة حية */}
              <div className="p-2.5 sm:px-6 sm:py-3 bg-slate-100/90 border-b border-slate-200/90 space-y-2 shrink-0">
                {/* الصف الأول: المحتوى والقسم في صف واحد */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorTab('content')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      editorTab === 'content'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate">المحتوى والنص التحريري</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditorTab('metadata')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                      editorTab === 'metadata'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <Tag className="w-4 h-4 shrink-0" />
                    <span className="truncate">القسم، الكاتب، وبيانات النشر</span>
                  </button>
                </div>

                {/* الصف الثاني: معاينة حية في الصف الثاني وبحجم متناسق */}
                <div>
                  <button
                    type="button"
                    onClick={() => setEditorTab('preview')}
                    className={`w-full py-2 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all border cursor-pointer ${
                      editorTab === 'preview'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <Eye className={`w-4 h-4 shrink-0 ${editorTab === 'preview' ? 'text-white' : 'text-emerald-600'}`} />
                    <span>معاينة حية للمقال</span>
                  </button>
                </div>
              </div>

              {/* Modal Body Scroll Area */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm">
                {/* TAB 1: CONTENT & TEXT */}
                {editorTab === 'content' && (
                  <div className="space-y-5">
                    {/* تحديد القسم (قائمة منسدلة منسقة مثل نماذج الدخول والتسجيل) */}
                    <div className="relative" ref={sectionDropdownRef}>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                        تحديد قسم المجلة التابع له المقال (من بين الأقسام الـ 18)
                        <span className="text-red-500 ms-1">*</span>
                      </label>

                      {/* Dropdown Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-start flex items-center justify-between transition-all duration-200 cursor-pointer shadow-2xs ${
                          isSectionDropdownOpen
                            ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-white'
                            : 'border-slate-200 bg-slate-50/80 hover:bg-white text-slate-800 hover:border-slate-300'
                        }`}
                        aria-haspopup="listbox"
                        aria-expanded={isSectionDropdownOpen}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1 pe-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: currentSection.accentColor || '#3b82f6' }}
                          />
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-slate-200 text-slate-800 shrink-0 font-mono">
                            #{currentSection.n}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {currentSection.name.ar}
                          </span>
                          <span className="hidden sm:inline-block ms-auto text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold shrink-0">
                            {currentSection.groupTitle.ar}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                            isSectionDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                          }`}
                        />
                      </button>

                      {/* Floating Dropdown Menu (Grouped with Search) */}
                      {isSectionDropdownOpen && (
                        <div className="absolute z-50 mt-1.5 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150 text-right">
                          {/* Search Bar inside dropdown */}
                          <div className="relative mb-2 px-1">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={sectionDropdownSearch}
                              onChange={(e) => setSectionDropdownSearch(e.target.value)}
                              placeholder="ابحث عن قسم في المجلة..."
                              className="w-full pr-8 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white text-slate-800"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>

                          {/* Groups List */}
                          <div className="space-y-3">
                            {MAGAZINE_GROUPS_LIST.filter((g) => g.key !== 'all').map((grp) => {
                              const groupSections = MAGAZINE_SECTIONS_LIST.filter(
                                (s) =>
                                  s.group === grp.key &&
                                  (!sectionDropdownSearch.trim() ||
                                    s.name.ar.includes(sectionDropdownSearch) ||
                                    s.name.en.toLowerCase().includes(sectionDropdownSearch.toLowerCase()))
                              );
                              if (groupSections.length === 0) return null;

                              return (
                                <div key={grp.key} className="space-y-1">
                                  <div className="px-2.5 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-100/70 rounded-lg flex items-center justify-between">
                                    <span>{grp.title.ar}</span>
                                    <span className="text-[9px] font-normal text-slate-400">
                                      {groupSections.length} أقسام
                                    </span>
                                  </div>

                                  <div className="space-y-0.5">
                                    {groupSections.map((sec) => {
                                      const isSelected = (selectedArticle.sectionSlug || 'training-radar') === sec.slug;
                                      return (
                                        <button
                                          key={sec.slug}
                                          type="button"
                                          onClick={() => {
                                            setSelectedArticle({
                                              ...selectedArticle,
                                              sectionSlug: sec.slug,
                                              sectionNumber: sec.n,
                                              sectionGroup: sec.group,
                                              category: sec.name.ar,
                                            });
                                            setIsSectionDropdownOpen(false);
                                            setSectionDropdownSearch('');
                                          }}
                                          className={`w-full px-3 py-2 rounded-xl text-start flex items-center justify-between transition-colors text-xs font-semibold cursor-pointer ${
                                            isSelected
                                              ? 'bg-indigo-50 text-indigo-950 font-bold border border-indigo-200'
                                              : 'hover:bg-slate-50 text-slate-700'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <span
                                              className="w-2.5 h-2.5 rounded-full shrink-0"
                                              style={{ backgroundColor: sec.accentColor }}
                                            />
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                                              #{sec.n}
                                            </span>
                                            <span className="truncate">{sec.name.ar}</span>
                                          </div>
                                          {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title Arabic */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                        عنوان المقال (باللغة العربية) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={selectedArticle.title.ar}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            title: { ...selectedArticle.title, ar: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 font-extrabold text-slate-900 text-sm sm:text-base focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 outline-none bg-white transition-all shadow-2xs placeholder:text-slate-400"
                        placeholder="اكتب عنواناً جذاباً ومعبراً عن المحتوى..."
                      />
                    </div>

                    {/* Excerpt / Summary (خلفية بيضاء نقية وخط واضح عالي التباين) */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-bold text-slate-900">
                          المقدمة والخلاصة التحريرية (Excerpt)
                        </label>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {(selectedArticle.excerpt.ar || '').length} حرف
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={selectedArticle.excerpt.ar}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            excerpt: { ...selectedArticle.excerpt, ar: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 bg-white text-slate-950 font-medium text-xs sm:text-sm leading-relaxed placeholder:text-slate-400 outline-none transition-all shadow-xs"
                        placeholder="ملخص تحريري يوضح الفكرة الجوهرية ونقاط التعلم المستهدفة من المقال..."
                      />
                    </div>

                    {/* Full Article Content Editor (محرر كامل ومتقدم مع تحكم كامل بالوسائط) */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-3">
                      {/* Header & Word Count */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                            نص المقال الكامل (محرر متكامل للوسائط والتحرير)
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">
                            Markdown كامل
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-600 font-bold">
                          <span>
                            {selectedArticle.content.trim()
                              ? selectedArticle.content.trim().split(/\s+/).length
                              : 0}{' '}
                            كلمة
                          </span>
                          <span>•</span>
                          <span>{selectedArticle.content.length} حرف</span>
                        </div>
                      </div>

                      {/* Comprehensive Media & Formatting Toolbar */}
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                        {/* Headings */}
                        <div className="flex items-center gap-1 pe-1.5 border-e border-slate-200">
                          <button
                            type="button"
                            onClick={() => insertMarkdown('## ', '\n')}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-xs font-black text-slate-700 transition-colors"
                            title="عنوان رئيسي (H2)"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown('### ', '\n')}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-xs font-black text-slate-700 transition-colors"
                            title="عنوان فرعي (H3)"
                          >
                            H3
                          </button>
                        </div>

                        {/* Text Styles */}
                        <div className="flex items-center gap-1 pe-1.5 border-e border-slate-200">
                          <button
                            type="button"
                            onClick={() => insertMarkdown('**', '**')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="خط عريض"
                          >
                            <Bold className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown('*', '*')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="خط مائل"
                          >
                            <Italic className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown('<u>', '</u>')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="تسطير"
                          >
                            <Underline className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Lists & Quotes */}
                        <div className="flex items-center gap-1 pe-1.5 border-e border-slate-200">
                          <button
                            type="button"
                            onClick={() => insertMarkdown('\n- ', '')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="قائمة نقطية"
                          >
                            <List className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown('\n1. ', '')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="قائمة رقمية"
                          >
                            <ListOrdered className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => insertMarkdown('\n> «', '»')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition-colors"
                            title="اقتباس تحريري"
                          >
                            <Quote className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Callouts & Highlights */}
                        <div className="flex items-center gap-1 pe-1.5 border-e border-slate-200">
                          <button
                            type="button"
                            onClick={() => insertMarkdown('\n> 💡 **إضاءة تدريبية:** ', '\n')}
                            className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1 transition-colors"
                            title="إضاءة تدريبية"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span className="hidden sm:inline">إضاءة</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              insertMarkdown(
                                '\n| المحور التدريبي | الهدف الإجرائي | أداة القياس |\n| :--- | :--- | :--- |\n| التطبيق الميداني | إتقان نقل المهارة | شبكة الملاحظة |\n'
                              )
                            }
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[11px] font-bold flex items-center gap-1 transition-colors"
                            title="إدراج جدول مقارنة"
                          >
                            <TableIcon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">جدول</span>
                          </button>
                        </div>

                        {/* Media Controls (التحكم في إضافة الصور والفيديو والوسائط) */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setActiveMediaTool(activeMediaTool === 'image' ? 'none' : 'image')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              activeMediaTool === 'image'
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>إدراج صورة</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveMediaTool(activeMediaTool === 'video' ? 'none' : 'video')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              activeMediaTool === 'video'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            }`}
                          >
                            <Film className="w-3.5 h-3.5" />
                            <span>إدراج فيديو</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => insertMarkdown('[عنوان الرابط المرجعي](', 'https://...)')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="إدراج رابط مرجعي"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => insertMarkdown('\n\n---\n\n')}
                            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-600"
                            title="فاصل أفقي"
                          >
                            فاصل
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Image Insertion Panel */}
                      {activeMediaTool === 'image' && (
                        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2.5 animate-in fade-in duration-150">
                          <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                            <span className="flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-blue-600" />
                              أداة إدراج الصور في المقال
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveMediaTool('none')}
                              className="text-blue-500 hover:text-blue-800 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={mediaImageUrl}
                              onChange={(e) => setMediaImageUrl(e.target.value)}
                              placeholder="رابط الصورة المباشر (https://...)"
                              className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={mediaImageCaption}
                              onChange={(e) => setMediaImageCaption(e.target.value)}
                              placeholder="وصف أو شرح الصورة التوضيحي..."
                              className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs text-slate-800 outline-none focus:border-blue-500"
                            />
                          </div>

                          {/* Preset Quick Images */}
                          <div>
                            <span className="text-[10px] font-bold text-blue-800 block mb-1">
                              أو اختر صورة تدريبية احترافية جاهزة بنقرة واحدة:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {ARTICLE_MEDIA_PRESETS.map((p, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setMediaImageUrl(p.url);
                                    setMediaImageCaption(p.caption);
                                  }}
                                  className="px-2 py-1 rounded-md bg-white hover:bg-blue-100 border border-blue-200 text-[10px] font-bold text-blue-800 transition-colors cursor-pointer"
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!mediaImageUrl.trim()) return;
                                const caption = mediaImageCaption.trim() || 'صورة توضيحية للمقال';
                                const imgMarkdown = `\n\n![${caption}](${mediaImageUrl.trim()})\n*${caption}*\n\n`;
                                insertMarkdown(imgMarkdown);
                                setMediaImageUrl('');
                                setMediaImageCaption('');
                                setActiveMediaTool('none');
                              }}
                              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              إدراج الصورة في المقال
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Collapsible Video Insertion Panel */}
                      {activeMediaTool === 'video' && (
                        <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2.5 animate-in fade-in duration-150">
                          <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                            <span className="flex items-center gap-1.5">
                              <Film className="w-4 h-4 text-rose-600" />
                              أداة إدراج فيديو تدريبي (YouTube / MP4)
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveMediaTool('none')}
                              className="text-rose-500 hover:text-rose-800 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={mediaVideoUrl}
                              onChange={(e) => setMediaVideoUrl(e.target.value)}
                              placeholder="رابط الفيديو (مثال: https://www.youtube.com/watch?v=...)"
                              className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-mono text-slate-800 outline-none focus:border-rose-500"
                            />
                            <input
                              type="text"
                              value={mediaVideoTitle}
                              onChange={(e) => setMediaVideoTitle(e.target.value)}
                              placeholder="عنوان الفيديو أو الموضوع التدريبي..."
                              className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs text-slate-800 outline-none focus:border-rose-500"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!mediaVideoUrl.trim()) return;
                                const title = mediaVideoTitle.trim() || 'فيديو تدريبي تطبيقي';
                                const vidMarkdown = `\n\n> 🎬 **فيديو تدريبي: ${title}**\n> 🔗 [اضغط هنا لمشاهدة المقطع التدريبي الكامل](${mediaVideoUrl.trim()})\n\n`;
                                insertMarkdown(vidMarkdown);
                                setMediaVideoUrl('');
                                setMediaVideoTitle('');
                                setActiveMediaTool('none');
                              }}
                              className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                              إدراج الفيديو في المقال
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Main Textarea: ألوان عالية الوضوح والتباين وخلفية بيضاء نقية وخط عربي أصيل */}
                      <textarea
                        id="article-content-textarea"
                        rows={14}
                        value={selectedArticle.content}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, content: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 bg-white text-slate-950 font-sans text-sm sm:text-base leading-relaxed tracking-normal outline-none transition-all shadow-xs placeholder:text-slate-400 font-medium"
                        placeholder="اكتب هنا متن المقال الكامل باستخدام أشرطة الأدوات أعلاه، يمكنك إدراج العناوين والفقرات والجداول والصور ومقاطع الفيديو..."
                      />
                    </div>
                  </div>
                )}

              {/* TAB 2: METADATA & AUTHOR & MEDIA */}
              {editorTab === 'metadata' && (
                <div className="space-y-6">
                  {/* Author Settings & Presets */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">بيانات كاتب المقال والخبير</span>
                      <span className="text-[11px] text-slate-500">اختر من الكتاب المعتمدين أو اكتب يدوياً:</span>
                    </div>

                    {/* Quick Author Presets */}
                    <div className="flex flex-wrap gap-2">
                      {AUTHOR_PRESETS.map((ap, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setSelectedArticle({
                              ...selectedArticle,
                              author: {
                                name: { ...ap.name },
                                role: { ...ap.role },
                                avatar: ap.avatar,
                              },
                            })
                          }
                          className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-[11px] font-bold flex items-center gap-1.5"
                        >
                          <img src={ap.avatar} alt={ap.name.ar} className="w-4 h-4 rounded-full object-cover" />
                          <span>{ap.name.ar}</span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-800 mb-1">اسم الكاتب</label>
                        <input
                          type="text"
                          value={selectedArticle.author.name.ar}
                          onChange={(e) =>
                            setSelectedArticle({
                              ...selectedArticle,
                              author: {
                                ...selectedArticle.author,
                                name: { ...selectedArticle.author.name, ar: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-800 mb-1">الصفة أو اللقب العلمي</label>
                        <input
                          type="text"
                          value={selectedArticle.author.role.ar}
                          onChange={(e) =>
                            setSelectedArticle({
                              ...selectedArticle,
                              author: {
                                ...selectedArticle.author,
                                role: { ...selectedArticle.author.role, ar: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-800 mb-1">رابط صورة الكاتب</label>
                        <input
                          type="text"
                          value={selectedArticle.author.avatar}
                          onChange={(e) =>
                            setSelectedArticle({
                              ...selectedArticle,
                              author: { ...selectedArticle.author, avatar: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cover Image & Presets */}
                  <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">صورة غلاف المقال (Cover Image)</span>
                    </div>

                    {/* Quick Image Presets */}
                    <div className="flex flex-wrap gap-2">
                      {COVER_IMAGE_PRESETS.map((cp, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedArticle({ ...selectedArticle, coverImage: cp.url })}
                          className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 text-[11px] font-bold text-slate-800 shadow-2xs transition-colors cursor-pointer"
                        >
                          {cp.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={selectedArticle.coverImage}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, coverImage: e.target.value })
                        }
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        placeholder="https://images.unsplash.com/..."
                      />
                      {selectedArticle.coverImage && (
                        <img
                          src={selectedArticle.coverImage}
                          alt="معاينة الغلاف"
                          className="w-14 h-10 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Publication Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">وقت القراءة (بالدقائق)</label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={selectedArticle.readingTimeMinutes}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            readingTimeMinutes: parseInt(e.target.value) || 5,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">رقم العدد (Issue)</label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={selectedArticle.issueNumber}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            issueNumber: parseInt(e.target.value) || 5,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">حالة النشر</label>
                      <select
                        value={selectedArticle.status}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            status: e.target.value as 'published' | 'draft',
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
                      >
                        <option value="published">منشور للجمهور</option>
                        <option value="draft">مسودة قيد المراجعة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-800 mb-1">نوع المحتوى</label>
                      <select
                        value={selectedArticle.contentType || 'article'}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            contentType: e.target.value as 'article' | 'video',
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer"
                      >
                        <option value="article">مقال مقروء</option>
                        <option value="video">فيديو تدريبي مسجل</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured Checkbox & Video URL if applicable */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={!!selectedArticle.featured}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, featured: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        تمييز هذا المقال كمقال غلاف رئيسي (Featured Cover Article)
                      </span>
                    </label>

                    {selectedArticle.contentType === 'video' && (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-800 mb-1">رابط الفيديو (YouTube URL)</label>
                        <input
                          type="text"
                          value={selectedArticle.videoUrl || ''}
                          onChange={(e) =>
                            setSelectedArticle({ ...selectedArticle, videoUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE PREVIEW */}
              {editorTab === 'preview' && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6 max-w-2xl mx-auto">
                  {/* Article Hero */}
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={selectedArticle.coverImage}
                      alt={selectedArticle.title.ar}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4 text-white space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black inline-block">
                        #{selectedArticle.sectionNumber || 1} {selectedArticle.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black">{selectedArticle.title.ar}</h3>
                    </div>
                  </div>

                  {/* Author Bar */}
                  <div className="flex items-center justify-between py-2 border-y border-slate-200 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={selectedArticle.author.avatar}
                        alt={selectedArticle.author.name.ar}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{selectedArticle.author.name.ar}</span>
                        <span className="text-[10px] text-slate-500">{selectedArticle.author.role.ar}</span>
                      </div>
                    </div>
                    <span className="text-slate-500">{selectedArticle.readingTimeMinutes} دقائق قراءة</span>
                  </div>

                  {/* Excerpt */}
                  {selectedArticle.excerpt.ar && (
                    <div className="p-4 rounded-2xl bg-indigo-50/70 border-r-4 border-indigo-600 text-indigo-950 font-medium text-xs sm:text-sm leading-relaxed">
                      {selectedArticle.excerpt.ar}
                    </div>
                  )}

                  {/* Content Preview */}
                  <div className="text-slate-800 space-y-3 leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {selectedArticle.content}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                معرف المقال: <code className="font-mono">{selectedArticle.id}</code>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  إغلاق النافذة
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  {isSaving ? 'جاري الحفظ...' : 'حفظ في Firestore'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. Dedicated Reader Modal for Instant Article Viewing */}
      {/* ========================================================================= */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-right animate-in fade-in duration-200">
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                  #{previewArticle.sectionNumber || 1} {previewArticle.category}
                </span>
                <span className="text-xs text-slate-400">معاينة القارئ</span>
              </div>
              <button
                onClick={() => setPreviewArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                  {previewArticle.title.ar}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>الكاتب: <strong>{previewArticle.author?.name?.ar}</strong></span>
                  <span>•</span>
                  <span>{previewArticle.readingTimeMinutes} دقائق قراءة</span>
                  <span>•</span>
                  <span>العدد #{previewArticle.issueNumber}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md max-h-72">
                <img
                  src={previewArticle.coverImage}
                  alt={previewArticle.title.ar}
                  className="w-full h-full object-cover"
                />
              </div>

              {previewArticle.excerpt.ar && (
                <div className="p-4 rounded-2xl bg-indigo-50 border-r-4 border-indigo-600 text-indigo-950 font-semibold text-sm leading-relaxed">
                  {previewArticle.excerpt.ar}
                </div>
              )}

              <div className="text-slate-800 space-y-4 leading-relaxed whitespace-pre-wrap text-sm border-t border-slate-100 pt-4">
                {previewArticle.content}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  const art = previewArticle;
                  setPreviewArticle(null);
                  setSelectedArticle(art);
                  setEditorTab('content');
                  setIsEditing(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل هذا المقال في المحرر</span>
              </button>
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
              >
                إغلاق المعاينة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
