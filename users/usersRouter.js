const router = require('express').Router();

const Users = require('./usersModel.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.send(error));
});

module.exports =  router;