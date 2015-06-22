var gulp = require('gulp');
var umd = require('gulp-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var copy = require('gulp-copy');
var fs = require('fs');
var minifyHtml = require('gulp-minify-html');
var runSequence = require('run-sequence');

gulp.task('clean', function(){
	return gulp.src('dist')
			   .pipe(clean({
			   		force: true
			   	}));
});

gulp.task('concat', function(){
	return gulp.src([
		'src/js/uploader.js',
		'src/js/events.js'
	])
	.pipe(concat('uploader.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
	gulp.src('src/less/**/*.less')
				// Copy wont pipe 
				// https://github.com/klaascuvelier/gulp-copy/issues/2
			   .pipe(copy('dist/less', {
			   		prefix: 2 // ignore src/less/ part of the path
			   	}));

   return gulp.src('src/less/**/*.less')
			   .pipe(less())
			   .pipe(gulp.dest('dist/css'))
			   .pipe(minifyCss())
			   .pipe(rename({
			   		suffix: '.min'
			   	}))
			   .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function(){
	var bowerrc = JSON.parse(fs.readFileSync('./.bowerrc'));
	var directory = bowerrc.directory || 'bower_components';

	// Copy gif images from fine-uploader
	return gulp.src(directory + '/fine-uploader/_build/*.gif')
			   .pipe(copy('dist/images', {
			   		prefix: 3
			   	}));
});

gulp.task('html', function(){
	gulp.src('src/html/**/*.html')
				// Copy wont pipe 
				// https://github.com/klaascuvelier/gulp-copy/issues/2
				.pipe(copy('dist/html', {
					prefix: 2
				}));

	return gulp.src('src/html/**/*.html')
			   .pipe(minifyHtml())
			   .pipe(rename({
			   		suffix: '.min'
			   	}))
			   .pipe(gulp.dest('dist/html'))
});

gulp.task('umd', function() {
	return gulp.src('dist/js/uploader.js')
		.pipe(umd({
			dependencies: function(file) {
				return [];
			},
			exports: function(file) {
				return 'Uploader';
			},
			namespace: function(file) {
				return 'Uploader';
			}
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', function(callback){
	runSequence('clean', [
		'concat',
		'styles',
		'images',
		'html'
	],
	'umd', callback);
});

gulp.task('production', ['build'], function(){
	return gulp.src('dist/*.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('dev', function(){
	return gulp.watch('src/**/*', ['build']);
});