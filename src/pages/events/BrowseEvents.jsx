import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events } from '../../data/mockData';

const TIER1_CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Virtual'];

const RegistrationPopup = ({ event, onClose }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onClose}>
    <div
      className="bg-white rounded-[24px] p-8 max-w-[420px] w-full shadow-2xl border border-emerald-100 animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-3xl mx-auto mb-5">
        ✅
      </div>
      <h3 className="text-[18px] font-extrabold text-slate-800 text-center mb-2 tracking-tight">
        You're Registered!
      </h3>
      <p className="text-[13.5px] text-slate-500 text-center leading-[1.7] mb-5">
        You have successfully registered for <span className="font-semibold text-slate-700">{event.title}</span>.
        Please visit the venue on the designated date and time.
        {event.price !== 'Free' && ' Payment can be made on-site at the event.'}
        {event.registrationLink && (
          <> If there is an external registration link, please complete that process as well.</>
        )}
      </p>
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 mb-3 border-[1.5px] border-blue-200 rounded-xl text-[13px] font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all no-underline"
        >
          Complete External Registration ↗
        </a>
      )}
      <button
        onClick={onClose}
        className="w-full py-3 bg-emerald-500 border-none rounded-xl text-[14px] font-bold text-white cursor-pointer hover:bg-emerald-600 transition-all"
      >
        Got it!
      </button>
    </div>
  </div>
);

const UnregisterPopup = ({ event, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] flex items-center justify-center p-4" onClick={onCancel}>
    <div className="bg-white rounded-[24px] p-7 max-w-[400px] w-full shadow-2xl border border-slate-100 animate-scale-in" onClick={(e) => e.stopPropagation()}>
      <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-2xl mx-auto mb-4">
        ⚠️
      </div>
      <h3 className="text-[17px] font-extrabold text-slate-800 text-center mb-2">Unregister from event?</h3>
      <p className="text-[13px] text-slate-500 text-center leading-[1.7] mb-6">
        Are you sure you want to unregister from <span className="font-semibold text-slate-700">{event.title}</span>?
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2.5 border-[1.5px] border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 bg-white cursor-pointer hover:bg-slate-50 transition-all">
          Keep Registration
        </button>
        <button onClick={onConfirm} className="flex-1 py-2.5 bg-red-600 border-none rounded-xl text-[13px] font-bold text-white cursor-pointer hover:bg-red-700 transition-all">
          Yes, Unregister
        </button>
      </div>
    </div>
  </div>
);

const EventCard = ({ event, onClick, registered, onRegister, onUnregister }) => {
  const pct = Math.round((event.registered / event.capacity) * 100);
  const statusColor = event.status === 'full' ? 'text-red-500' : pct >= 80 ? 'text-amber-500' : 'text-emerald-500';
  const statusLabel = event.status === 'full' ? 'Full' : pct >= 80 ? 'Filling Fast' : 'Open';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[20px] overflow-hidden shadow-blue-md border-[1.5px] border-blue-100/50 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-blue-lg"
    >
      <div className="h-[110px] flex items-center justify-center text-[48px] relative" style={{ background: event.color }}>
        {event.image}
        <div className={`absolute top-3 right-3 bg-white rounded-full px-2.5 py-[3px] text-[11px] font-bold shadow-sm ${statusColor}`}>
          {statusLabel}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-600">
          {event.type}
        </div>
      </div>

      <div className="p-[16px_18px]">
        <div className="text-[10.5px] font-bold text-blue-800 uppercase tracking-[0.5px] mb-1">{event.category}</div>
        <h3 className="text-[14.5px] font-bold text-slate-800 leading-[1.35] mb-3">{event.title}</h3>

        <div className="flex flex-col gap-1.5 mb-3">
          {[
            { icon: '📅', text: new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + event.time },
            { icon: '📍', text: event.location },
            { icon: '🎤', text: event.speaker },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[12px] text-slate-500">
              <span className="shrink-0 mt-px">{item.icon}</span>
              <span className="leading-[1.4] truncate flex-1">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-slate-400 font-medium">Registered</span>
            <span className="text-[11px] font-bold text-blue-800">{event.registered}/{event.capacity}</span>
          </div>
          <div className="h-[5px] bg-blue-50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: pct >= 80 ? '#F59E0B' : 'linear-gradient(90deg,#1565C0,#42A5F5)' }}
            />
          </div>
        </div>

        <div className="flex gap-1.5 flex-wrap mb-3">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-blue-50 text-blue-800 text-[11px] font-semibold px-2 py-[2px] rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-slate-100 pt-3">
          <div>
            <span className="text-[10.5px] text-slate-400">Entry</span>
            <div className={`text-[15px] font-extrabold ${event.price === 'Free' ? 'text-emerald-500' : 'text-blue-800'}`}>{event.price}</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); if (registered) { onUnregister(); } else if (event.status !== 'full') { onRegister(); } }}
            disabled={event.status === 'full' && !registered}
            className={`px-4 py-[8px] border-none rounded-[10px] text-[12.5px] font-bold transition-all duration-300
              ${event.status === 'full' && !registered
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : registered
                  ? 'bg-emerald-500 text-white cursor-pointer shadow-sm hover:bg-emerald-600'
                  : 'bg-gradient-primary text-white cursor-pointer hover:-translate-y-px hover:shadow-blue'
              }`}
          >
            {event.status === 'full' && !registered ? 'Event Full' : registered ? '✓ Registered' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BrowseEvents = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [popupEvent, setPopupEvent] = useState(null);
  const [unregisterEvent, setUnregisterEvent] = useState(null);

  const handleRegister = (event) => {
    setRegisteredIds((prev) => new Set([...prev, event.id]));
    setPopupEvent(event);
  };

  const handleUnregister = () => {
    setRegisteredIds((prev) => { const next = new Set(prev); next.delete(unregisterEvent.id); return next; });
    setUnregisterEvent(null);
  };

  const filtered = selectedCity === 'All Cities'
    ? events
    : events.filter((e) => e.city === selectedCity);

  return (
    <div>
      {popupEvent && <RegistrationPopup event={popupEvent} onClose={() => setPopupEvent(null)} />}
      {unregisterEvent && <UnregisterPopup event={unregisterEvent} onConfirm={handleUnregister} onCancel={() => setUnregisterEvent(null)} />}

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <span className="text-[13px] font-semibold text-slate-500 whitespace-nowrap">Filter by city:</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="flex-1 px-3 py-2 border-[1.5px] border-blue-100 rounded-xl text-[13px] text-slate-800 bg-white outline-none focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all cursor-pointer font-medium"
          >
            {TIER1_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2.5 ml-auto">
          <button
            onClick={() => navigate('/app/events/my')}
            className="px-[16px] py-2.5 border-[1.5px] border-blue-100 bg-white text-blue-800 rounded-[10px] text-[13px] font-bold cursor-pointer whitespace-nowrap hover:bg-blue-50 transition-all"
          >
            📋 My Events
          </button>
          <button
            onClick={() => navigate('/app/events/publish')}
            className="px-[16px] py-2.5 bg-gradient-primary text-white border-none rounded-[10px] text-[13px] font-bold cursor-pointer whitespace-nowrap hover:-translate-y-px hover:shadow-blue transition-all"
          >
            + Publish Event
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              registered={registeredIds.has(event.id)}
              onRegister={() => handleRegister(event)}
              onUnregister={() => setUnregisterEvent(event)}
              onClick={() => navigate(`/app/events/${event.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-4">📍</div>
          <div className="text-lg font-bold text-slate-700 mb-2">No events in {selectedCity}</div>
          <div className="text-sm">Try a different city or check back soon</div>
        </div>
      )}
    </div>
  );
};

export default BrowseEvents;
