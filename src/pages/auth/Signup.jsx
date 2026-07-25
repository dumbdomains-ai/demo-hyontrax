import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import { AuthTabs } from './Login';

const Field = ({ label, type = 'text', icon, placeholder, value, onChange, half, select, options }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className={half ? 'flex-1 min-w-[120px]' : 'w-full'}>
      <label className="block text-[12.5px] font-semibold text-slate-700 mb-[5px]">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[15px] opacity-40">{icon}</span>}
        {select ? (
          <select
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full py-[11px] ${icon ? 'pl-10' : 'pl-[14px]'} pr-[14px] border-[1.5px] rounded-[11px] text-[13.5px] outline-none text-slate-800 transition-all duration-200 appearance-none cursor-pointer bg-white
              ${focused ? 'border-blue-700 ring ring-blue-700/10' : 'border-blue-100'}`}
          >
            <option value="">Select</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full py-[11px] ${icon ? 'pl-10' : 'pl-[14px]'} pr-[14px] border-[1.5px] rounded-[11px] text-[13.5px] outline-none text-slate-800 transition-all duration-200
              ${focused ? 'border-blue-700 ring ring-blue-700/10' : 'border-blue-100'}`}
          />
        )}
      </div>
    </div>
  );
};

const registrations = [
  { id: 'doctor',   label: 'Doctor',         icon: '🩺' },
  { id: 'pharmacy', label: 'Pharmacy',       icon: '💊' },
  { id: 'lab',      label: 'Diagnostic Lab', icon: '🧪' },
  { id: 'user',     label: 'User',           icon: '👤' },
];

const HeroPanel = () => (
  <div className="w-[400px] bg-[linear-gradient(145deg,#0D47A1_0%,#1565C0_40%,#1976D2_70%,#42A5F5_100%)] px-11 py-[52px] flex flex-col relative overflow-hidden shrink-0">
    <div className="absolute w-[320px] h-[320px] rounded-full bg-white/[0.04] -top-[100px] -right-[130px]" />
    <div className="absolute w-[220px] h-[220px] rounded-full bg-white/[0.05] -bottom-[60px] -left-[70px]" />

    <div className="relative z-10">
      <Logo size={40} light showText />
    </div>

    <div className="mt-[60px] relative z-10">
      <h2 className="text-[30px] font-extrabold text-white leading-tight tracking-[-0.8px] mb-3">
        Join 50,000+<br />Health Champions
      </h2>
      <p className="text-sm text-white/75 leading-relaxed mb-9">
        Get access to India's largest health awareness network. Free forever for individuals.
      </p>
      {[
        { icon: '✅', text: 'Free event registrations' },
        { icon: '✅', text: 'Expert health articles library' },
        { icon: '✅', text: 'Personalized health feed' },
        { icon: '✅', text: 'Health shorts & daily updates' },
        { icon: '✅', text: 'Verified professional onboarding' },
      ].map((f, i) => (
        <div key={i} className="flex items-center gap-3 mb-[13px]">
          <span className="text-[15px]">{f.icon}</span>
          <span className="text-sm text-white/85 font-medium">{f.text}</span>
        </div>
      ))}
    </div>

    <div className="mt-auto pt-9 relative z-10">
      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/15">
        <div className="flex gap-2.5 items-start">
          <div className="text-2xl">💬</div>
          <div>
            <p className="text-[13px] text-white/90 italic leading-[1.5]">
              "Hyontrax helped me find the cardiac screening camp that literally saved my life."
            </p>
            <p className="text-xs text-white/55 mt-2 font-semibold">— Meera Joshi, Mumbai</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', email: '', phone: '',
    password: '', confirmPwd: '',
  });
  const [registration, setRegistration] = useState('user');
  const [loading, setLoading]           = useState(false);
  const [agreed, setAgreed]             = useState(false);
  const [step, setStep]                 = useState('form'); // form | corporate | confirm

  const isProfessional = registration !== 'user';
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(isProfessional ? 'corporate' : 'confirm');
    }, 1200);
  };

  const handleConfirmRegistration = () => {
    if (isProfessional) {
      const label = registrations.find((r) => r.id === registration)?.label || 'This portal';
      navigate('/app/coming-soon', { state: { label: `${label} portal` } });
    } else {
      navigate('/app/home');
    }
  };

  if (step === 'corporate') {
    return (
      <div className="min-h-screen flex font-sans">
        <HeroPanel />
        <div className="flex-1 flex items-center justify-center bg-app-bg p-10">
          <div className="w-full max-w-[460px] bg-white rounded-3xl px-10 py-11 shadow-blue-xl animate-fade text-center">
            <div className="text-[44px] mb-4">🏢</div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-3">Use Corporate Email</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              As a {registrations.find((r) => r.id === registration)?.label.toLowerCase()} account, we recommend verifying
              with your organization's corporate email address for faster approval.
            </p>
            <div className="bg-amber-50 border-[1.5px] border-amber-200 rounded-xl px-4 py-[14px] mb-7 text-left">
              <div className="flex gap-2.5">
                <span className="text-base">⏱️</span>
                <p className="text-[12.5px] text-amber-900 leading-[1.55]">
                  Please complete your profile within <strong>72 hours</strong> to maintain full access to your account.
                </p>
              </div>
            </div>
            <button
              onClick={() => setStep('confirm')}
              className="w-full py-[14px] bg-gradient-primary text-white border-none rounded-xl text-[15px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen flex font-sans">
        <HeroPanel />
        <div className="flex-1 flex items-center justify-center bg-app-bg p-10">
          <div className="w-full max-w-[460px] bg-white rounded-3xl px-10 py-11 shadow-blue-xl animate-fade text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-[#A7F3D0] flex items-center justify-center text-4xl mx-auto mb-6 animate-scale-in">📧</div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-3">Confirm your Registration</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-2">
              Thank you for signing up with Hyontrax! Please click the button below to confirm your registration.
            </p>
            <p className="text-[12.5px] text-slate-400 leading-relaxed mb-7">
              If you didn't request this, please ignore this email.
            </p>
            <button
              onClick={handleConfirmRegistration}
              className="w-full py-[14px] bg-gradient-primary text-white border-none rounded-xl text-[15px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans">
      <HeroPanel />

      {/* Right Form */}
      <div className="flex-1 flex items-start justify-center bg-app-bg p-10 overflow-y-auto">
        <div className="w-full max-w-[520px] bg-white rounded-3xl p-10 shadow-blue-xl my-5">
          <AuthTabs active="signup" />

          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.5px] mb-[5px]">Create your account ✨</h1>
            <p className="text-sm text-slate-500">Join Hyontrax — it's free and takes 2 minutes</p>
          </div>

          {/* Registration Type */}
          <div className="mb-6">
            <label className="block text-[12.5px] font-semibold text-slate-700 mb-2.5">Registration:</label>
            <div className="grid grid-cols-4 gap-2">
              {registrations.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegistration(r.id)}
                  className={`flex flex-col items-center gap-1.5 px-2 py-3 border-[1.5px] rounded-[11px] cursor-pointer text-center transition-all duration-200 font-sans
                    ${registration === r.id ? 'border-blue-700 bg-[#EBF4FF]' : 'border-slate-200 bg-white'}`}
                >
                  <span className="text-lg">{r.icon}</span>
                  <span className={`text-[11.5px] font-semibold leading-tight ${registration === r.id ? 'text-blue-800' : 'text-slate-600'}`}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-3 mb-3">
              <Field label="First Name" icon="👤" placeholder="Akarsh" value={form.firstName} onChange={set('firstName')} half />
              <Field label="Last Name"  icon="👤" placeholder="Jain"   value={form.lastName}  onChange={set('lastName')}  half />
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Field label="Date of Birth" icon="🎂" type="date" placeholder="DD/MM/YYYY" value={form.dob} onChange={set('dob')} half />
              <Field label="Gender" select options={['Male', 'Female', 'Other']} value={form.gender} onChange={set('gender')} half />
            </div>
            <div className="flex flex-col gap-3 mb-5">
              <Field label="Email Address"  type="email" icon="📧" placeholder="your@email.com"   value={form.email} onChange={set('email')} />
              <Field label="Mobile Number"               icon="📱" placeholder="+91 98765 43210"  value={form.phone} onChange={set('phone')} />
              <Field label="Create Password"        type="password" icon="🔒" placeholder="Min 8 characters" value={form.password}   onChange={set('password')} />
              <Field label="Confirm Password"       type="password" icon="🔒" placeholder="Re-enter password" value={form.confirmPwd} onChange={set('confirmPwd')} />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer mb-5">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-[15px] h-[15px] mt-0.5 accent-blue-800 shrink-0" />
              <span className="text-[12.5px] text-slate-500 leading-[1.55]">
                Receive relevant offers and promotional communications from us. By signing up you agree to Hyontrax's{' '}
                <span className="text-blue-800 font-semibold">Terms &amp; Conditions</span> and{' '}
                <span className="text-blue-800 font-semibold">Privacy Policy</span>.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-px hover:shadow-blue
                ${(loading || !agreed) ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary cursor-pointer'}`}
            >
              {loading ? '⏳ Creating account...' : 'Sign Up →'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-semibold tracking-[0.5px]">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button className="w-full py-[11px] border-[1.5px] border-slate-200 rounded-[10px] bg-white cursor-pointer text-[13px] font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all duration-200 hover:border-blue-100 hover:bg-[#F8FBFF]">
            <span className="w-[18px] h-[18px] rounded text-white text-[10px] font-extrabold flex items-center justify-center" style={{ background: '#EA4335' }}>G</span>
            Sign up with Google
          </button>

          <p className="text-center mt-6 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-800 font-bold no-underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
