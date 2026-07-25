import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events } from '../../data/mockData';

const StatCard = ({ icon, label, value, change, color }) => (
  <div className="bg-white rounded-2xl px-[22px] py-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-[14px] items-center">
    <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl shrink-0" style={{ background: color }}>{icon}</div>
    <div>
      <div className="text-xs text-slate-500 font-semibold">{label}</div>
      <div className="text-[28px] font-extrabold text-slate-800 leading-none tracking-[-1px]">{value}</div>
      {change && (
        <div className={`text-xs font-semibold mt-0.5 ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
        </div>
      )}
    </div>
  </div>
);

const statusBadge = {
  upcoming:  { bg: '#E3F2FD', color: '#1565C0', label: 'Upcoming'  },
  full:      { bg: '#FEE2E2', color: '#991B1B', label: 'Full'       },
  completed: { bg: '#D1FAE5', color: '#065F46', label: 'Completed'  },
};

const EventAdmin = () => {
  const navigate = useNavigate();
  const [activeTab,       setActiveTab]       = useState('all');
  const [search,          setSearch]          = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalRegistered = events.reduce((a, b) => a + b.registered, 0);
  const upcoming        = events.filter((e) => e.status === 'upcoming').length;

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchTab    = activeTab === 'all' || e.status === activeTab || (activeTab === 'virtual' && e.type === 'Virtual');
    return matchSearch && matchTab;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-[0.5px]">Admin Panel</div>
        <div className="flex gap-2.5">
          <button onClick={() => navigate('/app/events')} className="px-[18px] py-2.5 border-[1.5px] border-blue-100 rounded-xl bg-white text-[13px] font-semibold text-blue-800 cursor-pointer">← User View</button>
          <button onClick={() => setShowCreateModal(true)} className="px-5 py-2.5 border-none rounded-xl bg-gradient-primary text-[13px] font-bold text-white cursor-pointer flex items-center gap-2 hover:-translate-y-px hover:shadow-blue transition-all">
            + Create Event
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon="📅" label="Total Events"      value={events.length}                    change={12} color="#E3F2FD" />
        <StatCard icon="👥" label="Total Registered"  value={totalRegistered.toLocaleString()} change={18} color="#D1FAE5" />
        <StatCard icon="🔔" label="Upcoming"          value={upcoming}                         change={5}  color="#FEF3C7" />
        <StatCard icon="✅" label="Completed"         value={2}                                change={-3} color="#EDE9FE" />
      </div>

      {/* Capacity Overview */}
      <div className="bg-white rounded-[20px] px-6 py-[22px] mb-5 shadow-blue-md border-[1.5px] border-blue-100/50">
        <h4 className="text-[15px] font-bold text-slate-800 mb-4">Capacity Utilization by Event</h4>
        <div className="flex flex-col gap-3">
          {events.slice(0, 4).map((e) => {
            const pct = Math.round((e.registered / e.capacity) * 100);
            return (
              <div key={e.id} className="flex items-center gap-[14px]">
                <span className="text-lg w-6 text-center">{e.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-[13px] font-semibold text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap max-w-[60%]">{e.title}</span>
                    <span className={`text-xs font-bold shrink-0 ml-2 ${pct >= 100 ? 'text-red-500' : pct >= 80 ? 'text-amber-500' : 'text-blue-800'}`}>
                      {e.registered}/{e.capacity} ({pct}%)
                    </span>
                  </div>
                  <div className="h-[6px] bg-blue-50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? '#EF4444' : pct >= 80 ? '#F59E0B' : 'linear-gradient(90deg,#1565C0,#42A5F5)' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
        <div className="px-6 py-5 border-b-[1.5px] border-blue-50 flex gap-3 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
            <input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-[9px] pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-[10px] text-[13.5px] outline-none text-slate-700"
            />
          </div>
          <div className="flex gap-px bg-app-bg rounded-[10px] p-[3px] border-[1.5px] border-blue-50">
            {[{ key: 'all', label: 'All' }, { key: 'upcoming', label: 'Upcoming' }, { key: 'full', label: 'Full' }, { key: 'virtual', label: 'Virtual' }].map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`px-[14px] py-1.5 rounded-lg border-none cursor-pointer text-[12.5px] font-semibold transition-all duration-150
                  ${activeTab === t.key ? 'bg-white text-blue-800 shadow-blue-sm' : 'bg-transparent text-slate-500'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr className="bg-[#F8FBFF]">
                {['Event', 'Category', 'Date', 'Type', 'Registered', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11.5px] font-bold text-slate-500 uppercase tracking-[0.4px] border-b-[1.5px] border-blue-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const sb  = statusBadge[e.status] || statusBadge.upcoming;
                const pct = Math.round((e.registered / e.capacity) * 100);
                return (
                  <tr key={e.id} className="border-b border-slate-100 hover:bg-[#F8FBFF] transition-colors">
                    <td className="px-4 py-[14px]">
                      <div className="flex gap-2.5 items-center">
                        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-lg shrink-0" style={{ background: e.color }}>{e.image}</div>
                        <div>
                          <div className="font-semibold text-slate-800 text-[13px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{e.title}</div>
                          <div className="text-[11.5px] text-slate-400">{e.speaker.split(',')[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-[14px]">
                      <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-[3px] rounded-full">{e.category}</span>
                    </td>
                    <td className="px-4 py-[14px] text-slate-600 text-[13px] whitespace-nowrap">
                      {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-[14px]">
                      <span className="text-xs text-slate-500 font-medium">
                        {e.type === 'In-Person' ? '📍' : e.type === 'Virtual' ? '💻' : '🔀'} {e.type}
                      </span>
                    </td>
                    <td className="px-4 py-[14px]">
                      <div className="text-[13px] font-bold text-slate-800">{e.registered}<span className="text-slate-400 font-normal">/{e.capacity}</span></div>
                      <div className="h-1 bg-blue-50 rounded-full overflow-hidden w-20 mt-1">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? '#EF4444' : pct >= 80 ? '#F59E0B' : 'linear-gradient(90deg,#1565C0,#42A5F5)' }} />
                      </div>
                    </td>
                    <td className="px-4 py-[14px]">
                      <span className="text-[11.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: sb.bg, color: sb.color }}>{sb.label}</span>
                    </td>
                    <td className="px-4 py-[14px]">
                      <div className="flex gap-1.5">
                        <button onClick={() => navigate(`/app/events/${e.id}`)} className="px-3 py-1.5 border-[1.5px] border-blue-100 rounded-lg bg-white text-xs font-semibold text-blue-800 cursor-pointer">View</button>
                        <button className="px-3 py-1.5 border-[1.5px] border-slate-200 rounded-lg bg-white text-xs font-semibold text-slate-600 cursor-pointer">Edit</button>
                        <button className="px-3 py-1.5 border-[1.5px] border-red-200 rounded-lg bg-red-50 text-xs font-semibold text-red-500 cursor-pointer">✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-6">
          <div className="bg-white rounded-3xl p-9 max-w-[520px] w-full shadow-[0_32px_80px_rgba(0,0,0,0.25)] animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">Create New Event</h3>
              <button onClick={() => setShowCreateModal(false)} className="bg-slate-100 border-none rounded-lg px-3 py-2 cursor-pointer text-base text-slate-500">✕</button>
            </div>
            {[
              { label: 'Event Title',     placeholder: 'e.g. Diabetes Awareness Summit 2026' },
              { label: 'Category',        placeholder: 'e.g. Chronic Disease' },
              { label: 'Date',            placeholder: 'YYYY-MM-DD' },
              { label: 'Venue / Location',placeholder: 'e.g. Mumbai Convention Centre' },
              { label: 'Capacity',        placeholder: '500' },
            ].map((f) => (
              <div key={f.label} className="mb-[14px]">
                <label className="block text-[13px] font-semibold text-slate-700 mb-[5px]">{f.label}</label>
                <input placeholder={f.placeholder} className="w-full px-[14px] py-[11px] border-[1.5px] border-blue-100 rounded-[11px] text-sm outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all" />
              </div>
            ))}
            <div className="flex gap-2.5 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 border-[1.5px] border-slate-200 rounded-xl bg-white text-sm font-semibold text-slate-600 cursor-pointer">Cancel</button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 border-none rounded-xl bg-gradient-primary text-sm font-bold text-white cursor-pointer">Create Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAdmin;
