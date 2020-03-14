const chai = require('chai');
const UtilService = require('../../src/components/User/service');

const { expect } = chai;

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', async (done) => {
        expect(await UtilService.findAll())
            .to.be.a('array');

        done();
    });
});
