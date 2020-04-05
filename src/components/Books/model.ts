import mongoose from 'mongoose';
import connections from '../../config/connection';

export interface IBook extends mongoose.Document {
    title: string;
    titleLength: number;
    description: string;
    code3: string;
    createdAt: Date;
    updatedAt: Date;
}

const BooksSchema: mongoose.Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        titleLength: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        code3: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'booksmodel',
        versionKey: false,
    },
);

export const bookModel:mongoose.Model<IBook> = connections.model<IBook>('BooksModel', BooksSchema);
