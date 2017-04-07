const DB = require('../helpers/db-connection');
const ObjectID = require('mongodb').ObjectID;
const { decodeToken } = require('../helpers/crypto');
const { pick, omit } = require('../helpers/common');

const handleQuery = require('../common/handle-simple-query');

module.exports = {
    lists,
    newList,
    newListElement,
    editList,
    updateList,
    getList
};

function lists(req, res) {
    const { username } = decodeToken(req.headers.authorization);

    DB.connect().then(db => {
        db.collection('lists').find({ user: username }).toArray(handleQuery.bind(null, db, res));
    });
}

function getList(req, res) {
    const { username } = decodeToken(req.headers.authorization);
    const listId = req.swagger.params.listId.value;

    DB.connect().then(db => {
        return Promise.all([
            db.collection('lists').findOne({ _id: ObjectID(listId) }),
            db.collection('links').find({ lists: { $in: [listId] } }).toArray()
        ])
        .then(([list, links]) => {
            res.json(Object.assign({}, list, { elements: links.map(link => omit(link, 'lists')) }));
        });
    });
}

function newList(req, res) {
    const listNameObject = JSON.parse(req.swagger.params.name.value);
    const { username } = decodeToken(req.headers.authorization);

    DB.connect().then(db => {
        db.collection('lists').insert(
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
            .findOneAndUpdate(listElement, Object.assign({}, listElement, { user: username }), { upsert: true, returnOriginal: false })
            .then(({ value: link }) => {
                db.collection('lists').findOneAndUpdate(
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
                db.collection('lists').updateMany(
                    { 'elements._id': listElementId },
                    { $set: {
                        'elements.$.title': listElement.title,
                        'elements.$.url': listElement.url,
                        'elements.$.tags': listElement.tags
                    }}
                ).then(resolve);
            })]
        ).then(() => {
            return db.collection('lists').findOne({ _id: ObjectID(listId) });
        }).then(modifiedList => {
            res.json(modifiedList);
            db.close();
        });
    });
}

function updateList(req, res) {
    DB.connect().then(db => {
        const listId = req.swagger.params.listId.value;
        const list = pick(req.swagger.params.list.value, 'name', 'user', 'elements');

        db.collection('lists').findOneAndUpdate(
            { _id: ObjectID(listId) },
            { $set: list },
            { returnOriginal: false }
        ).then(({ value }) => {
            res.json(value);
            db.close();
        }, (err) => {
            res.status(500).json({ message: err.message });
            db.close();
        });
    });
}
