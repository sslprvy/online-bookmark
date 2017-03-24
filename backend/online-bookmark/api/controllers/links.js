const DB = require('../helpers/db-connection');
const handleQuery = require('../common/handle-simple-query');
const ObjectID = require('mongodb').ObjectID;
const { decodeToken } = require('../helpers/crypto');

module.exports = {
    getLinks,
    createLink,
    updateLink
};

function getLinks(req, res) {
    const { username } = decodeToken(req.headers.authorization);

    DB.connect().then(db => {
        db.collection('links').find({ user: username }).toArray(handleQuery.bind(null, db, res));
    });
}

function createLink(req, res) {
    DB.connect().then(db => {
        const link = req.swagger.params.link.value;
        const { username } = decodeToken(req.headers.authorization);

        db.collection('links')
            .findOneAndUpdate(link, Object.assign({}, link, { user: username }), { upsert: true, returnNewDocument: true })
            .then(({ value: insertedLink }) => {
                res.json(insertedLink);
                db.close();
            });
    });
}

function updateLink(req, res) {
    DB.connect().then(db => {
        const link = req.swagger.params.link.value;
        const linkId = req.swagger.params.linkId.value;

        db.collection('links')
            .findOneAndUpdate(
                { _id: ObjectID(linkId) },
                link
            )
            .then(() => {
                res.json(Object.assign({}, link, { _id: linkId }));
                db.close();
            });
    });
}
