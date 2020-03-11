const crypto = require('crypto');
const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const { leftNeededFileds } = require('../../helpers/userHelper');

function getCryptedPassword(password) {
    return crypto.createHmac('sha256', process.env.PASSWORD_CRYPTO_SALT)
        .update(password)
        .digest('hex');
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();
        res.status(200).json({
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            details: null,
        });

        next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User don\'t found',
                details: `User with id '${req.params.id}' don't found in DB.'`,
            });
        }

        return res.status(200).json({
            data: leftNeededFileds(user),
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = getCryptedPassword(req.body.password);

        const user = leftNeededFileds(await UserService.create(req.body));

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const updatedUser = leftNeededFileds(await UserService.updateById(req.body.id, req.body));

        return res.status(200).json({
            data: updatedUser,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const deletedUser = leftNeededFileds(await UserService.deleteById(req.body.id));

        return res.status(200).json({
            data: deletedUser,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}


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
        const users = await UserService.findAll();
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
        const users = await UserService.findAll();
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


async function showLogin(req, res, next) {
    try {
        const users = await UserService.findAll();
        res.render('users', {
            users,
            showLoginModal: true,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        res.render('500');
        next(error);
    }
}

async function userLogin(req, res, next) {
    try {
        const { error } = UserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        res.redirect('/v1/users');
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
        const users = await UserService.findAll();
        /* eslint-disable */
        const updatedUser = users.find((user) => user._id.toString() === req.params.userId);
        /* eslint-enable */
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
        const users = await UserService.findAll();
        /* eslint-disable */
        const deletedUser = users.find((user) => user._id.toString() === req.params.userId);
        /* eslint-enable */
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
async function createUserFromView(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = getCryptedPassword(req.body.password);
        await UserService.create(req.body);
        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/v1/users');
        }
        if (error.code === 11000) {
            req.flash('error', error.errmsg);
            return res.redirect('/v1/users');
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
async function deleteByIdUserFromView(req, res, next) {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.deleteById(req.body.id);
        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/v1/users');
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
async function updateByIdUserFromView(req, res, next) {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.updateById(req.body.id, req.body);
        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message[0].message);
            return res.redirect('/v1/users');
        }
        res.render('500');
        return next(error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    userLogin,
    showAll,
    showLogin,
    showAddUser,
    showUpdateUser,
    showDeleteUser,
    createUserFromView,
    updateByIdUserFromView,
    deleteByIdUserFromView,
};
