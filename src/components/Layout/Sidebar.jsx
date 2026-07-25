import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Logo";

const accountMenuItems = [
  { icon: "✏️", label: "Edit Profile",        path: "/app/profile" },
  { icon: "📋", label: "My Events",           path: "/app/events/my" },
  { icon: "📄", label: "Terms & Conditions",   path: "/app/account/terms" },
  { icon: "🔒", label: "Privacy Policy",       path: "/app/account/privacy" },
  { icon: "💙", label: "About Us",             path: "/app/account/about" },
  { icon: "✉️", label: "Contact Us",           path: "/app/account/contact" },
];

const navSections = [
  {
    section: "Discover",
    items: [
      { path: "/app/home",      label: "Home",              icon: "🏠", badge: null },
      { path: "/app/events",    label: "Events",            icon: "📅", badge: null },
      { path: "/app/expert",    label: "Expert Opinion",    icon: "🧠", badge: null },
      { path: "/app/shorts",    label: "Health Shorts",     icon: "📰", badge: null },
      { path: "/app/testimony", label: "Patient Testimony", icon: "💬", badge: null },
    ],
  },
  {
    section: "Admin Panel",
    role: "admin",
    items: [
      { path: "/app/admin",               label: "Dashboard",      icon: "📊", badge: null },
      { path: "/app/admin/content",       label: "Content",        icon: "📝", badge: null },
      { path: "/app/admin/events",        label: "Events",         icon: "📅", badge: null },
      { path: "/app/admin/registrations", label: "Registrations",  icon: "📋", badge: null },
    ],
  },
  {
    section: "Super Admin",
    role: "superadmin",
    items: [
      { path: "/app/superadmin",           label: "Dashboard",      icon: "🏛️", badge: null },
      { path: "/app/superadmin/users",     label: "User Management",icon: "👥", badge: null },
      { path: "/app/superadmin/approvals", label: "Approvals",      icon: "✅", badge: "3"  },
      { path: "/app/superadmin/audit",     label: "Audit Logs",     icon: "📜", badge: null },
    ],
  },
];

const NavItem = ({ item, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full px-3 py-2.5 border-none rounded-[10px] flex items-center gap-2.5 cursor-pointer transition-all duration-200 text-sm mb-0.5 text-left relative
      ${
        active
          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold"
          : "bg-transparent text-slate-600 font-medium hover:bg-app-bg hover:text-blue-800"
      }`}
  >
    <span className="text-lg w-[22px] text-center shrink-0">{item.icon}</span>
    <span className="flex-1">{item.label}</span>
    {item.badge && (
      <span
        className={`text-white text-[10px] font-bold px-[7px] py-0.5 rounded-full tracking-[0.2px]
        ${item.badge === "New" ? "bg-gradient-primary" : "bg-red-500"}`}
      >
        {item.badge}
      </span>
    )}
    {active && (
      <div className="w-[3px] h-[18px] bg-gradient-primary rounded-sm absolute right-0" />
    )}
  </button>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (path) => {
    if (path === "/app/home") return location.pathname === "/app/home";
    if (path === "/app/admin") return location.pathname === "/app/admin";
    if (path === "/app/superadmin") return location.pathname === "/app/superadmin";
    return location.pathname.startsWith(path);
  };

  const currentRole = location.pathname.startsWith("/app/superadmin")
    ? { label: "Super Admin", initials: "SA", color: "#F59E0B" }
    : location.pathname.startsWith("/app/admin")
    ? { label: "Admin", initials: "AU", color: "#8B5CF6" }
    : { label: "User", initials: "TJ", color: null };

  return (
    <aside className="w-64 min-h-screen bg-white border-r-[1.5px] border-blue-50 flex flex-col shrink-0 shadow-blue-sm">
      <div className="px-5 py-[22px] border-b-[1.5px] border-blue-50">
        <Logo size={34} />
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.section} className="mb-5">
            <div className={`text-[10px] font-bold uppercase tracking-[1px] px-2.5 mb-2 ${
              section.role === 'admin'      ? 'text-violet-400' :
              section.role === 'superadmin' ? 'text-amber-500' :
              'text-slate-400'
            }`}>
              {section.section}
            </div>
            {section.items.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                active={isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>
        ))}
      </nav>

      <div ref={menuRef} className="relative px-4 py-[14px] border-t-[1.5px] border-blue-50">
        {menuOpen && (
          <div className="absolute bottom-[64px] left-3 right-3 bg-white rounded-2xl shadow-blue-xl border-[1.5px] border-blue-50 z-[200] overflow-hidden animate-scale-in">
            <div className="px-4 py-3 border-b-[1.5px] border-blue-50">
              <div className="text-[13px] font-bold text-slate-800">Tanishk Jain</div>
              <div className="text-[11px] text-slate-400">{currentRole.label} Account</div>
            </div>
            {accountMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setMenuOpen(false); navigate(item.path); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 border-none bg-transparent cursor-pointer text-left hover:bg-app-bg transition-colors font-sans"
              >
                <span className="text-base w-5 shrink-0">{item.icon}</span>
                <span className="text-[13px] font-medium text-slate-700">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 border-none bg-transparent cursor-pointer text-left hover:bg-red-50 transition-colors border-t border-slate-100 font-sans"
            >
              <span className="text-base w-5 shrink-0">↩</span>
              <span className="text-[13px] font-semibold text-red-600">Log Out</span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 flex-1 min-w-0 bg-transparent border-none cursor-pointer text-left p-0"
            title="Account menu"
          >
            <div
              className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${!currentRole.color ? 'bg-gradient-primary' : ''}`}
              style={currentRole.color ? { background: `linear-gradient(135deg, ${currentRole.color}, ${currentRole.color}99)` } : {}}
            >
              {currentRole.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-800 truncate">
                Tanishk Jain
              </div>
              <div className="text-[11px] text-slate-400">{currentRole.label}</div>
            </div>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-app-bg border-none cursor-pointer text-[13px] px-2 py-[5px] rounded-[6px] text-slate-500 font-semibold shrink-0"
            title="Account menu"
          >
            {menuOpen ? '▾' : '▴'}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
