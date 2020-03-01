const { Schema } = require('mongoose');
const connections = require('../service/mongo');

const UrlsSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'urlsmodel',
        versionKey: false,
    },
);

module.exports = connections.model('UrlsModel', UrlsSchema);
