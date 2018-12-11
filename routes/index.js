'use strict'

const UserRepository = require('../repository/UsersRepository');
const ResponseStatus = require('./response/ResponseStatus')
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
  const user = UserRepository.findByEmailOrLogin(req.body.email
      || req.body.login);
  if (user.password !== req.body.password) {
    res.status(ResponseStatus.UNATHORIZED);
    //TODO: res.render(error)
  }
  res.render('login/index.ejs', {title: "login"});
});

router.get('/register', function (req, res, next) {
  res.render('register/index.ejs', {title: "register"});
});

router.post('/register', function (req, res, next) {
  console.info(req.body);
  UserRepository.findByEmailOrLogin(req.body.email
      || req.body.login).then(value => {
        if(value == null || value.length == null || value.length == 0) {
          const sessionId = UserRepository.insert(req.body.login.toLowerCase(),
              req.body.pass, req.body.avatar || "", req.body.email.toLowerCase());
          createCookie(res, sessionId);
          res.status(ResponseStatus.CREATED);
        } else {
          res.status(ResponseStatus.ERROR);
        }
    res.render('register/index.ejs', {title: "register"});
  }).catch(error => console.error(error));
});

router.get('/:id', function (req, res, next) {
  res.render('main/index.ejs', {title: "Main"});
});

const createCookie = (res, sessionId) => {
  res.cookie('session_id', sessionId, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    // signed: true
  });
}

module.exports = router;
