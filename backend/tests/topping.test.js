const server = require('../server'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);
reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Tests for topping component', function () {

    it('GET to /topping should return 200', function (done) {
        chai.request(reqServer)
            .get('/topping')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should get an existing topping', function (done) {
        chai.request(reqServer)
            .get('/topping/1')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should return 404 in case of topping not found', function (done) {
        chai.request(reqServer)
            .get('/topping/90890123')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });

    it('should create a topping', function (done) {
        chai.request(reqServer)
            .post('/topping')
            .set('X-API-Key', 'root')
            .send({
                name: 'Carnivora'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should update a topping by id', function (done) {
        chai.request(reqServer)
            .put('/topping/1')
            .set('X-API-Key', 'root')
            .send({
                name: 'Hawaiana'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should delete a topping by id', function (done) {
        chai.request(reqServer)
            .delete('/topping/1')
            .set('X-API-Key', 'root')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

});
