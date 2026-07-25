import React, { useState } from 'react';
import { testimonies } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/time';

const BookmarkIcon = ({ filled, size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-[13px] ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
  </div>
);

const TestimonyCard = ({ testimony, saved, justShared, onSave, onShare, onOpen }) => {
  const storyParagraphs = testimony.story.split('\n').filter(Boolean);

  return (
    <div
      onClick={onOpen}
      className="bg-white rounded-[18px] p-[22px] shadow-blue-md border-[1.5px] border-blue-100/50 cursor-pointer flex flex-col transition-all duration-200 hover:-translate-y-[3px] hover:shadow-blue-lg"
    >
      {/* Disease + Medicine + date */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">{testimony.disease}</span>
          <span className="text-[11px] font-semibold bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full">{testimony.medicine}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">{formatRelativeTime(testimony.date)}</span>
      </div>

      {/* Patient */}
      <div className="flex gap-3 items-center mb-4">
        <div
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-xl shrink-0 border-2 border-white shadow-sm"
          style={{ background: testimony.color }}
        >
          {testimony.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-bold text-slate-800">{testimony.name}</div>
          <div className="text-[11.5px] text-slate-400">{testimony.age} yrs · {testimony.city}</div>
        </div>
        <StarRating rating={testimony.rating} />
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-extrabold text-slate-800 leading-[1.4] mb-2.5 tracking-[-0.2px]">{testimony.title}</h3>

      {/* Story excerpt */}
      <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
        {storyParagraphs[0]}
      </p>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap mb-4">
        {testimony.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-[9px] py-[3px] rounded-full">{tag}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-slate-100 mt-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onSave}
          className={`flex-1 py-2 rounded-xl text-[12px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 border-[1.5px]
            ${saved ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
        >
          <BookmarkIcon filled={saved} />
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={onShare}
          className={`flex-1 py-2 rounded-xl text-[12px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-1.5 border-[1.5px]
            ${justShared ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
        >
          {justShared ? <>✓ Copied</> : <><ShareIcon /> Share</>}
        </button>
      </div>
    </div>
  );
};

const TestimonyModal = ({ testimony, onClose, saved, justShared, onSave, onShare }) => {
  const storyParagraphs = testimony.story.split('\n').filter(Boolean);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] p-8 max-w-[600px] w-full shadow-2xl border border-slate-100 my-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2 flex-wrap">
            <span className="text-[11.5px] font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full">{testimony.disease}</span>
            <span className="text-[11.5px] font-semibold bg-violet-50 text-violet-700 px-3 py-1 rounded-full">{testimony.medicine}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all border-none cursor-pointer text-xl font-light shrink-0 ml-3"
          >
            ×
          </button>
        </div>

        {/* Patient profile */}
        <div className="flex gap-4 items-center p-4 bg-[#F8FBFF] rounded-xl border border-blue-50 mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 border-2 border-white shadow-sm"
            style={{ background: testimony.color }}
          >
            {testimony.image}
          </div>
          <div className="flex-1">
            <div className="text-[16px] font-extrabold text-slate-800">{testimony.name}</div>
            <div className="text-[12.5px] text-slate-500">{testimony.age} years · {testimony.gender} · {testimony.city}</div>
          </div>
          <StarRating rating={testimony.rating} />
        </div>

        {/* Title */}
        <h2 className="text-[20px] font-extrabold text-slate-800 leading-[1.3] tracking-[-0.3px] mb-5">{testimony.title}</h2>

        {/* Full story */}
        <div className="text-[14px] text-slate-600 leading-[1.8] space-y-4 mb-6">
          {storyParagraphs.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {testimony.tags.map((tag) => (
            <span key={tag} className="bg-slate-100 text-slate-500 text-[11.5px] font-semibold px-3 py-[4px] rounded-full">{tag}</span>
          ))}
        </div>

        <div className="text-[11.5px] text-slate-400 font-medium mb-6">
          Published {formatRelativeTime(testimony.date)}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-5 border-t border-slate-100">
          <button
            onClick={onSave}
            className={`flex-1 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${saved ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
          >
            <BookmarkIcon filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={onShare}
            className={`flex-1 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${justShared ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
          >
            {justShared ? <>✓ Link Copied</> : <><ShareIcon /> Share</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const PatientTestimony = () => {
  const [search, setSearch]           = useState('');
  const [diseaseFilter, setDisease]   = useState('All');
  const [medicineFilter, setMedicine] = useState('All');
  const [savedIds, setSavedIds]       = useState(new Set());
  const [sharedId, setSharedId]       = useState(null);
  const [openTestimony, setOpen]      = useState(null);
  const [showSaved, setShowSaved]     = useState(false);

  const approvedTestimonies = testimonies.filter((t) => t.status === 'approved');
  const diseases  = ['All', ...new Set(approvedTestimonies.map((t) => t.disease))];
  const medicines = ['All', ...new Set(approvedTestimonies.map((t) => t.medicine))];

  const filtered = approvedTestimonies.filter((t) => {
    if (showSaved) return savedIds.has(t.id);
    const q   = search.toLowerCase();
    const matchSearch = !q ||
      t.name.toLowerCase().includes(q) ||
      t.disease.toLowerCase().includes(q) ||
      t.medicine.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q);
    const matchDisease  = diseaseFilter  === 'All' || t.disease  === diseaseFilter;
    const matchMedicine = medicineFilter === 'All' || t.medicine === medicineFilter;
    return matchSearch && matchDisease && matchMedicine;
  });

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

  const hasFilters = search || diseaseFilter !== 'All' || medicineFilter !== 'All';

  return (
    <div>
      {openTestimony && (
        <TestimonyModal
          testimony={openTestimony}
          onClose={() => setOpen(null)}
          saved={savedIds.has(openTestimony.id)}
          justShared={sharedId === openTestimony.id}
          onSave={() => toggleSave(openTestimony.id)}
          onShare={() => share(openTestimony.id)}
        />
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-6 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center flex-wrap">
        {!showSaved && (
          <>
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
              <input
                placeholder="Search by name, disease, or medicine..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-xl text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
              />
            </div>

            {/* Disease dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">Disease:</span>
              <select
                value={diseaseFilter}
                onChange={(e) => setDisease(e.target.value)}
                className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all cursor-pointer font-medium"
              >
                {diseases.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Medicine dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">Medicine:</span>
              <select
                value={medicineFilter}
                onChange={(e) => setMedicine(e.target.value)}
                className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all cursor-pointer font-medium"
              >
                {medicines.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setDisease('All'); setMedicine('All'); }}
                className="px-3 py-2 border-[1.5px] border-slate-200 rounded-xl text-[12.5px] font-semibold text-slate-500 bg-white cursor-pointer hover:bg-slate-50 transition-all whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </>
        )}

        {/* Saved Posts toggle */}
        <button
          onClick={() => { setShowSaved((v) => !v); setSearch(''); setDisease('All'); setMedicine('All'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border-[1.5px] text-[13px] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap ${showSaved
            ? 'bg-blue-800 text-white border-blue-800 shadow-sm'
            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
        >
          <BookmarkIcon filled={showSaved} />
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
          <h2 className="text-[16px] font-extrabold text-slate-800">Saved Testimonies</h2>
          <span className="text-[13px] text-slate-400 font-medium">· {savedIds.size} saved</span>
        </div>
      )}

      {/* Results count */}
      {!showSaved && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] text-slate-500">
            Showing <span className="font-bold text-slate-700">{filtered.length}</span> {filtered.length === 1 ? 'testimony' : 'testimonies'}
          </p>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-5">
          {filtered.map((t) => (
            <TestimonyCard
              key={t.id}
              testimony={t}
              saved={savedIds.has(t.id)}
              justShared={sharedId === t.id}
              onSave={() => toggleSave(t.id)}
              onShare={() => share(t.id)}
              onOpen={() => setOpen(t)}
            />
          ))}
        </div>
      ) : showSaved ? (
        <div className="text-center py-16 text-slate-400">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <BookmarkIcon filled={false} size={28} />
          </div>
          <div className="text-base font-bold text-slate-700 mb-1.5">No saved testimonies yet</div>
          <div className="text-sm mb-4">Testimonies you save will appear here</div>
          <button
            onClick={() => setShowSaved(false)}
            className="px-5 py-2.5 bg-gradient-primary text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
          >
            Browse Testimonies
          </button>
        </div>
      ) : (
        <div className="text-center py-[60px] text-slate-400">
          <div className="text-[44px] mb-[14px]">💬</div>
          <div className="text-base font-bold text-slate-700 mb-1.5">No testimonies found</div>
          <div className="text-sm">Try different search terms or adjust your filters</div>
        </div>
      )}
    </div>
  );
};

export default PatientTestimony;
