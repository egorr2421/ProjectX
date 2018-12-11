'use strict';

const User = require('../model/User');
const Op = require('sequelize').Op;

const findAll = User.findAll;
const findById = User.findById;
const findByEmailOrLogin = (value) => User.findAll({
    where: {
        [Op.or]: [{email: value.toLowerCase()}, {login: value.toLowerCase()}]
    }
});
const insert = (login, password, avatar, email) => {
    User.build({login: login, password: password, avatar: avatar, email: email})
        .save()
        .then((user) => user.tokenId)
        .catch((error) => {
            console.error(error);
        }
    );
}

module.exports.findAll = findAll;
module.exports.findById = findById;
module.exports.findByEmailOrLogin = findByEmailOrLogin;
module.exports.insert = insert;
