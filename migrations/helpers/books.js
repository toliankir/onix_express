const j = require('j');
const path = require('path');

function getBooksArray(file, objKeys, offset) {
    const filePath = path.join(process.cwd(), file);

    const xlsData = j.XLSX.readFile(filePath);
    const sheet = Object.values(xlsData.Sheets[xlsData.SheetNames[0]]);
    let keyIndex = 0;
    let resObj = {};
    const result = [];

    for (let index = offset; index < sheet.length; index += 1) {
        resObj[objKeys[keyIndex]] = sheet[index].v;
        keyIndex += 1;
        if (keyIndex === objKeys.length) {
            result.push({ ...resObj });
            resObj = {};
            keyIndex = 0;
        }
    }
    return result;
}

module.exports = {
    getBooksArray,
};
