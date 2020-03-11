const { Router } = require('express');
const AuthComponent = require('./index');
/**
 * @description Express router to mount auth related functions on.
 * @type {Express.Router}
 */
const routerAuth = Router();

routerAuth.post('/signin', AuthComponent.signIn);

routerAuth.post('/refresh', AuthComponent.updateToken);

module.exports = routerAuth;
