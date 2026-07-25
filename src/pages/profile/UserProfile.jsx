import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Field = ({ label, icon, type = 'text', value, onChange, disabled }) => (
  <div>
    <label className="block text-[12.5px] font-semibold text-slate-700 mb-[5px]">{label}</label>
    <div className="relative">
      <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[15px] opacity-40">{icon}</span>
      <input type={type} value={value} onChange={onChange} disabled={disabled}
        className={`w-full py-[11px] pl-10 pr-[14px] border-[1.5px] rounded-[11px] text-[13.5px] outline-none transition-all duration-200
          ${disabled ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' : 'text-slate-800 border-blue-100 focus:border-blue-700 focus:ring focus:ring-blue-700/10'}`} />
    </div>
  </div>
);

const Avatar = ({ photoUrl, initials, size }) => (
  photoUrl ? (
    <img src={photoUrl} alt="Profile" className={`${size} rounded-full object-cover shrink-0`} />
  ) : (
    <div className={`${size} rounded-full bg-gradient-primary flex items-center justify-center text-white font-extrabold shrink-0`}>
      {initials}
    </div>
  )
);

const UserProfile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [form, setForm] = useState({
    firstName: 'Tanishk', lastName: 'Jain', email: 'tanishk.jain@example.com',
    phone: '+91 98765 43210', dob: '1994-03-12', gender: 'Male',
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-[linear-gradient(135deg,#0D47A1_0%,#1565C0_40%,#42A5F5_100%)] rounded-[20px] px-8 py-8 mb-6 relative overflow-hidden text-white">
        <div className="absolute w-[220px] h-[220px] rounded-full bg-white/[0.05] -top-16 -right-12" />
        <div className="relative z-10 flex gap-6 items-center">
          <Avatar photoUrl={photoUrl} initials="TJ" size="w-[88px] h-[88px] text-3xl border-[2.5px] border-white/30 bg-white/20 backdrop-blur-sm" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold">{form.firstName} {form.lastName}</h1>
              <span className="bg-white/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/30">User</span>
            </div>
            <div className="text-white/70 text-sm">{form.email}</div>
          </div>
          <button onClick={() => navigate('/login')}
            className="px-5 py-2.5 bg-white/15 backdrop-blur-sm border-[1.5px] border-white/20 rounded-[10px] text-white text-[13px] font-bold cursor-pointer transition-all hover:bg-white/25">
            ↩ Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[640px]">
        {/* Personal Info */}
        <div className="bg-white rounded-[20px] px-7 py-6 shadow-blue-md border-[1.5px] border-blue-100/50">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[15px] font-extrabold text-slate-800">Personal Information</h3>
            <button onClick={() => setEditing(!editing)}
              className={`px-4 py-2 border-[1.5px] border-blue-200 rounded-[10px] text-[13px] font-semibold text-blue-800 cursor-pointer ${editing ? 'bg-blue-50' : 'bg-white'}`}>
              {editing ? '✕ Cancel' : '✏️ Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div className="flex items-center gap-4 mb-1">
              <Avatar photoUrl={photoUrl} initials="TJ" size="w-14 h-14 text-lg" />
              {editing && (
                <button type="button" onClick={() => document.getElementById('profile-photo-input').click()}
                  className="px-4 py-2 border-[1.5px] border-blue-100 rounded-[10px] bg-white text-[12.5px] font-semibold text-blue-800 cursor-pointer">
                  📷 Upload Photo
                </button>
              )}
              <input id="profile-photo-input" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" icon="👤" value={form.firstName} onChange={set('firstName')} disabled={!editing} />
              <Field label="Last Name" icon="👤" value={form.lastName} onChange={set('lastName')} disabled={!editing} />
            </div>
            <Field label="Email Address" icon="📧" type="email" value={form.email} onChange={set('email')} disabled={!editing} />
            <Field label="Mobile Number" icon="📱" value={form.phone} onChange={set('phone')} disabled={!editing} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date of Birth" icon="🎂" type="date" value={form.dob} onChange={set('dob')} disabled={!editing} />
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-[5px]">Gender</label>
                <select value={form.gender} onChange={set('gender')} disabled={!editing}
                  className={`w-full py-[11px] px-[14px] border-[1.5px] rounded-[11px] text-[13.5px] outline-none transition-all duration-200
                    ${!editing ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' : 'text-slate-800 border-blue-100 focus:border-blue-700'}`}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {editing && (
              <button type="submit"
                className="w-full mt-2 py-3 bg-gradient-primary border-none rounded-xl text-white text-sm font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all">
                💾 Save Changes
              </button>
            )}
            {saved && (
              <div className="text-center text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg py-2">
                ✅ Profile updated successfully
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
