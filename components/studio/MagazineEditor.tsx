'use client';

import React, { useState } from 'react';
import { MagazineArticleItem } from '@/types/curriculum';
import { useCurriculum } from '@/context/CurriculumContext';

export const MagazineEditor: React.FC = () => {
  const { magazineArticles, saveArticle, deleteArticle } = useCurriculum();
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticleItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCreateNew = () => {
    const newId = `art-${Date.now().toString().slice(-6)}`;
    const newArt: MagazineArticleItem = {
      id: newId,
      slug: newId,
      issueNumber: magazineArticles.length + 1,
      title: { ar: 'مقال تحليلي جديد في هندسة التدريب', en: 'New Analytical Article', fr: 'Nouvel Article' },
      excerpt: {
        ar: 'مقدمة واستعراض لأحدث المنهجيات والاتجاهات الحديثة في التدريب الاحترافي.',
        en: 'Introduction and insights into modern methodologies in professional training.',
        fr: 'Introduction aux méthodologies modernes.',
      },
      content: `## مدخل منهجي\n\nيعتبر التدريب الاحترافي حجر الزاوية في تمكين الكفاءات وبناء القدرات المؤسسية.\n\n### المحاور الرئيسية\n\n1. تحليل الاحتياجات التدريبية بدقة عالية\n2. تصميم الحقائب التفاعلية وفق معايير الجودة\n3. قياس الأثر والتقييم المستمر وفق نموذج كيركباتريك`,
      author: {
        name: { ar: 'د. عبد الكريم بلخيري', en: 'Dr. Abdelkrim Belkheiri', fr: 'Dr. Abdelkrim Belkheiri' },
        role: { ar: 'رئيس التحرير وخبير تدريب دولي', en: 'Editor-in-Chief & Master Trainer', fr: 'Rédacteur en chef' },
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      category: 'هندسة التدريب',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTimeMinutes: 6,
      status: 'published',
      featured: false,
    };
    setSelectedArticle(newArt);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!selectedArticle) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await saveArticle(selectedArticle);
      if (res.success) {
        setStatusMessage('✅ تم حفظ ونشر المقال في مجلة المدرب بنجاح.');
        setIsEditing(false);
      } else {
        setStatusMessage(`❌ ${res.error || 'فشل حفظ المقال'}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ ${err.message || 'خطأ'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال من المجلة؟')) return;
    await deleteArticle(id);
    if (selectedArticle?.id === id) {
      setIsEditing(false);
      setSelectedArticle(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">محرر مجلة المدرب العربي (Trainer Magazine)</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            إدارة المقالات والأعداد والدراسات المنشورة في مجلة المدرب.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary-blue hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
        >
          <span>+ كتابة مقال جديد</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold">
          {statusMessage}
        </div>
      )}

      {isEditing && selectedArticle ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h4 className="text-lg font-bold text-slate-900">
              {selectedArticle.title.ar || 'مقال المجلة'}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
              >
                {isSaving ? 'جاري الحفظ...' : 'حفظ ونشر المقال'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">عنوان المقال (عربي) *</label>
              <input
                type="text"
                value={selectedArticle.title.ar}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, title: { ...selectedArticle.title, ar: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">تصنيف المقال</label>
              <input
                type="text"
                value={selectedArticle.category}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">الكاتب (عربي)</label>
              <input
                type="text"
                value={selectedArticle.author.name.ar}
                onChange={(e) => setSelectedArticle({
                  ...selectedArticle,
                  author: {
                    ...selectedArticle.author,
                    name: { ...selectedArticle.author.name, ar: e.target.value },
                  },
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">وقت القراءة (دقائق)</label>
              <input
                type="number"
                value={selectedArticle.readingTimeMinutes}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, readingTimeMinutes: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">رقم العدد</label>
              <input
                type="number"
                value={selectedArticle.issueNumber}
                onChange={(e) => setSelectedArticle({ ...selectedArticle, issueNumber: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">المقدمة والخلاصة (Excerpt)</label>
            <textarea
              rows={2}
              value={selectedArticle.excerpt.ar}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, excerpt: { ...selectedArticle.excerpt, ar: e.target.value } })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">رابط صورة الغلاف (Cover Image URL)</label>
            <input
              type="text"
              value={selectedArticle.coverImage}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, coverImage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">نص ومحتوى المقال (Markdown)</label>
            <textarea
              rows={8}
              value={selectedArticle.content}
              onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono leading-relaxed"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {magazineArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="h-36 overflow-hidden relative">
                <img src={art.coverImage} alt={art.title.ar} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                  العدد #{art.issueNumber}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-primary-blue mb-1 inline-block">
                    {art.category}
                  </span>
                  <h5 className="font-extrabold text-slate-900 text-sm line-clamp-2 mb-1">
                    {art.title.ar}
                  </h5>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {art.excerpt.ar}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{art.readingTimeMinutes} دقائق قراءة</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedArticle(art);
                        setIsEditing(true);
                      }}
                      className="font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      تعديل ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="font-bold text-rose-600 hover:text-rose-800"
                    >
                      حذف 🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
