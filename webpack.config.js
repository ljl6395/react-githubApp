const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

// eslint-disable-next-line func-names
module.exports = function (env, argv) {
  const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
  const isEnvProduction = argv.mode === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.less$/,
          exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          loader: "url-loader",
          options: {
          limit: 10000
          }
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Github热门项目',
        template: 'public/index.html',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    }
  };
};
