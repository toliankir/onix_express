const { Router } = require('express');
const AuthComponent = require('./index');

/**
 * @description Express router to mount auth related functions on.
 * @type {Express.Router}
 */
const routerAuth = Router();

/**
 * @description Route for user login
 * @name /v1/auth/api/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/api/login', AuthComponent.login);

/**
 * @description Route for user logout
 * @name /v1/auth/api/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/api/logout', AuthComponent.logout);

/**
 * @description Route for refresh user tokens
 * @name /v1/auth/api/refresh
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/api/refresh', AuthComponent.updateToken);

/**
 * @description Route for create new system user
 * @name /v1/auth/api/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/api/create', AuthComponent.createUser);

/**
 * @description Route for user login from frontend
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/login', AuthComponent.loginUser);

/**
 * @description Create new system user form frontend
 * @name /v1/auth/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.post('/create', AuthComponent.createUserFront);

/**
 * @description Logout user from frontend
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerAuth.get('/logout', AuthComponent.logoutUser);

module.exports = routerAuth;
