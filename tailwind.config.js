const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    screens: {
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1500px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '0',
      },
    },
    extend: {
      colors: {
        primary: '#FFC900',
        secondary: '#FF90E8',
        green: '#23A094',
        blue: '#90A8ED',
        orange: '#FF7051',
        black: {
          light: 'rgb(4 20 52 / 0.6)',
          DEFAULT: '#041434',
        },
      },
      fontFamily: {
        sans: ['EudoxusSans', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
