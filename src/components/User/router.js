const { Router } = require('express');
const UserComponent = require('../User');

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
routerUsers.get('/api/', UserComponent.findAll);

/**
 * Route serving user by it's id.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/api/:id', UserComponent.findById);

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
routerUsers.put('/api/', UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.delete('/api/', UserComponent.deleteById);

/**
 * Route serving list of users.
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/user', UserComponent.showAll);

/**
 * Route serving form for a new user
 * @name /users/add
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/user/add', UserComponent.showAddUser);

/**
 * Route serving form to update a new user
 * @name /users/update/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/user/update/:userId', UserComponent.showUpdateUser);

/**
 * Route serving form to delete a new user
 * @name /users/delete/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.get('/user/delete/:userId', UserComponent.showDeleteUser);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.post('/user/', UserComponent.createUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @functioncreateUserFromView
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.put('/user/', UserComponent.updateByIdUserFromView);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
routerUsers.delete('/user/', UserComponent.deleteByIdUserFromView);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
routerUsers.get('/:id', UserComponent.findById);

module.exports = routerUsers;
