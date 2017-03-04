const gulp = require('gulp');
const spawn = require('child_process').spawn;
const _ = require('lodash');

let backendProcess;

gulp.task('backend', (done) => {
    // This "hack" is needed because if swagger throws a yaml parse exception
    // we wont start another process otherwise
    // TODO: needs further enhancement since after an error every second "save" triggers a child process
    let timeout = setTimeout(() => {
        backendProcess = undefined;
        done();
    }, 100);

    if (!_.isUndefined(backendProcess)) {
        backendProcess.on('close', () => {
            backendProcess = startProcess();
            clearTimeout(timeout);
            done();
        });
        backendProcess.kill('SIGTERM');
    } else {
        backendProcess = startProcess();
        clearTimeout(timeout);
        done();
    }
});

gulp.task('watch:backend', () => {
    gulp.watch('backend/online-bookmark/api/**/*.yaml').on('change', _.debounce(startBackendTask, 1000));
    gulp.watch('backend/online-bookmark/api/**/*.js', ['backend']);
});

function startBackendTask() {
    return gulp.start(['backend']);
}

function startProcess() {
    return spawn('node', [
            'backend/online-bookmark/app.js',
            '--u freddy_krueger',
            '--pw ThisIstheMostFuckedUpPasswordEver',
            '--ip 185.111.88.74',
            '--p 27017'
        ], { stdio: 'inherit' });
}
