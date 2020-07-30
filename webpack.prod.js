const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');  
const TerserPlugin = require('terser-webpack-plugin');

// eslint-disable-next-line func-names
module.exports = function (env, argv) {
  const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
  const isEnvProduction = argv.mode === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
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
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
          use: [
            MiniCssExtractPlugin.loader,
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
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }),
      new BundleAnalyzerPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve('src')
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          }
        }
      }
    }
  };
};
