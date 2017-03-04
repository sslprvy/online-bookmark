const MongoClient = require('mongodb').MongoClient;
const argv = require('yargs').argv;

const url = `mongodb://${argv.u}:${argv.pw}@${argv.ip}:${argv.p}/online-bookmark`;

module.exports = {
    connect
}

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, handleConnect);
        function handleConnect(err, db) {
            if (err) {
                console.error(err.MongoError);
                reject('Couldn\'t connect to server');
                throw Error('Couldn\'t connect to server');
            }
            console.log('Successfully connected to server');

            resolve(db);
        }
    });
}
