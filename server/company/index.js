var db = require('../db');

exports.getCompanies = function (req, res) {
  var options = req.query;

  db.getCompanies(options).then(function (companies) {
    res.status(200).send(companies);
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};

exports.getCompany = function (req, res) {
  var id = req.query.id;
  db.getCompany({ id: id }).then(function (company) {
    res.status(200).send(company);
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};

exports.addCompany = function (req, res) {
  var userCompany = req.body.name;
  db.addCompany({ name: userCompany })
  .then(function (companyID) {
    res.status(200).send(companyID.toString());
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};

exports.removeCompany = function (req, res) {
  var companyId = req.query.id;
  console.log('REQ.QUERY', req.query);
  db.removeCompany(companyId)
  .then(function (company) {
    console.log('company ' + company + ' has been successfully removed');
    res.sendStatus(200);
  }, function () {
    res.sendStatus(404);
  }).catch(function (err) {
    console.log(err);
    res.sendStatus(500);
  });
};

