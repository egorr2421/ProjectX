'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();
const onlineUsers = require('./data/onlineUsersData');
const ResponseStatus = require('./response/ResponseStatus');
const userAuth = require('../modules/auth');

setInterval(() => {
    for (const key in onlineUsers.getAllUsers) {
        if (onlineUsers.getUser(key).date - new Date().getTime() < -1000 * 10) {
            onlineUsers.deleteUser(key);
        }
    }
}, 5000);

router.get('/', userAuth, function (req, res) {
    console.info('Getting online users, request');
    console.log(onlineUsers.getAllUsers);
    onlineUsers.upDate(req.user.id);
    res.status(ResponseStatus.OK);
    res.send(onlineUsers.getAllUsers);
});

module.exports = router;