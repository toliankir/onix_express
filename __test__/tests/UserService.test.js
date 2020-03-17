require('dotenv').config();
const chai = require('chai');
const UserService = require('../../src/components/User/service');

const { expect } = chai;

const email = `user${Math.floor(Math.random() * 10000)}@gmail.com`;
const fullName = 'New Name';
let user;

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', (done) => {
        UserService.findAll().then((result) => {
            expect(result).to.be.a('array');
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> create', (done) => {
        UserService.create({
            email,
            fullName: 'Full Name',
        }).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string');
            expectedObject.to.have.property('fullName').to.be.a('string');
            user = result;
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> findById', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        UserService.findById(user._id).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string');
            expectedObject.to.have.property('fullName').to.be.a('string');
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> updateById', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        UserService.updateById(user._id, { fullName }).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('nModified').equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> findById (Check updated user)', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        UserService.findById(user._id).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('fullName').to.be.a('string').equal(fullName);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> deleteById', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        UserService.deleteById(user._id).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('deletedCount').equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
