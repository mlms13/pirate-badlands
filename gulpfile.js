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

gulp.task('js', function () {
    var browserify = require('browserify'),
        uglify = require('uglify-js'),
        fs = require('fs');

    browserify('./js/main.js').bundle(null, function (err, src) {
        var uglified = uglify.minify(src, {
            fromString: true,
            mangle: true
        });

        fs.writeFile('./build/js/main.js', uglified.code);
    });
});

gulp.task('duplicator', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./build'));
    gulp.src('./credits.html')
        .pipe(gulp.dest('./build'));
    gulp.src('./images/**')
        .pipe(gulp.dest('./build/images'));
});

gulp.task('server', ['default'], function () {
    var path = require('path'),
        express = require('express'),
        app = express();

    app.use(express.static(path.join(__dirname, 'build')));
    app.listen(4321, function () {
        console.log('Static web server running on port 4321');
    });
});

gulp.task('watch', ['default', 'server'], function () {
    gulp.watch('styl/**', ['stylus']);
    gulp.watch('js/**', ['lint', 'js']);
    gulp.watch('images/**', ['duplicator']);
    gulp.watch('index.html', ['duplicator']);
});

gulp.task('default', ['stylus', 'lint', 'js', 'duplicator']);