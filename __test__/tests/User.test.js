const request = require('supertest');
const chai = require('chai');
const server = require('../../src/server/server');

const { expect } = chai;

const testUserEmail = `user${Math.floor(Math.random() * 10000)}@gmail.com`;
let user;
let accessToken;
let refreshToken;

describe('UserComponent -> controller', () => {
    it('POST Auth -> Component -> controller -> Create user ', (done) => {
        request(server)
            .post('/v1/auth/api/create')
            .send({ email: testUserEmail, password: '1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('POST AuthComponent -> controller Login -> /v1/auth/api/login ', (done) => {
        request(server)
            .post('/v1/auth/api/login')
            .send({ email: testUserEmail, password: '1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.data.token.accessToken).to.be.a('string');
                expect(body.data.token.refreshToken).to.be.a('string');
                accessToken = body.data.token.accessToken;
                refreshToken = body.data.token.refreshToken;
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('POST AuthComponent -> controller Refresh -> /v1/auth/api/refresh ', (done) => {
        request(server)
            .post('/v1/auth/api/refresh')
            .send({ refreshToken })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.data.token.accessToken).to.be.a('string');
                expect(body.data.token.refreshToken).to.be.a('string');
                accessToken = body.data.token.accessToken;
                refreshToken = body.data.token.refreshToken;
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it('POST AuthComponent -> controller Logout -> /v1/auth/api/logiut ', (done) => {
        request(server)
            .post('/v1/auth/api/logout')
            .send({ accessToken })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                expect(body.data.ok).to.be.equal(1);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it(`POST UserComponent -> controller Create User(${testUserEmail})-> /v1/users/`, (done) => {
        request(server)
            .post('/v1/users/api')
            .set('Authorization', accessToken)
            .send({ email: testUserEmail, fullName: 'Test Name' })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                user = body.data;
                const expectBody = expect(body);
                expectBody.to.have.property('data').and.to.be.a('object');
                const expectData = expect(body.data);
                expectData.to.have.property('_id').and.to.be.a('string');
                expectData.to.have.property('email').and.to.be.a('string');
                expectData.to.have.property('fullName').and.to.be.a('string');
                done();
            })
            .catch((err) => done(err));
    });

    it('GET UserComponent -> controller Get User by id-> /v1/users/:id', (done) => {
        request(server)
            // eslint-disable-next-line no-underscore-dangle
            .get(`/v1/users/api/${user._id}`)
            .set('Authorization', accessToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectData = expect(body.data);
                expectData.to.have.property('_id').and.to.be.a('string');
                expectData.to.have.property('email').and.to.be.a('string');
                expectData.to.have.property('fullName').and.to.be.a('string');
                done();
            })
            .catch((err) => done(err));
    });

    it('GET UserComponent -> controller Get All Users-> /v1/users/', (done) => {
        request(server)
            .get('/v1/users/api')
            .set('Authorization', accessToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);
                expectBody.to.have.property('data').and.to.be.a('array');
                done();
            })
            .catch((err) => done(err));
    });

    it('DELETE UserComponent -> controller Delete User-> /v1/users/', (done) => {
        request(server)
            .delete('/v1/users/api')
            .set('Authorization', accessToken)
            // eslint-disable-next-line no-underscore-dangle
            .send({ id: user._id })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body.data);
                expectBody.to.have.property('deletedCount').and.to.be.equal(1);
                done();
            })
            .catch((err) => done(err));
    });
});
