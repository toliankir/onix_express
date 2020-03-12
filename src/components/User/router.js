const { Router } = require('express');
const UserComponent = require('../User');
const { isAuth } = require('../../middleware/Auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const routerUsers = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/api/', isAuth, UserComponent.findAll);

/**
 * Route serving user by it's id.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/api/:id', isAuth, UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.post('/api/', UserComponent.create);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.put('/api/', isAuth, UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.delete('/api/', isAuth, UserComponent.deleteById);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/api/:id', UserComponent.findById);

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
routerUsers.get('/add', UserComponent.showAddUser);

routerUsers.get('/login', UserComponent.showLogin);

/**
 * Route serving form to update a new user
 * @name /users/update/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/update/:userId', UserComponent.showUpdateUser);

/**
 * Route serving form to delete a new user
 * @name /users/delete/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/delete/:userId', UserComponent.showDeleteUser);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.post('/', UserComponent.createUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @functioncreateUserFromView
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.put('/', UserComponent.updateByIdUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.delete('/', UserComponent.deleteByIdUserFromView);

module.exports = routerUsers;
