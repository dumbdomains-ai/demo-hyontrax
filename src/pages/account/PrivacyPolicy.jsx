import React from 'react';
import InfoPage from './InfoPage';

const PrivacyPolicy = () => (
  <InfoPage icon="🔒" title="Privacy Policy" subtitle="Last updated: July 2026">
    <p>
      Hyontrax ("we," "us," or "our") respects your privacy. This policy explains what information
      we collect, how we use it, and the choices you have.
    </p>
    <p>
      <strong className="text-slate-800">Information we collect.</strong> When you create an account,
      we collect your name, email address, phone number, date of birth and gender. When you publish
      or register for events, we may also collect address, payment, and document details you submit.
    </p>
    <p>
      <strong className="text-slate-800">How we use it.</strong> We use your information to operate
      your account, process event registrations and publications, send relevant notifications, and
      improve the platform. We do not sell your personal data to third parties.
    </p>
    <p>
      <strong className="text-slate-800">Data security.</strong> We use industry-standard safeguards
      to protect your information, including encrypted storage and restricted internal access.
    </p>
    <p>
      <strong className="text-slate-800">Your choices.</strong> You can review and update your profile
      information at any time from Edit Profile, and you may request account deletion by contacting
      us through the Contact Us page.
    </p>
  </InfoPage>
);

export default PrivacyPolicy;
