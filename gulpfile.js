var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    browserify = require('gulp-browserify');

gulp.task('less', function () {
    return gulp.src('./less/main.less')
        .pipe(less({ paths: ['./less/*.less'] }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('./js/main.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('watch', function () {
    gulp.watch('less/**', ['less']);
    gulp.watch('js/**', ['js']);
});

gulp.task('index', function() {
    gulp.src('./index.html')
        .pipe(gulp.dest('./build'))
});

gulp.task('default', ['less', 'js', 'index']);