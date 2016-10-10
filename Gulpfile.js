"use strict";

const gulp = require("gulp");
const del = require("del");
const webpack = require("webpack-stream");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");
const path = require("path");
const eslint = require("gulp-eslint");
const sass = require("gulp-sass");
const concatCSS = require("gulp-concat-css");

// sass libraries
const neat = require("node-neat").includePaths;

const DIST_DIR = "./client/dist";
const SRC_DIR = "./client/src";

gulp.task("clean", () => {
  return del([`${DIST_DIR}/**/*`]);
});

gulp.task("copy-images", () => {
  return gulp.src(`${SRC_DIR}/images/**/*`)
    .pipe(gulp.dest(`${DIST_DIR}/images/`))
});

gulp.task("sass", () => {
  return gulp.src(`${SRC_DIR}/app/**/*.scss`)
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: [`${SRC_DIR}/sass/`, ...neat]
    }).on("error", sass.logError))
    .pipe(concatCSS("app.min.css"))
    .pipe(gulp.dest(`${DIST_DIR}/css`));
});

gulp.task("eslint", () => {
  return gulp.src([`${SRC_DIR}/app/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("webpack", ["eslint"], () => {
  return gulp.src(`${SRC_DIR}/app/app.js`)
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(`${DIST_DIR}/app`));
});

gulp.task("watch", ["build"], () => {
  const fileChanged = file => {
    let filePath = path.relative(__dirname, file.path);
  };

  gulp.watch([`${SRC_DIR}/app/**/*.js`], ["webpack"]).on("change", fileChanged);
  gulp.watch([`${SRC_DIR}/app/**/*.scss`], ["sass"]).on("change", fileChanged);
});

gulp.task("build", callback => {
  runSequence(
    "clean",
    "copy-images",
    ["webpack", "sass"],
    callback
  );
});

gulp.task("default", ["build"]);
