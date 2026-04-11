/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        avara: {
          bg:         '#1A1612',
          surface:    '#2A2520',
          elevated:   '#3A3028',
          border:     '#3A3028',
          gold:       '#B8966A',
          'gold-light': '#D4B483',
          'gold-pale':  '#F0E6D3',
          cream:      '#FAF7F2',
          muted:      '#9A8E82',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8966A 0%, #D4B483 100%)',
      },
    },
  },
  plugins: [],
}
