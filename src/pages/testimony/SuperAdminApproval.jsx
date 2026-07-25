import React, { useState } from 'react';
import { testimonies as initialTestimonies } from '../../data/mockData';

const statusColors = {
  draft:            { bg: '#F1F5F9', color: '#475569', label: 'Draft'   },
  pending_approval: { bg: '#FEF3C7', color: '#92400E', label: 'Pending Approval' },
  approved:         { bg: '#D1FAE5', color: '#065F46', label: 'Approved' },
  rejected:         { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
};

const SuperAdminApproval = () => {
  const [list, setList]     = useState(initialTestimonies);
  const [filter, setFilter] = useState('Pending Approval');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes]   = useState({});

  const counts = {
    All:               list.length,
    'Pending Approval': list.filter((t) => t.status === 'pending_approval').length,
    Approved:          list.filter((t) => t.status === 'approved').length,
    Rejected:          list.filter((t) => t.status === 'rejected').length,
  };

  const filtered = list.filter((t) => {
    if (filter === 'All') return true;
    if (filter === 'Pending Approval') return t.status === 'pending_approval';
    if (filter === 'Approved') return t.status === 'approved';
    if (filter === 'Rejected') return t.status === 'rejected';
    return true;
  });

  const decide = (id, status) => {
    const reason = notes[id] || '';
    setList(list.map((t) => t.id === id ? {
      ...t,
      status,
      approvedBy: status === 'approved' ? 'Super Admin — Rohit Malhotra' : null,
      rejectionReason: status === 'rejected' ? (reason || 'Does not meet publication guidelines.') : t.rejectionReason,
    } : t));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-[14px] mb-6">
        {[
          { label: 'Total Stories',    value: counts.All,                     icon: '📖', color: '#E3F2FD', tc: '#1565C0' },
          { label: 'Awaiting Review',  value: counts['Pending Approval'],      icon: '⏳', color: '#FEF3C7', tc: '#F59E0B' },
          { label: 'Approved & Live',  value: counts.Approved,                 icon: '✅', color: '#D1FAE5', tc: '#10B981' },
          { label: 'Rejected',         value: counts.Rejected,                 icon: '❌', color: '#FEE2E2', tc: '#EF4444' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl px-5 py-[18px] shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: s.color }}>{s.icon}</div>
            <div>
              <div className="text-[11.5px] text-slate-500 font-semibold">{s.label}</div>
              <div className="text-[26px] font-extrabold leading-none tracking-[-0.5px]" style={{ color: s.tc }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Policy Banner */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-[14px] px-5 py-[14px] mb-5 border-[1.5px] border-blue-300 flex gap-3 items-start">
        <span className="text-xl shrink-0">🛡️</span>
        <div>
          <div className="text-[13px] font-bold text-blue-800 mb-[3px]">Super Admin Approval Policy</div>
          <div className="text-[12.5px] text-blue-700 leading-[1.55]">
            Patient testimonies published by admins must be verified for medical accuracy, patient consent, and identity protection before going live. Reject stories that lack sufficient clinical detail or contain unverifiable medical claims.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[400px_1fr] gap-5 items-start">
        {/* List */}
        <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
          <div className="px-4 py-[14px] border-b-[1.5px] border-blue-50 flex gap-1 overflow-x-auto">
            {['All', 'Pending Approval', 'Approved', 'Rejected'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-[14px] py-[7px] border-none rounded-[9px] cursor-pointer text-[12.5px] font-semibold transition-all duration-150 shrink-0
                  ${filter === f ? 'bg-gradient-primary text-white' : 'bg-app-bg text-slate-500'}`}>
                {f}
                {counts[f] > 0 && (
                  <span className={`ml-1.5 rounded-full px-[6px] py-px text-[10px] ${filter === f ? 'bg-white/25 text-white' : 'bg-blue-100 text-blue-800'}`}>
                    {counts[f]}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="max-h-[580px] overflow-y-auto">
            {filtered.map((t) => {
              const sc = statusColors[t.status];
              const isSelected = selected?.id === t.id;
              return (
                <div key={t.id} onClick={() => setSelected(t)}
                  className={`px-[18px] py-[14px] border-b border-slate-100 cursor-pointer border-l-[3px] transition-all duration-150
                    ${isSelected ? 'bg-[#EBF4FF] border-l-blue-800' : 'bg-white border-l-transparent hover:bg-[#F8FBFF]'}`}>
                  <div className="flex justify-between mb-2 items-start">
                    <div className="flex gap-2 items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm shrink-0">{t.image}</div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-800">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.disease}</div>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-bold px-2 py-[3px] rounded-full shrink-0" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-800 mb-[5px]">{t.title}</div>
                  <p className="text-[12.5px] text-slate-500 leading-[1.5] line-clamp-2 m-0">{t.story}</p>
                  <div className="text-[11px] text-slate-400 mt-1.5">Submitted by {t.publishedBy}</div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-12 px-6 text-center text-slate-400">
                <div className="text-[36px] mb-2.5">📭</div>
                <div className="text-sm font-semibold text-slate-700">No stories in this category</div>
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
            <div className="px-6 py-[18px] border-b-[1.5px] border-blue-50 bg-[#F8FBFF] flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-base">{selected.image}</div>
                <div>
                  <div className="text-[15px] font-extrabold text-slate-800">{selected.name}</div>
                  <div className="text-xs text-slate-400">{selected.age} yrs · {selected.gender} · {selected.city}</div>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-[5px] rounded-full" style={{ background: statusColors[selected.status]?.bg, color: statusColors[selected.status]?.color }}>
                {statusColors[selected.status]?.label}
              </span>
            </div>

            <div className="px-6 py-[22px]">
              <div className="mb-[18px] px-4 py-3 bg-app-bg rounded-xl border border-blue-100 flex gap-6">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4px] mb-1">Disease</div>
                  <div className="text-sm font-bold text-blue-800">{selected.disease}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4px] mb-1">Medicine</div>
                  <div className="text-sm font-bold text-blue-800">💊 {selected.medicine}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4px] mb-1">Rating</div>
                  <div className="text-sm font-bold text-amber-500">{'★'.repeat(selected.rating)}</div>
                </div>
              </div>

              <div className="mb-5">
                <div className="text-[13px] font-bold text-slate-800 mb-2">{selected.title}</div>
                <div className="px-4 py-4 bg-[#F8FBFF] rounded-xl border-[1.5px] border-blue-50 text-sm text-slate-500 leading-[1.75]">
                  "{selected.story}"
                </div>
              </div>

              <div className="flex gap-4 mb-6 px-4 py-[14px] bg-[#F8FBFF] rounded-xl border border-blue-50">
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-[0.4px]">Submitted By</div>
                  <div className="text-sm font-bold text-slate-800">{selected.publishedBy}</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-[0.4px]">Submission Date</div>
                  <div className="text-sm font-bold text-slate-800">{new Date(selected.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
              </div>

              {selected.status === 'rejected' && selected.rejectionReason && (
                <div className="mb-5 text-[12.5px] text-red-800 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <span className="font-bold">Previous rejection note:</span> {selected.rejectionReason}
                </div>
              )}

              <div className="mb-5">
                <label className="block text-[13px] font-bold text-slate-800 mb-2">Approval / Rejection Notes (internal)</label>
                <textarea
                  value={notes[selected.id] || ''}
                  onChange={(e) => setNotes({ ...notes, [selected.id]: e.target.value })}
                  placeholder="Add internal notes explaining this decision..."
                  rows={3}
                  className="w-full px-[14px] py-3 border-[1.5px] border-blue-200 rounded-xl text-[13.5px] outline-none text-slate-800 resize-y leading-relaxed focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button onClick={() => decide(selected.id, 'approved')} disabled={selected.status === 'approved'}
                  className={`py-[13px] border-none rounded-xl text-sm font-bold transition-all duration-200
                    ${selected.status === 'approved' ? 'bg-emerald-100 text-emerald-600 cursor-default' : 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white cursor-pointer'}`}>
                  ✅ {selected.status === 'approved' ? 'Live on Platform' : 'Approve & Publish'}
                </button>
                <button onClick={() => decide(selected.id, 'rejected')} disabled={selected.status === 'rejected'}
                  className={`py-[13px] border-none rounded-xl text-sm font-bold transition-all duration-200
                    ${selected.status === 'rejected' ? 'bg-red-100 text-red-500 cursor-default' : 'bg-red-500 text-white cursor-pointer'}`}>
                  ❌ {selected.status === 'rejected' ? 'Rejected' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] py-[60px] px-10 text-center shadow-blue-md border-[1.5px] border-blue-100/50">
            <div className="text-[52px] mb-4">🛡️</div>
            <div className="text-lg font-bold text-slate-700 mb-2">Select a Story</div>
            <div className="text-sm text-slate-400">Click a testimony from the list to review and approve or reject</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminApproval;
