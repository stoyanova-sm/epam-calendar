'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	context: path.resolve('./application'),
	entry: ['whatwg-fetch', 'babel-polyfill', './main.js'],
	output: {
		path: path.resolve('./build'),
		publicPath: '/build/',
		filename: 'build.js'
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader?presets[]=es2015'
					}
				}
			}],
		}, {
			test: /\.js$/,
			include: path.resolve('./application'),
			exclude: /node_modules/,
			use: [{
				loader: 'strict-loader'
			}, {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}, {
			// Loader for less files
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						plugins: (loader) => [
							require('postcss-import')({ root: loader.resourcePath }),
							require('autoprefixer')()
						]
					}
				}, {
					loader: 'less-loader',
					options: {
						sourceMap: true
					}
				}]
			})
		}, {
			test: /\.html$/,
			use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader']
		}, {
			test: /\.(png|jpe?g)$/,
			use: ['file-loader?name=[path][name].[ext]']
		}, {
			test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
			use: ['file-loader?name=/fonts/[name].[ext]']
		}, {
			test: /\.json$/,
			use: ['file-loader?name=[path][name].[ext]']
		}]
	},
	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: 'inline-source-map',

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(), //не генерить файлы, если есть ошибки в компиляции
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true
		})
	],

	devServer: {
		historyApiFallback: {
			rewrites: [{
				from: /^.*$/,
				to: 'build/calendar.html',
			}]
		}
	}
};


