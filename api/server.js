const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

//routers
const usersRouter = require('../routes/usersRouter');
const authRouter = require('../routes/authRouter');
const restricted = require('../routes/restricted');
const dbConnection = require('../data/dbConfig');

const server = express();

const sessionConfig = {
    name: "monster",
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60 * 60, //good for 1 hr
      secure: process.env.USE_SECURE_COOKIES || false,//set to true in production
      httpOnly: true, 
    },
    store: new KnexSessionStore({
      knex: dbConnection,
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 60, // will remove expired sessions every hour
    }),
  };

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

//routes used
server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send('<h2>Web Auth 2 Module Challenge</h2>');
});

module.exports = server;