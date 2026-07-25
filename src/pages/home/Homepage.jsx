import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    key: 'shorts',
    icon: '📰',
    label: 'Health Shorts',
    desc: 'Quick-scroll health news & updates',
    path: '/app/shorts',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    key: 'expert',
    icon: '🧠',
    label: 'Expert Opinion',
    desc: 'Insights from certified specialists',
    path: '/app/expert',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    key: 'events',
    icon: '📅',
    label: 'Health Events',
    desc: 'Discover & register for events near you',
    path: '/app/events',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    key: 'testimony',
    icon: '💬',
    label: 'Patient Testimony',
    desc: 'Real stories from real patients',
    path: '/app/testimony',
    gradient: 'from-rose-500 to-pink-400',
  },
];

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-hero rounded-[20px] px-10 py-12 mb-8 text-white relative overflow-hidden">
        <div className="absolute w-[280px] h-[280px] rounded-full bg-white/[0.06] -top-20 -right-16" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.04] -bottom-16 left-10" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-white/[0.04] top-8 right-40" />
        <div className="relative z-10 max-w-[620px]">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-semibold mb-4 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Platform Live — Explore all features
          </div>
          <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.5px] mb-3">
            Empowering accessible healthcare, together
          </h1>
          <p className="text-[15px] text-white/80 leading-relaxed">
            Hyontrax connects you to an extensive network of doctors, hospitals and health resources —
            everything you need for your health journey, all in one place.
          </p>
        </div>
      </div>

      {/* Featured Services */}
      <div className="mb-4">
        <h2 className="text-[17px] font-extrabold text-slate-800">Featured Services</h2>
        <p className="text-[13px] text-slate-400 mt-0.5">Explore what Hyontrax has to offer</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {services.map((s) => (
          <button
            key={s.key}
            onClick={() => navigate(s.path)}
            className="text-left bg-white rounded-[20px] px-5 py-6 shadow-blue-md border-[1.5px] border-blue-100/50 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-blue-lg font-sans group"
          >
            <div className={`w-[50px] h-[50px] rounded-[14px] bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-105 transition-transform duration-200`}>
              {s.icon}
            </div>
            <div className="text-[14.5px] font-bold text-slate-800 mb-1.5 leading-tight">{s.label}</div>
            <div className="text-[12px] text-slate-500 leading-[1.4]">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
