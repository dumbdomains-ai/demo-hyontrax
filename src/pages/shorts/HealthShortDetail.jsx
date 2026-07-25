import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { healthShorts } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/time';

const categoryColors = {
  'Nutrition':      { bg: '#D1FAE5', color: '#065F46' },
  'Public Health':  { bg: '#FEE2E2', color: '#991B1B' },
  'Cardiology':     { bg: '#FEE2E2', color: '#991B1B' },
  'Mental Health':  { bg: '#EDE9FE', color: '#5B21B6' },
  'Diabetes':       { bg: '#FEF3C7', color: '#92400E' },
  'Wellness':       { bg: '#E0F2FE', color: '#075985' },
  "Women's Health": { bg: '#FCE7F3', color: '#9D174D' },
};

const HealthShortDetail = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const item     = healthShorts.find((s) => s.id === id) || healthShorts[0];
  const cat      = categoryColors[item.category] || { bg: '#E3F2FD', color: '#1565C0' };

  const [saved, setSaved]   = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = () => { setShared(true); setTimeout(() => setShared(false), 1500); };

  return (
    <div className="max-w-[720px] mx-auto">
      <button
        onClick={() => navigate('/app/shorts')}
        className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
      >
        ← Back to Health Shorts
      </button>

      <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
        <div className="h-[160px] flex items-center justify-center text-[64px]" style={{ background: cat.bg }}>
          {item.image}
        </div>

        <div className="px-8 py-7">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11.5px] font-bold px-3 py-1 rounded-full" style={{ background: cat.bg, color: cat.color }}>
              {item.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">{formatRelativeTime(item.date)}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 leading-[1.3] tracking-[-0.3px] mb-5">{item.title}</h1>

          <p className="text-[14.5px] text-slate-600 leading-[1.75]">{item.body || item.summary}</p>

          <div className="flex gap-2.5 mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex-1 py-3 border-[1.5px] rounded-xl text-[13px] font-semibold cursor-pointer transition-all
                ${saved ? 'bg-blue-50 text-blue-800 border-blue-700' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {saved ? '🔖 Saved' : '📑 Save'}
            </button>
            <button
              onClick={handleShare}
              className={`flex-1 py-3 border-[1.5px] rounded-xl text-[13px] font-semibold cursor-pointer transition-all
                ${shared ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-600 border-slate-200'}`}
            >
              {shared ? '✅ Copied' : '🔗 Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthShortDetail;
