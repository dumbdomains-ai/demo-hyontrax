import React from 'react';
import InfoPage from './InfoPage';

const stats = [
  { num: '100+', label: 'Community Members' },
  { num: '100+', label: 'Partner Hospitals' },
  { num: '100+', label: 'Certified Doctors' },
  { num: '100+', label: 'Stories Shared' },
];

const AboutUs = () => (
  <InfoPage icon="💙" title="About Us">
    <p>
      At Hyontrax, our mission is to make quality healthcare information and access more equitable
      across India. We connect everyday people with health events, verified doctors, hospitals, and
      expert-curated content — all in one trusted, easy-to-use platform.
    </p>
    <p>
      From free vaccination drives and blood donation camps to expert insights on chronic disease
      management, Hyontrax exists to close the gap between people and the healthcare resources they
      need, wherever they are.
    </p>
    <div className="grid grid-cols-4 gap-4 mt-2">
      {stats.map((s) => (
        <div key={s.label} className="text-center bg-[#F8FBFF] rounded-xl px-3 py-4 border border-blue-50">
          <div className="text-xl font-extrabold text-blue-800 mb-1">{s.num}</div>
          <div className="text-[11.5px] text-slate-500 font-medium leading-tight">{s.label}</div>
        </div>
      ))}
    </div>
  </InfoPage>
);

export default AboutUs;
