const MongoClient = require('mongodb').MongoClient;

const { user, password, port, ip } = require('../../../../online-bookmark-config/mongo.json');

const url = `mongodb://${user}:${password}@${ip}:${port}/online-bookmark`;

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
