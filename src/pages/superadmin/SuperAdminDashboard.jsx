import React from 'react';
import { useNavigate } from 'react-router-dom';
import { adminUsers, pendingTestimonies, auditLogs, events, articles, healthShorts, testimonies, supportTickets } from '../../data/mockData';

const StatCard = ({ label, value, sub, icon, bg, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:-translate-y-[2px] hover:shadow-blue-lg transition-all duration-200' : ''}`}
  >
    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl shrink-0" style={{ background: bg }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[26px] font-extrabold text-slate-800 leading-none mb-0.5">{value}</div>
      <div className="text-[12px] font-semibold text-slate-500">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
    </div>
  </div>
);

const actionColors = {
  Created:    { bg: '#D1FAE5', color: '#065F46' },
  Published:  { bg: '#DBEAFE', color: '#1E40AF' },
  Updated:    { bg: '#FEF3C7', color: '#92400E' },
  Resolved:   { bg: '#D1FAE5', color: '#065F46' },
  Approved:   { bg: '#D1FAE5', color: '#065F46' },
  Rejected:   { bg: '#FEE2E2', color: '#991B1B' },
  Submitted:  { bg: '#EDE9FE', color: '#5B21B6' },
  Deactivated:{ bg: '#FEE2E2', color: '#991B1B' },
  Promoted:   { bg: '#CCFBF1', color: '#134E4A' },
  Activated:  { bg: '#D1FAE5', color: '#065F46' },
};

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const totalUsers  = adminUsers.filter((u) => u.role === 'user').length;
  const totalAdmins = adminUsers.filter((u) => u.role === 'admin').length;
  const activeUsers = adminUsers.filter((u) => u.status === 'active').length;
  const totalContent = articles.length + healthShorts.length + testimonies.length;
  const openTickets = supportTickets.filter((t) => t.status === 'Open').length;

  const recentLogs = auditLogs.slice(0, 6);

  const formatTs = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div>
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users"         value={totalUsers}  sub={`${activeUsers} active · ${adminUsers.filter((u) => u.status === 'inactive').length} inactive`} icon="👥" bg="#EFF6FF" onClick={() => navigate('/app/superadmin/users')} />
        <StatCard label="Admins"              value={totalAdmins} sub="Platform administrators"   icon="🛡️" bg="#EDE9FE" onClick={() => navigate('/app/superadmin/users')} />
        <StatCard label="Pending Approvals"   value={pendingTestimonies.length} sub="Testimonies awaiting review" icon="✅" bg="#FEF3C7" onClick={() => navigate('/app/superadmin/approvals')} />
        <StatCard label="Published Content"   value={totalContent} sub={`${events.length} events · ${openTickets} open tickets`} icon="📊" bg="#D1FAE5" />
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        {/* Audit log */}
        <div className="bg-white rounded-[18px] p-6 shadow-blue-md border-[1.5px] border-blue-100/50">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-extrabold text-slate-800">Audit Log</h3>
            <button onClick={() => navigate('/app/superadmin/audit')} className="text-[12px] font-semibold text-blue-800 bg-blue-50 border-none rounded-lg px-3 py-1.5 cursor-pointer hover:bg-blue-100 transition-all">
              View All →
            </button>
          </div>
          <div className="flex flex-col">
            {recentLogs.map((log, i) => {
              const badge = actionColors[log.action] || { bg: '#F1F5F9', color: '#475569' };
              return (
                <div key={log.id} className={`flex gap-3 items-start py-3 ${i < recentLogs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-300 mt-1.5" />
                    {i < recentLogs.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-1" style={{ minHeight: 20 }} />}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[11px] font-bold px-2 py-[2px] rounded-full" style={{ background: badge.bg, color: badge.color }}>{log.action}</span>
                      <span className="text-[11px] font-semibold text-slate-400">{log.module}</span>
                    </div>
                    <p className="text-[12.5px] text-slate-600 leading-[1.5]">{log.detail}</p>
                    <div className="text-[11px] text-slate-400 mt-0.5">{log.user} · {formatTs(log.timestamp)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Pending Approvals */}
          <div className="bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-extrabold text-slate-800">Pending Approvals</h3>
              <button onClick={() => navigate('/app/superadmin/approvals')} className="text-[11.5px] font-semibold text-blue-800 bg-blue-50 border-none rounded-lg px-2.5 py-1 cursor-pointer hover:bg-blue-100 transition-all">
                Review →
              </button>
            </div>
            {pendingTestimonies.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">All caught up!</div>
            ) : (
              <div className="flex flex-col gap-2">
                {pendingTestimonies.map((t) => (
                  <div key={t.id} className="flex gap-3 items-start p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="text-xl shrink-0">{t.image}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-bold text-slate-800">{t.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{t.title}</div>
                      <div className="text-[10.5px] text-slate-400 mt-0.5">Submitted by {t.submittedBy} · {t.disease}</div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate('/app/superadmin/approvals')}
                  className="w-full mt-1 py-2.5 bg-gradient-primary text-white border-none rounded-xl text-[12.5px] font-bold cursor-pointer hover:-translate-y-px hover:shadow-blue transition-all"
                >
                  Review All Approvals
                </button>
              </div>
            )}
          </div>

          {/* User overview */}
          <div className="bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-extrabold text-slate-800">User Overview</h3>
              <button onClick={() => navigate('/app/superadmin/users')} className="text-[11.5px] font-semibold text-blue-800 bg-blue-50 border-none rounded-lg px-2.5 py-1 cursor-pointer hover:bg-blue-100 transition-all">
                Manage →
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Active Users',   value: adminUsers.filter((u) => u.status === 'active' && u.role === 'user').length,   color: '#065F46', bg: '#D1FAE5' },
                { label: 'Inactive Users', value: adminUsers.filter((u) => u.status === 'inactive').length,                       color: '#991B1B', bg: '#FEE2E2' },
                { label: 'Admins',         value: adminUsers.filter((u) => u.role === 'admin').length,                            color: '#5B21B6', bg: '#EDE9FE' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[12.5px] text-slate-600 font-medium">{item.label}</span>
                  <span className="text-[13px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: item.bg, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
