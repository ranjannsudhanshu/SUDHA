/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0d0f14',
        surface: '#151822',
        surface2: '#1c202c',
        border: '#262b3a',
        text: '#e8e9ed',
        muted: '#8b8fa3',
        accent: '#ff5d5d',
        accentDark: '#e04b4b',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
};
