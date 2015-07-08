var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var copy = require('gulp-copy');
var rename = require('gulp-rename');
var fs = require('fs');
var minifyHtml = require('gulp-minify-html');
var paths = require('../paths');

gulp.task('styles', function(){
	gulp.src(paths.styles)
				// Copy wont pipe
				// https://github.com/klaascuvelier/gulp-copy/issues/2
			   .pipe(copy('dist/assets/less', {
			   		prefix: 2 // ignore src/less/ part of the path
			   	}));

   return gulp.src(paths.lessEntry)
			   .pipe(less())
			   .pipe(gulp.dest('dist/assets/css'))
			   .pipe(minifyCss())
			   .pipe(rename({
			   		suffix: '.min'
			   	}))
			   .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('images', function(){
	var bowerrc = fs.exists('./.bowerrc') ?
                  JSON.parse(fs.readFileSync('./.bowerrc')) :
                  {directory: 'bower_components'};
	var directory = bowerrc.directory;

	// Copy gif images from fine-uploader
	return gulp.src([
						directory + '/fine-uploader/_build/**/*.gif',
						directory + '/fine-uploader/_build/**/*.png'
					])
			   .pipe(copy('dist/assets/images', {
			   		prefix: 3
			   	}));
});

gulp.task('html', function(){
	gulp.src(paths.html)
				// Copy wont pipe
				// https://github.com/klaascuvelier/gulp-copy/issues/2
				.pipe(copy('dist/assets/html', {
					prefix: 2
				}));

	return gulp.src(paths.html)
			   .pipe(minifyHtml())
			   .pipe(rename({
			   		suffix: '.min'
			   	}))
			   .pipe(gulp.dest('dist/assets/html'))
});
