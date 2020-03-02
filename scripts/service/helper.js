function getTimestamp() {
    return Math.trunc((new Date() / 1000));
}

module.exports = {
    getTimestamp,
};
