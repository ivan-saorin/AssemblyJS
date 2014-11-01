'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');

gulp.task('minify', function () {
  return gulp.src(['lib/scripts/**/*.js'])
    .pipe($.uglify({preserveComments: saveLicense}))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});


gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['minify']);
