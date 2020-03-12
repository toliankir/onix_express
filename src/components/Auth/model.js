const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const SystemUserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        collection: 'systemusers',
        versionKey: false,
    },
);

module.exports = connections.model('SystemUserModel', SystemUserSchema);
