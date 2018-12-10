const UserRepository = require('../repository/UsersRepository');
var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('main/index.ejs', {title: "Main"});
});

router.get('/login', function (req, res, next) {
    res.render('login/index.ejs', {title: "login"});
});
router.post('/login', function (req, res, next) {
    res.render('login/index.ejs', {title: "login"});
});


router.get('/register', function (req, res, next) {
    res.render('register/index.ejs', {title: "register"});
});

router.post('/register', function (req, res, next) {
    pool.query('INSERT INTO users(login,pass,avatar,email)' +
        ' values($1,$2,$3,$4)', [req.body.login, req.body.pass, 1, req.body.email],
        function (err, res) {
        console.log(err);
        console.log(res);
    });
    res.render('register/index.ejs', {title: "register"});
});


router.get('/:id', function (req, res, next) {
    res.render('main/index.ejs', {title: "Main"});
});
module.exports = router;
