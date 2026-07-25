import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articles } from '../../data/mockData';

const categoryColors = {
  'Diabetes':       { bg: '#FEF3C7', color: '#92400E' },
  'Mental Health':  { bg: '#EDE9FE', color: '#5B21B6' },
  "Women's Health": { bg: '#FCE7F3', color: '#9D174D' },
  'Cardiology':     { bg: '#FEE2E2', color: '#991B1B' },
  'Pediatrics':     { bg: '#D1FAE5', color: '#065F46' },
  'Nutrition':      { bg: '#CCFBF1', color: '#134E4A' },
};

const BookmarkIcon = ({ filled, size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ArticleCard = ({ article, saved, onSave, onOpen }) => {
  const catStyle = categoryColors[article.category] || { bg: '#E3F2FD', color: '#1565C0' };

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-[18px] p-[22px] shadow-blue-md border-[1.5px] border-blue-100/50 cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-blue-lg"
    >
      {/* Category + read time */}
      <div className="flex justify-between mb-[14px] items-start">
        <span className="text-[11.5px] font-bold px-3 py-1 rounded-full" style={{ background: catStyle.bg, color: catStyle.color }}>
          {article.category}
        </span>
        <span className="text-xs text-slate-400 font-medium">{article.readTime}</span>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-extrabold text-slate-800 leading-[1.4] mb-2.5 tracking-[-0.2px]">{article.title}</h3>

      {/* Body excerpt */}
      <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
        {article.body ? article.body.slice(0, 180) + '…' : article.excerpt}
      </p>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-[9px] py-[3px] rounded-full">{tag}</span>
        ))}
      </div>

      {/* Author + Save */}
      <div className="flex gap-2.5 items-center pt-[14px] border-t border-slate-100 mt-auto">
        <div className="w-[38px] h-[38px] rounded-full bg-gradient-primary flex items-center justify-center text-base shrink-0">
          {article.doctorImage || '👨‍⚕️'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-bold text-slate-800">{article.author}</div>
          <div className="text-[11px] text-slate-400 truncate">{article.practice || article.specialty}</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          title={saved ? 'Remove from saved' : 'Save article'}
          className={`w-8 h-8 rounded-full flex items-center justify-center border-[1.5px] transition-all duration-150 shrink-0 cursor-pointer
            ${saved
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-700'}`}
        >
          <BookmarkIcon filled={saved} />
        </button>
      </div>
    </div>
  );
};

const ExpertOpinion = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]                 = useState('');
  const [savedIds, setSavedIds]             = useState(new Set());
  const [showSaved, setShowSaved]           = useState(false);

  const toggleSave = (id) => setSavedIds((prev) => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const categories = ['All', ...new Set(articles.map((a) => a.category))];

  const filtered = articles.filter((a) => {
    if (showSaved) return savedIds.has(a.id);
    const matchCat    = activeCategory === 'All' || a.category === activeCategory;
    const q           = search.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Search & Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-6 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center flex-wrap">
        {!showSaved && (
          <>
            <div className="relative flex-1 min-w-[220px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
              <input
                placeholder="Search articles or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-xl text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">Category:</span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all cursor-pointer font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Saved Posts toggle */}
        <button
          onClick={() => { setShowSaved((v) => !v); setSearch(''); setActiveCategory('All'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border-[1.5px] text-[13px] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap ${showSaved
            ? 'bg-blue-800 text-white border-blue-800 shadow-sm'
            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
        >
          <BookmarkIcon filled={showSaved} size={13} />
          Saved Posts
          {savedIds.size > 0 && (
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${showSaved ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
              {savedIds.size}
            </span>
          )}
        </button>
      </div>

      {/* Section label when in saved mode */}
      {showSaved && (
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-[16px] font-extrabold text-slate-800">Saved Articles</h2>
          <span className="text-[13px] text-slate-400 font-medium">· {savedIds.size} saved</span>
        </div>
      )}

      {/* Articles Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-5">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              saved={savedIds.has(article.id)}
              onSave={() => toggleSave(article.id)}
              onOpen={() => navigate(`/app/expert/${article.id}`)}
            />
          ))}
        </div>
      ) : showSaved ? (
        <div className="text-center py-16 text-slate-400">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <BookmarkIcon filled={false} size={28} />
          </div>
          <div className="text-base font-bold text-slate-700 mb-1.5">No saved articles yet</div>
          <div className="text-sm mb-4">Articles you save will appear here</div>
          <button
            onClick={() => setShowSaved(false)}
            className="px-5 py-2.5 bg-gradient-primary text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
          >
            Browse Articles
          </button>
        </div>
      ) : (
        <div className="text-center py-[60px] text-slate-400">
          <div className="text-[44px] mb-[14px]">🔍</div>
          <div className="text-base font-bold text-slate-700 mb-1.5">No articles found</div>
          <div className="text-sm">Try different search terms or a different category</div>
        </div>
      )}
    </div>
  );
};

export default ExpertOpinion;
