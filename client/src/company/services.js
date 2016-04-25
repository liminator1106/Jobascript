module.exports = function ($http) {
  // companyObj comes in form of {name: 'name'}
  var addCompany = function (companyObj) {
    return $http.post('/api/company', companyObj)
    .then(function (resp) {
      return resp.data;
    }, function (err) {
      console.error('err', err);
    });
  };

  // companyObj comes in form of {id: 'id'}
  var deleteCompany = function (companyObj) {
    return $http({
      method: 'DELETE',
      url: '/api/company',
      params: companyObj
    })
    .then(function (resp) {
      return resp.data;
    }, function (err) {
      console.error('err', err);
    });
  };

  /**
   * @param  {Object} options = {size: Number}
   * @return {Promise} resolved to Array of company Objects
   */
  var getCompanies = function (options) {
    return $http.get('/api/companies', {
      params: options
    })
    .then(function (resp) {
      return resp.data;
    }, function (err) {
      console.error('err', err);
    });
  };

  /**
   * @param  {Number} company id
   * @return {Promise} resolved to ompany Object
   */
  var getCompany = function (id) {
    return $http.get('/api/company', {
      params: { id: id }
    })
    .then(function (resp) {
      return resp.data;
    }, function (err) {
      console.error('err', err);
    });
  };

  return {
    getCompany: getCompany,
    getCompanies: getCompanies,
    addCompany: addCompany,
    deleteCompany: deleteCompany
  };
};
