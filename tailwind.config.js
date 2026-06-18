/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beike: {
          primary: '#fd560f',
          'primary-dark': '#e04a0a',
          'primary-light': '#fff1eb',
          bg: '#f6f6f8',
          'bg-top': '#f7f8fa',
          heading: '#282828',
          body: '#333333',
          muted: '#666666',
          light: '#8D94A0',
          border: '#eee',
          'border-dark': '#ddd',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 6px 18px rgba(0, 0, 0, 0.07)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'dropdown': '0 0 15px rgb(0, 0, 0, 0.1)',
      },
      animation: {
        'wave': 'wave 5s infinite linear',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
