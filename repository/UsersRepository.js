'use strict';

const User = require('../model/User');

module.exports.findAll = function () {
    return User.findAll
};

module.exports.findById = function (userId) {
    User.findById(userId);
};

module.exports.user = function () {
    return User;
};