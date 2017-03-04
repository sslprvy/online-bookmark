const DB = require('../helpers/db-connection');
const handleQuery = require('../common/handle-simple-query');

module.exports = {
    getLinks,
    createLink
};

function getLinks(req, res) {
    DB.connect().then(db => {
        db.collection('links').find({}).toArray(handleQuery.bind(null, db, res));
    });
}

function createLink(req, res) {
    DB.connect().then(db => {
        const link = req.swagger.params.link.value;

        db.collection('links')
            .insert(link)
            .then(({ ops: insertedLink }) => {
                res.json(insertedLink);
                db.close();
            });
    });
}
