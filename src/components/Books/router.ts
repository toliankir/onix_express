import express from 'express';
import bookController from './index';

/**
 * Express router to mount books related functions on.
 * @type {Express.Router}
 * @const
 */
const booksRouter: express.Router = express.Router();

/**
 * Route serving list of books.
 * @name /v1/books
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
booksRouter.get('/', bookController.chart.bind(bookController));

export default booksRouter;
