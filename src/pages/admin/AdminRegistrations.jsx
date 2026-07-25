import React, { useState } from 'react';
import { adminRegistrations, myEvents } from '../../data/mockData';

const AdminRegistrations = () => {
  const [eventFilter, setEventFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const myEventTitles = ['All', ...myEvents.map((e) => e.title)];

  const filtered = adminRegistrations.filter((r) => {
    const matchEvent  = eventFilter === 'All' || r.event === eventFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.registrant.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.event.toLowerCase().includes(q);
    return matchEvent && matchStatus && matchSearch;
  });

  const confirmed = adminRegistrations.filter((r) => r.status === 'Confirmed').length;
  const cancelled = adminRegistrations.filter((r) => r.status === 'Cancelled').length;

  return (
    <div>
      {/* Info banner */}
      <div className="mb-5 p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2.5">
        <span className="text-blue-700 text-base">ℹ️</span>
        <p className="text-[12.5px] text-blue-800 font-medium">Showing registrations only for events you have published. Events pending approval do not receive registrations yet.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Registrations', value: adminRegistrations.length, icon: '📋', bg: '#EFF6FF' },
          { label: 'Confirmed',           value: confirmed,                  icon: '✅', bg: '#D1FAE5' },
          { label: 'Cancelled',           value: cancelled,                  icon: '❌', bg: '#FEE2E2' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[16px] p-4 shadow-blue-md border-[1.5px] border-blue-100/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: s.bg }}>{s.icon}</div>
            <div>
              <div className="text-[22px] font-extrabold text-slate-800 leading-none">{s.value}</div>
              <div className="text-[11.5px] font-semibold text-slate-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
          <input
            placeholder="Search registrant or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-xl text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">Event:</span>
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[12.5px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium max-w-[220px]"
          >
            {myEventTitles.map((o) => <option key={o} value={o}>{o === 'All' ? 'All Events' : o.slice(0, 30) + (o.length > 30 ? '…' : '')}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[12.5px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium"
          >
            {['All', 'Confirmed', 'Cancelled'].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        {(eventFilter !== 'All' || statusFilter !== 'All' || search) && (
          <button
            onClick={() => { setEventFilter('All'); setStatusFilter('All'); setSearch(''); }}
            className="px-3 py-2 border-[1.5px] border-slate-200 rounded-xl text-[12.5px] font-semibold text-slate-500 bg-white cursor-pointer hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>

      <div className="text-[13px] text-slate-500 mb-3">
        Showing <span className="font-bold text-slate-700">{filtered.length}</span> registration{filtered.length !== 1 ? 's' : ''}
      </div>

      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FBFF]">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Registrant</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Event</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">City</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Date</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === filtered.length - 1 ? 'border-none' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="text-[13px] font-bold text-slate-800">{r.registrant}</div>
                  <div className="text-[11px] text-slate-400">{r.email}</div>
                </td>
                <td className="px-4 py-3.5 text-[12.5px] font-semibold text-slate-700 max-w-[200px] leading-[1.4]">{r.event}</td>
                <td className="px-4 py-3.5 text-[12.5px] text-slate-600">{r.city}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-400">{r.date}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-[11px] font-bold px-2.5 py-[3px] rounded-full ${r.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="text-sm">No registrations match your filters</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrations;
