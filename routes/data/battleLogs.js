'use strict';

const addBattle = (id, userFirst, userSecond) => {
    const log = {
        userFirst: userFirst,
        userSecond: userSecond,
        id: id,
        battleField: null
    };
    log.userFirst.ready = false;
    log.userSecond.ready = false;
    battleLogs[id] = log;
    return log;
};

const getBattle = (id) => battleLogs[id];

const addBattleField = function (id, mas) {
    console.log(getBattle(id).battleField);
    if (getBattle(id).battleField === null) {
        getBattle(id).battleField = mas;
        console.log(getBattle(id).battleField);
    } else {
        for (let i = 0; i < getBattle(id).battleField.length; i++) {
            for (let y = 0; y < getBattle(id).battleField[i].length; y++) {
                if (getBattle(id).battleField[i][y] === 0) {
                    getBattle(id).battleField[i][y] = mas[i][y];
                }
            }
        }
    }
};

const nextBattleField = function (id, mas) {
    getBattle(id).battleField = mas;
};

const battleLogs = {};

module.exports.addBattle = addBattle;
module.exports.getBattle = getBattle;
module.exports.battleLogs = battleLogs;
module.exports.addBattleField = addBattleField;
module.exports.nextBattleField = nextBattleField;