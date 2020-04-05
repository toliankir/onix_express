import express from 'express';
import http from 'http';
import booksRouter from '../components/Books/router';

function init(app: express.Application): void {
    const router: express.Router = express.Router();
    app.use('/v1/books', booksRouter);

    app.use((req: express.Request, res: express.Response) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use(router);
}

export default {
    init,
};
