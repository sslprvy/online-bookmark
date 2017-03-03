const DB = require('../helpers/db-connection');
const handleQuery = require('../common/handle-simple-query');

module.exports = {
    searchTags
};

function searchTags(req, res) {
    DB.connect().then(db => {
        const tags = req.swagger.params.tags.value.split(',');

        db.collection('links').find({ tags: { $in: tags } }).toArray(handleQuery.bind(null, db, res));
    });
}
