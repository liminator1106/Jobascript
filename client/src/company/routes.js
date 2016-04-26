exports.config = function ($stateProvider) {
  $stateProvider.state('company', {
    parent: 'home',
    url: '/company/:name/:id',
    resolve: {
      currentCompany: function ($stateParams, Company) {
        var companyId = $stateParams.id;
        console.log('id: ', companyId);
        return Company.getCompany(companyId);
      }
    },
    views: {
      'main@layout': {
        controller: 'CompanyController',
        template: require('./company.html')
      }
    }
  });
};

exports.listen = function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState) {
    if (toState.name === 'company') {
      $state.go('jobs', {}, { relative: toState });
    }
  });
};
