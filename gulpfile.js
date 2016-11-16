/**
 * Gulp config is courtesy of Jean-Pierre Sierens
 * http://jpsierens.com/tutorial-gulp-javascript-2015-react/
 */

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');
const rev = require('gulp-rev');
const inject = require('gulp-inject');
const del = require('del');
const browserSync = require('browser-sync').create();

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const dependencies = [
    'react',
    'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;

const SERVER_PORT = 9000;
const LIVERELOAD_PORT = 35729;

const CONFIG = {
    tempFolder: 'tmp',
    destFolder: 'web/js/',
    appEntryPoint: './app/app.jsx'
};

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function (callback) {
    bundleApp(false);
    callback();
});

gulp.task('deploy', function (callback){
    bundleApp(true);
    callback();
});

gulp.task('watch', function () {
    gulp.watch(['app/*.jsx'], ['scripts']);
    gulp.watch([`${CONFIG.tempFolder}/bundle.js`], ['clean', 'revision']);
    gulp.watch([`${CONFIG.destFolder}*.js`], function(event) {
        if (event.type === 'renamed') {
            gulp.start('index');
        }
    });
    gulp.watch(['./index.html']).on('change', browserSync.reload);
});

gulp.task('clean', function () {
    return del([`${CONFIG.destFolder}*.js`]);
});

gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('connect', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('revision', function () {
    return gulp.src([`${CONFIG.tempFolder}/*.js`])
        .pipe(rev())
        .pipe(gulp.dest(`${CONFIG.destFolder}`));
});

gulp.task('index', function() {
    var target = gulp.src('./index.html');

    var source = gulp.src([`${CONFIG.destFolder}vendor*.js`, `${CONFIG.destFolder}*.js`], { read: false });

    return target.pipe(inject(source))
        .pipe(gulp.dest('./'));
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['clean', 'scripts', 'watch', 'connect']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    scriptsCount++;
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    const appBundler = browserify({
        entries: CONFIG.appEntryPoint,
        debug: true
    });

    // If it's not for production, a separate vendors.js file will be created
    // the first time gulp is run so that we don't have to rebundle things like
    // react everytime there's a change in the js file
    if (!isProduction && scriptsCount === 1){
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest(CONFIG.tempFolder));
    }
    if (!isProduction){
        // make the dependencies external so they dont get bundled by the
        // app bundler. Dependencies are already bundled in vendor.js for
        // development environments.
        dependencies.forEach(function(dep){
            appBundler.external(dep);
        })
    }

    appBundler
    // transform ES6 and JSX to ES5 with babelify
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(CONFIG.tempFolder));
}
