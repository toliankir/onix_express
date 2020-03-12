const Validation = require('../validation');

class UserValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} data.password
     * @returns
     * @memberof UserValidation
     */
    create(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                password: this.Joi
                    .string()
                    .min(1)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof UserValidation
     */
    login(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                password: this.Joi
                    .string()
                    .min(1)
                    .required(),
            }).validate(data);
    }

    /**
     * @param {String} data.refreshToken
     * @returns
     * @memberof UserValidation
     */
    updateToken(data) {
        return this.Joi
            .object({
                refreshToken: this.Joi
                    .string()
                    .required(),
            }).validate(data);
    }
}

module.exports = new UserValidation();
