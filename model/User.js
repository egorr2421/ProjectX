'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../repository/connection');
const UserStatus = require('./UserStatus');
const uuidv4 = require('uuid/v4');

const User = require('../repository/connection').define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id'
    },
    login: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: 'login'
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: 'password'
    },
    avatar: {
        type: Sequelize.DataTypes.STRING,
        field: 'avatar'
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        notNull: true,
        isEmail: true,
        field: 'email'
    },
    state: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: UserStatus.ONLINE,
        field: 'state'
    },
    sessionId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: 'session_id'
    }
}, {
    getterMethods: {
        email() {
            return this.getDataValue('email').toLowerCase();
        },
        login() {
            return this.getDataValue('login').toLowerCase();
        }
    }, setterMethods: {
        email(email) {
            this.setDataValue('email', email.toLowerCase());
        },
        login(login) {
            this.setDataValue('login', login.toLowerCase());
        },
    },
  freezeTableName: true,
  timestamps: false,
  schema: 'x'
});

User.beforeValidate((user, options) => user.sessionId =
    Buffer.from(user.email + "/" + uuidv4()).toString('base64'));

module.exports = User;