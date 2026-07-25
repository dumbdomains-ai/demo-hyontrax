import React, { useState } from 'react';
import { adminUsers as initialUsers } from '../../data/mockData';

const RoleBadge = ({ role }) => {
  const map = {
    user:       { bg: '#EFF6FF', color: '#1E40AF', label: 'User' },
    admin:      { bg: '#EDE9FE', color: '#5B21B6', label: 'Admin' },
    superadmin: { bg: '#FEF3C7', color: '#92400E', label: 'Super Admin' },
  };
  const s = map[role] || map.user;
  return <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
};

const StatusBadge = ({ status }) => (
  <span className={`text-[11px] font-bold px-2.5 py-[3px] rounded-full ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
    {status === 'active' ? 'Active' : 'Inactive'}
  </span>
);

const ConfirmModal = ({ title, message, confirmLabel, confirmColor, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-7 max-w-[380px] w-full shadow-2xl border border-slate-100 animate-scale-in">
      <div className="text-[17px] font-extrabold text-slate-800 mb-2">{title}</div>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-6">{message}</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition-all">Cancel</button>
        <button
          onClick={onConfirm}
          className={`flex-1 py-2.5 border-none rounded-xl text-[13px] font-bold text-white cursor-pointer transition-all ${confirmColor}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

const SuperAdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirm, setConfirm] = useState(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.city.toLowerCase().includes(q);
    const matchRole   = roleFilter === 'All' || u.role === roleFilter;
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const update = (id, changes) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...changes } : u));
    setConfirm(null);
  };

  const handleAction = (user, action) => {
    if (action === 'deactivate') {
      setConfirm({
        title: 'Deactivate User?',
        message: `${user.name} will lose access to the platform immediately.`,
        confirmLabel: 'Deactivate',
        confirmColor: 'bg-red-600 hover:bg-red-700',
        onConfirm: () => update(user.id, { status: 'inactive' }),
      });
    } else if (action === 'activate') {
      update(user.id, { status: 'active' });
    } else if (action === 'promote') {
      setConfirm({
        title: 'Promote to Admin?',
        message: `${user.name} will gain admin-level access to content and event management.`,
        confirmLabel: 'Promote',
        confirmColor: 'bg-violet-600 hover:bg-violet-700',
        onConfirm: () => update(user.id, { role: 'admin' }),
      });
    } else if (action === 'demote') {
      setConfirm({
        title: 'Revoke Admin Role?',
        message: `${user.name} will be downgraded back to a regular user account.`,
        confirmLabel: 'Revoke',
        confirmColor: 'bg-slate-700 hover:bg-slate-800',
        onConfirm: () => update(user.id, { role: 'user' }),
      });
    }
  };

  const totalActive   = users.filter((u) => u.status === 'active').length;
  const totalInactive = users.filter((u) => u.status === 'inactive').length;
  const totalAdmins   = users.filter((u) => u.role === 'admin').length;

  return (
    <div>
      {confirm && <ConfirmModal {...confirm} onCancel={() => setConfirm(null)} />}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users',    value: users.filter((u) => u.role === 'user').length,  bg: '#EFF6FF' },
          { label: 'Active',         value: totalActive,   bg: '#D1FAE5' },
          { label: 'Inactive',       value: totalInactive, bg: '#FEE2E2' },
          { label: 'Admins',         value: totalAdmins,   bg: '#EDE9FE' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[16px] p-4 shadow-blue-md border-[1.5px] border-blue-100/50 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-[24px] font-extrabold text-slate-800 leading-none">{s.value}</div>
              <div className="text-[12px] font-semibold text-slate-500 mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-5 shadow-blue-md border-[1.5px] border-blue-100/50 flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
          <input
            placeholder="Search by name, email or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-[38px] pr-[14px] border-[1.5px] border-blue-100 rounded-xl text-[13.5px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-slate-500">Role:</span>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium">
            {['All', 'user', 'admin', 'superadmin'].map((r) => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r === 'superadmin' ? 'Super Admin' : r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-slate-500">Status:</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 cursor-pointer font-medium">
            {['All', 'active', 'inactive'].map((s) => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div className="text-[13px] text-slate-500 mb-3">
        Showing <span className="font-bold text-slate-700">{filtered.length}</span> user{filtered.length !== 1 ? 's' : ''}
      </div>

      <div className="bg-white rounded-[18px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-[#F8FBFF]">
              <th className="text-left px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">User</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">City</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Joined</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Last Login</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Role</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.6px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i === filtered.length - 1 ? 'border-none' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-slate-800">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[12.5px] text-slate-600">{u.city}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-400">{u.joined}</td>
                <td className="px-4 py-3.5 text-[12px] text-slate-400">{u.lastLogin}</td>
                <td className="px-4 py-3.5"><RoleBadge role={u.role} /></td>
                <td className="px-4 py-3.5"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3.5">
                  {u.role === 'superadmin' ? (
                    <span className="text-[11.5px] text-slate-400 font-medium">Protected</span>
                  ) : (
                    <div className="flex gap-1.5">
                      {u.role === 'user' && (
                        <button
                          onClick={() => handleAction(u, 'promote')}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all text-violet-700 bg-violet-50 hover:bg-violet-100"
                        >
                          Make Admin
                        </button>
                      )}
                      {u.role === 'admin' && (
                        <button
                          onClick={() => handleAction(u, 'demote')}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all text-slate-600 bg-slate-100 hover:bg-slate-200"
                        >
                          Revoke Admin
                        </button>
                      )}
                      {u.status === 'active' ? (
                        <button
                          onClick={() => handleAction(u, 'deactivate')}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all text-red-600 bg-red-50 hover:bg-red-100"
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(u, 'activate')}
                          className="text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all text-green-700 bg-green-50 hover:bg-green-100"
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-sm">No users match your filters</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminUsers;
