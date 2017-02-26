const DB = require('../helpers/db-connection');

module.exports = {
    lists,
    newList
};

function lists(req, res) {
    DB.connect().then(db => {
        db.collection('onlineBookmark').find({}).toArray(handleQuery.bind(null, db, res));
    });
}

// req.swagger.params.name.value
function newList(req, res) {
    DB.connect().then(db => {
        try {
            db.collection('onlineBookmark').insert(JSON.parse(req.body));
            res.json({ message: 'list created' })
        } catch (err) {
            res.json(err);
        } finally {
            db.close();
        }
    });
}

function handleQuery(db, res, err, docs) {
    if (err) {
        res.json(JSON.stringify(err));
    }

    res.json(docs);

    // Close the DB
    db.close();
}
