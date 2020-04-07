import express from 'express';
import bookService, { IBookAggregate, BookService } from './service';

class BookController {
    private service: BookService;

    constructor(service: BookService) {
        this.service = service;
    }

    /**
    * Make express response with aggregated chart data.
    * @param req express.Request
    * @param res express.Response
    * @param next express.NextFunction
    */
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
