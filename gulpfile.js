var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus = require('gulp-stylus'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    browserify = require('gulp-browserify');

gulp.task('stylus', function () {
    return gulp.src('./styl/main.styl')
        .pipe(stylus({ paths: ['./styl/*.styl'] }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('lint', function () {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('./js/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('index', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./build'))
});

gulp.task('watch', function () {
    gulp.watch('styl/**', ['stylus']);
    gulp.watch('js/**', ['lint', 'js']);
    gulp.watch('index.html', ['index']);
});

gulp.task('default', ['stylus', 'lint', 'js', 'index']);
