/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#111119',
        'surface-hi': '#171722',
        cyan: '#00F5D4',
        purple: '#9D4EDD',
        'text-primary': '#F8F9FA',
        'text-secondary': '#ADB5BD',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(0, 245, 212, 0.35)',
        'glow-purple': '0 0 40px -10px rgba(157, 78, 221, 0.35)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at 50% 0%, rgba(0,245,212,0.08), transparent 60%)',
      },
    },
  },
  plugins: [],
}
