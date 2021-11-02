module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        darkViolet: '#3A3949',
        vividDark: '#22212B',
        warmGray: '#C9C9C9',
        paleViolet: '#FBF8FF',
        lightViolet: '#BE98D4',
        lightPB: '#A19BDA',
        PB: '#706CA3',
        darkPB: '#4C4A67',
        palePB: '#B2B0C1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
