const { Router } = require('express');
const AuthComponent = require('./index');
/**
 * @description Express router to mount auth related functions on.
 * @type {Express.Router}
 */
const routerAuth = Router();

routerAuth.post('/api/login', AuthComponent.login);

routerAuth.post('/api/logout', AuthComponent.logout);

routerAuth.post('/api/refresh', AuthComponent.updateToken);

routerAuth.post('/api/create', AuthComponent.createUser);

routerAuth.post('/login', AuthComponent.loginUser);

routerAuth.post('/create', AuthComponent.createUserFront);

routerAuth.get('/logout', AuthComponent.logoutUser);

module.exports = routerAuth;
