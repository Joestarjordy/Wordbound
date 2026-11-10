/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace', 'system-ui'],
        silkscreen: ['"Silkscreen"', 'monospace', 'sans-serif'],
        retro: ['"VT323"', 'monospace', 'sans-serif'],
      },
      colors: {
        pixel: {
          dark: '#0f0e17',
          surface: '#1a192b',
          card: '#23213d',
          border: '#3b385e',
          gold: '#ffd166',
          'gold-light': '#ffe8a3',
          crimson: '#ef476f',
          green: '#06d6a0',
          blue: '#118ab2',
          purple: '#7b2cbf',
          parchment: '#fef6e4',
          gray: '#8d99ae',
        },
      },
      boxShadow: {
        pixel: '4px 4px 0px 0px rgba(0, 0, 0, 0.75)',
        'pixel-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.75)',
        'pixel-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.9)',
        'pixel-gold': '0 0 15px rgba(255, 209, 102, 0.5), 3px 3px 0px 0px rgba(0,0,0,0.8)',
        'pixel-green': '0 0 15px rgba(6, 214, 160, 0.5), 3px 3px 0px 0px rgba(0,0,0,0.8)',
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgba(255, 209, 102, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 12px rgba(255, 209, 102, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
