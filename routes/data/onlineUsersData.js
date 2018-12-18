'use strict';

const addUserToOnline = function (user) {
    user.date = new Date().getTime();
    onlineUsersData[user.id] = user;
};
const getUser = function (id) {
    return onlineUsersData[id];
};

const deleteUser = function (id) {
    delete onlineUsersData[id];
};

const upDate = function (id) {
    if(id in onlineUsersData)
        onlineUsersData[id].date = new Date().getTime();
};

const onlineUsersData = {};

module.exports.getUser = getUser;
module.exports.upDate = upDate;
module.exports.deleteUser = deleteUser;
module.exports.getAllUsers = onlineUsersData;
module.exports.addUserToOnline = addUserToOnline;