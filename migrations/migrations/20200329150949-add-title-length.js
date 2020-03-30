module.exports = {
    async up(db) {
        await db.collection('booksmodel').updateMany({}, [{
            $set: {
                titleLength: { $strLenCP: '$title' },
                updatedAt: '$$NOW',
            },
        }]);
    },
};
