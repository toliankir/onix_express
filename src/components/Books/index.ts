import express from 'express';
import bookService, { IBookAggregate, BookService } from './service';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
class BookController {
    private service: BookService;

    private test: number;

    constructor(service: BookService) {
        this.service = service;
    }

    public async testR(): Promise<void> {
        console.log(await this.service.getChartData());
    }

    public async chart(req: express.Request,
        res: express.Response,
        next: express.NextFunction): Promise<any> {
        try {
            const data: IBookAggregate[] = await this.service.getChartData();
            return res.status(200).json({
                data,
            });
        } catch (error) {
            res.status(500).json({
                message: error.name,
                details: error.message,
            });
            return next(error);
        }
    }
}

export default new BookController(bookService);
