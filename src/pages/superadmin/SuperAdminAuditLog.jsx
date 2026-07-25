import React, { useState } from 'react';
import { auditLogs } from '../../data/mockData';

const actionColors = {
  Created:    { bg: '#D1FAE5', color: '#065F46' },
  Published:  { bg: '#DBEAFE', color: '#1E40AF' },
  Updated:    { bg: '#FEF3C7', color: '#92400E' },
  Resolved:   { bg: '#D1FAE5', color: '#065F46' },
  Approved:   { bg: '#D1FAE5', color: '#065F46' },
  Rejected:   { bg: '#FEE2E2', color: '#991B1B' },
  Submitted:  { bg: '#EDE9FE', color: '#5B21B6' },
  Deactivated:{ bg: '#FEE2E2', color: '#991B1B' },
  Promoted:   { bg: '#CCFBF1', color: '#134E4A' },
  Activated:  { bg: '#D1FAE5', color: '#065F46' },
  Deleted:    { bg: '#FEE2E2', color: '#991B1B' },
};

const modules = ['All Modules', 'Patient Testimony', 'Expert Opinion', 'Health Shorts', 'Events', 'Support', 'User Management'];
const actions  = ['All Actions', 'Created', 'Published', 'Updated', 'Approved', 'Rejected', 'Resolved', 'Deactivated', 'Activated', 'Promoted', 'Submitted'];

const SuperAdminAuditLog = () => {
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [userFilter, setUserFilter]     = useState('All');
  const [search, setSearch]             = useState('');

  const uniqueUsers = ['All', ...new Set(auditLogs.map((l) => l.user))];

  const filtered = auditLogs.filter((l) => {
    const matchModule = moduleFilter === 'All Modules' || l.module === moduleFilter;
    const matchAction = actionFilter === 'All Actions' || l.action === actionFilter;
    const matchUser   = userFilter === 'All' || l.user === userFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || l.detail.toLowerCase().includes(q) || l.user.toLowerCase().includes(q) || l.module.toLowerCase().includes(q);
    return matchModule && matchAction && matchUser && matchSearch;
  });

  const formatTs = (ts) => {
    const d = new Date(ts);
    return {
      date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
  };

  const hasFilters = moduleFilter !== 'All Modules' || actionFilter !== 'All Actions' || userFilter !== 'All' || search;

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
          <input
            placeholder="Search audit logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-xl text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
          />
        </div>

        <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)} className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium">
          {modules.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium">
          {actions.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>

        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium">
          {uniqueUsers.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>

        {hasFilters && (
          <button
            onClick={() => { setModuleFilter('All Modules'); setActionFilter('All Actions'); setUserFilter('All'); setSearch(''); }}
            className="px-3 py-2 border-[1.5px] border-slate-200 rounded-xl text-[12.5px] font-semibold text-slate-500 bg-white cursor-pointer hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>

      <div className="text-[13px] text-slate-500 mb-3">
        Showing <span className="font-bold text-slate-700">{filtered.length}</span> of {auditLogs.length} log entries
      </div>

      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FBFF]">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Timestamp</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">User</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Module</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Action</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const badge = actionColors[log.action] || { bg: '#F1F5F9', color: '#475569' };
              const ts    = formatTs(log.timestamp);
              return (
                <tr key={log.id} className={`border-b border-slate-50 hover:bg-blue-50/20 transition-colors ${i === filtered.length - 1 ? 'border-none' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="text-[12.5px] font-semibold text-slate-700">{ts.date}</div>
                    <div className="text-[11px] text-slate-400">{ts.time}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {log.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-[12.5px] font-semibold text-slate-700">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[12.5px] text-slate-600 font-medium">{log.module}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: badge.bg, color: badge.color }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[12.5px] text-slate-600 leading-[1.5] max-w-[320px]">{log.detail}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">
                  <div className="text-3xl mb-2">📜</div>
                  <div className="text-sm">No log entries match your filters</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminAuditLog;
