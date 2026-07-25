import React, { useRef } from 'react';

// 4-digit OTP entry — matches the "Enter OTP" step used across Login-with-OTP
// and Forgot Password flows in the Figma spec.
const OtpInput = ({ value, onChange, error, length = 4 }) => {
  const inputsRef = useRef([]);
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const setDigit = (i, val) => {
    const clean = val.replace(/[^0-9]/g, '').slice(-1);
    const next  = digits.slice();
    next[i] = clean;
    onChange(next.join(''));
    if (clean && i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputsRef.current[i - 1]?.focus();
  };

  return (
    <div>
      <div className="flex gap-2.5">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={`w-12 h-12 text-center text-lg font-bold border-[1.5px] rounded-xl outline-none text-slate-800 transition-all duration-200
              ${error ? 'border-red-400 bg-red-50' : 'border-blue-100 focus:border-blue-700 focus:ring focus:ring-blue-700/10'}`}
          />
        ))}
      </div>
      {error && <div className="text-[12.5px] text-red-500 font-semibold mt-2">{error}</div>}
    </div>
  );
};

export default OtpInput;
