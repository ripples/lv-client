"use strict";

const gulp = require("gulp");
const del = require("del");
const webpack = require("webpack-stream");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");
const path = require("path");
const sass = require("gulp-sass");
const plumber = require('gulp-plumber');
const concatCSS = require("gulp-concat-css");

// sass libraries
const neat = require("node-neat").includePaths;

const DIST_DIR = "./client/dist";
const SRC_DIR = "./client/src";

function errorHandler() {
  return plumber(function(error) {
    gutil.log(error.message);
    this.emit("end");
  });
}

/* ========== GLOBAL ===========*/
gulp.task("clean", () => {
  return del([`${DIST_DIR}/**/*`]);
});

gulp.task("copy-images", () => {
  return gulp.src(`${SRC_DIR}/images/**/*`)
    .pipe(gulp.dest(`${DIST_DIR}/images/`));
});

gulp.task("sass", () => {
  return gulp.src(`${SRC_DIR}/app/**/*.scss`)
    .pipe(errorHandler())
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: [`${SRC_DIR}/sass/`, ...neat]
    }).on("error", sass.logError))
    .pipe(concatCSS("app.min.css"))
    .pipe(gulp.dest(`${DIST_DIR}/css`));
});

const eslint = require("gulp-eslint");
gulp.task("eslint", () => {
  return gulp.src([`${SRC_DIR}/app/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* ========== DEVELOPMENT ===========*/
gulp.task("webpack:dev", ["eslint"], () => {
  return gulp.src(`${SRC_DIR}/app/app.js`)
    .pipe(errorHandler())
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(`${DIST_DIR}/app`));
});

gulp.task("build:dev", callback => {
  runSequence(
    "clean",
    "copy-images",
    ["webpack:dev", "sass"],
    callback
  );
});

gulp.task("watch", ["build:dev"], () => {
  const fileChanged = file => {
    let filePath = path.relative(__dirname, file.path);
  };

  gulp.watch([`${SRC_DIR}/app/**/*.js`], ["webpack:dev"]).on("change", fileChanged);
  gulp.watch([`${SRC_DIR}/**/*.scss`], ["sass"]).on("change", fileChanged);
});



/* ========== PRODUCTION ===========*/
gulp.task("webpack:prod", [], () => {
  return gulp.src(`${SRC_DIR}/app/app.js`)
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(`${DIST_DIR}/app`));
});

gulp.task("build:prod", callback => {
  runSequence(
    "clean",
    "copy-images",
    ["webpack:prod", "sass"],
    callback
  );
});

gulp.task("default", ["build:dev"]);
