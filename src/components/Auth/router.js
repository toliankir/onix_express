const { Router } = require('express');
const AuthComponent = require('./index');
/**
 * @description Express router to mount auth related functions on.
 * @type {Express.Router}
 */
const routerAuth = Router();

routerAuth.post('/api/signin', AuthComponent.signIn);

routerAuth.post('/api/refresh', AuthComponent.updateToken);

routerAuth.post('/api/create', AuthComponent.createUser);

module.exports = routerAuth;
