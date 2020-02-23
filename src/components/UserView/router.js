const { Router } = require('express');
const UserViewComponent = require('../UserView');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', UserViewComponent.showAll);

/**
 * Route serving form for a new user
 * @name /users/add
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/add', UserViewComponent.showAddUser);

/**
 * Route serving form to update a new user
 * @name /users/update/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/update/:userId', UserViewComponent.showUpdateUser);

/**
 * Route serving form to delete a new user
 * @name /users/delete/:userId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/delete/:userId', UserViewComponent.showDeleteUser);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', UserViewComponent.create);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put('/', UserViewComponent.updateById);

/**
 * Route serving a new user
 * @name /users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', UserViewComponent.deleteById);

module.exports = router;
