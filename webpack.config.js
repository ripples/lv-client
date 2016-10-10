"use strict";

const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./client/src/app/app.js",
  output: {
    path: path.join(__dirname, "client/dist/app"),
    publicPath: "app/",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"],
          plugins: [
            ["babel-plugin-module-resolver", [
              {src: "./client/src/app/components", expose: "app/components"},
              {src: "./client/src/app/actions", expose: "app/actions"},
              {src: "./client/src/app/constants", expose: "app/constants"}
            ]],
            ["transform-object-rest-spread"]
          ]
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader"
      }
    ]
  }
};
