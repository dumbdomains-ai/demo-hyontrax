import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myEvents, adminRegistrations } from '../../data/mockData';

const StatusBadge = ({ status }) => {
  const map = {
    approved: { bg: '#D1FAE5', color: '#065F46', label: 'Approved' },
    pending:  { bg: '#FEF3C7', color: '#92400E', label: 'Pending Review' },
    rejected: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
  };
  const s = map[status] || { bg: '#F1F5F9', color: '#475569', label: status };
  return <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
};

const TypeBadge = ({ type }) => (
  <span className={`text-[11px] font-bold px-2.5 py-[3px] rounded-full ${type === 'Paid' ? 'bg-blue-50 text-blue-800' : 'bg-green-50 text-green-700'}`}>
    {type === 'Paid' ? '₹ Paid' : 'Free'}
  </span>
);

const RegistrationsModal = ({ event, onClose }) => {
  const regs = adminRegistrations.filter((r) => r.eventId === event.id);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[24px] p-7 max-w-[560px] w-full shadow-2xl border border-slate-100 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[16px] font-extrabold text-slate-800">{event.title}</h2>
            <p className="text-[12.5px] text-slate-400 mt-0.5">{regs.length} registration{regs.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all border-none cursor-pointer text-xl font-light">×</button>
        </div>

        {regs.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-sm">No registrations yet for this event</div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FBFF] border-b border-slate-100">
                  <th className="text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.5px]">Registrant</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.5px]">City</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.5px]">Date</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-[0.5px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {regs.map((r, i) => (
                  <tr key={r.id} className={i < regs.length - 1 ? 'border-b border-slate-50' : ''}>
                    <td className="px-4 py-3">
                      <div className="text-[13px] font-bold text-slate-800">{r.registrant}</div>
                      <div className="text-[11px] text-slate-400">{r.email}</div>
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-slate-600">{r.city}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-400">{r.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-bold px-2.5 py-[3px] rounded-full ${r.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const DeleteModal = ({ event, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-7 max-w-[380px] w-full shadow-2xl border border-slate-100 animate-scale-in">
      <div className="text-[18px] font-extrabold text-slate-800 mb-2">Delete Event?</div>
      <p className="text-[13px] text-slate-500 mb-6">"{event.title}" and all its registrations will be permanently removed.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 border-none rounded-xl text-[13px] font-bold text-white cursor-pointer hover:bg-red-700 transition-all">Delete</button>
      </div>
    </div>
  </div>
);

const AdminEvents = () => {
  const navigate = useNavigate();
  const [items, setItems]     = useState(myEvents);
  const [viewRegs, setViewRegs] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [filter, setFilter]   = useState('All');

  const statusOptions = ['All', 'approved', 'pending', 'rejected'];
  const filtered = filter === 'All' ? items : items.filter((e) => e.status === filter);

  const remove = () => { setItems((p) => p.filter((e) => e.id !== deleting.id)); setDeleting(null); };
  const regCount = (id) => adminRegistrations.filter((r) => r.eventId === id).length;

  return (
    <div>
      {viewRegs && <RegistrationsModal event={viewRegs} onClose={() => setViewRegs(null)} />}
      {deleting && <DeleteModal event={deleting} onConfirm={remove} onCancel={() => setDeleting(null)} />}

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-[12.5px] font-semibold text-slate-500">Status:</span>
          <div className="flex gap-1 bg-white rounded-[10px] p-1 border border-blue-100 shadow-sm">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border-none cursor-pointer transition-all capitalize
                  ${filter === s ? 'bg-gradient-primary text-white' : 'bg-transparent text-slate-500 hover:text-slate-700'}`}
              >
                {s === 'All' ? 'All' : s === 'approved' ? 'Approved' : s === 'pending' ? 'Pending' : 'Rejected'}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate('/app/events/publish')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-primary text-white border-none rounded-[11px] text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
        >
          + Publish New Event
        </button>
      </div>

      {/* Info banner */}
      <div className="mb-4 p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2.5">
        <span className="text-blue-700 text-base">ℹ️</span>
        <p className="text-[12.5px] text-blue-800 font-medium">You can only see events you have submitted. Approved events are visible to users on the Browse Events page.</p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white rounded-[18px] shadow-blue-md border-[1.5px] border-blue-100/50">
          <div className="text-4xl mb-3">📅</div>
          <div className="text-base font-bold text-slate-700 mb-1.5">No events found</div>
          <div className="text-sm mb-4">Submit a new event via "Publish New Event"</div>
          <button onClick={() => navigate('/app/events/publish')} className="px-5 py-2.5 bg-gradient-primary text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">
            Publish Event
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-[#F8FBFF]">
                <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Event</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Category</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Date & Time</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Type</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Registrations</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev, i) => {
                const regs = regCount(ev.id);
                return (
                  <tr key={ev.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === filtered.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-5 py-3.5">
                      <div className="text-[13px] font-bold text-slate-800 max-w-[200px] leading-[1.4]">{ev.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 max-w-[200px] truncate">{ev.address}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[12.5px] text-slate-600">{ev.category}</td>
                    <td className="px-4 py-3.5">
                      <div className="text-[12.5px] font-medium text-slate-700">{ev.date}</div>
                      <div className="text-[11px] text-slate-400">{ev.time}</div>
                    </td>
                    <td className="px-4 py-3.5"><TypeBadge type={ev.type} /></td>
                    <td className="px-4 py-3.5">
                      {ev.status === 'approved' ? (
                        <button
                          onClick={() => setViewRegs(ev)}
                          className="text-[12px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border-none cursor-pointer hover:bg-blue-100 transition-all"
                        >
                          {regs} registered
                        </button>
                      ) : (
                        <span className="text-[12px] text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <StatusBadge status={ev.status} />
                        {ev.status === 'rejected' && ev.rejectionReason && (
                          <div className="text-[11px] text-red-600 mt-1 max-w-[160px] leading-[1.4]">{ev.rejectionReason}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => navigate(`/app/events/${ev.id}/edit`)}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleting(ev)}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-red-600 bg-red-50 hover:bg-red-100 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
