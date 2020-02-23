const userService = require('./service');
const userValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

/**
 * @description Show list of all users
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function showAll(req, res, next) {
    try {
        const error = req.flash('error');
        // const { error } = req.session;
        // if (error) {
        //     delete req.session.error;
        // }
        const users = await userService.findAll();
        res.render('users', {
            users,
            error,
        });
    } catch (error) {
        res.render('500');
        next(error);
    }
}

/**
 * @description Show list of all users with modal window for user add.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function showAddUser(req, res, next) {
    try {
        const users = await userService.findAll();
        res.render('users', {
            users,
            showAddModal: true,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.render('500');
        next(error);
    }
}
/**
 * @description Show list of all users with modal window for user update.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function showUpdateUser(req, res, next) {
    try {
        const users = await userService.findAll();
        const updatedUser = await userService.findById(req.params.userId);
        res.render('users', {
            users,
            updatedUser,
            showUpdateModal: true,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.render('500');
        next(error);
    }
}

/**
 * @description Show list of all users with modal window for user delete.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function showDeleteUser(req, res, next) {
    try {
        const users = await userService.findAll();
        const deletedUser = await userService.findById(req.params.userId);
        res.render('users', {
            users,
            deletedUser,
            showDeleteModal: true,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.render('500');
        next(error);
    }
}

/**
 * @description Create new user in database and ridirect to all users page.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = userValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await userService.create(req.body);
        return res.redirect('/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/users');
        }
        if (error.code === 11000) {
            req.flash('error', error.errmsg);
            return res.redirect('/users');
        }

        res.render('500');
        return next(error);
    }
}

/**
 * @description Delete user from database by id and ridirect to all users page.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = userValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await userService.deleteById(req.body.id);
        return res.redirect('/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/users');
        }
        res.render('500');
        return next(error);
    }
}

/**
 * @description Update user in database by id and ridirect to all users page.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateById(req, res, next) {
    try {
        const { error } = userValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await userService.updateById(req.body.id, req.body);
        return res.redirect('/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/users');
        }
        res.render('500');
        return next(error);
    }
}

module.exports = {
    showAll,
    showAddUser,
    showUpdateUser,
    showDeleteUser,
    create,
    deleteById,
    updateById,
};
