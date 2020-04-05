import { bookModel } from './model';

export interface IBookAggregate {
    code3: string;
    value: number;
}

/**
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
export function getChartData() {
    return bookModel.aggregate([
        {
            $group: {
                _id: '$code3',
                value: {
                    $sum: 1,
                },
            },
        },
        {
            $project: {
                code3: '$_id',
                value: true,
                _id: false,
            },
        },
    ]);
}
