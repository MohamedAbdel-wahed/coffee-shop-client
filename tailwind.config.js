module.exports = {
  purge: {
    layers: ['components'],
    content: ['./src/*.jsx','./src/**/*.jsx', './public/index.html'],
    enabled: true
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true
  }
}
