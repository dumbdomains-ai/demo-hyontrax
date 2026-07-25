import React, { useState } from 'react';
import { pendingTestimonies as initialPending } from '../../data/mockData';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <span key={s} className={`text-[13px] ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
    ))}
  </div>
);

const ApprovalCard = ({ testimony, onApprove, onReject }) => {
  const [expanded, setExpanded] = useState(false);
  const [rejectMode, setRejectMode] = useState(false);
  const [reason, setReason] = useState('');
  const storyParagraphs = testimony.story.split('\n').filter(Boolean);

  return (
    <div className="bg-white rounded-[18px] border-[1.5px] border-blue-100/50 shadow-blue-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 border-2 border-white shadow-sm"
            style={{ background: testimony.color }}
          >
            {testimony.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-[14px] font-extrabold text-slate-800">{testimony.name}</div>
              <span className="text-[11px] text-slate-400">·</span>
              <div className="text-[12px] text-slate-500">{testimony.age} yrs, {testimony.gender}</div>
              <div className="text-[12px] text-slate-400">· {testimony.city}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold bg-rose-50 text-rose-700 px-2.5 py-[3px] rounded-full">{testimony.disease}</span>
              <span className="text-[11px] font-semibold bg-violet-50 text-violet-700 px-2.5 py-[3px] rounded-full">{testimony.medicine}</span>
              <StarRating rating={testimony.rating} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[11px] text-slate-400">Submitted by</div>
            <div className="text-[12px] font-semibold text-slate-600">{testimony.submittedBy}</div>
            <div className="text-[11px] text-slate-400">{testimony.date}</div>
          </div>
        </div>

        <h3 className="text-[15px] font-extrabold text-slate-800 mb-3 leading-[1.4]">{testimony.title}</h3>

        <div className="text-[13px] text-slate-600 leading-[1.75]">
          <p>{storyParagraphs[0]}</p>
          {expanded && storyParagraphs.slice(1).map((p, i) => <p key={i} className="mt-3">{p}</p>)}
        </div>

        {storyParagraphs.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-[12px] font-semibold text-blue-800 bg-none border-none cursor-pointer p-0"
          >
            {expanded ? 'Show less ▲' : 'Read more ▼'}
          </button>
        )}

        <div className="flex gap-1.5 flex-wrap mt-3">
          {testimony.tags.map((tag) => (
            <span key={tag} className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-2.5 py-[3px] rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Reject reason input */}
      {rejectMode && (
        <div className="px-6 pb-4">
          <label className="block text-[12.5px] font-bold text-slate-700 mb-2">Reason for Rejection</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide a reason so the admin can revise and resubmit..."
            rows={3}
            className="w-full px-4 py-3 border-[1.5px] border-red-200 rounded-xl text-[13px] outline-none text-slate-800 focus:border-red-400 focus:ring focus:ring-red-200/30 transition-all resize-y leading-relaxed"
          />
        </div>
      )}

      {/* Action footer */}
      <div className="px-6 py-4 bg-[#F8FBFF] border-t border-blue-50 flex gap-2.5">
        {!rejectMode ? (
          <>
            <button
              onClick={() => onApprove(testimony.id)}
              className="flex-1 py-2.5 bg-emerald-600 text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => setRejectMode(true)}
              className="flex-1 py-2.5 bg-red-50 text-red-600 border-[1.5px] border-red-200 rounded-xl text-[13px] font-bold cursor-pointer hover:bg-red-100 transition-all"
            >
              ✕ Reject
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { if (reason.trim()) { onReject(testimony.id, reason); } }}
              disabled={!reason.trim()}
              className={`flex-1 py-2.5 border-none rounded-xl text-[13px] font-bold cursor-pointer transition-all
                ${reason.trim() ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              Confirm Rejection
            </button>
            <button
              onClick={() => { setRejectMode(false); setReason(''); }}
              className="flex-1 py-2.5 bg-white text-slate-600 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-bold cursor-pointer hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const SuperAdminApprovals = () => {
  const [items, setItems]       = useState(initialPending);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [tab, setTab]           = useState('pending');

  const approve = (id) => {
    const item = items.find((t) => t.id === id);
    if (item) {
      setApproved((p) => [{ ...item, resolvedAt: new Date().toLocaleDateString('en-IN') }, ...p]);
      setItems((p) => p.filter((t) => t.id !== id));
    }
  };

  const reject = (id, reason) => {
    const item = items.find((t) => t.id === id);
    if (item) {
      setRejected((p) => [{ ...item, reason, resolvedAt: new Date().toLocaleDateString('en-IN') }, ...p]);
      setItems((p) => p.filter((t) => t.id !== id));
    }
  };

  const tabs = [
    { key: 'pending',  label: 'Pending',  count: items.length },
    { key: 'approved', label: 'Approved', count: approved.length },
    { key: 'rejected', label: 'Rejected', count: rejected.length },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-white rounded-[12px] p-1 shadow-blue-md border-[1.5px] border-blue-100/50 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[9px] text-[13px] font-semibold cursor-pointer border-none transition-all duration-200
              ${tab === t.key ? 'bg-gradient-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {t.label}
            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Pending */}
      {tab === 'pending' && (
        items.length > 0 ? (
          <div className="flex flex-col gap-4">
            {items.map((t) => <ApprovalCard key={t.id} testimony={t} onApprove={approve} onReject={reject} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
            <div className="text-base font-bold text-slate-700 mb-1.5">All caught up!</div>
            <div className="text-sm">There are no testimonies pending your review</div>
          </div>
        )
      )}

      {/* Approved */}
      {tab === 'approved' && (
        approved.length > 0 ? (
          <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-[#F8FBFF]">
                  <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Patient</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Disease · Medicine</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Title</th>
                  <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Approved On</th>
                </tr>
              </thead>
              <tbody>
                {approved.map((t, i) => (
                  <tr key={t.id} className={`border-b border-slate-50 ${i === approved.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-5 py-3.5 flex items-center gap-2">
                      <span className="text-xl">{t.image}</span>
                      <div>
                        <div className="text-[13px] font-bold text-slate-800">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.age} yrs · {t.city}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-[12px] font-semibold text-rose-700">{t.disease}</div>
                      <div className="text-[11px] text-violet-600">{t.medicine}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[12.5px] font-bold text-slate-700 max-w-[200px]">{t.title}</td>
                    <td className="px-4 py-3.5 text-[12px] text-slate-400">{t.resolvedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">✅</div>
            <div className="text-sm">No approved testimonies yet in this session</div>
          </div>
        )
      )}

      {/* Rejected */}
      {tab === 'rejected' && (
        rejected.length > 0 ? (
          <div className="flex flex-col gap-3">
            {rejected.map((t) => (
              <div key={t.id} className="bg-white rounded-[16px] p-5 shadow-blue-md border-[1.5px] border-red-100 flex gap-4 items-start">
                <span className="text-2xl shrink-0">{t.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-extrabold text-slate-800 mb-0.5">{t.name} · {t.title}</div>
                  <div className="text-[12px] text-slate-500 mb-2">{t.disease} · {t.medicine} · Rejected {t.resolvedAt}</div>
                  <div className="text-[12.5px] text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 leading-[1.5]">
                    <span className="font-bold">Reason: </span>{t.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">✕</div>
            <div className="text-sm">No rejected testimonies in this session</div>
          </div>
        )
      )}
    </div>
  );
};

export default SuperAdminApprovals;
