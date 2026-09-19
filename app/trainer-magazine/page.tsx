'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  MAG_GROUPS,
  MAG_SECTIONS,
  ISSUES,
  STRATEGIC_SLIDES,
  PRACTICE_SLIDES,
  INNOVATION_SLIDES,
  COMMUNITY_SLIDES,
  EDITORIAL_SLIDES,
  ARTICLE_CONTENT,
  ARTICLE_MEDIA,
  ARTICLE_SHARE_COPY,
  PRACTICE_UI,
  INNOVATION_UI,
  COMMUNITY_UI,
  coreI18n,
  ArticleCardData,
  MagazineIssue,
} from '@/lib/magazine-data';
import {
  Sparkles,
  Feather,
  BookOpen,
  Calendar,
  Play,
  Share2,
  Copy,
  Check,
  Download,
  X,
  ExternalLink,
  FileText,
  Send,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Info,
  Clock,
  Layers,
  Compass,
} from 'lucide-react';
import { SectionCardsSlider } from '@/components/magazine/SectionCardsSlider';
import CustomDropdown, { DropdownOption } from '@/components/ui/CustomDropdown';
import './magazine.css';

export default function TrainerMagazinePage() {
  const { language, direction } = useLanguage();
  const isRtl = direction === 'rtl';
  const lang = (language as 'ar' | 'en' | 'fr') || 'ar';
  const t = coreI18n[lang] || coreI18n.ar;

  // Active sub-sections for each of the 4 groups
  const [activeStrategySec, setActiveStrategySec] = useState('training-radar');
  const [activePracticeSec, setActivePracticeSec] = useState('pedagogy-lab');
  const [activeInnovationSec, setActiveInnovationSec] = useState('edtech-ai');
  const [activeCommunitySec, setActiveCommunitySec] = useState('podcast-highlights');

  // Swipe-to-dismiss gesture on article sheet (swipe right to return to magazine)
  const articleTouchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleArticleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      articleTouchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleArticleTouchEnd = (e: React.TouchEvent) => {
    if (!articleTouchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - articleTouchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - articleTouchStartRef.current.y;
    articleTouchStartRef.current = null;
    // Horizontal swipe to the right (> 60px) returns to the magazine
    if (dx > 60 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      setActiveArticle(null);
    }
  };

  // Modals state
  const [isWriterModalOpen, setIsWriterModalOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ArticleCardData | null>(null);
  const articleDrawerRef = useRef<HTMLDivElement | null>(null);

  // Lock background scroll when article reader is open so touch/mouse scroll acts directly on the article
  useEffect(() => {
    if (activeArticle) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (articleDrawerRef.current) {
        articleDrawerRef.current.scrollTop = 0;
      }
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }
  }, [activeArticle]);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    speaker: string;
    duration: string;
  } | null>(null);
  const [activeIssueModal, setActiveIssueModal] = useState<MagazineIssue | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Copy status feedback
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Writer form submission state
  const [writerForm, setWriterForm] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    section: '',
    articleTitle: '',
    summary: '',
    terms: false,
    fileName: '',
  });
  const [writerSuccessCode, setWriterSuccessCode] = useState<string | null>(null);

  // Slide Lookups
  const strategySlide = useMemo(() => {
    return STRATEGIC_SLIDES.find((s) => s.slug === activeStrategySec) || STRATEGIC_SLIDES[0];
  }, [activeStrategySec]);

  const practiceSlide = useMemo(() => {
    return PRACTICE_SLIDES.find((s) => s.slug === activePracticeSec) || PRACTICE_SLIDES[0];
  }, [activePracticeSec]);

  const innovationSlide = useMemo(() => {
    return INNOVATION_SLIDES.find((s) => s.slug === activeInnovationSec) || INNOVATION_SLIDES[0];
  }, [activeInnovationSec]);

  const communitySlide = useMemo(() => {
    return COMMUNITY_SLIDES.find((s) => s.slug === activeCommunitySec) || COMMUNITY_SLIDES[0];
  }, [activeCommunitySec]);

  // Handle jump to section
  const handleJumpToSection = (groupKey: string, slug: string) => {
    if (groupKey === 'strategy') {
      setActiveStrategySec(slug);
      document.getElementById('sec-strategy')?.scrollIntoView({ behavior: 'smooth' });
    } else if (groupKey === 'practice') {
      setActivePracticeSec(slug);
      document.getElementById('sec-practice')?.scrollIntoView({ behavior: 'smooth' });
    } else if (groupKey === 'innovation') {
      setActiveInnovationSec(slug);
      document.getElementById('sec-innovation')?.scrollIntoView({ behavior: 'smooth' });
    } else if (groupKey === 'community') {
      setActiveCommunitySec(slug);
      document.getElementById('sec-community')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // YouTube embed parser
  const getEmbedUrl = (rawUrl: string) => {
    try {
      if (rawUrl.includes('watch?v=')) {
        const id = rawUrl.split('watch?v=')[1].split('&')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      }
      if (rawUrl.includes('youtu.be/')) {
        const id = rawUrl.split('youtu.be/')[1].split('?')[0];
        return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      }
      return rawUrl;
    } catch {
      return rawUrl;
    }
  };

  // Copy citation
  const handleCopyApa = (articleTitle: string) => {
    const defaultData = ARTICLE_CONTENT[lang];
    const text = `${defaultData.apaAuthor} (${defaultData.apaDate}). ${articleTitle}. ${defaultData.masthead}, ${defaultData.edition}.`;
    navigator.clipboard?.writeText(text);
    showNotification(defaultData.citationCopied);
  };

  // Copy article text
  const handleCopyArticle = () => {
    if (!activeArticle) return;
    const defaultData = ARTICLE_CONTENT[lang];
    const title = activeArticle.title[lang] || activeArticle.title.ar;
    const intro = activeArticle.intro[lang] || activeArticle.intro.ar;
    const paras = (defaultData.paragraphs || []).join('\n\n');
    const fullText = `${title}\n\n${intro}\n\n${paras}\n\n${defaultData.apaAuthor} - ${defaultData.masthead}`;
    navigator.clipboard?.writeText(fullText);
    showNotification(defaultData.copied);
  };

  // Open printable PDF view
  const handleOpenPdfView = () => {
    window.print();
  };

  return (
    <div className="mag-page" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      {copiedNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10b981',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: 14,
            zIndex: 100000,
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Check size={16} />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="mag-hero">
        <div className="mag-kicker">{t.mag_kicker}</div>
        <h1
          className="mag-title"
          dangerouslySetInnerHTML={{ __html: t.mag_title }}
        />
        <p className="mag-subtitle">{t.mag_subtitle}</p>

        <div className="mag-hero-actions">
          <button
            type="button"
            className="btn-write-with-us"
            onClick={() => setIsWriterModalOpen(true)}
            id="btn-open-writer-modal"
          >
            <Feather size={17} />
            <span>{t.write_with_us}</span>
          </button>
          <button
            type="button"
            className="btn-issues-quick"
            onClick={() => {
              document.getElementById('sec-issues')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Layers size={16} />
            <span>{t.issues_title}</span>
          </button>
        </div>
      </section>

      {/* Table of Contents / Quick Jump Grid */}
      <section className="mag-toc-wrap">
        <div className="mag-toc-container">
          <div className="mag-toc-hint">{t.mag_nav_hint}</div>
          <div className="mag-toc-grid">
            {MAG_GROUPS.map((group) => {
              const sections = MAG_SECTIONS.filter((s) => s.group === group.key);
              return (
                <div key={group.key} className="mag-group-card">
                  <div
                    className="mag-group-head"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const firstSec = sections[0];
                      if (firstSec) handleJumpToSection(group.key, firstSec.slug);
                    }}
                  >
                    <span className="mag-group-num">{group.number}</span>
                    <h2 className="mag-group-title">
                      {group.title[lang] || group.title.ar}
                    </h2>
                  </div>
                  <div className="mag-sec-list">
                    {sections.map((sec) => (
                      <button
                        key={sec.slug}
                        type="button"
                        className={`mag-sec-link ${
                          (group.key === 'strategy' && activeStrategySec === sec.slug) ||
                          (group.key === 'practice' && activePracticeSec === sec.slug) ||
                          (group.key === 'innovation' && activeInnovationSec === sec.slug) ||
                          (group.key === 'community' && activeCommunitySec === sec.slug)
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => handleJumpToSection(group.key, sec.slug)}
                      >
                        <span>{sec.name[lang] || sec.name.ar}</span>
                        <span>#{sec.n}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 1: Strategic Vision */}
      <section className="editorial-block" id="sec-strategy">
        <div className="editorial-head">
          <div className="editorial-head-text">
            <div className="editorial-kicker">{t.strategy_kicker}</div>
            <h2 className="editorial-title">{t.strategy_title}</h2>
            <p className="editorial-desc">{t.strategy_desc}</p>
          </div>
          <div className="editorial-nav-pills">
            {MAG_SECTIONS.filter((s) => s.group === 'strategy').map((sec) => (
              <button
                key={sec.slug}
                type="button"
                className={`editorial-pill ${activeStrategySec === sec.slug ? 'active' : ''}`}
                onClick={() => setActiveStrategySec(sec.slug)}
              >
                {sec.name[lang] || sec.name.ar}
              </button>
            ))}
          </div>
        </div>

        <SectionCardsSlider
          slides={STRATEGIC_SLIDES}
          activeSlideSlug={activeStrategySec}
          onSelectSlide={setActiveStrategySec}
          cards={strategySlide.cards}
          layout={strategySlide.layout}
          sectionSlug={activeStrategySec}
          lang={lang}
          isRtl={isRtl}
          t={t}
          onOpenArticle={(card) => setActiveArticle(card)}
          onOpenVideo={(video) => setActiveVideo(video)}
          onOpenShare={(card) => {
            setActiveArticle(card);
            setIsShareModalOpen(true);
          }}
          onCopyCitation={handleCopyApa}
        />
      </section>

      {/* SECTION 2: Field Practice & Professional Development */}
      <section className="editorial-block" id="sec-practice">
        <div className="editorial-head">
          <div className="editorial-head-text">
            <div className="editorial-kicker">{PRACTICE_UI[lang].kicker}</div>
            <h2 className="editorial-title">{PRACTICE_UI[lang].title}</h2>
            <p className="editorial-desc">{PRACTICE_UI[lang].desc}</p>
          </div>
          <div className="editorial-nav-pills">
            {MAG_SECTIONS.filter((s) => s.group === 'practice').map((sec) => (
              <button
                key={sec.slug}
                type="button"
                className={`editorial-pill ${activePracticeSec === sec.slug ? 'active' : ''}`}
                onClick={() => setActivePracticeSec(sec.slug)}
              >
                {sec.name[lang] || sec.name.ar}
              </button>
            ))}
          </div>
        </div>

        <SectionCardsSlider
          slides={PRACTICE_SLIDES}
          activeSlideSlug={activePracticeSec}
          onSelectSlide={setActivePracticeSec}
          cards={practiceSlide.cards}
          layout={practiceSlide.layout}
          sectionSlug={activePracticeSec}
          lang={lang}
          isRtl={isRtl}
          t={t}
          onOpenArticle={(card) => setActiveArticle(card)}
          onOpenVideo={(video) => setActiveVideo(video)}
          onOpenShare={(card) => {
            setActiveArticle(card);
            setIsShareModalOpen(true);
          }}
          onCopyCitation={handleCopyApa}
        />
      </section>

      {/* SECTION 3: Innovation, Technology & Business */}
      <section className="editorial-block" id="sec-innovation">
        <div className="editorial-head">
          <div className="editorial-head-text">
            <div className="editorial-kicker">{INNOVATION_UI[lang].kicker}</div>
            <h2 className="editorial-title">{INNOVATION_UI[lang].title}</h2>
            <p className="editorial-desc">{INNOVATION_UI[lang].desc}</p>
          </div>
          <div className="editorial-nav-pills">
            {MAG_SECTIONS.filter((s) => s.group === 'innovation').map((sec) => (
              <button
                key={sec.slug}
                type="button"
                className={`editorial-pill ${activeInnovationSec === sec.slug ? 'active' : ''}`}
                onClick={() => setActiveInnovationSec(sec.slug)}
              >
                {sec.name[lang] || sec.name.ar}
              </button>
            ))}
          </div>
        </div>

        <SectionCardsSlider
          slides={INNOVATION_SLIDES}
          activeSlideSlug={activeInnovationSec}
          onSelectSlide={setActiveInnovationSec}
          cards={innovationSlide.cards}
          layout={innovationSlide.layout}
          sectionSlug={activeInnovationSec}
          lang={lang}
          isRtl={isRtl}
          t={t}
          onOpenArticle={(card) => setActiveArticle(card)}
          onOpenVideo={(video) => setActiveVideo(video)}
          onOpenShare={(card) => {
            setActiveArticle(card);
            setIsShareModalOpen(true);
          }}
          onCopyCitation={handleCopyApa}
        />
      </section>

      {/* SECTION 4: Community & Multimedia */}
      <section className="editorial-block" id="sec-community">
        <div className="editorial-head">
          <div className="editorial-head-text">
            <div className="editorial-kicker">{COMMUNITY_UI[lang].kicker}</div>
            <h2 className="editorial-title">{COMMUNITY_UI[lang].title}</h2>
            <p className="editorial-desc">{COMMUNITY_UI[lang].desc}</p>
          </div>
          <div className="editorial-nav-pills">
            {MAG_SECTIONS.filter((s) => s.group === 'community').map((sec) => (
              <button
                key={sec.slug}
                type="button"
                className={`editorial-pill ${activeCommunitySec === sec.slug ? 'active' : ''}`}
                onClick={() => setActiveCommunitySec(sec.slug)}
              >
                {sec.name[lang] || sec.name.ar}
              </button>
            ))}
          </div>
        </div>

        <SectionCardsSlider
          slides={COMMUNITY_SLIDES}
          activeSlideSlug={activeCommunitySec}
          onSelectSlide={setActiveCommunitySec}
          cards={communitySlide.cards}
          layout={communitySlide.layout}
          sectionSlug={activeCommunitySec}
          lang={lang}
          isRtl={isRtl}
          t={t}
          onOpenArticle={(card) => setActiveArticle(card)}
          onOpenVideo={(video) => setActiveVideo(video)}
          onOpenShare={(card) => {
            setActiveArticle(card);
            setIsShareModalOpen(true);
          }}
          onCopyCitation={handleCopyApa}
        />
      </section>

      {/* DIGITAL ARCHIVE / ISSUES */}
      <section className="mag-issues-wrap" id="sec-issues">
        <div className="issues-header">
          <div className="issues-kicker">{t.issues_kicker}</div>
          <h2 className="issues-title">{t.issues_title}</h2>
          <p className="issues-desc">{t.issues_desc}</p>
        </div>

        <div className="issues-grid">
          {ISSUES.map((issue) => (
            <div key={issue.id} className="issue-card" id={`issue-${issue.number}`}>
              <div className="issue-cover-wrap">
                <img
                  src={issue.image}
                  alt={issue.feature[lang] || issue.feature.ar}
                  className="issue-cover-img"
                  loading="lazy"
                />
                <span className="issue-number-badge">
                  {t.issue_label.replace('{number}', issue.number)}
                </span>
              </div>
              <div className="issue-info">
                <span className="issue-date">
                  {issue.date[lang] || issue.date.ar}
                </span>
                <h3 className="issue-feature-title">
                  {issue.feature[lang] || issue.feature.ar}
                </h3>
                <div className="issue-actions">
                  <button
                    type="button"
                    className="btn-issue-details"
                    onClick={() => setActiveIssueModal(issue)}
                  >
                    <BookMarked size={14} />
                    <span>{t.issue_details}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL 1: Article Reader Drawer */}
      {activeArticle && (
        <div
          ref={articleDrawerRef}
          className="article-drawer-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveArticle(null);
          }}
          onTouchStart={handleArticleTouchStart}
          onTouchEnd={handleArticleTouchEnd}
        >
          <div className="article-sheet" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="article-sheet-top-nav">
              <button
                type="button"
                className="article-back-nav-btn"
                onClick={() => setActiveArticle(null)}
              >
                <ArrowRight size={16} className={isRtl ? '' : 'rotate-180'} />
                <span>
                  {lang === 'ar' ? 'العودة للمجلة' : lang === 'fr' ? 'Retour au magazine' : 'Back to Magazine'}
                </span>
              </button>
              <button
                type="button"
                className="article-sheet-close-btn"
                onClick={() => setActiveArticle(null)}
                aria-label={ARTICLE_CONTENT[lang].close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="article-sheet-hero">
              <img
                src={activeArticle.image}
                alt={activeArticle.title[lang] || activeArticle.title.ar}
              />
              <div className="article-sheet-header-content">
                <div className="article-masthead">
                  <Sparkles size={13} />
                  <span>{ARTICLE_CONTENT[lang].masthead} · {ARTICLE_CONTENT[lang].edition}</span>
                </div>
                <h2 className="article-sheet-title">
                  {activeArticle.title[lang] || activeArticle.title.ar}
                </h2>
                <p className="article-sheet-deck">
                  {activeArticle.intro[lang] || activeArticle.intro.ar}
                </p>
              </div>
            </div>

            <div className="article-sheet-meta">
              <div className="article-author-info">
                <img
                  src={ARTICLE_MEDIA.avatar}
                  alt={ARTICLE_CONTENT[lang].author}
                  className="author-avatar"
                />
                <div>
                  <h4 className="author-name">{ARTICLE_CONTENT[lang].author}</h4>
                  <p className="author-role">{ARTICLE_CONTENT[lang].role}</p>
                </div>
              </div>

              <div className="article-meta-divider" />

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', fontSize: 12.5 }}>
                <Clock size={14} />
                <span>{ARTICLE_CONTENT[lang].readTime}</span>
                <span>•</span>
                <span>{ARTICLE_CONTENT[lang].date}</span>
              </div>

              <div className="article-sheet-tools">
                <button
                  type="button"
                  className="btn-tool"
                  onClick={handleCopyArticle}
                  title={ARTICLE_CONTENT[lang].copy}
                >
                  <Copy size={14} />
                  <span>{ARTICLE_CONTENT[lang].copy}</span>
                </button>
                <button
                  type="button"
                  className="btn-tool"
                  onClick={handleOpenPdfView}
                  title={ARTICLE_CONTENT[lang].download}
                >
                  <Download size={14} />
                  <span>{ARTICLE_CONTENT[lang].download}</span>
                </button>
                <button
                  type="button"
                  className="btn-tool"
                  onClick={() => setIsShareModalOpen(true)}
                  title={ARTICLE_CONTENT[lang].share}
                >
                  <Share2 size={14} />
                  <span>{ARTICLE_CONTENT[lang].share}</span>
                </button>
              </div>
            </div>

            <div className="article-sheet-body">
              {ARTICLE_CONTENT[lang].paragraphs?.map((p, idx) => (
                <React.Fragment key={idx}>
                  <p>{p}</p>
                  {idx === 1 && (
                    <div className="article-quote-box">
                      <blockquote>« {ARTICLE_CONTENT[lang].quote} »</blockquote>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="article-inline-media">
                      <img src={ARTICLE_MEDIA.inline1} alt={ARTICLE_CONTENT[lang].caption1} />
                      <p className="article-media-caption">{ARTICLE_CONTENT[lang].caption1}</p>
                    </div>
                  )}
                  {idx === 4 && (
                    <div className="article-inline-media">
                      <img src={ARTICLE_MEDIA.inline2} alt={ARTICLE_CONTENT[lang].caption2} />
                      <p className="article-media-caption">{ARTICLE_CONTENT[lang].caption2}</p>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* APA Citation Section */}
              <div className="apa-citation-box">
                <h4>{ARTICLE_CONTENT[lang].apaTitle}</h4>
                <div className="apa-text">
                  {ARTICLE_CONTENT[lang].apaAuthor} ({ARTICLE_CONTENT[lang].apaDate}).{' '}
                  {activeArticle.title[lang] || activeArticle.title.ar}.{' '}
                  <em>{ARTICLE_CONTENT[lang].masthead}</em>, {ARTICLE_CONTENT[lang].edition}.
                </div>
                <button
                  type="button"
                  className="btn-read-story"
                  onClick={() =>
                    handleCopyApa(activeArticle.title[lang] || activeArticle.title.ar)
                  }
                >
                  <Copy size={13} />
                  <span>{ARTICLE_CONTENT[lang].copyCitation}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Video Player Modal */}
      {activeVideo && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          <div className="modal-container" style={{ maxWidth: 840 }}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveVideo(null)}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
              {activeVideo.title}
            </h3>

            <div className="video-frame-container">
              <iframe
                src={getEmbedUrl(activeVideo.url)}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="video-modal-info">
              <div style={{ display: 'flex', gap: 16, color: '#94a3b8', fontSize: 13.5 }}>
                <span>
                  <strong>{PRACTICE_UI[lang].speaker}:</strong> {activeVideo.speaker}
                </span>
                <span>•</span>
                <span>
                  <strong>{PRACTICE_UI[lang].duration}:</strong> {activeVideo.duration}
                </span>
              </div>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-tool"
                style={{ background: '#ef4444', color: '#fff', border: 'none' }}
              >
                <span>{PRACTICE_UI[lang].open}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Issue Details Modal */}
      {activeIssueModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveIssueModal(null);
          }}
        >
          <div className="modal-container">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveIssueModal(null)}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
              <div
                style={{
                  width: 110,
                  height: 150,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <img
                  src={activeIssueModal.image}
                  alt={activeIssueModal.feature[lang] || activeIssueModal.feature.ar}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="issues-kicker">
                  {t.issue_label.replace('{number}', activeIssueModal.number)}
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '4px 0 8px' }}>
                  {activeIssueModal.feature[lang] || activeIssueModal.feature.ar}
                </h3>
                <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>
                  {activeIssueModal.date[lang] || activeIssueModal.date.ar}
                </p>
              </div>
            </div>

            <h4
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: '#fbbf24',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: 8,
                marginBottom: 14,
              }}
            >
              {t.issue_contents}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {activeIssueModal.contents.map(([secSlug, pageNum]) => {
                const sec = MAG_SECTIONS.find((s) => s.slug === secSlug);
                const secTitle = sec ? sec.name[lang] || sec.name.ar : secSlug;
                return (
                  <div
                    key={secSlug}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: '#e2e8f0' }}>
                      {secTitle}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#fbbf24',
                        background: 'rgba(251,191,36,0.1)',
                        padding: '2px 8px',
                        borderRadius: 6,
                      }}
                    >
                      {t.issue_pages.replace('{page}', String(pageNum))}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                background: 'rgba(251, 191, 36, 0.05)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                borderRadius: 12,
                padding: 14,
                marginBottom: 20,
                fontSize: 13,
                color: '#cbd5e1',
                lineHeight: 1.6,
              }}
            >
              {t.issue_quote}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                className="btn-read-story"
                onClick={() => {
                  showNotification(t.pdf_placeholder);
                }}
              >
                <FileText size={15} />
                <span>{t.issue_read_pdf}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Writer Submission Form */}
      {isWriterModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWriterModalOpen(false);
          }}
        >
          <div className="modal-container" style={{ maxWidth: 640 }}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsWriterModalOpen(false)}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>
              {t.writer_title}
            </h3>
            <p style={{ fontSize: 14, color: '#94a3b8', margin: '0 0 24px' }}>
              {t.writer_desc}
            </p>

            {writerSuccessCode ? (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: 24,
                  borderRadius: 14,
                  textAlign: 'center',
                }}
              >
                <Check
                  size={36}
                  style={{ color: '#10b981', margin: '0 auto 12px' }}
                />
                <h4 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: '0 0 8px' }}>
                  {t.writer_success.replace('{code}', writerSuccessCode)}
                </h4>
                <button
                  type="button"
                  className="btn-read-story"
                  style={{ marginTop: 16 }}
                  onClick={() => {
                    setWriterSuccessCode(null);
                    setIsWriterModalOpen(false);
                  }}
                >
                  {t.writer_close}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!writerForm.terms) {
                    showNotification(t.writer_terms_accept);
                    return;
                  }
                  const code = `TOT-MAG-${Math.floor(100000 + Math.random() * 900000)}`;
                  setWriterSuccessCode(code);
                }}
              >
                <div className="writer-form-grid">
                  <div>
                    <label className="form-label">{t.writer_full_name}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.writer_full_name_placeholder}
                      className="form-input"
                      value={writerForm.fullName}
                      onChange={(e) =>
                        setWriterForm({ ...writerForm, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label">{t.writer_whatsapp}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+213..."
                      className="form-input"
                      value={writerForm.whatsapp}
                      onChange={(e) =>
                        setWriterForm({ ...writerForm, whatsapp: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label">{t.writer_email}</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="form-input"
                      value={writerForm.email}
                      onChange={(e) =>
                        setWriterForm({ ...writerForm, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <CustomDropdown
                      id="writer-section"
                      label={t.writer_section}
                      required
                      value={writerForm.section}
                      onChange={(val) =>
                        setWriterForm({ ...writerForm, section: val })
                      }
                      options={MAG_SECTIONS.map((sec) => ({
                        value: sec.slug,
                        label: sec.name[lang] || sec.name.ar,
                        icon: '📖',
                      }))}
                      placeholder={t.writer_section_placeholder}
                      themeColor="blue"
                      dropdownWidthClass="w-full min-w-[260px] sm:min-w-[320px]"
                    />
                  </div>

                  <div className="writer-full-col">
                    <label className="form-label">{t.writer_article_title}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.writer_article_title_placeholder}
                      className="form-input"
                      value={writerForm.articleTitle}
                      onChange={(e) =>
                        setWriterForm({ ...writerForm, articleTitle: e.target.value })
                      }
                    />
                  </div>

                  <div className="writer-full-col">
                    <label className="form-label">{t.writer_file}</label>
                    <label className="form-file-box block">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 8 * 1024 * 1024) {
                              showNotification(t.writer_file_too_large);
                            } else {
                              setWriterForm({ ...writerForm, fileName: file.name });
                            }
                          }
                        }}
                      />
                      <Download size={22} style={{ color: '#fbbf24', margin: '0 auto 8px' }} />
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#e2e8f0' }}>
                        {writerForm.fileName || t.writer_file_action}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 4 }}>
                        {writerForm.fileName ? '' : t.writer_no_file}
                      </div>
                    </label>
                  </div>

                  <div className="writer-full-col">
                    <label className="form-label">{t.writer_summary}</label>
                    <textarea
                      rows={3}
                      placeholder={t.writer_summary_placeholder}
                      className="form-textarea"
                      value={writerForm.summary}
                      onChange={(e) =>
                        setWriterForm({ ...writerForm, summary: e.target.value })
                      }
                    />
                  </div>

                  <div className="writer-full-col">
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        fontSize: 13,
                        color: '#cbd5e1',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={writerForm.terms}
                        onChange={(e) =>
                          setWriterForm({ ...writerForm, terms: e.target.checked })
                        }
                        style={{ width: 16, height: 16, accentColor: '#fbbf24' }}
                      />
                      <span>{t.writer_terms_accept}</span>
                    </label>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 12,
                    marginTop: 24,
                  }}
                >
                  <button
                    type="button"
                    className="btn-tool"
                    onClick={() => setIsWriterModalOpen(false)}
                  >
                    {t.writer_cancel}
                  </button>
                  <button type="submit" className="btn-read-story">
                    <Send size={14} />
                    <span>{t.writer_submit}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 5: Share Modal */}
      {isShareModalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsShareModalOpen(false);
          }}
        >
          <div className="modal-container" style={{ maxWidth: 440 }}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsShareModalOpen(false)}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
              {ARTICLE_SHARE_COPY[lang].title}
            </h3>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 20px' }}>
              {ARTICLE_SHARE_COPY[lang].hint}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                className="btn-tool"
                style={{ justifyContent: 'center' }}
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
                }}
              >
                {ARTICLE_SHARE_COPY[lang].whatsapp}
              </button>
              <button
                type="button"
                className="btn-tool"
                style={{ justifyContent: 'center' }}
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
                }}
              >
                {ARTICLE_SHARE_COPY[lang].x}
              </button>
              <button
                type="button"
                className="btn-tool"
                style={{ justifyContent: 'center' }}
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }}
              >
                {ARTICLE_SHARE_COPY[lang].linkedin}
              </button>
              <button
                type="button"
                className="btn-tool"
                style={{ justifyContent: 'center' }}
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showNotification(ARTICLE_SHARE_COPY[lang].copied);
                  setIsShareModalOpen(false);
                }}
              >
                <Copy size={14} />
                <span>{ARTICLE_SHARE_COPY[lang].copy}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
