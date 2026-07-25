import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import OtpInput from '../../components/common/OtpInput';

const passwordRules = [
  { key: 'len',   label: 'At least 8 characters',                  test: (p) => p.length >= 8 },
  { key: 'lower', label: 'At least a lower case letter (a-z)',      test: (p) => /[a-z]/.test(p) },
  { key: 'upper', label: 'At least a upper case letter (A-Z)',      test: (p) => /[A-Z]/.test(p) },
  { key: 'num',   label: 'At least a number (0-9)',                 test: (p) => /[0-9]/.test(p) },
  { key: 'sym',   label: 'At least a special character (e.g. !@#$%^&*)', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const Shell = ({ children }) => (
  <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-8 font-sans relative overflow-hidden">
    <div className="absolute w-[500px] h-[500px] rounded-full bg-white/[0.04] -top-[200px] -right-[150px]" />
    <div className="absolute w-[350px] h-[350px] rounded-full bg-white/[0.04] -bottom-[120px] -left-[100px]" />
    <div className="absolute w-[200px] h-[200px] rounded-full bg-white/[0.03] bottom-[120px] right-20" />

    <div className="relative z-10 w-full max-w-[460px]">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4"><Logo size={52} light showText={false} /></div>
        <div className="text-[22px] font-extrabold text-white tracking-[-0.3px]">Hyontrax</div>
        <div className="text-[13px] text-white/60 font-medium">Health Awareness Platform</div>
      </div>
      <div className="bg-white rounded-3xl px-10 py-11 shadow-[0_24px_80px_rgba(0,0,0,0.2)] animate-scale-in">
        {children}
      </div>
      <p className="text-center mt-5 text-[13px] text-white/55">
        New to Hyontrax?{' '}
        <Link to="/signup" className="text-white/90 font-bold no-underline">Create account</Link>
      </p>
    </div>
  </div>
);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // email | otp | newPassword | success
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(10);
  const [pwd, setPwd] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step !== 'otp' || timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer]);

  const sendOtp = (e) => {
    e.preventDefault();
    // Simulated "not registered" check — any address without an '@' fails, purely for the demo error state
    if (!email.includes('@')) { setEmailError('Provided email address is not registered'); return; }
    setEmailError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('otp'); setTimer(10); }, 1000);
  };

  const resendOtp = () => { setTimer(10); setOtp(''); setOtpError(''); };

  const confirmOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) { setOtpError('Provided OTP is incorrect'); return; }
    setOtpError('');
    setStep('newPassword');
  };

  const allRulesPass = passwordRules.every((r) => r.test(pwd.password));
  const passwordsMatch = pwd.password && pwd.password === pwd.confirm;

  const changePassword = (e) => {
    e.preventDefault();
    if (!allRulesPass || !passwordsMatch) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1200);
  };

  if (step === 'email') {
    return (
      <Shell>
        <div className="text-center mb-8">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-[32px] mx-auto mb-5">🔐</div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-2">Forget password?</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Enter the email address associated with your account and we'll send you a one-time code to reset your password.
          </p>
        </div>
        <form onSubmit={sendOtp}>
          <div className="mb-2">
            <label className="block text-[13px] font-semibold text-slate-700 mb-[7px]">Email ID</label>
            <div className="relative">
              <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-base opacity-45">📧</span>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                required
                className={`w-full py-[13px] pl-[46px] pr-4 border-[1.5px] rounded-xl text-sm outline-none text-slate-800 transition-all duration-200
                  ${emailError ? 'border-red-400' : 'border-blue-100 focus:border-blue-700 focus:ring focus:ring-blue-700/10'}`}
              />
            </div>
            {emailError && <div className="text-[12.5px] text-red-500 font-semibold mt-2">{emailError}</div>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all duration-200 mt-5 mb-4 hover:-translate-y-px hover:shadow-blue
              ${loading ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
          >
            {loading ? '⏳ Sending OTP...' : 'Send OTP →'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mb-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-800 font-bold no-underline">Sign up</Link>
        </p>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 py-3 border-[1.5px] border-blue-100 rounded-xl text-sm font-semibold text-blue-800 no-underline transition-all duration-200 bg-white hover:bg-blue-50"
        >
          ← Back to Sign In
        </Link>
      </Shell>
    );
  }

  if (step === 'otp') {
    return (
      <Shell>
        <div className="text-center mb-7">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-[32px] mx-auto mb-5">📩</div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-2">Enter OTP</h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            OTP has been sent to the email address <strong className="text-slate-700">{email}</strong>
          </p>
        </div>
        <form onSubmit={confirmOtp}>
          <div className="flex justify-center mb-3">
            <OtpInput value={otp} onChange={setOtp} error={otpError} />
          </div>
          <div className="flex justify-between items-center text-[13px] mb-6 px-1">
            <span className="text-slate-400">{timer > 0 ? `00:${String(timer).padStart(2, '0')}` : ' '}</span>
            <span className="text-slate-300">|</span>
            <button type="button" disabled={timer > 0} onClick={resendOtp}
              className={`font-semibold bg-transparent border-none ${timer > 0 ? 'text-slate-300 cursor-not-allowed' : 'text-blue-800 cursor-pointer'}`}>
              Resend OTP
            </button>
          </div>
          <button type="submit" className="w-full py-[14px] bg-gradient-primary text-white border-none rounded-xl text-[15px] font-bold cursor-pointer mb-4 hover:-translate-y-px hover:shadow-blue transition-all">
            Continue →
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-800 font-bold no-underline">Sign up</Link>
        </p>
      </Shell>
    );
  }

  if (step === 'newPassword') {
    return (
      <Shell>
        <div className="text-center mb-7">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-[32px] mx-auto mb-5">🔑</div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-[-0.4px] mb-2">Create a new password</h1>
          <p className="text-sm text-slate-500 leading-relaxed">Create a new password for your profile.</p>
        </div>
        <form onSubmit={changePassword} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-[7px]">Create Password</label>
            <input type="password" placeholder="Password" value={pwd.password}
              onChange={(e) => setPwd({ ...pwd, password: e.target.value })}
              className="w-full py-3 px-4 border-[1.5px] border-blue-100 rounded-xl text-sm outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-[7px]">Confirm Password</label>
            <input type="password" placeholder="Password" value={pwd.confirm}
              onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
              className="w-full py-3 px-4 border-[1.5px] border-blue-100 rounded-xl text-sm outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all" />
            {pwd.confirm && !passwordsMatch && <div className="text-[12px] text-red-500 font-semibold mt-1.5">Passwords do not match</div>}
          </div>

          <div className="bg-app-bg border-[1.5px] border-blue-100 rounded-xl px-4 py-[14px] flex flex-col gap-1.5">
            {passwordRules.map((r) => {
              const pass = r.test(pwd.password);
              return (
                <div key={r.key} className={`text-[12.5px] flex items-center gap-2 ${pass ? 'text-emerald-600' : 'text-slate-400'}`}>
                  <span>{pass ? '✅' : '⬜'}</span>{r.label}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={!allRulesPass || !passwordsMatch || loading}
            className={`w-full py-[14px] text-white border-none rounded-xl text-[15px] font-bold cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-blue
              ${(!allRulesPass || !passwordsMatch || loading) ? 'bg-blue-200 cursor-not-allowed' : 'bg-gradient-primary'}`}
          >
            {loading ? '⏳ Updating...' : 'Change Password'}
          </button>
        </form>
      </Shell>
    );
  }

  // success
  return (
    <Shell>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-[#A7F3D0] flex items-center justify-center text-4xl mx-auto mb-6 animate-scale-in">✅</div>
        <h2 className="text-[22px] font-extrabold text-slate-800 mb-2.5">Password Updated!</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Your password has been changed successfully. Use your new password to sign in.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full py-3 bg-gradient-primary rounded-xl text-sm font-bold text-white border-none cursor-pointer"
        >
          ← Back to Sign In
        </button>
      </div>
    </Shell>
  );
};

export default ResetPassword;
