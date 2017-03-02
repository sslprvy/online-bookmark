const DB = require('../helpers/db-connection');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    lists,
    newList,
    newListElement,
    editList
};

function lists(req, res) {
    DB.connect().then(db => {
        db.collection('onlineBookmark').find({}).toArray(handleQuery.bind(null, db, res));
    });
}

function newList(req, res) {
    const listNameObject = JSON.parse(req.swagger.params.name.value);
    DB.connect().then(db => {
        try {
            db.collection('onlineBookmark').insert(
                Object.assign({}, listNameObject, {
                    elements: []
                })
            );
            res.json({ message: 'list created' })
        } catch (err) {
            res.json(err);
        } finally {
            db.close();
        }
    });
}

function newListElement(req, res) {
    DB.connect().then(db => {
        const listElement = req.swagger.params['list-element'].value;
        const listId = req.swagger.params.listId.value;
        // if we have the exact same link in the links collection use that one
        db.collection('links').findOne(listElement).then(link => {
            return link ? link : db.collection('links').insert(listElement).then(({ ops: link }) => link);
        }).then(link => {
            db.collection('onlineBookmark').findOneAndUpdate(
                { _id: ObjectID(listId) },
                { $push: { elements: link }},
                { returnNewDocument: true }
            ).then(modifiedList => {
                res.json(modifiedList.value);
                db.close();
            });
        }, (err) => {
            console.log(err);
            res.json(err);
            db.close();
        });
    });
}

function editList(req, res) {
    DB.connect().then(db => {
        const listElement = req.swagger.params['list-element'].value;
        const listId = req.swagger.params.listId.value;

        Promise.all([
            new Promise(resolve => {
                db.collection('links').update(
                    { _id: ObjectID(listElement._id ) },
                    Object.assign({}, listElement, { _id: ObjectID(listElement._id) }),
                    { returnNewDocument: true }
                ).then(resolve);
            }),
            new Promise(resolve => {
                db.collection('onlineBookmark').updateMany(
                    { 'elements._id': ObjectID(listElement._id) },
                    { $set: {
                        'elements.$.title': listElement.title,
                        'elements.$.url': listElement.url,
                        'elements.$.tags': listElement.tags
                    }},
                    { returnNewDocument: true }
                ).then(resolve)
            })]
        ).then(() => {
            return db.collection('onlineBookmark').findOne({ _id: ObjectID(listId) });
        }).then(modifiedList => {
            res.json(modifiedList);
            db.close();
        });
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
