"use strict";

const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const webpack = require("webpack-stream");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");
const path = require("path");
const eslint = require("gulp-eslint");
const scsslint = require("gulp-scss-lint");

const DIST_DIR = "./client/dist";
const SRC_DIR = "./client/src";

gulp.task("run-build", callback => {
  runSequence(
    "clean",
    ["webpack", "sass"],
    callback
  );
});

gulp.task("clean", () => {
  return del([`${DIST_DIR}/**/*`]);
});

gulp.task("sasslint", () => {
  return gulp.src(`${SRC_DIR}/app/**/*.scss`)
    .pipe(scsslint());
});

gulp.task("eslint", () => {
  return gulp.src([`${SRC_DIR}/app/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("sass", ["sasslint"], () => {
  return gulp.src(`${SRC_DIR}/sass/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(`${DIST_DIR}/css/`));
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

  gulp.watch([`${SRC_DIR}/sass/**`], ["sass"]).on("change", fileChanged);
  gulp.watch([`${SRC_DIR}/app/**/*`], ["webpack"]).on("change", fileChanged);
});

gulp.task("build", ["run-build"]);

gulp.task("default", ["build"]);
