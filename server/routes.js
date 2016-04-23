var companyHandler = require('./company');


module.exports = function (app) {
  app.get('/api/company', companyHandler.getCompany);
  app.post('/api/company', companyHandler.addCompany);
  app.delete('/api/company', companyHandler.removeCompany);

  app.get('/api/companies', companyHandler.getCompanies);
};
