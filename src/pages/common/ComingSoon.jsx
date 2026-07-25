import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const label = location.state?.label || 'This feature';

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-[440px] text-center bg-white rounded-[24px] px-10 py-12 shadow-blue-md border-[1.5px] border-blue-100/50 animate-scale-in">
        <div className="text-[44px] mb-5">🚧</div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-2.5">Coming Soon</h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          {label} isn't available just yet — your health, your way. Stay tuned, we're building something amazing.
        </p>
        <button
          onClick={() => navigate('/app/home')}
          className="px-6 py-3 bg-gradient-primary border-none rounded-xl text-white text-sm font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
