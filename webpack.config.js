/* eslint-env node */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.tsx'),
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, '_site'),
    publicPath: './',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match .ts and .tsx files
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Match .js files
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/, // Match .svg files
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
