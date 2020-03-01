const { Schema } = require('mongoose');
const connections = require('../databaseConnection');

const EmailsSchema = new Schema(
    {
        emails: {
            type: [String],
            required: true,
        },
        createdAt: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'emailsmodel',
        versionKey: false,
    },
);

module.exports = connections.model('EmailsModel', EmailsSchema);
