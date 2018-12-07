'use strict'

const User = require('../model/User');


export function findAll() {
    return User.findAll
}

export function findById(userId) {
    User.findById(userId);
}
