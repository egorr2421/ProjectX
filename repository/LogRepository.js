'use strict';

const Log = require('../model/Log');
const Op = require('sequelize').Op;

const findByUserId = (userId) => {
    Log.findAll({
        where: {
            [Op.or]: [{firstUserId: userId}, {firstUserId: userId}]
        }
    });
};

module.exports.findByUserId = findByUserId;