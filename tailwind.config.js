/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#783F27',
        'dark-cocoa': '#30231F',
        'warm-ivory': '#FAF6F1',
        'soft-sand': '#EFE3D9',
        'pure-card': '#FFFCF9',
        'muted-taupe': '#89776D',
        brand: {
          50: '#FAF6F1',
          100: '#EFE3D9',
          200: '#DFC8B7',
          300: '#C7A690',
          400: '#9E6747',
          500: '#783F27',
          600: '#64321E',
          700: '#522817',
          800: '#401F12',
          900: '#30231F',
          950: '#1F1410',
        },
        accent: {
          espresso: '#783F27',
          cocoa: '#30231F',
          sand: '#EFE3D9',
          taupe: '#89776D',
          teal: '#783F27',
          cyan: '#9C5234',
          blue: '#783F27',
          purple: '#783F27',
        }
      },
    },
  },
  plugins: [],
};
