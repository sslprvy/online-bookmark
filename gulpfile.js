var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    livereload = require('gulp-livereload'),
    fs = require('fs'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    _ = require('lodash');

gulp.task('default', ['build', 'index.html','watch', 'connect']);


gulp.task('build', function() {
    return browserify(['./src/app.js'])
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('online-bookmark.js'))
        .pipe(gulp.dest('./build'))
        .pipe(livereload());
});

gulp.task('index.html', function() {
    return html = gulp.src('index.html')
        .pipe(gulp.dest('build'))
        .pipe(livereload());
})

gulp.task('connect', function() {
    return connect.server({
        root: 'build',
        livereload: true
    })
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*js', ['build']);
    gulp.watch('index.html', ['index.html']);
});