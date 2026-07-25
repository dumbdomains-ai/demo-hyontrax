import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { events } from '../../data/mockData';

const Field = ({ label, type = 'text', placeholder, value, onChange, required, icon, textarea, select, options }) => {
  const [focused, setFocused] = useState(false);
  const baseClass = `w-full border-[1.5px] rounded-[11px] text-sm outline-none text-slate-800 transition-all duration-200 ${focused ? 'border-blue-700 ring ring-blue-700/10' : 'border-blue-100'} ${icon ? 'pl-[42px]' : 'pl-[14px]'} pr-[14px] py-[11px]`;

  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && <span className={`absolute left-[13px] ${textarea ? 'top-3' : 'top-1/2 -translate-y-1/2'} text-[15px] opacity-40`}>{icon}</span>}
        {select ? (
          <select value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`${baseClass} appearance-none cursor-pointer`}>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : textarea ? (
          <textarea value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`${baseClass} resize-y min-h-[100px]`} />
        ) : (
          <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required}
            className={baseClass} />
        )}
      </div>
    </div>
  );
};

const RegisterAttendee = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const event     = events.find((e) => e.id === id) || events[0];
  const [step,       setStep]       = useState(1);
  const [registered, setRegistered] = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', org: '', designation: '',
    dietary: 'No Preference', special: '', heardFrom: 'Social Media', tshirt: 'M',
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setRegistered(true); }, 1800);
  };

  if (registered) {
    return (
      <div className="max-w-[560px] mx-auto py-10 text-center">
        <div className="bg-white rounded-3xl px-10 py-12 shadow-blue-lg border-[1.5px] border-blue-100/50 animate-scale-in">
          <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-emerald-100 to-[#A7F3D0] flex items-center justify-center text-[44px] mx-auto mb-6">🎉</div>
          <h2 className="text-[26px] font-extrabold text-slate-800 tracking-[-0.4px] mb-2.5">You're Registered!</h2>
          <p className="text-[15px] text-slate-500 leading-relaxed mb-7">
            Your registration for <strong className="text-blue-800">{event.title}</strong> is confirmed. A confirmation email has been sent to {form.email || 'your registered email'}.
          </p>

          <div className="bg-app-bg rounded-2xl p-5 mb-7 border-[1.5px] border-blue-100">
            {[
              { label: 'Event', value: event.title },
              { label: 'Date',  value: new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
              { label: 'Time',  value: event.time },
              { label: 'Venue', value: event.location },
              { label: 'Registration ID', value: `HYX-${Math.random().toString(36).substr(2, 8).toUpperCase()}` },
            ].map((d, i) => (
              <div key={i} className={`flex justify-between py-2 ${i < 4 ? 'border-b border-blue-50' : ''}`}>
                <span className="text-[13px] text-slate-500 font-medium">{d.label}</span>
                <span className="text-[13px] text-slate-800 font-semibold text-right max-w-[200px]">{d.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5">
            <button onClick={() => navigate('/app/events')} className="flex-1 py-3 border-[1.5px] border-blue-100 rounded-xl bg-white text-sm font-semibold text-blue-800 cursor-pointer">Browse More Events</button>
            <button className="flex-1 py-3 border-none rounded-xl bg-gradient-primary text-sm font-bold text-white cursor-pointer">📥 Download Ticket</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[760px] mx-auto">
      <button onClick={() => navigate(`/app/events/${id}`)} className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800">
        ← Back to Event
      </button>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl px-7 py-5 mb-5 shadow-blue-md border-[1.5px] border-blue-100/50">
        <div className="flex items-center">
          {['Personal Info', 'Additional Details', 'Review & Confirm'].map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2 flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 text-white
                  ${step > i + 1 ? 'bg-emerald-500' : step === i + 1 ? 'bg-gradient-primary' : 'bg-slate-200 !text-slate-400'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-[13px] font-${step === i + 1 ? 'bold' : 'medium'} ${step === i + 1 ? 'text-blue-800' : step > i + 1 ? 'text-emerald-500' : 'text-slate-400'}`}>{s}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-3 rounded-full ${step > i + 1 ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5 items-start">
        {/* Form */}
        <div className="bg-white rounded-[20px] p-7 shadow-blue-md border-[1.5px] border-blue-100/50">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-1.5">Personal Information</h3>
              <p className="text-[13px] text-slate-500 mb-6">Please enter your details as they should appear on the certificate.</p>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-[14px]">
                  <Field label="First Name" placeholder="Akarsh" value={form.firstName} onChange={set('firstName')} required icon="👤" />
                  <Field label="Last Name"  placeholder="Jain"   value={form.lastName}  onChange={set('lastName')}  required icon="👤" />
                </div>
                <Field label="Email Address"            type="email" placeholder="your@email.com"      value={form.email}       onChange={set('email')}       required icon="📧" />
                <Field label="Phone Number"                          placeholder="+91 98765 43210"     value={form.phone}       onChange={set('phone')}       required icon="📱" />
                <Field label="Organization / Hospital"              placeholder="e.g. Apollo Hospitals" value={form.org}        onChange={set('org')}                  icon="🏥" />
                <Field label="Designation / Role"                   placeholder="e.g. Senior Cardiologist" value={form.designation} onChange={set('designation')}    icon="💼" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-1.5">Additional Details</h3>
              <p className="text-[13px] text-slate-500 mb-6">Help us make your experience better.</p>
              <div className="flex flex-col gap-4">
                <Field label="Dietary Preference" select options={['No Preference','Vegetarian','Vegan','Jain','Non-Vegetarian','Gluten-Free']} value={form.dietary} onChange={set('dietary')} icon="🍽️" />
                <Field label="T-Shirt Size" select options={['XS','S','M','L','XL','XXL']} value={form.tshirt} onChange={set('tshirt')} icon="👕" />
                <Field label="How did you hear about us?" select options={['Social Media','WhatsApp','Email Newsletter','Friend / Colleague','Hospital / Clinic','Google Search','Other']} value={form.heardFrom} onChange={set('heardFrom')} icon="📣" />
                <Field label="Special Requirements / Accessibility Needs" textarea placeholder="E.g., wheelchair access, dietary allergy details, sign language interpreter..." value={form.special} onChange={set('special')} icon="ℹ️" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-1.5">Review & Confirm</h3>
              <p className="text-[13px] text-slate-500 mb-5">Please review your details before confirming your registration.</p>
              <div className="flex flex-col gap-2 bg-[#F8FBFF] rounded-[14px] p-[18px] border-[1.5px] border-blue-50 mb-5">
                {[
                  { label: 'Name',         value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email',        value: form.email },
                  { label: 'Phone',        value: form.phone },
                  { label: 'Organization', value: form.org || '—' },
                  { label: 'Designation',  value: form.designation || '—' },
                  { label: 'Dietary',      value: form.dietary },
                  { label: 'T-Shirt',      value: form.tshirt },
                ].map((d, i) => (
                  <div key={i} className={`flex justify-between py-1.5 ${i < 6 ? 'border-b border-blue-50' : ''}`}>
                    <span className="text-[13px] text-slate-500 font-medium">{d.label}</span>
                    <span className="text-[13px] text-slate-800 font-semibold">{d.value}</span>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required className="w-[15px] h-[15px] mt-[3px] accent-blue-800 shrink-0" />
                <span className="text-[13px] text-slate-500 leading-[1.55]">
                  I confirm that the above details are correct and I agree to the event's{' '}
                  <span className="text-blue-800 font-semibold cursor-pointer">terms and conditions</span>.
                  I consent to receiving event-related communications from Hyontrax.
                </span>
              </label>
            </div>
          )}

          <div className="flex gap-2.5 mt-7 pt-5 border-t-[1.5px] border-slate-100">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 py-[13px] border-[1.5px] border-blue-100 rounded-xl bg-white text-sm font-semibold text-blue-800 cursor-pointer">← Previous</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="flex-1 py-[13px] border-none rounded-xl bg-gradient-primary text-sm font-bold text-white cursor-pointer">Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className={`flex-1 py-[13px] border-none rounded-xl text-sm font-bold text-white ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary cursor-pointer'}`}>
                {loading ? '⏳ Confirming...' : '✅ Confirm Registration'}
              </button>
            )}
          </div>
        </div>

        {/* Event Summary */}
        <div className="bg-white rounded-[20px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50 sticky top-5">
          <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.5px] mb-4">Event Summary</h4>
          <div className="h-20 rounded-xl flex items-center justify-center text-[40px] mb-[14px]" style={{ background: event.color }}>{event.image}</div>
          <div className="text-sm font-bold text-slate-800 leading-[1.35] mb-[14px]">{event.title}</div>
          {[
            { icon: '📅', text: new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
            { icon: '⏰', text: event.time },
            { icon: '📍', text: event.location },
          ].map((d, i) => (
            <div key={i} className="flex gap-2 text-[12.5px] text-slate-500 mb-2">
              <span>{d.icon}</span><span>{d.text}</span>
            </div>
          ))}
          <div className="border-t-[1.5px] border-slate-100 mt-[14px] pt-[14px] flex justify-between">
            <span className="text-sm text-slate-500">Fee</span>
            <span className={`text-base font-extrabold ${event.price === 'Free' ? 'text-emerald-500' : 'text-blue-800'}`}>{event.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAttendee;
