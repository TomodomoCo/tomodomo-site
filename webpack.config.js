const config = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
  },
  output: {
    filename: 'script.js',
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};

module.exports = config
