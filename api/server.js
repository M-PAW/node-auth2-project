const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/authRouter');
const usersRouter = require('../users/usersRouter');
const restricted = require('../auth/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkRole('user'), usersRouter);

server.get('/', (req, res) => {
    res.send('Get Endpoint is Working!');
});

module.exports = server;

function checkRole(role) {
   return (req, res, next) => {

        if(
            req.decodedToken &&
            req.decodedToken.role &&
            req.decodedToken.role.toLowerCase() === role
        ) {
            next();
        }   else {
            res.status(403).json({  message: 'Invalid!'});
        }
   };
}