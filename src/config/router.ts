import express from 'express';
import http from 'http';
import booksRouter from '../components/Books/router';

/**
 * @param app express.Application - instance of express application
 */
function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
    * Forwards any requests to the /v1/books URI to BooksRouter.
    * @name /v1/books
    * @function
    * @inner
    * @param {string} path - Express path
    * @param {callback} middleware - Express middleware.
    */
    app.use('/v1/books', booksRouter);

    /**
    * @description No results returned mean the object is not found
    * @function
    * @inner
    * @param {callback} middleware - Express middleware.
    */
    app.use((req: express.Request, res: express.Response) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });


    /**
    * @function
    * @inner
    * @param {express.Router}
    */
    app.use(router);
}

export default {
    init,
};
