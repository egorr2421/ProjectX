'use strict';

const User = require('../model/User');
const Op = require('sequelize').Op;
const UserStatus = require('../model/UserStatus');

const findByPk = (id) => User.findByPk(id);

const findByEmailOrLogin = (value) => User.findOne({
    where: {
        [Op.or]: [{email: value.toLowerCase()}, {login: value.toLowerCase()}]
    }
});

const findByEmailAndLogin = (email, login) => User.findOne({
    where: {
        [Op.or]: [{email: email.toLowerCase()}, {login: login.toLowerCase()}]
    }
});

const findBySessionId = (value) => User.findOne({
    where: {
        sessionId: value
    }
});

const insert = (login, password, avatar, email) =>
    User.build({login: login, password: password, avatar: avatar, email: email})
        .save();

const findAndCountAll = (limit, offset) => User.findAndCountAll({
    limit: limit,
    offset: offset,
    where: {
        state: UserStatus.ONLINE
    },
    attributes: {
        exclude: ['login', 'password', 'session_id', 'avatar']
    }
});

module.exports.findAll = User.findAll;
module.exports.findByPk = findByPk;
module.exports.findByEmailOrLogin = findByEmailOrLogin;
module.exports.insert = insert;
module.exports.findBySessionId = findBySessionId;
module.exports.findByEmailAndLogin = findByEmailAndLogin;
module.exports.findAndCountAll = findAndCountAll;