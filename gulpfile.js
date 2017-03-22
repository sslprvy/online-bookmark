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
const modRewrite = require('connect-modrewrite');

require('./gulp_settings/server')();
require('./gulp_settings/backend');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
const dependencies = [
    'react',
    'react-dom',
    'react-router-dom',
    'history'
];

const NODE_ENV = ['dev', 'prod'];

if (!_.includes(NODE_ENV, process.env.NODE_ENV.trim())) {
    throw new Error('Environment variable NODE_ENV is not defined! Should be either "dev" or "prod"');
}

const ENVIRONMENT = {
    isDev: process.env.NODE_ENV.trim() === 'dev',
    isProd: process.env.NODE_ENV.trim() === 'prod'
};

const CONFIG = {
    tempFolder: 'tmp',
    jsDestFolder: 'web/js/',
    cssDestFolder: 'web/css/',
    appEntryPoint: './app/root.jsx',
    destFolder: 'web',
    extensions: ['.js', '.json', '.jsx']
};

// Gulp tasks
// ----------------------------------------------------------------------------

gulp.task('lint', function () {
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

gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch(['app/**/*.jsx', 'app/**/*.js'], ['scripts:app']);
    gulp.watch([`${CONFIG.tempFolder}/bundle.js`], function () {
        sequence('clean:js', 'revision', 'index')();
    });
    gulp.watch(`${CONFIG.tempFolder}/*.css`, function () {
        sequence('clean:css', 'revision', 'index')();
    });
    gulp.watch(['./index.html']).on('change', browserSync.reload);
    gulp.watch(`${CONFIG.destFolder}/**/*.*`).on('change', _.debounce(browserSync.reload, 100));
});

gulp.task('copy:index', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(CONFIG.destFolder));
});

gulp.task('copy:fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest(`${CONFIG.destFolder}/fonts`));
});

gulp.task('clean:js', function () {
    return del([`${CONFIG.jsDestFolder}*.js`]);
});

gulp.task('clean:css', function () {
    return del([`${CONFIG.cssDestFolder}*.css`]);
});

gulp.task('connect', function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: CONFIG.destFolder,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
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
    var source = gulp.src([
        `${CONFIG.jsDestFolder}vendor*.js`,
        `${CONFIG.jsDestFolder}*.js`,
        `${CONFIG.cssDestFolder}*.css`
    ], { read: false });

    return target
        .pipe(inject(source, { ignorePath: 'web' }))
        .pipe(gulp.dest(CONFIG.destFolder));
});

gulp.task('sass', () => {
    return gulp.src(['node_modules/animate.css/animate.css', 'node_modules/font-awesome/scss/*.scss', 'app/**/*.scss'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(gulp.dest(`${CONFIG.tempFolder}`))
        .pipe(browserSync.stream());
});

gulp.task('scripts:vendor', () => {
    return browserify({
        require: dependencies,
        debug: ENVIRONMENT.isDev,
        extensions: CONFIG.extensions
    })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('vendors.js'))
        .pipe(gulp.dest(CONFIG.tempFolder));
});

gulp.task('scripts:app', () => {
    const appBundler = browserify({
        entries: CONFIG.appEntryPoint,
        debug: ENVIRONMENT.isDev,
        extensions: CONFIG.extensions
    });

    dependencies.forEach(dep => {
        appBundler.external(dep);
    });

    return appBundler
        // transform ES6 and JSX to ES5 with babelify
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(CONFIG.tempFolder));
});

gulp.task('deploy', sequence(
    ['clean:js', 'clean:css'],
    ['copy:index', 'copy:fonts', 'sass', 'scripts:vendor', 'scripts:app'],
    'revision',
    'index'
));

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts:app' defined above will fire.
gulp.task('default', sequence(
    ['clean:js', 'clean:css'],
    ['copy:index', 'copy:fonts', 'sass', 'scripts:vendor', 'scripts:app', 'backend'],
    'revision',
    'index',
    'connect',
    ['watch', 'watch:backend']
));
