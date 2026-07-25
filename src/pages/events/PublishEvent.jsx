import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventCategories, myEvents } from '../../data/mockData';

const Field = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = 'w-full px-[14px] py-3 border-[1.5px] border-blue-100 rounded-xl text-sm outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all';

const UploadBox = ({ label, hint, file, onFile }) => (
  <div>
    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">{label}</label>
    <div
      onClick={() => document.getElementById(`upload-${label}`).click()}
      className="border-2 border-dashed border-blue-100 bg-[#F8FBFF] rounded-[14px] px-5 py-6 text-center cursor-pointer transition-all duration-200 hover:border-blue-300"
    >
      <div className="text-3xl mb-2">{file ? '✅' : '📎'}</div>
      <div className="text-[13px] font-semibold text-slate-700 mb-1">{file ? file.name : 'Click to upload'}</div>
      <div className="text-[12px] text-slate-400">{hint}</div>
      <input id={`upload-${label}`} type="file" className="hidden" onChange={(e) => onFile(e.target.files[0] || null)} />
    </div>
  </div>
);

const emptyForm = {
  eventName: '', category: '', pinCode: '', address: '', description: '',
  date: '', timings: '', organizerName: '', type: 'Free', amount: '',
  chiefGuests: '', registrationLink: '', websiteLink: '',
};

const PublishEvent = () => {
  const navigate = useNavigate();
  const { id }    = useParams();
  const editing   = Boolean(id);
  const existing  = editing ? myEvents.find((e) => e.id === id) : null;

  const [form, setForm] = useState(existing ? {
    eventName: existing.title, category: existing.category, pinCode: '',
    address: existing.address, description: existing.description,
    date: existing.date, timings: existing.time, organizerName: 'Tanishk Jain',
    type: existing.type, amount: existing.amount || '',
    chiefGuests: '', registrationLink: '', websiteLink: '',
  } : emptyForm);

  const [permissionLetter, setPermissionLetter] = useState(null);
  const [banner, setBanner]   = useState(null);
  const [agreed, setAgreed]   = useState(editing);
  const [step, setStep]       = useState('form');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handlePreview = (e) => {
    e.preventDefault();
    setStep('preview');
  };

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('done');
    }, 1200);
  };

  if (step === 'done') {
    return (
      <div className="max-w-[560px] mx-auto py-10">
        <div className="bg-white rounded-3xl px-10 py-12 shadow-blue-lg border-[1.5px] border-blue-100/50 text-center animate-scale-in">
          <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-br from-emerald-100 to-[#A7F3D0] flex items-center justify-center text-[42px] mx-auto mb-6">🎉</div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-2.5">
            {editing ? 'Event Updated!' : 'Event Submitted for Review!'}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-7">
            {editing
              ? 'Your changes have been saved and resubmitted for approval.'
              : <>Thanks for publishing with Hyontrax. Our team will review <strong>{form.eventName || 'your event'}</strong> and notify you once it's approved.</>}
          </p>
          <div className="flex gap-2.5">
            <button onClick={() => navigate('/app/events/my')} className="flex-1 py-[13px] border-none rounded-xl bg-gradient-primary text-sm font-bold text-white cursor-pointer">View My Events</button>
            <button onClick={() => navigate('/app/events')} className="flex-1 py-[13px] border-[1.5px] border-blue-100 rounded-xl bg-white text-sm font-semibold text-blue-800 cursor-pointer">Browse Events</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="max-w-[640px] mx-auto">
        <button onClick={() => setStep('form')} className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all">
          ← Back to Edit
        </button>
        <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
          <div className="px-7 py-5 border-b-[1.5px] border-blue-50 bg-[#F8FBFF]">
            <div className="text-[11px] font-bold text-blue-800 uppercase tracking-[0.4px] mb-1">Preview</div>
            <p className="text-[12.5px] text-slate-400">Review before publishing</p>
          </div>
          <div className="px-7 py-6">
            <h2 className="text-xl font-extrabold text-slate-800 mb-1">{form.eventName || 'Event Name'}</h2>
            <div className="flex gap-2 flex-wrap mb-5">
              <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2.5 py-[3px] rounded-full">Category: {form.category || '—'}</span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-[3px] rounded-full">Address: {form.address || '—'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Date',         value: form.date || '—' },
                { label: 'Time',         value: form.timings || '—' },
                { label: 'Organizer',    value: form.organizerName || '—' },
                { label: 'Type',         value: form.type === 'Paid' ? `Paid — ₹${form.amount || 0}` : 'Free' },
              ].map((d) => (
                <div key={d.label} className="bg-[#F8FBFF] rounded-xl px-4 py-3 border border-blue-50">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.4px] mb-1">{d.label}</div>
                  <div className="text-[13.5px] font-semibold text-slate-800">{d.value}</div>
                </div>
              ))}
            </div>
            {form.chiefGuests && (
              <div className="bg-[#F8FBFF] rounded-xl px-4 py-3 border border-blue-50 mb-4">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.4px] mb-1">Chief Guests</div>
                <div className="text-[13.5px] font-semibold text-slate-800">{form.chiefGuests}</div>
              </div>
            )}
            <div className="text-[13.5px] text-slate-600 leading-[1.7] mb-6">{form.description || 'No description provided.'}</div>
            {(form.registrationLink || form.websiteLink) && (
              <div className="mb-6 flex flex-col gap-2">
                {form.websiteLink && <div className="text-[12.5px] text-blue-800 font-medium">🌐 {form.websiteLink}</div>}
                {form.registrationLink && <div className="text-[12.5px] text-emerald-700 font-medium">📋 {form.registrationLink}</div>}
              </div>
            )}
            <button
              onClick={handlePublish}
              disabled={loading}
              className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-blue
                ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
            >
              {loading ? '⏳ Publishing...' : editing ? 'Save Changes' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
        <form onSubmit={handlePreview}>
          <div className="bg-white rounded-[20px] px-8 py-7 shadow-blue-md border-[1.5px] border-blue-100/50 mb-5">
            <h3 className="text-lg font-extrabold text-slate-800 mb-1.5">{editing ? 'Edit Event' : 'Publish Event'}</h3>
            <p className="text-[13px] text-slate-500 mb-6">Publish an event with Hyontrax — our team reviews every submission before it goes live.</p>

            <div className="flex flex-col gap-[18px]">
              <Field label="Event Name" required>
                <input value={form.eventName} onChange={set('eventName')} placeholder="Enter event name" required className={inputClass} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Event Category" required>
                  <select value={form.category} onChange={set('category')} required className={`${inputClass} bg-white cursor-pointer`}>
                    <option value="">Select category</option>
                    {eventCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Pin Code" required>
                  <input value={form.pinCode} onChange={set('pinCode')} placeholder="Enter Pin Code" required className={inputClass} />
                </Field>
              </div>

              <Field label="Address" required>
                <input value={form.address} onChange={set('address')} placeholder="Enter address" required className={inputClass} />
              </Field>

              <Field label="Event Description" required>
                <textarea value={form.description} onChange={set('description')} placeholder="Describe the event, its agenda, what attendees will gain..." required rows={4} className={`${inputClass} resize-y leading-relaxed`} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date" required>
                  <input type="date" value={form.date} onChange={set('date')} required className={inputClass} />
                </Field>
                <Field label="Timings" required>
                  <input value={form.timings} onChange={set('timings')} placeholder="e.g. 10:00 AM – 4:00 PM" required className={inputClass} />
                </Field>
              </div>

              <Field label="Organizer / Host Name" required>
                <input value={form.organizerName} onChange={set('organizerName')} placeholder="Organization or person hosting the event" required className={inputClass} />
              </Field>

              <Field label="Chief Guests">
                <input value={form.chiefGuests} onChange={set('chiefGuests')} placeholder="e.g. Dr. A. Sharma, Prof. R. Gupta (comma-separated)" className={inputClass} />
              </Field>

              <Field label="Type" required>
                <div className="grid grid-cols-2 gap-2.5">
                  {['Free', 'Paid'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className={`px-[14px] py-3 border-2 rounded-xl cursor-pointer text-left transition-all duration-200 font-sans text-[13px] font-bold
                        ${form.type === t ? 'border-blue-700 bg-[#EBF4FF] text-blue-800' : 'border-slate-200 bg-white text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              {form.type === 'Paid' && (
                <Field label="Amount (₹)" required>
                  <input type="number" value={form.amount} onChange={set('amount')} placeholder="Enter registration fee" required className={inputClass} />
                </Field>
              )}

              <Field label="Registration Link (Google Form / External)">
                <input value={form.registrationLink} onChange={set('registrationLink')} placeholder="https://forms.gle/..." className={inputClass} />
              </Field>

              <Field label="Event Website">
                <input value={form.websiteLink} onChange={set('websiteLink')} placeholder="https://yourwebsite.com/event" className={inputClass} />
              </Field>
            </div>
          </div>

          <div className="bg-white rounded-[20px] px-7 py-6 shadow-blue-md border-[1.5px] border-blue-100/50 mb-5">
            <h4 className="text-[15px] font-bold text-slate-800 mb-4">Documents</h4>
            <div className="grid grid-cols-2 gap-4">
              <UploadBox label="Permission letter" hint="PDF up to 10MB" file={permissionLetter} onFile={setPermissionLetter} />
              <UploadBox label="Banner" hint="PNG/JPG up to 5MB" file={banner} onFile={setBanner} />
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer mb-5 px-1">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-[15px] h-[15px] mt-0.5 accent-blue-800 shrink-0" />
            <span className="text-[12.5px] text-slate-500 leading-[1.55]">I agree to the Hyontrax terms and conditions for event publishing.</span>
          </label>

          <button
            type="submit"
            disabled={!agreed}
            className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold transition-all hover:-translate-y-px hover:shadow-blue
              ${!agreed ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary cursor-pointer'}`}
          >
            Preview Event →
          </button>
        </form>

        <div className="flex flex-col gap-4 sticky top-5">
          <div className="bg-white rounded-[20px] p-[22px] shadow-blue-md border-[1.5px] border-blue-100/50">
            <h4 className="text-sm font-bold text-slate-800 mb-[14px]">Review Process</h4>
            {[
              { icon: '1️⃣', text: 'Submit your event details & documents' },
              { icon: '2️⃣', text: 'Our team reviews within 24–48 hours' },
              { icon: '3️⃣', text: 'Get notified once approved or rejected' },
            ].map((s, i) => (
              <div key={i} className={`flex gap-2.5 items-start py-2.5 ${i < 2 ? 'border-b border-slate-100' : ''}`}>
                <span className="text-base shrink-0">{s.icon}</span>
                <span className="text-[13px] text-slate-600 leading-[1.4]">{s.text}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[20px] p-[22px] shadow-blue-md border-[1.5px] border-blue-100/50">
            <h4 className="text-sm font-bold text-slate-800 mb-[14px]">Quick Links</h4>
            <button onClick={() => navigate('/app/events/my')} className="w-full flex items-center gap-2.5 py-2.5 border-none bg-transparent cursor-pointer font-sans">
              <span className="text-lg">📋</span>
              <span className="text-[13.5px] font-medium text-blue-800">View my events</span>
              <span className="ml-auto text-slate-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishEvent;
