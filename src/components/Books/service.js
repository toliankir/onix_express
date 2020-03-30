const bookModel = require('./model');

/**
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
function getChartData() {
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

module.exports = {
    getChartData,
};
