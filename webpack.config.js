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

export var webpackStyles = {
  entry: `./app/`,
  output: {
    path: `app/`,
    filename: 'main.scss'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/
    }]
  }
};
