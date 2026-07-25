import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { events } from '../../data/mockData';

const bannerColors = {
  'Chronic Disease': '1565C0',
  'Mental Health':   '5B21B6',
  'Cardiology':      '991B1B',
  "Women's Health":  '9D174D',
  'Nutrition':       '065F46',
  'Pediatrics':      '92400E',
};

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
        {event.price !== 'Free' && ' Any applicable fee can be paid on-site at the event.'}
        {event.registrationLink && ' Please also complete the external registration via the link below.'}
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

const EventDetails = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const event     = events.find((e) => e.id === id) || events[0];
  const [registered, setRegistered]           = useState(false);
  const [showPopup, setShowPopup]             = useState(false);
  const [showUnregister, setShowUnregister]   = useState(false);

  const relatedEvents = events.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 2);
  const bannerColor   = bannerColors[event.category] || '1565C0';
  const bannerUrl     = `https://placehold.co/1200x400/${bannerColor}/ffffff?text=${encodeURIComponent(event.title)}`;

  const handleRegister = () => {
    setRegistered(true);
    setShowPopup(true);
  };

  const handleUnregister = () => {
    setRegistered(false);
    setShowUnregister(false);
  };

  return (
    <div>
      {showPopup && <RegistrationPopup event={event} onClose={() => setShowPopup(false)} />}
      {showUnregister && <UnregisterPopup event={event} onConfirm={handleUnregister} onCancel={() => setShowUnregister(false)} />}

      <button
        onClick={() => navigate('/app/events')}
        className="flex items-center gap-1.5 mb-5 bg-white border-[1.5px] border-blue-100 rounded-[10px] px-4 py-[9px] cursor-pointer text-[13px] font-semibold text-blue-800 hover:bg-blue-50 transition-all"
      >
        ← Back to Events
      </button>

      <div className="grid grid-cols-[1fr_340px] gap-6 items-start">
        {/* Main Content */}
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50 overflow-hidden">
            <div className="relative">
              <img
                src={bannerUrl}
                alt={event.title}
                className="w-full h-[200px] object-cover block"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/95 rounded-full px-[14px] py-[5px] text-xs font-bold text-blue-800">{event.category}</span>
                <span className="bg-white/95 rounded-full px-[14px] py-[5px] text-xs font-semibold text-slate-600">{event.type}</span>
              </div>
              {event.status === 'full' && (
                <div className="absolute top-4 right-4 bg-red-500 rounded-full px-[14px] py-[5px] text-xs font-bold text-white">Event Full</div>
              )}
            </div>

            <div className="px-7 py-6">
              <h1 className="text-[22px] font-extrabold text-slate-800 leading-[1.3] tracking-[-0.4px] mb-5">{event.title}</h1>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: '📅', label: 'Date & Time',     value: `${new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at ${event.time}` },
                  { icon: '📍', label: 'Location',         value: event.location },
                  { icon: '🎤', label: 'Host',             value: event.host },
                  { icon: '💰', label: 'Registration Fee', value: event.price, highlight: event.price === 'Free' },
                ].map((d, i) => (
                  <div key={i} className="flex gap-3 items-start bg-[#F8FBFF] rounded-xl px-4 py-[12px] border border-blue-50">
                    <span className="text-[20px] shrink-0">{d.icon}</span>
                    <div>
                      <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.5px] mb-[3px]">{d.label}</div>
                      <div className={`text-[13px] font-semibold leading-[1.35] ${d.highlight ? 'text-emerald-500' : 'text-slate-800'}`}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Speaker */}
              <div className="bg-[#F8FBFF] rounded-xl px-4 py-[12px] border border-blue-50 mb-4">
                <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.5px] mb-2">🎙 Featured Speaker</div>
                <div className="text-[13.5px] font-semibold text-slate-800">{event.speaker}</div>
              </div>

              {/* Chief Guests */}
              {event.chiefGuests && event.chiefGuests.length > 0 && (
                <div className="bg-[#F8FBFF] rounded-xl px-4 py-[12px] border border-blue-50 mb-5">
                  <div className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.5px] mb-2">⭐ Chief Guests</div>
                  <div className="flex flex-col gap-1">
                    {event.chiefGuests.map((guest, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {guest}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About */}
              <div className="mb-5">
                <h3 className="text-[15px] font-bold text-slate-800 mb-2">About This Event</h3>
                <p className="text-[13.5px] text-slate-600 leading-[1.75]">{event.description}</p>
              </div>

              {/* Links */}
              {(event.websiteLink || event.registrationLink) && (
                <div>
                  <h3 className="text-[15px] font-bold text-slate-800 mb-3">Useful Links</h3>
                  <div className="flex flex-col gap-2">
                    {event.websiteLink && (
                      <a
                        href={event.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-[13px] font-semibold text-blue-800 no-underline hover:bg-blue-100 transition-all"
                      >
                        <span>🌐</span>
                        <span>Visit Event Website</span>
                        <span className="ml-auto text-blue-400">↗</span>
                      </a>
                    )}
                    {event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[13px] font-semibold text-emerald-700 no-underline hover:bg-emerald-100 transition-all"
                      >
                        <span>📋</span>
                        <span>External Registration Form</span>
                        <span className="ml-auto text-emerald-400">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="bg-white rounded-[20px] px-7 py-6 shadow-blue-md border-[1.5px] border-blue-100/50">
              <h3 className="text-[15px] font-bold text-slate-800 mb-4">Related Events</h3>
              <div className="flex flex-col gap-3">
                {relatedEvents.map((re) => (
                  <div
                    key={re.id}
                    onClick={() => navigate(`/app/events/${re.id}`)}
                    className="flex gap-[14px] items-center p-[14px] bg-[#F8FBFF] rounded-xl cursor-pointer border border-blue-50 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: re.color }}>{re.image}</div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-slate-800 mb-[3px]">{re.title}</div>
                      <div className="text-xs text-slate-500">{new Date(re.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · {re.type}</div>
                    </div>
                    <span className="text-blue-800 text-lg">→</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 sticky top-5">
          <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(21,101,192,0.1)] border-[1.5px] border-blue-100/50">
            <div className="mb-5">
              <div className="text-[12px] text-slate-400 mb-1">Registration Fee</div>
              <div className={`text-[30px] font-extrabold ${event.price === 'Free' ? 'text-emerald-500' : 'text-blue-800'}`}>{event.price}</div>
              {event.price !== 'Free' && <div className="text-[11px] text-slate-400 mt-1">Payable at the venue</div>}
            </div>

            <button
              onClick={registered ? () => setShowUnregister(true) : event.status !== 'full' ? handleRegister : undefined}
              disabled={event.status === 'full' && !registered}
              className={`w-full py-[14px] border-none rounded-xl text-[15px] font-bold transition-all duration-300
                ${event.status === 'full' && !registered
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : registered
                    ? 'bg-emerald-500 text-white cursor-pointer shadow-sm hover:bg-emerald-600'
                    : 'bg-gradient-primary text-white cursor-pointer hover:-translate-y-px hover:shadow-blue'
                }`}
            >
              {event.status === 'full' && !registered ? 'Registration Closed' : registered ? '✓ Registered' : 'Register Now'}
            </button>

            {registered && (
              <p className="text-[11.5px] text-emerald-600 text-center mt-3 font-medium">
                You're all set! Tap to unregister if plans change.
              </p>
            )}
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-[20px] p-5 shadow-blue-md border-[1.5px] border-blue-100/50">
            <h4 className="text-[13px] font-bold text-slate-700 mb-3">Quick Info</h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[12.5px] text-slate-600">
                <span>👥</span>
                <span>{event.registered} / {event.capacity} registered</span>
              </div>
              <div className="flex items-center gap-2 text-[12.5px] text-slate-600">
                <span>📌</span>
                <span>{event.type} Event</span>
              </div>
              <div className="flex items-center gap-2 text-[12.5px] text-slate-600">
                <span>🏙</span>
                <span>{event.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
