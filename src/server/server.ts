import express from 'express';
import routes from '../config/router';
import middleware from '../config/middleware';

/**
 * @type {express}
 * @constant {express.Application}
 */
const server: express.Application = express();

/**
 * @description express.Application Middleware
 */
middleware.init(server);

/**
 * @description express.Application Routes
 */

routes.init(server);

/**
 * @description sets port 3000 to default or unless otherwise specified in the environment
 */
server.set('port', process.env.PORT || 3000);

export default server;
