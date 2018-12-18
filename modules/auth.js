'use strict';

const UserRepository = require('../repository/UsersRepository');
const Constants = require('../constants/Constants');

module.exports = (req, res, next) => {
    const sessionId = req.cookies[Constants.SESSION_ID];
    console.log(sessionId);
    UserRepository.findBySessionId(sessionId).then(user => {
        if (user === null) {
            console.log(`User with ${sessionId} wasn't found`);
            res.redirect('/login');
            return;
        } else {
            console.log(`User was found`);
            console.log('User: ' + user.email + '; ' + user.login);
            req.user = user;
            next();
        }
    }).catch(error => next(error));
};