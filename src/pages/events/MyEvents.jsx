import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myEvents } from '../../data/mockData';

const statusBadge = {
  approved: { bg: '#D1FAE5', color: '#065F46', label: 'Approved' },
  pending:  { bg: '#FEF3C7', color: '#92400E', label: 'In Process' },
  rejected: { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
};

const MyEvents = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(myEvents[0]?.id || null);
  const selected = myEvents.find((e) => e.id === selectedId);

  return (
    <div>
      {/* Header banner */}
      <div className="bg-gradient-primary rounded-[20px] px-8 py-7 mb-7 text-white flex justify-between items-center relative overflow-hidden">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.06] -top-20 right-[200px]" />
        <div className="relative z-10">
          <h2 className="text-[22px] font-extrabold mb-1">My Events</h2>
          <p className="text-sm text-white/75">Publish an event with Hyontrax and track its approval status</p>
        </div>
        <button
          onClick={() => navigate('/app/events/publish')}
          className="relative z-10 px-6 py-3 bg-white text-blue-800 border-none rounded-xl text-[13px] font-bold cursor-pointer whitespace-nowrap hover:-translate-y-px transition-all"
        >
          + Publish
        </button>
      </div>

      {myEvents.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">📋</div>
          <div className="text-lg font-bold text-slate-700 mb-2">No events published yet</div>
          <div className="text-sm mb-5">Publish your first event to get started</div>
          <button onClick={() => navigate('/app/events/publish')} className="px-6 py-3 bg-gradient-primary text-white border-none rounded-xl text-sm font-bold cursor-pointer">Publish Event</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 items-start">
          {/* List */}
          <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden overflow-y-auto">
            {myEvents.map((e) => {
              const sb = statusBadge[e.status] || statusBadge.pending;
              const active = e.id === selectedId;
              return (
                <div
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className={`px-5 py-4 cursor-pointer border-l-[3px] transition-all duration-150
                    ${active ? 'bg-[#EBF4FF] border-l-blue-800' : 'bg-white border-l-transparent hover:bg-[#F8FBFF]'}`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-[3px] rounded-full">{e.category}</span>
                    <span className="text-[11.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: sb.bg, color: sb.color }}>{sb.label}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 mb-1 leading-[1.35]">{e.title}</div>
                  <div className="text-[11.5px] text-slate-400">
                    {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail */}
          {selected && (
            <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
              <div className="px-[22px] py-[18px] border-b-[1.5px] border-blue-50 flex justify-between items-center">
                <h3 className="text-[17px] font-extrabold text-slate-800">{selected.title}</h3>
                <span className="text-[11.5px] font-bold px-2.5 py-1 rounded-full" style={{ background: statusBadge[selected.status].bg, color: statusBadge[selected.status].color }}>
                  {statusBadge[selected.status].label}
                </span>
              </div>

              <div className="px-[22px] py-6">
                {selected.status === 'rejected' && selected.rejectionReason && (
                  <div className="bg-red-50 border-[1.5px] border-red-200 rounded-xl px-4 py-[14px] mb-5">
                    <div className="text-[11px] font-bold text-red-800 uppercase tracking-[0.4px] mb-1.5">Rejection Reason</div>
                    <p className="text-[13px] text-red-800 leading-[1.55]">{selected.rejectionReason}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Category', value: selected.category },
                    { label: 'Type', value: selected.type === 'Paid' ? `Paid — ₹${selected.amount}` : 'Free' },
                    { label: 'Date', value: new Date(selected.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    { label: 'Time', value: selected.time },
                    { label: 'Address', value: selected.address },
                  ].map((d) => (
                    <div key={d.label} className="bg-[#F8FBFF] rounded-xl px-4 py-3 border border-blue-50">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.4px] mb-1">{d.label}</div>
                      <div className="text-[13.5px] font-semibold text-slate-800">{d.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Description</h4>
                  <p className="text-[13.5px] text-slate-600 leading-[1.7]">{selected.description}</p>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => navigate(`/app/events/${selected.id}/edit`)}
                    className="flex-1 py-3 border-[1.5px] border-blue-100 rounded-xl bg-white text-sm font-semibold text-blue-800 cursor-pointer"
                  >
                    ✏️ Edit Event
                  </button>
                  <button
                    onClick={() => navigate('/app/events/publish')}
                    className="flex-1 py-3 border-none rounded-xl bg-gradient-primary text-sm font-bold text-white cursor-pointer"
                  >
                    + Publish Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
