'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve('./application'),

	entry: './js/main.js',
	output: {
		path: path.resolve('./build'),
		publicPath: '/build/',
		filename: 'build.js'
	},

	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve('./application'),
			use: [{
				loader: 'strict-loader'
			}, {
				loader: 'babel-loader?optional[]=runtime', //вспомогательный функционал babel вынесен в отдельный модуль
				options: {
					presets: ['es2015']
				}
			}]
		}, {
			test: /\.html$/,
			use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader']
		}, {
			test: /\.(png|jpe?g)$/,
			use: ['file-loader?name=[path][name].[ext]']
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
		},  {
			test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
			use: ['file-loader?name=/fonts/[name].[ext]']
		}]
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: 'inline-source-map',

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(), //не генерить файлы,  если есть ошибки в компиляции
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true
		})
	]
};
