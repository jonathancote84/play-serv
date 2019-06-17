const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

//   .get('/apps?genres=action') // invoke the endpoint + query then test  for example getting specific genres that is query  
describe('can GET /apps sucessfully', () => {
    it('should return an array', () => {
        return request(app)
          .get('/apps') // invoke the endpoint  
          .expect(200)  //assert that you get a 200  OK status
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array'); // make sure you get an array
            expect(res.body).to.have.lengthOf.at.least(1); // array must not be empty 
            //add more expects to test endpoint logic 
            // genres
            // expect for  
          });
    });
    it('')
})