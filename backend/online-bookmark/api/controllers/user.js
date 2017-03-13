const DB = require('../helpers/db-connection');

module.exports = {
    createUser
};

function createUser(req, res) {
    DB.connect().then(db => {
        const user = req.swagger.params.user.value;
        const { email, username } = user;

        Promise.all([
            db.collection('users').findOne({ email }),
            db.collection('users').findOne({ username })
        ]).then(([userByEmail, userByName]) => {
            if (userByEmail || userByName) {
                throw new Error(409);
            }

            return null;
        })
        .then(() => {
            return db.collection('users').insert(user).then(() => true);
        })
        .then(() => {
            res.json({ message: 'Success' });
            db.close();
        })
        .catch(err => {
            if (err.message === '409') {
                res.status(409).send({ message: 'Username, or email address in use' });
            }

            res.status(500).send({ message: `Unexpected error: ${err.message}` });
        });
    });
}
