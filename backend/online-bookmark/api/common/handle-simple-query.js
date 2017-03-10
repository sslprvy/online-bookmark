module.exports = handleQuery;

function handleQuery(db, res, err, docs) {
    if (err) {
        res.json(JSON.stringify(err));
    }

    res.json(docs);

    // Close the DB
    db.close();
}
