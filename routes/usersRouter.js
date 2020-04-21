const router = require('express').Router();
const Users = require('../helpers/usersModel');

//GET for /api/users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
});

module.exports = router;