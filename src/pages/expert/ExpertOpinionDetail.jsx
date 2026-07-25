import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articles } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/time';

const categoryColors = {
  'Diabetes':       { bg: '#FEF3C7', color: '#92400E' },
  'Mental Health':  { bg: '#EDE9FE', color: '#5B21B6' },
  "Women's Health": { bg: '#FCE7F3', color: '#9D174D' },
  'Cardiology':     { bg: '#FEE2E2', color: '#991B1B' },
  'Pediatrics':     { bg: '#D1FAE5', color: '#065F46' },
  'Nutrition':      { bg: '#CCFBF1', color: '#134E4A' },
};

const BookmarkIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const ExpertOpinionDetail = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const article  = articles.find((a) => a.id === id) || articles[0];
  const catStyle = categoryColors[article.category] || { bg: '#E3F2FD', color: '#1565C0' };

  const [saved, setSaved]     = useState(false);
  const [shared, setShared]   = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const bodyParagraphs = (article.body || article.excerpt).split('\n').filter(Boolean);

  return (
    <div className="max-w-[760px] mx-auto">
      <button
        onClick={() => navigate('/app/expert')}
        className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
      >
        ← Back to Expert Opinion
      </button>

      <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 px-9 py-8">
        {/* Meta */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[11.5px] font-bold px-3 py-1 rounded-full" style={{ background: catStyle.bg, color: catStyle.color }}>
            {article.category}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">{article.readTime}</span>
            <span className="text-xs text-slate-400 font-medium">{formatRelativeTime(article.date)}</span>
          </div>
        </div>

        {/* Doctor profile */}
        <div className="flex gap-4 items-center p-4 bg-[#F8FBFF] rounded-xl border border-blue-50 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-2xl shrink-0">
            {article.doctorImage || '👨‍⚕️'}
          </div>
          <div>
            <div className="text-[15px] font-extrabold text-slate-800">{article.author}</div>
            <div className="text-[12.5px] text-blue-800 font-semibold">{article.specialty}</div>
            <div className="text-[11.5px] text-slate-400">{article.practice}</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-extrabold text-slate-800 leading-[1.3] tracking-[-0.4px] mb-6">{article.title}</h1>

        {/* Body */}
        <div className="text-[14.5px] text-slate-600 leading-[1.8] mb-8 space-y-4">
          {bodyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-8">
          {article.tags.map((tag) => (
            <span key={tag} className="bg-blue-50 text-blue-700 text-[11.5px] font-semibold px-3 py-[4px] rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={() => setSaved(!saved)}
            className={`flex-1 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${saved ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-800'}`}
          >
            <BookmarkIcon filled={saved} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            onClick={handleShare}
            className={`flex-1 py-3 rounded-xl text-[13.5px] font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 border-[1.5px]
              ${shared ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
          >
            {shared ? (
              <>✓ Link Copied</>
            ) : (
              <><ShareIcon /> Share</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertOpinionDetail;
