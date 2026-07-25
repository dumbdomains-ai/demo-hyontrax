/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        'app-bg': '#F0F7FF',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
        'gradient-hero':    'linear-gradient(145deg, #0D47A1 0%, #1565C0 35%, #1976D2 65%, #2196F3 100%)',
        'gradient-horizontal': 'linear-gradient(90deg, #1565C0, #42A5F5)',
      },
      boxShadow: {
        'blue-sm': '0 1px 3px rgba(21,101,192,0.06)',
        'blue-md': '0 4px 20px rgba(21,101,192,0.08)',
        'blue-lg': '0 8px 32px rgba(21,101,192,0.12)',
        'blue-xl': '0 20px 60px rgba(21,101,192,0.18)',
        'blue':    '0 8px 28px rgba(21,101,192,0.38)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease forwards',
        'slide-in': 'slideIn 0.35s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
