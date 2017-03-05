const MongoClient = require('mongodb').MongoClient;

const user = String(process.env.USER).trim();
const password = String(process.env.PASSWORD).trim();
const port = String(process.env.BACKEND_PORT).trim();
const ip = String(process.env.IP_ADDRESS).trim();

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
