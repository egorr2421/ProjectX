'use strict'

const User = require('../model/User');

module.exports.method = function findAll() {
    return User.findAll
}

module.exports.method = function findById(userId) {
    User.findById(userId);
}
