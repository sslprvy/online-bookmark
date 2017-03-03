const DB = require('../helpers/db-connection');
const handleQuery = require('../common/handle-simple-query');

module.exports = {
    getLinks
};

function getLinks(req, res) {
    DB.connect().then(db => {
        db.collection('links').find({}).toArray(handleQuery.bind(null, db, res));
    });
}
