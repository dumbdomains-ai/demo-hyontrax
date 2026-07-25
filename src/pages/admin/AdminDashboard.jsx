import React from 'react';
import { useNavigate } from 'react-router-dom';
import { articles, healthShorts, testimonies, pendingTestimonies, rejectedContent, auditLogs, myEvents } from '../../data/mockData';

const StatCard = ({ label, value, sub, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:-translate-y-[2px] hover:shadow-blue-lg transition-all duration-200' : ''}`}
  >
    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl shrink-0" style={{ background: color }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[28px] font-extrabold text-slate-800 leading-none mb-0.5">{value}</div>
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
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const activeEvents    = myEvents.filter((e) => e.status === 'approved').length;
  const publishedContent = articles.length + healthShorts.length + testimonies.length;

  const recentLogs = auditLogs.filter((l) => l.user === 'Admin User').slice(0, 5);

  const formatTs = (ts) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Published Content"
          value={publishedContent}
          sub={`${articles.length} articles · ${healthShorts.length} shorts · ${testimonies.length} stories`}
          icon="📝" color="#EFF6FF"
          onClick={() => navigate('/app/admin/content')}
        />
        <StatCard
          label="Pending Approvals"
          value={pendingTestimonies.length}
          sub="Awaiting Super Admin review"
          icon="⏳" color="#FEF3C7"
          onClick={() => navigate('/app/admin/content')}
        />
        <StatCard
          label="Active Events"
          value={activeEvents}
          sub={`${myEvents.length} total submitted`}
          icon="📅" color="#D1FAE5"
          onClick={() => navigate('/app/admin/events')}
        />
        <StatCard
          label="Rejected Content"
          value={rejectedContent.length}
          sub="Returned by Super Admin"
          icon="🚫" color="#FEE2E2"
          onClick={() => navigate('/app/admin/content')}
        />
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        {/* Recent Activity */}
        <div className="bg-white rounded-[18px] p-6 shadow-blue-md border-[1.5px] border-blue-100/50">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[15px] font-extrabold text-slate-800">Recent Activity</h3>
            <button onClick={() => navigate('/app/superadmin/audit')} className="text-[12px] font-semibold text-blue-800 bg-blue-50 border-none rounded-lg px-3 py-1.5 cursor-pointer hover:bg-blue-100 transition-all">
              View All →
            </button>
          </div>
          {recentLogs.length > 0 ? (
            <div className="flex flex-col">
              {recentLogs.map((log, i) => {
                const badge = actionColors[log.action] || { bg: '#F1F5F9', color: '#475569' };
                return (
                  <div key={log.id} className={`flex gap-3 items-start py-3 ${i < recentLogs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-blue-300 mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold px-2 py-[2px] rounded-full" style={{ background: badge.bg, color: badge.color }}>{log.action}</span>
                        <span className="text-[11px] font-semibold text-slate-400">{log.module}</span>
                      </div>
                      <p className="text-[12.5px] text-slate-600 leading-[1.5] truncate">{log.detail}</p>
                      <div className="text-[11px] text-slate-400 mt-0.5">{formatTs(log.timestamp)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm">No recent activity</div>
          )}
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-[18px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-extrabold text-slate-800">Pending Approvals</h3>
            <button onClick={() => navigate('/app/admin/content')} className="text-[11.5px] font-semibold text-blue-800 bg-blue-50 border-none rounded-lg px-2.5 py-1 cursor-pointer hover:bg-blue-100 transition-all">
              Manage →
            </button>
          </div>

          {pendingTestimonies.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">All caught up!</div>
          ) : (
            <div className="flex flex-col gap-2 mb-4">
              {pendingTestimonies.map((t) => (
                <div key={t.id} className="flex gap-3 items-center p-3 bg-[#FFFBEB] rounded-xl border border-amber-100">
                  <div className="text-xl">{t.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-800 truncate">{t.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{t.title}</div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-[2px] rounded-full whitespace-nowrap shrink-0">Pending</span>
                </div>
              ))}
            </div>
          )}

          {rejectedContent.length > 0 && (
            <>
              <div className="text-[12px] font-bold text-slate-500 uppercase tracking-[0.5px] mb-2 mt-2">Rejected by Super Admin</div>
              <div className="flex flex-col gap-2">
                {rejectedContent.map((r) => (
                  <div key={r.id} className="flex gap-3 items-start p-3 bg-red-50 rounded-xl border border-red-100">
                    <span className="text-red-400 text-base shrink-0 mt-0.5">🚫</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-bold text-slate-800 truncate">{r.name} — {r.title}</div>
                      <div className="text-[11px] text-red-600 mt-0.5 leading-[1.4]">{r.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
