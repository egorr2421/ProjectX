let canvas = document.getElementById("canvas");
let target = "dwarf";
let kingApp = true;
let cnx = canvas.getContext('2d');
let mas = [];
let current = 1;
let prise = 7;
let point = {
    y: 0,
    x: 0
};
let w = 13, h = 13;

canvas.onclick = function () {
    beforeStart(event, current);

};

function beforeStart(event, unt) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x + " " + y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    console.log(x + " " + y);
    let temp = document.getElementById("resulte");
    let temp1 = document.getElementById("count-" + target);
    if (y > 10) {
        if (mas[y][x].id == unt) {
            if (unt == 5)
                kingApp = true;
            console.log("_");
            cnx.clearRect(x * 50, y * 50, 50, 50);
            mas[y][x] = 0;
            temp.innerText = parseFloat(temp.innerText) + prise;
            temp1.innerText = parseFloat(temp1.innerText) - 1;
        } else {
            if (mas[y][x] == 0) {
                if (temp.innerText - prise >= 0 && target != "king") {
                    temp.innerText -= prise;
                    if (unt == 1) mas[y][x] = new dwarf(target, unt);
                    if (unt == 4) mas[y][x] = new energy(target, unt);
                    if (unt == 2) mas[y][x] = new hourse(target, unt);
                    if (unt == 3) mas[y][x] = new pocket(target, unt);
                    temp1.innerText = parseFloat(temp1.innerText) + 1;
                }
                if (kingApp == true && target == "king") {
                    mas[y][x] = new king(target, unt);
                    ;
                    temp1.innerText = parseFloat(temp1.innerText) + 1;
                    kingApp = false;
                }

            }
        }
    }
    drow();
}

function gameLM(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x + " " + y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    if (mas[y][x] != 0) {
        if (mas[y][x].active) {
            current = mas[y][x].id;
            console.log(y + " game " + x);
            point.y = y;
            point.x = x;
        }
    } else {
        point.y = 0;
        point.x = 0;
        current = 0;
    }
    drow();
    console.log(mas);
}

function gameRM(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x + " " + y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    if (mas[y][x] == 0 && current != 0 && mas[point.y][point.x].active) {

        if ((mas[point.y][point.x].id == 1 || mas[point.y][point.x].id == 4) && (((Math.abs(point.y - y)) + (Math.abs(point.x - x)) <= mas[point.y][point.x].move))) {
            mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
            // mas[y][x] = mas[point.y][point.x];
            // mas[y][x].active = false;
            // mas[point.y][point.x] = 0;
        }
        if (mas[point.y][point.x].id == 2 && (((Math.abs(point.y - y)) + (Math.abs(point.x - x)) <= mas[point.y][point.x].move))) {
            mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
        }
        if (mas[point.y][point.x].id == 3 && (((Math.abs(point.y - y)) + (Math.abs(point.x - x)) <= mas[point.y][point.x].move))) {
            mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
        }
        if (mas[point.y][point.x].id == 5 && (((Math.abs(point.y - y)) + (Math.abs(point.x - x)) <= mas[point.y][point.x].move))) {
            mas[point.y][point.x].moveTo(mas, point.x, point.y, x, y);
        }

    } else {
        if (mas[y][x].player != mas[point.y][point.x].player && current != 0) {
            if ((((Math.abs(point.y - y)) <= 1 && (Math.abs(point.x - x)) <= 1) || ((mas[point.y][point.x].id == 3)&&  (((Math.abs(point.y - y)) + (Math.abs(point.x - x)) <= 4)))) && mas[point.y][point.x].atcAcc) {
                mas[point.y][point.x].attackUnit(mas[y][x]);
                // mas[point.y][point.x].active = false;
            }
        }
    }
    point.y = 0;
    point.x = 0;
    current = 0;

    drow();
};

function inint() {
    for (let i = 0; i <= h; i++) {
        mas[i] = [];
        for (let y = 0; y <= w; y++) {
            mas[i][y] = 0;
        }
    }
    mas[0][0] = new dwarf('dwarf-t', 1);
    mas[0][0].player = "player2";
    mas[0][1] = new hourse('hourse-t', 2);
    mas[0][1].player = "player2";
    mas[0][2] = new pocket('pocket-t', 3);
    mas[0][2].player = "player2";
    mas[0][3] = new energy('energy-t', 4);
    mas[0][3].player = "player2";
    mas[0][4] = new king('king-t', 5);
    mas[0][4].player = "player2";
    mas[0][5] = new hourse('hourse-t', 2);
    mas[0][5].player = "player2";
}

function drow() {

    cnx.clearRect(0, 0, w * 100, h * 100);
    for (let i = 0; i <= h; i++) {
        cnx.moveTo(0, i * 50);
        cnx.lineTo(700, i * 50);

        for (let y = 0; y <= w; y++) {
            cnx.moveTo(y * 50, 0);
            cnx.lineTo(y * 50, 700);
            if (mas[i][y].heal <= 0) {
                mas[i][y] = 0;
            }
            if (mas[i][y].player == "player1") {
                cnx.fillStyle = '#2B2B2B';
            } else {
                cnx.fillStyle = '#002B36';
            }
            if (mas[i][y].id == 1) {
                let u = document.getElementById('dwarf-t');
                cnx.fillRect((y * 50), (i * 50) - ((mas[i][y].heal - 100) / 100 * 50), 50, 50 + ((mas[i][y].heal - 100) / 100 * 50));
                cnx.drawImage(u, y * 50, i * 50, 50, 50);
            }
            if (mas[i][y].id == 2) {
                let u = document.getElementById('hourse-t');

                cnx.fillRect((y * 50), (i * 50) - ((mas[i][y].heal - 100) / 100 * 50), 50, 50 + ((mas[i][y].heal - 100) / 100 * 50));
                cnx.drawImage(u, y * 50, i * 50, 50, 50);
            }
            if (mas[i][y].id == 3) {
                let u = document.getElementById('pocket-t');
                cnx.fillRect((y * 50), (i * 50) - ((mas[i][y].heal - 100) / 100 * 50), 50, 50 + ((mas[i][y].heal - 100) / 100 * 50));
                cnx.drawImage(u, y * 50, i * 50, 50, 50);
            }
            if (mas[i][y].id == 4) {
                let u = document.getElementById('energy-t');
                cnx.fillRect((y * 50), (i * 50) - ((mas[i][y].heal - 100) / 100 * 50), 50, 50 + ((mas[i][y].heal - 100) / 100 * 50));
                cnx.drawImage(u, y * 50, i * 50, 50, 50);
            }
            if (mas[i][y].id == 5) {
                let u = document.getElementById('king-t');
                cnx.fillRect((y * 50), (i * 50) - ((mas[i][y].heal - 100) / 100 * 50), 50, 50 + ((mas[i][y].heal - 100) / 100 * 50));
                cnx.drawImage(u, y * 50, i * 50, 50, 50);
            }
        }
    }
    cnx.stroke();

}

inint();
document.getElementById("dwarf").onclick = function () {
    target = "dwarf";
    current = 1;
    prise = 7;
};
document.getElementById("hourse").onclick = function () {
    target = "hourse";
    current = 2;
    prise = 15;
};
document.getElementById("pocket").onclick = function () {
    target = "pocket";
    current = 3;
    prise = 5;
};
document.getElementById("energy").onclick = function () {
    target = "energy";
    current = 4;
    prise = 7;
};
document.getElementById("king").onclick = function () {
    target = "king";
    current = 5;
    prise = 0;
};
document.getElementById("button-start").onclick = function () {
    document.getElementById("units").style.display = "none";
    this.innerText = "next";
    this.style.marginTop = "200px";
    current = 0;
    canvas.oncontextmenu = function () {
        gameRM(event, current);
        return false;
    };
    canvas.onclick = function () {
        gameLM(event, current);
    };
    this.onclick = next;
};

function next() {
    for (let i = 0; i <= h; i++) {
        for (let y = 0; y <= w; y++) {
            if (mas[i][y]) {

                mas[i][y].activeUnit();
                drow();
            }
        }
    }
}