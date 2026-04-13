/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jv: {
          dark:        '#05080F',
          card:        '#0B1120',
          'card-alt':  '#0F1929',
          border:      '#1A2744',
          orange:      '#FF5C00',
          'orange-h':  '#E64F00',
          'orange-sub':'rgba(255,92,0,0.12)',
          gold:        '#F59E0B',
          teal:        '#0EA5E9',
          purple:      '#7C3AED',
          text:        '#F1F5F9',
          subtle:      '#94A3B8',
          muted:       '#64748B',
          success:     '#22C55E',
          light:       '#F8FAFC',
          'light-card':'#FFFFFF',
          'light-bg':  '#F1F5F9',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':  'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FF5C00 0%, #FF8C42 100%)',
        'dark-gradient':   'linear-gradient(135deg, #05080F 0%, #0B1120 100%)',
        'hero-mesh':       'radial-gradient(ellipse at 20% 50%, rgba(255,92,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(14,165,233,0.06) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
