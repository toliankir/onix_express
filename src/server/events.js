/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const portStr = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        console.error(`${portStr} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${portStr} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}
/**
 * @function
 * @inner
 * @description log port to console
 */
function onListening() {
    const addr = this.address();
    const portStr = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${portStr}`);
}

/**
 * @function
 * @inner
 * @param {http.Server} server
 */
function bind(server) {
    server.on('error', (error) => this.onError(error, server.get('port')));
    server.on('listening', this.onListening.bind(server));
}

module.exports = {
    onError,
    onListening,
    bind
};
