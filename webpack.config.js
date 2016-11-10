export var webpackConfig = {
  entry: `./app/index.jsx`,
  output: {
    path: `dist/`,
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};