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
			loader: 'vue-loader'
			// options: {
			//   loaders: {
			//     // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
			//     // the "scss" and "sass" values for the lang attribute to the right configs here.
			//     // other preprocessors should work out of the box, no loader config like this nessessary.
			//     //'scss': 'vue-style-loader!css-loader!sass-loader',
			//     //'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
			//   }
			//   // other vue-loader options go here
			// }
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
	//,
	// resolve: {
	//   alias: {
	//     'vue$': 'vue/dist/vue.common.js'
	//   }
	// },
	// devServer: {
	//   historyApiFallback: true,
	//   noInfo: true
	// },
	// performance: {
	//   hints: false
	// },
};

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
