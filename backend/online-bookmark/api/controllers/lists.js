const DB = require('../helpers/db-connection');
const ObjectID = require('mongodb').ObjectID;
const { decodeToken } = require('../helpers/crypto');
const { pick } = require('../helpers/common');

const handleQuery = require('../common/handle-simple-query');

module.exports = {
    lists,
    newList,
    newListElement,
    editList
};

function lists(req, res) {
    const { username } = decodeToken(req.headers.authorization);

    DB.connect().then(db => {
        db.collection('onlineBookmark').find({ user: username }).toArray(handleQuery.bind(null, db, res));
    });
}

function newList(req, res) {
    const listNameObject = JSON.parse(req.swagger.params.name.value);
    const { username } = decodeToken(req.headers.authorization);

    DB.connect().then(db => {
        db.collection('onlineBookmark').insert(
            Object.assign({}, listNameObject, {
                user: username,
                elements: []
            })
        ).then(() => {
            res.json({ message: 'list created' });
            db.close();
        }, (err) => {
            res.json(err);
            db.close();
        });
    });
}

function newListElement(req, res) {
    DB.connect().then(db => {
        const listElement = req.swagger.params['list-element'].value;
        const listId = req.swagger.params.listId.value;
        const { username } = decodeToken(req.headers.authorization);

        // if we have the exact same link in the links collection use that one
        db.collection('links')
            .findOneAndUpdate(listElement, Object.assign({}, listElement, { user: username }), { upsert: true, returnNewDocument: true })
            .then(({ value: link }) => {
                db.collection('onlineBookmark').findOneAndUpdate(
                    { _id: ObjectID(listId) },
                    { $push: { elements: link }},
                    { returnOriginal: false }
                ).then(modifiedList => {
                    res.json(modifiedList.value);
                    db.close();
                });
            }, (err) => {
                res.json(err);
                db.close();
            });
    });
}

function editList(req, res) {
    DB.connect().then(db => {
        const listElementId = req.swagger.params['list-element'].value._id;
        const listElement = pick(req.swagger.params['list-element'].value, 'title', 'url', 'tags');
        const listId = req.swagger.params.listId.value;

        Promise.all([
            new Promise(resolve => {
                db.collection('links').update(
                    { _id: ObjectID(listElementId) },
                    { $set: listElement }
                ).then(resolve);
            }),
            new Promise(resolve => {
                db.collection('onlineBookmark').updateMany(
                    { 'elements._id': ObjectID(listElementId) },
                    { $set: {
                        'elements.$.title': listElement.title,
                        'elements.$.url': listElement.url,
                        'elements.$.tags': listElement.tags
                    }}
                ).then(resolve);
            })]
        ).then(() => {
            return db.collection('onlineBookmark').findOne({ _id: ObjectID(listId) });
        }).then(modifiedList => {
            res.json(modifiedList);
            db.close();
        });
    });
}
