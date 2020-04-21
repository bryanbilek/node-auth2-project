const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
//routers
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

server.use(express.json());
server.use(helmet());
server.use(cors());
//routes used
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('<h2>Web Auth I Module Challenge</h2>');
});

module.exports = server;