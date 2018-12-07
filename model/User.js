'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../repository/sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'pass'
    },
    avatar: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        notNull: true,
        isEmail: trye
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'ONLINE'
    }
}, {
    getterMethods: {
        email() {
            return this.email.toLowerCase();
        }
    }
});