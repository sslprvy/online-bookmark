const MongoClient = require('mongodb').MongoClient;
const argv = require('yargs').argv;

let url;

if (argv.pw) {
    url = `mongodb://${argv.u}:${argv.pw}@${argv.ip}:${argv.p}/online-bookmark`;
} else {
    let [user, password, ip, port] = process.argv.slice(2);
    url = `mongodb://${user.split(' ')[1]}:${password.split(' ')[1]}@${ip.split(' ')[1]}:${port.split(' ')[1]}/online-bookmark`;
}

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
