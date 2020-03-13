const { Router } = require('express');
const UserComponent = require('../User');
const { isAuthJWT, isAuthPasport } = require('../../middleware/Auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const routerUsers = Router();
const routerApi = Router();

/**
        return next();
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerApi.get('/', UserComponent.findAll);

/**
 * Route serving user by it's id.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerApi.get('/:id', UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerApi.post('/', UserComponent.create);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerApi.put('/', UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerApi.delete('/', UserComponent.deleteById);

/**
 * Route serving list of users.
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/', UserComponent.showAll);

/**
 * Route serving form for a new user
 * @name /users/add
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/add', isAuthPasport, UserComponent.showAddUser);

routerUsers.get('/login', UserComponent.showLogin);

routerUsers.get('/create', UserComponent.showCreateUser);

/**
 * Route serving form to update a new user
 * @name /users/update/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/update/:userId', isAuthPasport, UserComponent.showUpdateUser);

/**
 * Route serving form to delete a new user
 * @name /users/delete/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/delete/:userId', isAuthPasport, UserComponent.showDeleteUser);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.post('/', isAuthPasport, UserComponent.createUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @functioncreateUserFromView
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.put('/', isAuthPasport, UserComponent.updateByIdUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.delete('/', isAuthPasport, UserComponent.deleteByIdUserFromView);

routerUsers.use('/api', isAuthJWT, routerApi);
module.exports = routerUsers;
