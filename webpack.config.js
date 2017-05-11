'use strict';

const webpack = require("webpack");
const path = require("path");

module.exports = {
	context: path.resolve("./frontend/js"),

	entry: "./file1.js",
	output: {
		path: path.resolve("./public"),
		filename: "build.js"
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: "inline-source-map",

	plugins: [
		new webpack.NoEmitOnErrorsPlugin() //не генерить файлы,  если есть ошибки в компиляции
	],

	module: {
		loaders: [{
			test: /\.js$/,
			include: path.resolve("./frontend"),
			loader: "babel-loader?optional[]=runtime", //вспомогательный функционал babel вынесен в отдельный модуль
			query: {
				presets: ['es2015']
			}
		}]
	}
}

