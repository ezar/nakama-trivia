/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'op-navy':      '#0A1628',
        'op-ocean':     '#0D2137',
        'op-deep':      '#071020',
        'op-gold':      '#F4C542',
        'op-gold-dim':  '#B8942E',
        'op-red':       '#D63031',
        'op-cyan':      '#00B4D8',
        'op-cream':     '#FFF5E4',
        'op-parchment': '#E8D5B7',
        'op-wood':      '#8B6914',
        'op-green':     '#27AE60',
      },
      fontFamily: {
        display: ['"Pirata One"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-gold': 'pulse-gold 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(244, 197, 66, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(244, 197, 66, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
