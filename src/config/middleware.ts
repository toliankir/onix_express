import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

/**
 * @param app express.Application - instance of express application
 */
function init(app: express.Application): void {
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(express.static('public'));
    // add folder with web server static content
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that
    // can be used to enable CORS with various options
    app.use(cors());
    // cors
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header('Access-Control-Allow-Credentials', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,'
            + ' Content-Type, Accept,'
            + ' Authorization,'
            + ' Access-Control-Allow-Credentials',
        );
        next();
    });
}

export default {
    init,
};
