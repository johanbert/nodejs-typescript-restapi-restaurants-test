const request = require('supertest');
const should = require('should');
const expect = require('chai').expect;

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
const account = {
    email: 'iam-a-test@aaaa.com',
    password: '123abccAAAaaa!',
    full_name: 'johanbert mosquera'
}
const jsonToTest = {
    lat: -33.8670522,
    lon: 151.1957362,
    radio: 1000
}
var jwt = {};
beforeEach(async() => {
    const res = await request(URL)
        .post('/api/v1/users/login')
        .set('Accept', 'application/json')
        .send({ "email": account.email, "password": account.password });
    jwt = res.body.token
});

describe('Functional Test <users and restaurants >:', function() {

    it('POST /users: Should return error message when missing fields requireds', async() => {
        const res = await request(URL)
            .post('/api/v1/users')
            .set('Accept', 'application/json')
            .send({ "test": "bad test" });
        expect('Content-Type', /json/)
        expect(res.statusCode).to.equal(400)
        expect(res.body.errors[0].should.equal("Missing required fields: email and password"))
    });

    it('POST /users: Should create a new valid user', async() => {
        const res = await request(URL)
            .post('/api/v1/users')
            .set('Accept', 'application/json')
            .send({ "email": account.email, "password": account.password, "full_name": account.full_name });
        expect('Content-Type', /json/)
        expect(res.statusCode).to.equal(201)
        expect(res.body.ok.should.equal(true))
    });

    it('POST /users: Should create user session for valid user and return a JWT', async() => {
        const res = await request(URL)
            .post('/api/v1/users/login')
            .set('Accept', 'application/json')
            .send({ "email": account.email, "password": account.password });
        expect(res.statusCode).to.equal(200)
    });

    it('POST /restaurants: Should get a list of restaurants by latitude and longitude', async() => {
        const res = await request(URL)
            .post('/api/v1/restaurants')
            .set('Accept', 'application/json')
            .set('authorization', `Bearer ${jwt}`)
            .send({ lat: jsonToTest.lat, lon: jsonToTest.lon });
        expect('Content-Type', /json/)
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).at.least(1)
    });

    it('GET /restaurants: Should get a list of history responses', async() => {
        const res = await request(URL)
            .get('/api/v1/restaurants/history')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${jwt}`);
        expect('Content-Type', /json/)
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).at.least(1)
    });

});