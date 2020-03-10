const mongoose = require('mongoose');

const MONGO_URI = `${process.env.MONGODB_URI}${process.env.MONGODB_DB_MAIN}`;

const connectOptions = {
    // automatically try to reconnect when it loses connection
    autoReconnect: true,
    // reconnect every reconnectInterval milliseconds
    // for reconnectTries times
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // flag to allow users to fall back to the old
    // parser if they find a bug in the new parse
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set('useCreateIndex', true);

module.exports = mongoose.createConnection(MONGO_URI, connectOptions);
