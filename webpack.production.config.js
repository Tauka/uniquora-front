var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: false,
  entry: "./js/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.svg/, 
        loader: 'svg-url-loader'
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" 
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "index.min.js"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
    }),
    new webpack.DefinePlugin({
        API_ROOT: JSON.stringify("138.68.109.140"),
    })
  ],
};
