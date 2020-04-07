import mongoose from 'mongoose';
import { bookModel, IBook } from './model';

export interface IBookAggregate {
    code3: string;
    value: number;
}

export class BookService {
    private model: mongoose.Model<IBook>;

    constructor(model: mongoose.Model<IBook>) {
        this.model = model;
    }

    /**
     * Make aggregation request in mongo database.
     */
    public getChartData(): mongoose.Aggregate<IBookAggregate[]> {
        return this.model.aggregate([
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
}

export default new BookService(bookModel);
