/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        'campaign-blue': '#1a3a6b',
        gold: '#f5c518',
        'line-green': '#00b900',
      },
      fontFamily: {
        'noto': ['Noto Sans TC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
