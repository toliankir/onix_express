const request = require('supertest');
const chai = require('chai');

const server = require('../../src/server/server');

const { expect } = chai;

const testUserEmail = `user${Math.floor(Math.random() * 1000)}@gmail.com`;

describe('UserComponent -> controller', () => {
    let accessToken = '';
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
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it('UserComponent -> controller -> /v1/users/', (done) => {
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
});
