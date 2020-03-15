const chai = require('chai');
const path = require('path');
const files = require('./files.json');
// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
    it('CodeStyle', (done) => {
        expect(path.join(__dirname, '../../.eslintrc.json')).to.be.a.path();
        done();
    });
    files.forEach((file) => {
        it(`Check rpoject file: ${file}`, (done) => {
            expect(path.join(__dirname, '../../', file)).to.be.a.path();
            done();
        });
    });
});
