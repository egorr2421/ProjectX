'use strict';

const Sequelize = require('sequelize');

const Log = require('../repository/connection').define('log', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id'
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'created_at'
    },
    firstUserId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        field: 'first_user_id'
    },
    secondUserId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        field: 'first_user_id'
    },
    finishedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'finished_at',
    },
    freezeTableName: true,
    timestamps: true,
    schema: 'x'
});


module.exports = Log;