import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoPage = ({ icon, title, subtitle, children }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[760px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
      >
        ← Back
      </button>
      <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 px-9 py-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{icon}</span>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px]">{title}</h1>
        </div>
        {subtitle && <p className="text-sm text-slate-500 mb-6">{subtitle}</p>}
        <div className="text-[13.5px] text-slate-600 leading-[1.75] flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
