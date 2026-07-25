import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import OtpInput from '../../components/common/OtpInput';

const features = [
  { icon: '📅', text: 'Discover & register for health events' },
  { icon: '🧠', text: 'Expert-curated health articles' },
  { icon: '📰', text: 'Bite-sized daily health shorts' },
  { icon: '👤', text: 'One account, your whole health journey' },
];

const InputField = ({ label, type, icon, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-base opacity-45">{icon}</span>
        <input
          type={isPassword ? (showPwd ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full py-3 pr-4 pl-11 border-[1.5px] rounded-xl text-sm outline-none text-slate-800 transition-all duration-200
            ${focused ? 'border-blue-700 ring ring-blue-700/10' : 'border-blue-100'}
            ${isPassword ? 'pr-11' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-base opacity-45 p-0"
          >
            {showPwd ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
};

// Left gradient panel shared by Login/Signup
const HeroPanel = () => (
  <div className="w-[460px] bg-gradient-hero px-12 py-14 flex flex-col relative overflow-hidden shrink-0">
    <div className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.04] -top-[120px] -right-[150px]" />
    <div className="absolute w-[260px] h-[260px] rounded-full bg-white/[0.05] -bottom-[70px] -left-[90px]" />
    <div className="absolute w-[150px] h-[150px] rounded-full bg-white/[0.03] bottom-[220px] -right-10" />

    <div className="relative z-10">
      <Logo size={44} light showText />
    </div>

    <div className="mt-[72px] relative z-10">
      <h2 className="text-[34px] font-extrabold text-white leading-tight tracking-[-1px] mb-[14px]">
        Your Health Journey<br />Starts Here
      </h2>
      <p className="text-[15px] text-white/75 leading-relaxed mb-10">
        Access curated health events, expert insights, and comprehensive wellness resources — all in one place.
      </p>
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-[14px] mb-4">
          <div className="w-10 h-10 rounded-[11px] bg-white/[0.14] flex items-center justify-center text-lg shrink-0 backdrop-blur-sm">
            {f.icon}
          </div>
          <span className="text-sm text-white/85 font-medium">{f.text}</span>
        </div>
      ))}
    </div>

    <div className="relative z-10 mt-auto pt-10 border-t border-white/10">
      <div className="flex gap-6">
        {[{ num: '50K+', label: 'Members' }, { num: '200+', label: 'Events' }, { num: '98%', label: 'Satisfaction' }].map((s, i) => (
          <div key={i}>
            <div className="text-[22px] font-extrabold text-white">{s.num}</div>
            <div className="text-xs text-white/55 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Log in / Sign up tab switcher shown at the top of both auth cards
export const AuthTabs = ({ active }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-1 bg-app-bg rounded-xl p-1 mb-7 border-[1.5px] border-blue-50">
      {[{ key: 'login', label: 'Log in', path: '/login' }, { key: 'signup', label: 'Sign up', path: '/signup' }].map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => navigate(t.path)}
          className={`flex-1 py-2.5 rounded-[10px] border-none text-sm font-bold cursor-pointer transition-all duration-150 font-sans
            ${active === t.key ? 'bg-white text-blue-800 shadow-blue-sm' : 'bg-transparent text-slate-400'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('password'); // 'password' | 'otp'

  // Password mode state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP mode state
  const [otpStep, setOtpStep] = useState('email'); // 'email' | 'otp'
  const [otpEmail, setOtpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (mode !== 'otp' || otpStep !== 'otp' || timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, otpStep, timer]);

  const handleLogin = (e, destination = '/app/home') => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate(destination); }, 1400);
  };

  const sendOtp = (e) => {
    e.preventDefault();
    setOtpStep('otp');
    setTimer(10);
    setOtpError('');
  };

  const resendOtp = () => { setTimer(10); setOtp(''); setOtpError(''); };

  const confirmOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) { setOtpError('Please enter the complete 4-digit OTP'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/app/home'); }, 1000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      <HeroPanel />

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center bg-app-bg p-10">
        <div className="w-full max-w-[440px] bg-white rounded-3xl px-10 py-11 shadow-blue-xl animate-fade">
          <AuthTabs active="login" />

          <div className="mb-6">
            <h1 className="text-[26px] font-extrabold text-slate-800 tracking-[-0.5px] mb-1.5">Welcome back 👋</h1>
            <p className="text-sm text-slate-500">Sign in to your Hyontrax account</p>
          </div>

          {/* Demo role quick-login */}
          <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-[11.5px] font-bold text-amber-700 uppercase tracking-[0.5px] mb-3">Demo — Quick Login</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'User', icon: '👤', path: '/app/home', color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100' },
                { label: 'Admin', icon: '🛡️', path: '/app/admin', color: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100' },
                { label: 'Super Admin', icon: '🏛️', path: '/app/superadmin', color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' },
              ].map((role) => (
                <button
                  key={role.label}
                  type="button"
                  onClick={() => navigate(role.path)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-[1.5px] text-center cursor-pointer transition-all duration-150 font-sans ${role.color}`}
                >
                  <span className="text-xl">{role.icon}</span>
                  <span className="text-[11px] font-bold leading-tight">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {mode === 'password' ? (
            <>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <InputField label="Email ID" type="email" icon="📧" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Password" type="password" icon="🔒" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-slate-600">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-[14px] h-[14px] accent-blue-800" />
                    Remember me
                  </label>
                  <Link to="/reset-password" className="text-[13px] text-blue-800 font-semibold no-underline">
                    Forget password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all duration-200 tracking-[0.2px] mt-1 hover:-translate-y-px hover:shadow-blue
                    ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
                >
                  {loading ? '⏳ Signing in...' : 'Log In →'}
                </button>
              </form>

              <button
                type="button"
                onClick={() => { setMode('otp'); setOtpStep('email'); }}
                className="w-full text-center mt-4 text-[13px] font-semibold text-blue-800 bg-transparent border-none cursor-pointer"
              >
                Login with OTP instead of Password
              </button>
            </>
          ) : (
            <>
              {otpStep === 'email' ? (
                <form onSubmit={sendOtp} className="flex flex-col gap-4">
                  <p className="text-[13px] text-slate-500 -mt-2 mb-1">
                    Enter the email address associated with your account and we'll send you a one-time code.
                  </p>
                  <InputField label="Email ID" type="email" icon="📧" placeholder="your@email.com" value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} />
                  <button type="submit" className="w-full py-[14px] bg-gradient-primary text-white border-none rounded-xl text-[15px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">
                    Send OTP →
                  </button>
                </form>
              ) : (
                <form onSubmit={confirmOtp} className="flex flex-col gap-4">
                  <p className="text-[13px] text-slate-500 -mt-2">
                    OTP has been sent to <strong className="text-slate-700">{otpEmail || 'your email address'}</strong>
                  </p>
                  <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-2">Enter OTP</label>
                    <OtpInput value={otp} onChange={setOtp} error={otpError} />
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-slate-400">{timer > 0 ? `00:${String(timer).padStart(2, '0')}` : ' '}</span>
                    <button type="button" disabled={timer > 0} onClick={resendOtp}
                      className={`font-semibold bg-transparent border-none ${timer > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-800 cursor-pointer'}`}>
                      Resend OTP
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-blue
                      ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
                  >
                    {loading ? '⏳ Verifying...' : 'Continue →'}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setMode('password')}
                className="w-full text-center mt-4 text-[13px] font-semibold text-blue-800 bg-transparent border-none cursor-pointer"
              >
                ← Login with Password instead
              </button>
            </>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 font-semibold tracking-[0.5px]">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            className="w-full py-[11px] border-[1.5px] border-slate-200 rounded-[10px] bg-white cursor-pointer text-[13px] font-semibold text-slate-600 flex items-center justify-center gap-2 transition-all duration-200 hover:border-blue-100 hover:bg-[#F8FBFF]"
          >
            <span className="w-[18px] h-[18px] rounded text-white text-[10px] font-extrabold flex items-center justify-center" style={{ background: '#EA4335' }}>G</span>
            Log in with Google
          </button>

          <p className="text-center mt-7 text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-800 font-bold no-underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
