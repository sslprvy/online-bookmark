'use strict';

const spawn = require('child_process').spawn;

const SERVER_CONFIG = {
    os: process.platform === 'win32' ? 'win' : process.platform
};

module.exports = function() {
    const jsonServerConfig = ['node_modules/json-server/bin/index.js', '--watch', 'app/mock-data.json'];
    const jsonServer = spawn('node', jsonServerConfig, { stdio: 'inherit' });
};
