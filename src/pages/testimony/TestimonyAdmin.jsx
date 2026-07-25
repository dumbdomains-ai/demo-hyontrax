import React, { useState } from 'react';
import { testimonies as initialTestimonies } from '../../data/mockData';

const statusColors = {
  draft:            { bg: '#F1F5F9', color: '#475569', label: 'Draft'   },
  pending_approval: { bg: '#FEF3C7', color: '#92400E', label: 'Pending Approval' },
  approved:         { bg: '#D1FAE5', color: '#065F46', label: 'Published' },
  rejected:         { bg: '#FEE2E2', color: '#991B1B', label: 'Rejected' },
};

const Field = ({ label, value, onChange, placeholder, half, textarea }) => (
  <div className={half ? 'flex-1 min-w-[140px]' : 'w-full'}>
    <label className="block text-[12.5px] font-semibold text-slate-700 mb-[5px]">{label}</label>
    {textarea ? (
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={5}
        className="w-full px-[14px] py-3 border-[1.5px] border-blue-100 rounded-[11px] text-[13.5px] outline-none text-slate-800 resize-y leading-relaxed focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all" />
    ) : (
      <input value={value} onChange={onChange} placeholder={placeholder}
        className="w-full py-[11px] px-[14px] border-[1.5px] border-blue-100 rounded-[11px] text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all" />
    )}
  </div>
);

const emptyForm = { name: '', age: '', gender: 'Female', city: '', disease: '', medicine: '', title: '', story: '', rating: 5 };

const TestimonyAdmin = () => {
  const [list, setList]   = useState(initialTestimonies);
  const [filter, setFilter] = useState('All');
  const [form, setForm]   = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const counts = {
    All:              list.length,
    Draft:            list.filter((t) => t.status === 'draft').length,
    'Pending Approval': list.filter((t) => t.status === 'pending_approval').length,
    Published:        list.filter((t) => t.status === 'approved').length,
    Rejected:         list.filter((t) => t.status === 'rejected').length,
  };

  const filtered = list.filter((t) => {
    if (filter === 'All') return true;
    if (filter === 'Draft') return t.status === 'draft';
    if (filter === 'Pending Approval') return t.status === 'pending_approval';
    if (filter === 'Published') return t.status === 'approved';
    if (filter === 'Rejected') return t.status === 'rejected';
    return true;
  });

  const submitForApproval = (id) => setList(list.map((t) => t.id === id ? { ...t, status: 'pending_approval' } : t));

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim() || !form.story.trim() || !form.disease.trim() || !form.medicine.trim()) return;
    const newEntry = {
      id: `pt${Date.now()}`,
      name: form.name, age: Number(form.age) || 0, gender: form.gender, city: form.city,
      disease: form.disease, medicine: form.medicine, title: form.title, story: form.story,
      rating: Number(form.rating), date: new Date().toISOString().slice(0, 10),
      image: form.gender === 'Male' ? '🧑' : '👩', color: '#E3F2FD',
      tags: [form.disease], likes: 0, saves: 0,
      status: 'draft', publishedBy: 'Admin — Priya Verma', approvedBy: null, featured: false,
    };
    setList([newEntry, ...list]);
    setForm(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mb-6">
        {[
          { label: 'Total Stories',   value: counts.All,                    icon: '📖', color: '#E3F2FD', tc: '#1565C0' },
          { label: 'Pending Approval',value: counts['Pending Approval'],     icon: '⏳', color: '#FEF3C7', tc: '#F59E0B' },
          { label: 'Published',       value: counts.Published,              icon: '✅', color: '#D1FAE5', tc: '#10B981' },
          { label: 'Rejected',        value: counts.Rejected,                icon: '❌', color: '#FEE2E2', tc: '#EF4444' },
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

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">
        {/* List */}
        <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
          <div className="px-4 py-[14px] border-b-[1.5px] border-blue-50 flex gap-1 overflow-x-auto">
            {['All', 'Draft', 'Pending Approval', 'Published', 'Rejected'].map((f) => (
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

          <div className="overflow-y-auto">
            {filtered.map((t) => {
              const sc = statusColors[t.status];
              return (
                <div key={t.id} className="px-[18px] py-[14px] border-b border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2.5 items-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-sm shrink-0">{t.image}</div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-800">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.age} yrs · {t.city}</div>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-bold px-2 py-[3px] rounded-full shrink-0" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                  </div>
                  <div className="text-[13px] font-bold text-slate-800 mb-1">{t.title}</div>
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    <span className="bg-blue-50 text-blue-800 text-[11px] font-semibold px-[9px] py-[3px] rounded-full">{t.disease}</span>
                    <span className="bg-slate-100 text-slate-500 text-[11px] font-semibold px-[9px] py-[3px] rounded-full">💊 {t.medicine}</span>
                  </div>
                  <p className="text-[12.5px] text-slate-500 leading-[1.5] line-clamp-2 m-0 mb-2">{t.story}</p>
                  {t.status === 'rejected' && t.rejectionReason && (
                    <div className="text-[11.5px] text-red-800 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">
                      <span className="font-bold">Super Admin note:</span> {t.rejectionReason}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-400">{t.publishedBy}</span>
                    {t.status === 'draft' && (
                      <button onClick={() => submitForApproval(t.id)}
                        className="px-3 py-1.5 bg-gradient-primary border-none rounded-lg text-white text-xs font-bold cursor-pointer">
                        Submit for Approval →
                      </button>
                    )}
                  </div>
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

        {/* Create Form */}
        <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 p-6 sticky top-5">
          <h3 className="text-[15px] font-extrabold text-slate-800 mb-1">Publish New Testimony</h3>
          <p className="text-[12px] text-slate-400 mb-5">Created stories start as Draft and require Super Admin approval before going live.</p>

          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Field label="Patient Name" value={form.name} onChange={set('name')} placeholder="Full name" half />
              <Field label="Age" value={form.age} onChange={set('age')} placeholder="Age" half />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-[5px]">Gender</label>
                <select value={form.gender} onChange={set('gender')}
                  className="w-full py-[11px] px-[14px] border-[1.5px] border-blue-100 rounded-[11px] text-[13.5px] outline-none text-slate-800 focus:border-blue-700 transition-all">
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
              <Field label="City" value={form.city} onChange={set('city')} placeholder="City" half />
            </div>
            <div className="flex gap-3">
              <Field label="Disease" value={form.disease} onChange={set('disease')} placeholder="e.g. Type 2 Diabetes" half />
              <Field label="Medicine" value={form.medicine} onChange={set('medicine')} placeholder="e.g. Metformin" half />
            </div>
            <Field label="Story Title" value={form.title} onChange={set('title')} placeholder="A short compelling headline" />
            <Field label="Patient Story" value={form.story} onChange={set('story')} placeholder="Share the patient's journey and outcome..." textarea />

            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} onClick={() => setForm({ ...form, rating: s })}
                    style={{ fontSize: '24px', color: s <= form.rating ? '#F59E0B' : '#E2E8F0' }}
                    className="cursor-pointer transition-colors duration-100">★</span>
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full mt-2 py-3 bg-gradient-primary border-none rounded-xl text-white text-sm font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">
              📝 Save as Draft
            </button>
            {submitted && (
              <div className="text-center text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg py-2">
                ✅ Testimony saved as draft
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonyAdmin;
