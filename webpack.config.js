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
            ["module-alias", [
              {src: "./client/src/app/components", expose: "components"},
              {src: "./client/src/app/actions", expose: "actions"},
              {src: "./client/src/app/constants", expose: "constants"},
              {src: "./client/src/app/libs", expose: "libs"}
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
