/**
 * Created with IntelliJ IDEA.
 * User: Danny Siu <danny.siu@gmail.com>
 * Date: 5/18/15
 * Time: 16:30
 */

var gulp = require('gulp');
var debug = require('gulp-debug');
var run = require('gulp-run');

var scriptsGlob = 'default.js';

gulp.task('compile', function () {
  gulp.src(scriptsGlob)
    .pipe(debug())
    .pipe(run('/usr/bin/osacompile'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function() {
  // place code for your default task here
});
