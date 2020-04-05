import express from 'express';
import { getChartData } from './service';

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
export default async function chart(req: express.Request,
    res: express.Response,
    next: express.NextFunction): Promise<any> {
    try {
        return res.status(200).json({
            data: await getChartData(),
        });
    } catch (error) {
        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}
