import React, { useState } from 'react';
import { supportTickets as initialTickets } from '../../data/mockData';

const priorityMap = {
  High:   { bg: '#FEE2E2', color: '#991B1B' },
  Medium: { bg: '#FEF3C7', color: '#92400E' },
  Low:    { bg: '#D1FAE5', color: '#065F46' },
};

const statusMap = {
  Open:        { bg: '#DBEAFE', color: '#1E40AF' },
  'In Progress': { bg: '#FEF3C7', color: '#92400E' },
  Resolved:    { bg: '#D1FAE5', color: '#065F46' },
};

const Badge = ({ text, map }) => {
  const s = map[text] || { bg: '#F1F5F9', color: '#475569' };
  return <span className="text-[11px] font-bold px-2.5 py-[3px] rounded-full" style={{ background: s.bg, color: s.color }}>{text}</span>;
};

const TicketDetail = ({ ticket, onClose, onStatusChange }) => {
  const [reply, setReply] = useState('');
  const [sent, setSent] = useState(false);

  const sendReply = () => {
    if (!reply.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setReply(''); }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[24px] p-7 max-w-[560px] w-full shadow-2xl border border-slate-100 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-slate-400">#{ticket.id}</span>
              <Badge text={ticket.priority} map={priorityMap} />
              <Badge text={ticket.status} map={statusMap} />
            </div>
            <h2 className="text-[16px] font-extrabold text-slate-800">{ticket.subject}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all border-none cursor-pointer text-xl font-light shrink-0 ml-3">×</button>
        </div>

        <div className="p-4 bg-[#F8FBFF] rounded-xl border border-blue-50 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
              {ticket.user.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="text-[12.5px] font-bold text-slate-800">{ticket.user}</div>
              <div className="text-[11px] text-slate-400">{ticket.email} · {ticket.created}</div>
            </div>
          </div>
          <p className="text-[13px] text-slate-600 leading-[1.6]">{ticket.message}</p>
        </div>

        <div className="mb-5">
          <label className="block text-[12.5px] font-bold text-slate-700 mb-2">Reply to User</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your response..."
            rows={3}
            className="w-full px-4 py-3 border-[1.5px] border-blue-100 rounded-xl text-[13px] outline-none text-slate-800 focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all resize-y leading-relaxed"
          />
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={sendReply}
            disabled={!reply.trim()}
            className={`flex-1 py-3 rounded-xl text-[13px] font-bold border-none cursor-pointer transition-all
              ${reply.trim() ? 'bg-gradient-primary text-white hover:-translate-y-px hover:shadow-blue' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            {sent ? '✓ Reply Sent' : 'Send Reply'}
          </button>
          {ticket.status !== 'Resolved' && (
            <button
              onClick={() => { onStatusChange(ticket.id, 'Resolved'); onClose(); }}
              className="flex-1 py-3 rounded-xl text-[13px] font-bold border-[1.5px] border-green-200 text-green-700 bg-green-50 cursor-pointer hover:bg-green-100 transition-all"
            >
              Mark Resolved ✓
            </button>
          )}
          {ticket.status === 'Open' && (
            <button
              onClick={() => { onStatusChange(ticket.id, 'In Progress'); }}
              className="px-4 py-3 rounded-xl text-[13px] font-bold border-[1.5px] border-amber-200 text-amber-700 bg-amber-50 cursor-pointer hover:bg-amber-100 transition-all whitespace-nowrap"
            >
              In Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminSupport = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = statusFilter === 'All' ? tickets : tickets.filter((t) => t.status === statusFilter);

  const counts = {
    Open:         tickets.filter((t) => t.status === 'Open').length,
    'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
    Resolved:     tickets.filter((t) => t.status === 'Resolved').length,
  };

  const updateStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
  };

  return (
    <div>
      {selected && (
        <TicketDetail
          ticket={tickets.find((t) => t.id === selected.id) || selected}
          onClose={() => setSelected(null)}
          onStatusChange={updateStatus}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Open',        value: counts['Open'],         bg: '#DBEAFE', color: '#1E40AF' },
          { label: 'In Progress', value: counts['In Progress'],  bg: '#FEF3C7', color: '#92400E' },
          { label: 'Resolved',    value: counts['Resolved'],     bg: '#D1FAE5', color: '#065F46' },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.label ? 'All' : s.label)}
            className={`bg-white rounded-[16px] p-4 shadow-blue-md border-[1.5px] cursor-pointer text-left transition-all hover:-translate-y-[1px] font-sans
              ${statusFilter === s.label ? 'border-blue-400' : 'border-blue-100/50'}`}
          >
            <div className="text-[22px] font-extrabold leading-none mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[12px] font-semibold text-slate-500">{s.label} Tickets</div>
          </button>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-white rounded-[12px] p-1 shadow-blue-md border-[1.5px] border-blue-100/50 mb-5 w-fit">
        {['All', 'Open', 'In Progress', 'Resolved'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-[9px] text-[12.5px] font-semibold cursor-pointer border-none transition-all duration-200
              ${statusFilter === s ? 'bg-gradient-primary text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => setSelected(ticket)}
            className="bg-white rounded-[16px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50 cursor-pointer hover:-translate-y-[2px] hover:shadow-blue-lg transition-all duration-200 flex gap-4 items-start"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {ticket.user.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-slate-400">#{ticket.id}</span>
                <Badge text={ticket.priority} map={priorityMap} />
                <Badge text={ticket.status} map={statusMap} />
                <span className="text-[11px] text-slate-400 ml-auto">{ticket.created}</span>
              </div>
              <div className="text-[14px] font-bold text-slate-800 mb-1">{ticket.subject}</div>
              <div className="text-[12.5px] text-slate-500 truncate">{ticket.message}</div>
              <div className="text-[11px] text-slate-400 mt-1.5">{ticket.user} · {ticket.email} · {ticket.category}</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🎟️</div>
            <div className="text-base font-bold text-slate-700 mb-1">No tickets found</div>
            <div className="text-sm">All {statusFilter.toLowerCase()} tickets will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
