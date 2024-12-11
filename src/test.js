import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index.js';

const should = chai.should();
chai.use(chaiHttp);

let memberId = null;

describe('Members API', () => {
    
    it('should GET all the members', (done) => {
        chai.request(app)
            .get('/api/members')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.above(0);
                done();
            });
    });