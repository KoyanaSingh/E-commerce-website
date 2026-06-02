/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8CB7A',
          pale: '#F7F0DC',
        },
        ink: {
          DEFAULT: '#1A1410',
          light: '#3D322A',
        },
        cream: {
          DEFAULT: '#FAF6EE',
          dark: '#F0E9D8',
        },
        rust: '#B5451B',
        muted: '#7A6E62',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
