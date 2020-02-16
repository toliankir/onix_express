const { Schema } = require('mongoose');
const connections = require('../../config/connection');

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    // collection: 'users',
    versionKey: false
});

module.exports = connections.model('User', UserSchema);
