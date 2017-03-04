const gulp = require('gulp');
const spawn = require('child_process').spawn;
const _ = require('lodash');

let backendProcess;

gulp.task('backend', (done) => {
    if (!_.isUndefined(backendProcess)) {
        backendProcess.on('close', () => {
            backendProcess = startProcess();
            done();
        });
        backendProcess.kill('SIGTERM');
    } else {
        backendProcess = startProcess();
        done();
    }
});

gulp.task('watch:backend', () => {
    let backendProcess;

    gulp.watch([
        'backend/online-bookmark/api/**/*.js',
        'backend/online-bookmark/api/**/*.yaml'
        ], ['backend']);
});

function startProcess() {
    return spawn('node', [
            'backend/online-bookmark/app.js',
            '--u freddy_krueger',
            '--pw ThisIstheMostFuckedUpPasswordEver',
            '--ip 185.111.88.74',
            '--p 27017'
        ],{ stdio: 'inherit' });
}
