const DB = require('../helpers/db-connection');
const handleQuery = require('../common/handle-simple-query');

module.exports = {
    searchTags,
    searchTitle
};

function searchTags(req, res) {
    DB.connect().then(db => {
        const tags = req.swagger.params.tags.value.split(',');

        db.collection('links').find({ tags: { $in: tags } }).toArray(handleQuery.bind(null, db, res));
    });
}

function searchTitle(req, res) {
    DB.connect().then(db => {
        const title = req.swagger.params.title.value;

        db.collection('links').find({ title: { $regex: title , $options: 'i' }}).toArray(handleQuery.bind(null, db, res));
    });
}
