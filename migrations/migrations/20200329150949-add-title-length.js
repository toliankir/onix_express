module.exports = {
    async up(db) {
        // await db.collection('booksmodel').updateMany({}, [{
        //     $set: {
        //         titleLength: { $strLenCP: '$title' },
        //         updatedAt: '$$NOW',
        //     },
        // }]);
        await db.collection('booksmodel').find().forEach(async (book) => {
            await db.collection('booksmodel').updateOne(book, {
                $set: {
                    titleLength: book.title.length,
                    updatedAt: new Date(),
                },
            });
        });
    },
};
