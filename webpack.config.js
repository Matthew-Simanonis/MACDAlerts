const webpack = require('webpack');
const config = {
devtool: 'inline-source-map',
entry: {
       macdalerts: __dirname + '/src/static/js/macdalerts.jsx',
       vendors: ['react']
     },
output: {
       path: __dirname + '/src/public/js',
       filename: '[name].bundle.js',
},
resolve: {
       extensions: ['.js','.jsx','.css']
},
module: {     
       rules: [
       {
              test: /\.jsx$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
       },
       {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
       },
       {
              test: /\.css$/,
              loader: 'style-loader!css-loader?modules'
       },
     ]
   }
};
module.exports = config;