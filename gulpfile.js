var gulp = require('gulp');

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.src('./styl/main.styl')
        .pipe(stylus({ paths: ['./styl/*.styl'] }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js', function() {
    var browserify = require('gulp-browserify');

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

gulp.task('watch', ['default'], function () {
    gulp.watch('styl/**', ['stylus']);
    gulp.watch('js/**', ['lint', 'js']);
    gulp.watch('index.html', ['index']);
});

gulp.task('default', ['stylus', 'lint', 'js', 'index']);
