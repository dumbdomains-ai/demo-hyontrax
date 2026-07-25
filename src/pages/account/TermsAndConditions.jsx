import React from 'react';
import InfoPage from './InfoPage';

const TermsAndConditions = () => (
  <InfoPage icon="📄" title="Terms and Conditions" subtitle="Last updated: July 2026">
    <p>
      Hyontrax ("we," "us," or "our") provides this platform to help you discover health events,
      connect with certified experts, and stay informed on health awareness topics. By creating an
      account or using our services, you agree to be bound by the following terms.
    </p>
    <p>
      <strong className="text-slate-800">Account responsibilities.</strong> You are responsible for
      keeping your login credentials secure and for all activity that occurs under your account.
      Please notify us immediately of any unauthorized use.
    </p>
    <p>
      <strong className="text-slate-800">Event listings.</strong> Events published on Hyontrax are
      reviewed before going live, but we do not guarantee the accuracy of third-party organizer
      details. Always verify event specifics directly with the organizer where possible.
    </p>
    <p>
      <strong className="text-slate-800">Acceptable use.</strong> You agree not to misuse the
      platform — this includes publishing false event information, harassing other members, or
      attempting to access accounts or data that isn't yours.
    </p>
    <p>
      <strong className="text-slate-800">Changes to these terms.</strong> We may update these terms
      from time to time. Continued use of Hyontrax after changes take effect constitutes acceptance
      of the revised terms.
    </p>
    <p>
      Questions about these terms can be sent through our Contact Us page.
    </p>
  </InfoPage>
);

export default TermsAndConditions;
