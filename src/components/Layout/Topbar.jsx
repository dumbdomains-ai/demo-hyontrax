import React from 'react';
import { useLocation } from 'react-router-dom';

const pageNames = {
  '/app/home':           { title: 'Home',                   subtitle: 'Your health journey starts here' },
  '/app/events/publish': { title: 'Publish Event',          subtitle: 'Submit an event for review with Hyontrax' },
  '/app/events/my':      { title: 'My Events',              subtitle: 'Track the approval status of your published events' },
  '/app/events':         { title: 'Browse Events',          subtitle: 'Discover upcoming health events near you' },
  '/app/expert':         { title: 'Expert Opinion',         subtitle: 'Curated health insights from certified experts' },
  '/app/shorts':         { title: 'Health Shorts',          subtitle: 'Quick-scroll health news and updates' },
  '/app/profile':        { title: 'Edit Profile',           subtitle: 'Manage your account details' },
  '/app/account/terms':   { title: 'Terms & Conditions',    subtitle: 'Please review our platform terms' },
  '/app/account/privacy': { title: 'Privacy Policy',        subtitle: 'How we handle your data' },
  '/app/account/about':   { title: 'About Us',              subtitle: 'Our mission at Hyontrax' },
  '/app/account/contact': { title: 'Contact Us',            subtitle: "We'd love to hear from you" },
  '/app/testimony':        { title: 'Patient Testimony',     subtitle: 'Real stories from real patients' },
  '/app/coming-soon':     { title: 'Coming Soon',            subtitle: 'Your health, your way' },
  '/app/admin':                    { title: 'Admin Dashboard',      subtitle: 'Platform overview and quick actions' },
  '/app/admin/content':            { title: 'Content Management',   subtitle: 'Manage articles, shorts, and testimonies' },
  '/app/admin/events':             { title: 'Event Management',     subtitle: 'Create, edit, and track platform events' },
  '/app/admin/registrations':      { title: 'Registrations',        subtitle: 'Track all event registrations across the platform' },
  '/app/admin/support':            { title: 'Support Tickets',      subtitle: 'Manage and resolve user support requests' },
  '/app/superadmin':               { title: 'Super Admin Dashboard', subtitle: 'Full platform oversight and control' },
  '/app/superadmin/users':         { title: 'User Management',      subtitle: 'Manage user lifecycle, roles, and access' },
  '/app/superadmin/approvals':     { title: 'Approval Workflows',   subtitle: 'Review and approve admin-submitted content' },
  '/app/superadmin/audit':         { title: 'Audit Logs',           subtitle: 'Full activity tracking across all modules' },
};

const Topbar = () => {
  const location = useLocation();

  const getPageInfo = () => {
    for (const [key, val] of Object.entries(pageNames)) {
      if (location.pathname === key || location.pathname.startsWith(key + '/')) return val;
    }
    return { title: 'Hyontrax', subtitle: 'Health Awareness Platform' };
  };

  const page = getPageInfo();

  return (
    <header className="h-[68px] bg-white border-b-[1.5px] border-blue-50 flex items-center justify-between px-8 shadow-[0_2px_8px_rgba(21,101,192,0.04)] sticky top-0 z-[100] shrink-0">
      <div>
        <div className="text-lg font-extrabold text-slate-800 tracking-[-0.3px] leading-tight">{page.title}</div>
        <div className="text-xs text-slate-400 font-medium mt-px">{page.subtitle}</div>
      </div>
    </header>
  );
};

export default Topbar;
