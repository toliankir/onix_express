const j = require('j');

const obj = {
    code: '',
    title: '',
    desc: '',
};
const test = j.XLSX.readFile('./books.xlsx');
const data = Object.values(test.Sheets[test.SheetNames[0]]);
let index = 3;
let objIndex = 0;
let resObj = {};
const result = [];
for (index = 3; index < data.length; index += 1) {
    const key = Object.keys(obj)[objIndex];
    resObj[key] = data[index].v;
    objIndex += 1;
    if (objIndex === 3) {
        result.push({ ...resObj });
        resObj = {};
        objIndex = 0;
    }
}
console.log(result.length);
console.log(result[498]);
