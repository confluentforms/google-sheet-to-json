var gulp = require('gulp'),
		eslint = require('gulp-eslint'),
		path = require('path'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify');

var NAME_PROJECT = __dirname.split(path.sep).pop();
var FILENAME_SOURCE = NAME_PROJECT + '.js';
var FILENAME_RELEASE = path.join(__dirname, NAME_PROJECT + '.min.js');

gulp.task('release', function() {
	return gulp.src(FILENAME_SOURCE)
		.pipe(eslint())
		.pipe(eslint.failAfterError())
	  .pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('.'));
});
