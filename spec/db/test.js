var assert = require('chai').assert;
var expect = require('chai').expect;
var db = require('../../server/db.js')

describe('DB Query', function () {
  describe ('Inserting', function () {
    it ('should successfully add a company', function (done) {
      
      var company = {
        name: 'yahoo.com'
      };

      db.addCompany(company);

      expect(db.getCompany(company).then(function(data){
        return data;
      })).to.exist;

      done();
    });
    it ('should take a company object as an argument', function () {
      var company = 'google.com';

      expect(db.addCompany(company)).to.throw(/name property/);
      // .then(function(data){
      //   console.log('data', data)
      //   return data
      // }, function(reason){
      //   console.log('reason', reason)
      //   done();
      // })

    });
  });

  xdescribe ('Removing', function () {
    it ('should successfully delete a company', function (done) {
      var company = {
        name: 'cnn.com'
      };

      db.addCompany(company).then(function(compId){
        console.log('COMPANY ID', compId);

        db.removeCompany(compId).then(function(compObj){
      
          expect(compObj).to.exist;
          done();
        }, function (err) {
          console.log('LOOK AT ME!', err);
        });
      })
    })
  })
});
