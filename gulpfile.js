var gulp = require('gulp'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    _ = require('lodash');

gulp.task('default', ['build', 'watch']);

gulp.task('build', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(concat('online-bookmark.js'))
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*js', ['build']);
});