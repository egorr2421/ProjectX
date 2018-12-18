'use strict';

const UserRepository = require('../repository/UsersRepository');
const ResponseStatus = require('./response/ResponseStatus');
const express = require('express');
const router = express.Router();
const Constants = require('../constants/Constants');
const paginate = require('express-paginate');
const onlineUsers = require('./data/onlineUsersData');
const userAuth = require('../modules/auth');

const getLogin = (req, res, next) => {
    console.info('Get login');
    res.clearCookie(Constants.SESSION_ID);
    res.render('login/index.ejs', {title: "login"});
};

const postLogin = (req, res, next) => {
    console.info('Post login, request: \n');
    console.info(req.body);
    UserRepository.findByEmailOrLogin(req.body.login)
        .then((user) => {
            if (user === null) {
                res.redirect('/login');
            } else {
                if (user.dataValues.password !== req.body.pass) {
                    res.status(ResponseStatus.UNAUTHORIZED);
                    res.render('error/index.ejs', {title: "Unauthorized"});
                } else {
                    //updating user cookies
                    user.sessionId = null;
                    user.save()
                        .then(updated => {
                            createCookie(res, Constants.SESSION_ID, updated.dataValues.sessionId);
                            res.status(ResponseStatus.OK);
                            res.redirect('/');
                        })
                        .catch(err => next(err));
                }
            }
        });
};

const getRegister = (req, res, next) => {
    console.info('Get register, request: \n');
    console.info(req.body);
    res.clearCookie(Constants.SESSION_ID);
    res.render('register/index.ejs', {title: "register"});
};

const postRegister = (req, res, next) => {
    console.info('Post register, request: \n');
    console.info(req.body);
    if (req.body.login === '' || req.body.pass === '' || req.body.email === '') {
        res.redirect('/register');
        return null;
    }
    UserRepository.findByEmailAndLogin(req.body.email, req.body.login).then(value => {
        if (value == null) {
            UserRepository.insert(req.body.login.toLowerCase(),
                req.body.pass, req.body.file || "", req.body.email.toLowerCase())
                .then((user) => {
                    createCookie(res, Constants.SESSION_ID, user.dataValues.sessionId);
                    res.redirect('/');
                }).catch((error) => {
                    console.error(error);
                }
            );
            //res.status(ResponseStatus.CREATED);
        } else {
            res.render('register/index.ejs', {title: "register"});
            res.status(ResponseStatus.ERROR);
        }
    }).catch(error => next(error));
};

const getMain = (req, res, next) => {
    console.info('Get main page, request: \n');
    console.info(req.body);
    const cookie = req.cookies[Constants.SESSION_ID];
    console.log('cookie: ' + cookie);
    UserRepository.findBySessionId(cookie)
        .then(user => {
            if (user === null) {
                res.redirect('/login');
                return null;
            }
            console.log(user.dataValues.sessionId);
            if (cookie === user.dataValues.sessionId) {
                onlineUsers.addUserToOnline({
                    id: user.id,
                    email: user.email,
                    login: user.login,
                    avatar: user.avatar,
                    state: user.state
                });
                res.render('main/index.ejs', {title: "Main"});
            } else {
                res.redirect('/login');
            }
        })
        .catch(error => next(error));
};

const getUserById = (req, res, next) => {
    console.info('Get user by id, request: \n');
    console.info(req);
    res.json({
        id: req.user.id,
        email: req.user.email,
        avatar: req.user.avatar,
        state: req.user.state
    });
};

const validateUser = (req, res, next, id) => {
    console.info('Validate user, request:\n')
    console.info(req.body);
    console.info('\nuser id: ' + id);
    UserRepository.findByPk(id).then(user => {
        if (!user) {
            console.log(`User with ${id} wasn't found`);
            const error = new Error();
            error.status = ResponseStatus.NOT_FOUND;
            next(error);
        } else {
            console.log(`User with ${id} was found`);
            console.log(`User: ${user}`);
            req.id = id;
            next();
        }
    })
};

const getPageableUsers = (req, res, next) => {
    console.info('Get pageable users, request:\n')
    console.info(req.body);
    console.info('\nquery: ' + req.query);
    const sessionId = req.cookies[Constants.SESSION_ID];
    UserRepository.findBySessionId(sessionId).then(user => {
        if (user === null) {
            res.redirect('/login');
            return;
        }
        UserRepository.findAndCountAll(req.query.limit, req.skip)
            .then(results => {
                const itemCount = results.count;
                const pageCount = Math.ceil(itemCount / req.query.limit);
                res.status(ResponseStatus.OK);
                res.json({
                    users: results.rows,
                    pageCount,
                    itemCount,
                    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
                });
            })
    }).catch(error => next(error));
};

const createCookie = (res, cookieName, value) => {
    res.cookie(cookieName, value, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: false,
        signed: false
    });
};

const postFight = (req, res, next) => {
    console.log(JSON.parse(req.body.battle));
    UserRepository.findBySessionId(req.cookies.session_id)
        .then(value => {
            if (value === null) {
                res.redirect('/login');
                return null;
            }
            if (req.cookies.session_id === value.dataValues.sessionId) {
                createCookie(res, Constants.BATTLE_ID, req.body.battle);
                res.render('fight/index.ejs', {title: "Fight"});
            } else {
                res.redirect('/login');
            }
        });

};

const getCurrent = (req, res, next) => {
    res.send({
        id: req.user.id,
        login: req.user.login,
        avatar: req.user.avatar
    })
};

router
    .get('/', getMain)
    .get('/login', getLogin)
    .get('/register', getRegister)
    .post('/login', postLogin)
    .post('/register', postRegister)
    .post('/fight', postFight)
    .get('/fight', function (req, res, next) {
        res.render('fight/index.ejs', {title: "Main"});
    })
    .use(userAuth)
    .get('/current', getCurrent);
    // .param('id', validateUser)
    // .get('/:id', getUserById)
    // .use(paginate.middleware(10, 50))
    // .get('/users', getPageableUsers);

module.exports = router;
