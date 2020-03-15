require('dotenv').config();
const chai = require('chai');
const UtilService = require('../../src/components/User/service');

const { expect } = chai;

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', (done) => {
        UtilService.findAll().then((result) => {
            expect(result).to.be.a('number');
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
