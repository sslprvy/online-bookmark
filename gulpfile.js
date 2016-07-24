/**
 * Gulp config is courtesy of Jean-Pierre Sierens
 * http://jpsierens.com/tutorial-gulp-javascript-2015-react/
 */

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babelify = require('babelify');
const livereload = require('gulp-livereload');
const connectLivereload = require('connect-livereload');
const serveStatic = require('serve-static');

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

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function() {
    bundleApp(false);
});

gulp.task('deploy', function(){
    bundleApp(true);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./app/*.jsx'], ['scripts']);
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(connectLivereload({
            port: LIVERELOAD_PORT
        }))
        .use(serveStatic(__dirname));

    require('http').createServer(app)
        .listen(SERVER_PORT)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch', 'connect']);

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    scriptsCount++;
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    const appBundler = browserify({
        entries: './app/app.jsx',
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
            .pipe(gulp.dest('./web/js/'));
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
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./web/js/'))
        .pipe(livereload());
}