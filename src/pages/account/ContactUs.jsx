import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputClass = 'w-full px-[14px] py-3 border-[1.5px] border-blue-100 rounded-xl text-sm outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all';

const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', concern: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <div className="max-w-[560px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
      >
        ← Back
      </button>

      <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 px-9 py-8">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-[#A7F3D0] flex items-center justify-center text-4xl mx-auto mb-6 animate-scale-in">✅</div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2.5">Message Sent!</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Thanks for reaching out. Our support team typically responds within 24 hours.
            </p>
            <button onClick={() => navigate('/app/home')} className="px-6 py-3 bg-gradient-primary text-white border-none rounded-xl text-sm font-bold cursor-pointer">Back to Home</button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-1.5">Contact Us</h1>
            <p className="text-sm text-slate-500 mb-7">Have a question or concern? We'd love to hear from you.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input value={form.name} onChange={set('name')} placeholder="Enter name" required className={inputClass} />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="Enter email address" required className={inputClass} />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Your Concern</label>
                <textarea value={form.concern} onChange={set('concern')} placeholder="Enter your concern" required rows={5} className={`${inputClass} resize-y leading-relaxed`} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all hover:-translate-y-px hover:shadow-blue
                  ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
              >
                {loading ? '⏳ Sending...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
