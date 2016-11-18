const notify = require('gulp-notify');

module.exports = {
    onError: onError
};

function onError(err) {
    notify.onError({
        title: `Gulp error in ${err.plugin}`,
        message: err.messageFormatted.toString()
    })(err);
    this.emit('end');
}
