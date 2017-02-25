const MongoClient = require('mongodb').MongoClient;
const argv = require('yargs').argv;

const url = `mongodb://${argv.u}:${argv.pw}@${argv.ip}:${argv.p}/online-bookmark`;

MongoClient.connect(url, handleConnect);

function handleConnect(err, db) {
    if (err) {
        console.error(err.MongoError);
        throw Error('Couldn\'t connect to server');
    }
    console.log("Successfully connected to server");

    // Find some documents in our collection
    db.collection('onlineBookmark').find({}).toArray(handleQuery.bind(null, db));

    // Declare success
    console.log("Called find()");
}

function handleQuery(db, err, docs) {
    // Print the documents returned
    docs.forEach(function(doc) {
        console.log(doc);
    });

    // Close the DB
    db.close();
}
