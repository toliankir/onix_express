require('dotenv').config();
const chai = require('chai');
const AuthService = require('../../src/components/Auth/service');

const { expect } = chai;

const password = Math.floor(Math.random() * 10000);
const email = `user${password}@gmail.com`;
let user;

describe('AuthComponent -> service', () => {
    it('AuthComponent -> service -> createUser', (done) => {
        AuthService.createUser({
            email,
            password,
        }).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string');
            expectedObject.to.have.property('password').to.be.a('string');
            user = result;
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> getUserByEmail', (done) => {
        AuthService.getUserByEmail(user.email).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            // eslint-disable-next-line no-underscore-dangle
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string').equal(user.email);
            expectedObject.to.have.property('password').to.be.a('string').equal(user.password);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> updateRefreshToken', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        AuthService.updateRefreshToken(user._id, password).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('nModified').equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> getUserByRefreshToken', (done) => {
        AuthService.getUserByRefreshToken(password).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string').equal(user.email);
            expectedObject.to.have.property('password').to.be.a('string').equal(user.password);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> getUserByEmail(Is the refresh Token field present before logout)', (done) => {
        AuthService.getUserByEmail(user.email).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            // eslint-disable-next-line no-underscore-dangle
            expectedObject.to.have.property('_id').to.be.a('object');
            expectedObject.to.have.property('email').to.be.a('string').equal(user.email);
            expectedObject.to.have.property('password').to.be.a('string').equal(user.password);
            expectedObject.to.have.property('refreshToken').to.be.a('string');
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> logout', (done) => {
        // eslint-disable-next-line no-underscore-dangle
        AuthService.logout(user._id).then((result) => {
            const expectedObject = expect(result);
            expectedObject.to.be.a('object');
            expectedObject.to.have.property('nModified').equal(1);
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('UserComponent -> service -> getUserByEmail(Is the refresh Token field present after logout)', (done) => {
        AuthService.getUserByEmail(user.email).then((result) => {
            expect(result).property('refreshToken').to.be.an('undefined');
            done();
        }).catch((error) => {
            done(error);
        });
    });
});
