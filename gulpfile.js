/**
 * Gulp config is courtesy of Jean-Pierre Sierens
 * http://jpsierens.com/tutorial-gulp-javascript-2015-react/
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');
const rev = require('gulp-rev');
const inject = require('gulp-inject');
const del = require('del');
const browserSync = require('browser-sync').create();
const sequence = require('gulp-sequence');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const _ = require('lodash');

const onError = require('./gulp_settings/error-handler').onError;

require('./gulp_settings/server')();

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const dependencies = [
    'react',
    'react-dom'
];

const CONFIG = {
    tempFolder: 'tmp',
    jsDestFolder: 'web/js/',
    cssDestFolder: 'web/css/',
    appEntryPoint: './app/app.jsx',
    destFolder: 'web',
    extensions: ['.js', '.json', '.jsx']
};

// keep a count of the times a task refires
var scriptsCount = 0;


// Gulp tasks
// ----------------------------------------------------------------------------

gulp.task('lint', function (callback) {
    return gulp.src(['app/**/*.jsx'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('scripts', ['lint'], function (callback) {
    bundleApp(false);
    callback();
});

gulp.task('deploy', function (callback) {
    bundleApp(true);
    callback();
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch(['app/**/*.jsx', 'app/**/*.js'], ['scripts']);
    gulp.watch([`${CONFIG.tempFolder}/bundle.js`], function () {
        sequence('clean-js', 'revision', 'index')();
    });
    gulp.watch(`${CONFIG.tempFolder}/*.css`, function () {
        sequence('clean-css', 'revision', 'index')();
    });
    gulp.watch(['./index.html']).on('change', browserSync.reload);
    gulp.watch(`${CONFIG.destFolder}/**/*.*`).on('change', _.debounce(browserSync.reload, 100));
});

gulp.task('copy:index.html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(CONFIG.destFolder));
});

gulp.task('clean-js', function () {
    return del([`${CONFIG.jsDestFolder}*.js`]);
});

gulp.task('clean-css', function () {
    return del([`${CONFIG.cssDestFolder}*.css`]);
});

gulp.task('connect', function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: CONFIG.destFolder
        }
    });
});

gulp.task('revision', function () {
    var jsRevision = gulp.src([`${CONFIG.tempFolder}/*.js`])
        .pipe(rev())
        .pipe(gulp.dest(`${CONFIG.jsDestFolder}`));
    var cssRevision = gulp.src([`${CONFIG.tempFolder}/*.css`])
        .pipe(rev())
        .pipe(gulp.dest(`${CONFIG.cssDestFolder}`));
    return merge(jsRevision, cssRevision);
});

gulp.task('index', function () {
    var target = gulp.src(`${CONFIG.destFolder}/index.html`);
    var source = gulp.src([`${CONFIG.jsDestFolder}vendor*.js`, `${CONFIG.jsDestFolder}*.js`, `${CONFIG.cssDestFolder}*.css`], { read: false });
    return target
        .pipe(inject(source, { ignorePath: 'web' }))
        .pipe(gulp.dest(CONFIG.destFolder));
});

gulp.task('sass', () => {
    return gulp.src('app/**/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(gulp.dest(`${CONFIG.tempFolder}`))
        .pipe(browserSync.stream());
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', sequence(['clean-js', 'clean-css'], ['copy:index.html', 'sass', 'scripts', 'watch'], 'index', 'connect'));

// Private Functions
// ----------------------------------------------------------------------------

function bundleApp(isProduction) {
    scriptsCount++;

    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    const appBundler = browserify({
        entries: CONFIG.appEntryPoint,
        debug: true,
        extensions: CONFIG.extensions
    });

    // If it's not for production, a separate vendors.js file will be created
    // the first time gulp is run so that we don't have to rebundle things like
    // react everytime there's a change in the js file
    if (!isProduction && scriptsCount === 1) {
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true,
            extensions: CONFIG.extensions
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest(CONFIG.tempFolder));
    }
    if (!isProduction) {
        // make the dependencies external so they dont get bundled by the
        // app bundler. Dependencies are already bundled in vendor.js for
        // development environments.
        dependencies.forEach(function (dep) {
            appBundler.external(dep);
        });
    }

    appBundler
        // transform ES6 and JSX to ES5 with babelify
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(CONFIG.tempFolder));
}
