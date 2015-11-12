'use strict';

// Requirements
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
    del = require('del'),
    jshint = require('gulp-jshint');

// Paths
var options = {
  src: 'src',
  dist: 'dist'
};

//Tasks
gulp.task('compileSass', function(){
  return gulp.src(options.src + '/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
      .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('jshint', function() {
  return gulp.src(options.src + '/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
  del(['dist', options.src + '/css/style*.css*']);
});

gulp.task('watch', ["compileSass"], function(){
  gulp.watch(options.src + '/sass/**/*.scss', ['compileSass']);
  gulp.watch(options.src + '/js/**/*.js', ['jshint']);
});

gulp.task("build", ["compileSass"], function() {
  return gulp.src([options.src + '/css/style.min.css', options.src + '/**/*.html'], { base: options.src})
            .pipe(gulp.dest(options.dist));
});

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});

gulp.task("dev", ["clean"], function() {
  gulp.start('watch');
});