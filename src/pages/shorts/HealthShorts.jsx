import React, { useState, useRef, useEffect, useCallback } from 'react';
import { healthShorts } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/time';

const categoryColors = {
  'Nutrition':      { bg: '#D1FAE5', color: '#065F46', accent: '#10B981' },
  'Public Health':  { bg: '#FEE2E2', color: '#991B1B', accent: '#EF4444' },
  'Cardiology':     { bg: '#FEE2E2', color: '#991B1B', accent: '#EF4444' },
  'Mental Health':  { bg: '#EDE9FE', color: '#5B21B6', accent: '#8B5CF6' },
  'Diabetes':       { bg: '#FEF3C7', color: '#92400E', accent: '#F59E0B' },
  'Wellness':       { bg: '#E0F2FE', color: '#075985', accent: '#0EA5E9' },
  "Women's Health": { bg: '#FCE7F3', color: '#9D174D', accent: '#EC4899' },
};

const BookmarkIcon = ({ filled, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

/* ─── Full-screen reel slide ─── */
const ShortSlide = ({ item, saved, justShared, onSave, onShare }) => {
  const cat = categoryColors[item.category] || { bg: '#E3F2FD', color: '#1565C0', accent: '#3B82F6' };
  const bodyParagraphs = (item.body || item.summary).split('\n').filter(Boolean);

  return (
    <div
      className="relative flex items-start justify-center px-6 py-4"
      style={{ height: 'calc(100vh - 68px)', scrollSnapAlign: 'start', flexShrink: 0, overflow: 'hidden' }}
    >
      <div
        className="w-full max-w-[640px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(21,101,192,0.12)] border-[1.5px] border-blue-100/60 overflow-hidden flex flex-col"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <div className="h-2 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}88)` }} />
        <div className="px-8 pt-7 pb-0 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[12px] font-bold px-3 py-[5px] rounded-full" style={{ background: cat.bg, color: cat.color }}>
              {item.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">{item.readTime}</span>
              <span className="text-slate-200">·</span>
              <span className="text-xs text-slate-400 font-medium">{formatRelativeTime(item.date)}</span>
            </div>
          </div>

          <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-[36px] mb-5 shadow-sm" style={{ background: cat.bg }}>
            {item.image}
          </div>

          <h2 className="text-[21px] font-extrabold text-slate-800 leading-[1.3] tracking-[-0.4px] mb-3">{item.title}</h2>
          <p className="text-[14px] font-semibold text-slate-500 leading-[1.65] mb-4">{item.summary}</p>

          <div className="text-[13.5px] text-slate-600 leading-[1.75] space-y-3 mb-6">
            {bodyParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="text-[11px] text-slate-400 font-medium mb-4">Source: {item.source}</div>
        </div>

        <div className="px-8 py-5 border-t border-slate-100 shrink-0 flex gap-3">
          <button
            onClick={onSave}
            className={`flex-1 py-3 rounded-xl text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${saved ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
          >
            <BookmarkIcon filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={onShare}
            className={`flex-1 py-3 rounded-xl text-[13px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${justShared ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
          >
            {justShared ? <>✓ Copied</> : <><ShareIcon /> Share</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Saved list card ─── */
const SavedShortCard = ({ item, onUnsave }) => {
  const cat = categoryColors[item.category] || { bg: '#E3F2FD', color: '#1565C0', accent: '#3B82F6' };
  return (
    <div className="bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-4 items-start">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: cat.bg }}>
        {item.image}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full inline-block mb-2" style={{ background: cat.bg, color: cat.color }}>
          {item.category}
        </span>
        <h3 className="text-[14px] font-extrabold text-slate-800 leading-[1.35] mb-1">{item.title}</h3>
        <p className="text-[12.5px] text-slate-500 leading-relaxed line-clamp-2">{item.summary}</p>
      </div>
      <button
        onClick={onUnsave}
        title="Remove from saved"
        className="w-8 h-8 rounded-full flex items-center justify-center border-[1.5px] border-blue-200 bg-blue-50 text-blue-800 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all cursor-pointer shrink-0"
      >
        <BookmarkIcon filled size={14} />
      </button>
    </div>
  );
};

/* ─── Main component ─── */
const HealthShorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedIds, setSavedIds]         = useState(new Set());
  const [sharedId, setSharedId]         = useState(null);
  const [refreshKey, setRefreshKey]     = useState(0);
  const [showSaved, setShowSaved]       = useState(false);
  const containerRef = useRef(null);

  const toggleSave = (id) => setSavedIds((prev) => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const share = (id) => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setSharedId(id);
    setTimeout(() => setSharedId((cur) => (cur === id ? null : cur)), 2000);
  };

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
    setCurrentIndex(index);
  }, []);

  const goNext = () => {
    if (currentIndex < healthShorts.length - 1) scrollToIndex(currentIndex + 1);
  };

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
    scrollToIndex(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let timer;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const newIndex = Math.round(container.scrollTop / container.clientHeight);
        setCurrentIndex(Math.max(0, Math.min(newIndex, healthShorts.length - 1)));
      }, 100);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => { container.removeEventListener('scroll', onScroll); clearTimeout(timer); };
  }, [showSaved]);

  const savedShorts = healthShorts.filter((s) => savedIds.has(s.id));

  /* ── Saved list view ── */
  if (showSaved) {
    return (
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setShowSaved(false)}
            className="flex items-center gap-1.5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
          >
            ← Back to Shorts
          </button>
          <h2 className="text-[16px] font-extrabold text-slate-800">Saved Shorts</h2>
          <span className="text-[13px] text-slate-400 font-medium">· {savedShorts.length} saved</span>
        </div>

        {savedShorts.length > 0 ? (
          <div className="flex flex-col gap-3 max-w-[700px]">
            {savedShorts.map((item) => (
              <SavedShortCard
                key={item.id}
                item={item}
                onUnsave={() => toggleSave(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <BookmarkIcon filled={false} size={28} />
            </div>
            <div className="text-base font-bold text-slate-700 mb-1.5">No saved shorts yet</div>
            <div className="text-sm mb-4">Save shorts while browsing and they'll appear here</div>
            <button
              onClick={() => setShowSaved(false)}
              className="px-5 py-2.5 bg-gradient-primary text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
            >
              Browse Shorts
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ── Reel view ── */
  return (
    <div className="relative -mx-8 -my-7" key={refreshKey}>
      {/* Top-right controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {/* Saved Posts button */}
        <button
          onClick={() => setShowSaved(true)}
          className="flex items-center gap-1.5 h-9 px-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-[12.5px] font-semibold text-slate-600 hover:text-blue-800 hover:border-blue-200 transition-all shadow-sm"
        >
          <BookmarkIcon filled={savedIds.size > 0} size={13} />
          Saved
          {savedIds.size > 0 && (
            <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
              {savedIds.size}
            </span>
          )}
        </button>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          title="Back to top"
          className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-800 hover:border-blue-200 transition-all shadow-sm"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>
      </div>

      {/* Progress dots */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5">
        {healthShorts.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-1.5 rounded-full transition-all duration-300 border-none cursor-pointer p-0
              ${i === currentIndex ? 'h-5 bg-blue-700' : 'h-1.5 bg-slate-300 hover:bg-slate-400'}`}
          />
        ))}
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="overflow-y-scroll"
        style={{ height: 'calc(100vh - 68px)', scrollSnapType: 'y mandatory' }}
      >
        {healthShorts.map((item) => (
          <ShortSlide
            key={item.id}
            item={item}
            saved={savedIds.has(item.id)}
            justShared={sharedId === item.id}
            onSave={() => toggleSave(item.id)}
            onShare={() => share(item.id)}
          />
        ))}
      </div>

      {/* Down arrow */}
      {currentIndex < healthShorts.length - 1 && (
        <button
          onClick={goNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-10 h-10 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-800 hover:border-blue-200 transition-all shadow-md animate-bounce"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default HealthShorts;
