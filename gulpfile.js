var gulp = require('gulp'),
	concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var name = 'ng-bootstrap-datepicker', 
	version = '1.0.0';
var options = {
    js: {
        src: [
            'source/js/' + name + '.js',
        ],
        name: name,
        dest: 'dist/js/'
    },
    css: {
        compile: 'source/sass/' + name + '.scss',
        dest: 'dist/css/'
    }
};

gulp.task('css', function () {
	return gulp.src(options.css.compile)
    .pipe(sass())
    .pipe(rename(options.js.name + '.css'))
    .pipe(gulp.dest(options.css.dest))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename(options.js.name + '.min.css'))
    .pipe(gulp.dest(options.css.dest));
});


gulp.task('js', function () {
  	var stream = gulp.src(options.js.src)
        .pipe(concat(options.js.name + '.js'))
        .pipe(gulp.dest(options.js.dest))
        .pipe(uglify())
        .pipe(rename(options.js.name + '.min.js'))
        .pipe(gulp.dest(options.js.dest))
  	return stream.pipe(gulp.dest(options.js.dest));
});

gulp.task('default', ['js', 'css']);