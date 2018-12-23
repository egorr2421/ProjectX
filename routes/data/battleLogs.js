var addBattle = function (id, userFirst, userSecond) {
    battle = {
        userFirst: userFirst,
        userSecond: userSecond,
        id:id
    };
    battleLogs[id] = battle;
};

var getBattle = function (id) {
    return battleLogs[id];
};

var battleLogs = {};

module.exports.addBattle = addBattle;
module.exports.getBattle = getBattle;
module.exports.battleLogs = battleLogs;