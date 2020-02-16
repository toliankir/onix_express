const joi = require('@hapi/joi');

const userSchema = joi.object({
    fullName: joi.string().min(3).regex(/^[A-z'-]+ [A-z'-]+$/).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required()
});

const userEmailSchema = joi.string().email({ minDomainSegments: 2 }).required();

/**
 * @summary Check value according schema and return boolaen result.
 * @param {any} value Checked value
 * @param {joi.schema} schema
 * @param {Express.Response} res
 * @returns {boolean}
 */
function validate(value, schema, res) {
    const { error } = schema.validate(value);
    if (error) {
        res.json({
            error: error.message
        });
        return false;
    }
    return true;
}

module.exports = {
    userSchema,
    userEmailSchema,
    validate
};
