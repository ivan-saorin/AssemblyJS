'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');
var rev = require('gulp-rev');
//var ngAnnotate = require('gulp-ng-annotate');

gulp.task('vendor', function () {
  return gulp.src(['app/vendor/**/*.*'])
    .pipe(gulp.dest('dist/vendor'))
    .pipe($.size());
});

gulp.task('styles-css', function () {
  return gulp.src('app/styles/**/*.css')
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});
gulp.task('styles-less', function () {
  return gulp.src('app/styles/**/*.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});
gulp.task('styles', ['styles-css', 'styles-less']);

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    //.pipe($.ngAnnotate())
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('app/partials/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    /*
    .pipe($.ngHtml2js({
      moduleName: 'spa',
      prefix: 'partials/'
    }))
    */
    .pipe(gulp.dest('.tmp/partials'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets = $.useref.assets();

  return gulp.src('app/*.html')

    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets)
    .pipe(jsFilter)
    //.pipe($.ngmin())
    //.pipe($.uglify({preserveComments: saveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    // commentato perche' per  ora non va in windows
    //.pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());

});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    //.pipe($.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['vendor', 'html', 'partials', 'images', 'fonts']);
