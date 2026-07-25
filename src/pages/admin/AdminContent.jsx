import React, { useState } from 'react';
import { articles, healthShorts, testimonies, pendingTestimonies, rejectedContent } from '../../data/mockData';
import { formatRelativeTime } from '../../utils/time';

const TABS = ['Expert Opinion', 'Health Shorts', 'Patient Testimony'];

const StatusBadge = ({ status }) => {
  const map = {
    Published: { bg: '#D1FAE5', color: '#065F46' },
    Approved:  { bg: '#D1FAE5', color: '#065F46' },
    Pending:   { bg: '#FEF3C7', color: '#92400E' },
    Rejected:  { bg: '#FEE2E2', color: '#991B1B' },
    Draft:     { bg: '#F1F5F9', color: '#475569' },
  };
  const s = map[status] || map.Draft;
  return <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: s.bg, color: s.color }}>{status}</span>;
};

/* ─── Generic Edit Modal ─── */
const EditModal = ({ type, item, onClose, onSave }) => {
  const [form, setForm] = useState({ ...item });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const inputCls = 'w-full px-[14px] py-2.5 border-[1.5px] border-blue-100 rounded-xl text-[13px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-[24px] p-8 max-w-[640px] w-full shadow-2xl border border-slate-100 animate-scale-in my-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-extrabold text-slate-800">Edit {type}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all border-none cursor-pointer text-xl font-light">×</button>
        </div>

        <div className="flex flex-col gap-4">
          {type === 'Expert Opinion' && (
            <>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Title</label>
                <input value={form.title} onChange={set('title')} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Author</label>
                  <input value={form.author} onChange={set('author')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Category</label>
                  <input value={form.category} onChange={set('category')} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Specialty</label>
                  <input value={form.specialty || ''} onChange={set('specialty')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Practice / Hospital</label>
                  <input value={form.practice || ''} onChange={set('practice')} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Article Body</label>
                <textarea value={form.body || ''} onChange={set('body')} rows={6} className={`${inputCls} resize-y leading-relaxed`} />
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Tags (comma-separated)</label>
                <input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} className={inputCls} />
              </div>
            </>
          )}

          {type === 'Health Short' && (
            <>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Title</label>
                <input value={form.title} onChange={set('title')} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Category</label>
                  <input value={form.category} onChange={set('category')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Source</label>
                  <input value={form.source || ''} onChange={set('source')} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Summary</label>
                <textarea value={form.summary || ''} onChange={set('summary')} rows={2} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Full Body</label>
                <textarea value={form.body || ''} onChange={set('body')} rows={4} className={`${inputCls} resize-y leading-relaxed`} />
              </div>
            </>
          )}

          {type === 'Patient Testimony' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Patient Name</label>
                  <input value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Age</label>
                  <input type="number" value={form.age} onChange={set('age')} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Disease</label>
                  <input value={form.disease} onChange={set('disease')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Medicine</label>
                  <input value={form.medicine} onChange={set('medicine')} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Testimony Title</label>
                <input value={form.title} onChange={set('title')} className={inputCls} />
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Story</label>
                <textarea value={form.story || ''} onChange={set('story')} rows={6} className={`${inputCls} resize-y leading-relaxed`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">City</label>
                  <input value={form.city} onChange={set('city')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">Rating (1–5)</label>
                  <input type="number" min="1" max="5" value={form.rating} onChange={set('rating')} className={inputCls} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 pt-6 mt-2 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-3 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition-all">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 py-3 bg-gradient-primary text-white border-none rounded-xl text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const ConfirmDelete = ({ label, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-7 max-w-[380px] w-full shadow-2xl border border-slate-100 animate-scale-in">
      <div className="text-[18px] font-extrabold text-slate-800 mb-2">Delete this item?</div>
      <p className="text-[13px] text-slate-500 mb-6">"{label}" will be permanently removed.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 border-none rounded-xl text-[13px] font-bold text-white cursor-pointer hover:bg-red-700 transition-all">Delete</button>
      </div>
    </div>
  </div>
);

/* ─── Shared table row actions ─── */
const ActionBtns = ({ onEdit, onDelete }) => (
  <div className="flex gap-1.5">
    <button onClick={onEdit} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all">Edit</button>
    <button onClick={onDelete} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-red-600 bg-red-50 hover:bg-red-100 transition-all">Delete</button>
  </div>
);

/* ─── Expert Opinion tab ─── */
const ExpertOpinionTab = () => {
  const [items, setItems] = useState(articles.map((a) => ({ ...a, adminStatus: 'Published' })));
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const save = (updated) => setItems((p) => p.map((i) => i.id === updated.id ? updated : i));
  const remove = (id) => { setItems((p) => p.filter((i) => i.id !== id)); setDeleting(null); };

  return (
    <>
      {editing && <EditModal type="Expert Opinion" item={editing} onClose={() => setEditing(null)} onSave={(f) => { save({ ...editing, ...f }); }} />}
      {deleting && <ConfirmDelete label={deleting.title} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FBFF]">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Title</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Category</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Author</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Date</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a, i) => (
              <tr key={a.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === items.length - 1 ? 'border-none' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="text-[13px] font-bold text-slate-800 leading-[1.4] max-w-[240px]">{a.title}</div>
                  <div className="text-[11px] text-slate-400">{a.readTime}</div>
                </td>
                <td className="px-4 py-3.5 text-[12.5px] text-slate-600 font-medium">{a.category}</td>
                <td className="px-4 py-3.5 text-[12.5px] text-slate-600">{a.author}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-400">{formatRelativeTime(a.date)}</td>
                <td className="px-4 py-3.5"><StatusBadge status={a.adminStatus} /></td>
                <td className="px-4 py-3.5"><ActionBtns onEdit={() => setEditing(a)} onDelete={() => setDeleting(a)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* ─── Health Shorts tab ─── */
const HealthShortsTab = () => {
  const [items, setItems] = useState(healthShorts.map((s) => ({ ...s, adminStatus: 'Published' })));
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const save = (updated) => setItems((p) => p.map((i) => i.id === updated.id ? updated : i));
  const remove = (id) => { setItems((p) => p.filter((i) => i.id !== id)); setDeleting(null); };

  return (
    <>
      {editing && <EditModal type="Health Short" item={editing} onClose={() => setEditing(null)} onSave={(f) => { save({ ...editing, ...f }); }} />}
      {deleting && <ConfirmDelete label={deleting.title} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}
      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FBFF]">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Title</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Category</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Source</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Date</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s, i) => (
              <tr key={s.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === items.length - 1 ? 'border-none' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{s.image}</span>
                    <div>
                      <div className="text-[13px] font-bold text-slate-800 leading-[1.4] max-w-[220px]">{s.title}</div>
                      <div className="text-[11px] text-slate-400">{s.readTime}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[12.5px] text-slate-600 font-medium">{s.category}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-500">{s.source}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-400">{formatRelativeTime(s.date)}</td>
                <td className="px-4 py-3.5"><StatusBadge status={s.adminStatus} /></td>
                <td className="px-4 py-3.5"><ActionBtns onEdit={() => setEditing(s)} onDelete={() => setDeleting(s)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* ─── Patient Testimony tab ─── */
const PatientTestimonyTab = () => {
  const [approved, setApproved] = useState(testimonies.map((t) => ({ ...t, adminStatus: 'Approved' })));
  const [pending, setPending]   = useState(pendingTestimonies.map((t) => ({ ...t, adminStatus: 'Pending' })));
  const [rejected, setRejected] = useState(rejectedContent.map((r) => ({ ...r, adminStatus: 'Rejected', id: r.id })));
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitDone, setSubmitDone] = useState(null);

  const all = [...approved, ...pending];

  const saveApproved = (updated) => setApproved((p) => p.map((i) => i.id === updated.id ? updated : i));
  const savePending  = (updated) => setPending((p) => p.map((i) => i.id === updated.id ? updated : i));

  const handleSave = (updated) => {
    if (approved.find((t) => t.id === updated.id)) saveApproved(updated);
    else savePending(updated);
    setEditing(null);
  };

  const remove = (id) => {
    setApproved((p) => p.filter((t) => t.id !== id));
    setPending((p) => p.filter((t) => t.id !== id));
    setDeleting(null);
  };

  const submitForApproval = (id) => {
    setSubmitDone(id);
    setTimeout(() => setSubmitDone(null), 2000);
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => <span key={s} className={`text-[11px] ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>)}
    </div>
  );

  return (
    <>
      {editing && <EditModal type="Patient Testimony" item={editing} onClose={() => setEditing(null)} onSave={handleSave} />}
      {deleting && <ConfirmDelete label={deleting.title || deleting.name} onConfirm={() => remove(deleting.id)} onCancel={() => setDeleting(null)} />}

      <div className="flex items-center gap-3 mb-4 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
        <span className="text-amber-600">⚠️</span>
        <p className="text-[12.5px] text-amber-800 font-medium">Testimonies must be submitted for approval. Only approved testimonies are visible to users on the platform.</p>
      </div>

      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50 mb-4">
        <div className="px-5 py-3 bg-[#F8FBFF] border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.5px]">Published & Pending</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Patient</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Disease · Medicine</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Title</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Rating</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {all.map((t, i) => (
              <tr key={t.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === all.length - 1 ? 'border-none' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.image}</span>
                    <div>
                      <div className="text-[13px] font-bold text-slate-800">{t.name}</div>
                      <div className="text-[11px] text-slate-400">{t.age} yrs · {t.city}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="text-[12px] font-semibold text-rose-700">{t.disease}</div>
                  <div className="text-[11px] text-violet-600">{t.medicine}</div>
                </td>
                <td className="px-4 py-3.5 text-[12.5px] font-bold text-slate-700 max-w-[180px] leading-[1.4]">{t.title}</td>
                <td className="px-4 py-3.5"><StarRating rating={t.rating} /></td>
                <td className="px-4 py-3.5"><StatusBadge status={t.adminStatus} /></td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1.5 flex-wrap">
                    <button onClick={() => setEditing(t)} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all">Edit</button>
                    {t.adminStatus === 'Pending' && (
                      <button
                        onClick={() => submitForApproval(t.id)}
                        className={`text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all ${submitDone === t.id ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
                      >
                        {submitDone === t.id ? '✓ Submitted' : 'Submit'}
                      </button>
                    )}
                    <button onClick={() => setDeleting(t)} className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-red-600 bg-red-50 hover:bg-red-100 transition-all">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejected section */}
      {rejected.length > 0 && (
        <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-red-100">
          <div className="px-5 py-3 bg-red-50 border-b border-red-100">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-[0.5px]">🚫 Rejected by Super Admin</span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {rejected.map((r) => (
              <div key={r.id} className="flex gap-4 items-start p-4 bg-red-50/50 rounded-xl border border-red-100">
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-slate-800 mb-0.5">{r.name} — {r.title}</div>
                  <div className="text-[12px] text-red-600 leading-[1.5]"><strong>Reason:</strong> {r.reason}</div>
                  <div className="text-[11px] text-slate-400 mt-1">Rejected {r.rejectedAt} by {r.rejectedBy}</div>
                </div>
                <button className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all whitespace-nowrap shrink-0">Revise & Resubmit</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Main ─── */
const AdminContent = () => {
  const [tab, setTab] = useState(0);
  const addLabels = ['Add Article', 'Add Short', 'Add Testimony'];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1 bg-white rounded-[12px] p-1 shadow-blue-md border-[1.5px] border-blue-100/50">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-[9px] text-[13px] font-semibold cursor-pointer border-none transition-all duration-200
                ${tab === i ? 'bg-gradient-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-primary text-white border-none rounded-[11px] text-[13px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">
          + {addLabels[tab]}
        </button>
      </div>

      {tab === 0 && <ExpertOpinionTab />}
      {tab === 1 && <HealthShortsTab />}
      {tab === 2 && <PatientTestimonyTab />}
    </div>
  );
};

export default AdminContent;
