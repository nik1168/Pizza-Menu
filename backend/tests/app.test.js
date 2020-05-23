const server = require('../server'),
    chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should();

chai.use(chaiHTTP);

reqServer = process.env.HTTP_TEST_SERVER || server;

describe('Tests for general application functionality', function () {

    it('GET to / should return 200', function (done) {
        chai.request(reqServer)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('GET to url without API key should return 403', function (done) {
        chai.request(reqServer)
            .get('/pizza')
            .end(function (err, res) {
                res.should.have.status(403);
                done();
            })
    });

});
