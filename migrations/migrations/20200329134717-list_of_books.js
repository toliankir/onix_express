const { getBooksArray } = require('../helpers/books');

module.exports = {
    async up(db) {
        const books = getBooksArray('books.xlsx', ['code3', 'title', 'description'], 3);
        books.forEach((book) => {
            db.collection('booksmodel').insertOne({
                ...book,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });
    },
    async down(db) {
        await db.collection('booksmodel').deleteMany({});
    },
};
