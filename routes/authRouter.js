const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('json-web-token');
const Users = require('../helpers/usersModel');
const secrets = require('../config/secrets');

//POST to /api/auth/register
router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(users => {
            res.status(200).json({ message: 'Registration successful' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Registraition failed' });
        });
});

//POST to /api/auth/login
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'Invalid username or password' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'You shall not pass!' });
        });
});

//token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '8h'
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;