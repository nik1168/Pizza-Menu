const server = require('../server'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);
reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Tests for pizza component', function () {

    it('GET to /pizza should return 200', function (done) {
        chai.request(reqServer)
            .get('/pizza')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should get an existing pizza', function (done) {
        chai.request(reqServer)
            .get('/pizza/1')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should return 404 in case of pizza not found', function (done) {
        chai.request(reqServer)
            .get('/pizza/90890123')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });

    it('should create a pizza', function (done) {
        chai.request(reqServer)
            .post('/pizza')
            .set('X-API-Key', 'root')
            .send({
                name: 'Carnivora'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should update a pizza by id', function (done) {
        chai.request(reqServer)
            .put('/pizza/1')
            .set('X-API-Key', 'root')
            .send({
                name: 'Hawaiana'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should delete a pizza by id', function (done) {
        chai.request(reqServer)
            .delete('/pizza/1')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

});
