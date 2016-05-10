//write a filter that makes sure that the job posting is actually from the company.
var Promise = require('bluebird');
var _ = require('underscore');
var config = require('../server/common.js').config();
var clearbit = require('clearbit')(config.clearbitKey);
var db = require('../server/database');
var rp = require('request-promise');
var jobTable = require('../server/database').jobsTable;
var $ = require("jquery");
db.companiesTable.addCompany({name: 'CBS Interactive'});
db.companiesTable.getCompanies()
  .then(function (companyObj) {
    var companyArr = _.map(companyObj, function(company) {
      return [Number(company.id), company.name];
    });
    // console.log(companyArr);
    return new Promise(function (resolve, reject) {
      Promise.map(companyArr, function (companyObj) {
        // console.log(companyObj[1]);
        return rp('https://authenticjobs.com/api/?api_key=291d984046483ad333ac5978886bb9ad&format=JSON&method=aj.jobs.search&q=' + companyObj[1])
        .then(function (data) {
          var listOfJobs = JSON.parse(data).listings.listing;
          // console.log(listOfJobs);
            var filteredListOfJobs = _.filter(listOfJobs, function (job) {
              // console.log(job.company.name);
              // console.log(job);
              if (job.company.name.toLowerCase().indexOf(companyObj[1].toLowerCase()) !== -1) {
                return job;
              }
            });
            // console.log(filteredListOfJobs);
            _.each(filteredListOfJobs, function (job) {
              // console.log(job);
              if (job.company.name.toLowerCase() === companyObj[1].toLowerCase()) {
                job.company_id = companyObj[0];
              }
            });
            // console.log(filteredListOfJobs);
            return filteredListOfJobs;
          // console.log(data);
          // console.log(listOfJobs)
        });
      })
      .then(function (data) {
        // console.log(data);
        resolve(data);
      });
    })
    .then(function (job) {
      var finalArr = _.flatten(job);


      _.each(finalArr, function(job) {
        // console.log(job);

        resultObj = {
          title: job.title,
          company_name: job.company.name,
          url: job.apply_url,
          description: function() {job.description.replace(/<\/*[\s\S]+?>|\u2022/g, '').replace(/^[ \t]+|[ \t]+$/gm, '').replace(/ +/g, ' ');},
          visa_sponsored: false,
          remote_ok: null,
          relocation: null,
          city: job.company.location.city,
          created: job.post_date,
          company_id: job.company_id
        };
// function() {if (job.relocation_assistance === 1) return true; else return false;},
// job.description.replace(/<\/*[\s\S]+?>|\u2022/g, '').replace(/^[ \t]+|[ \t]+$/gm, '').replace(/ +/g, ' ')
        jobTable.addJob(resultObj);
      });

    })
    .catch(function (err) {
      console.log('error in authenticjobsFetcher.js', err);
    });
  });
