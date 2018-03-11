'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const devMode = true;

gulp.task('build:scss', function () {
  return gulp.src('./scss/*')
    //.pipe(gulpIf(devMode, sourcemaps.init()))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(cleanCss())
    //.pipe(gulpIf(devMode, sourcemaps.write()))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('scss/*.scss', ['build:scss']);
  
  gulp.watch(['dist/*.html', 'dist/*.js'])
    .on('change', browserSync.reload);
});

gulp.task('default', ['build:scss', 'serve']);