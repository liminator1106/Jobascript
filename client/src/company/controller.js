module.exports = function ($scope, $state, Company, currentCompany) {
  $scope.companyName = currentCompany.name;
  $scope.companyId = currentCompany.id;

  $scope.deleteCompany = function (compId) {
    if (confirm('Are you sure?')){ // eslint-disable-line
      Company.deleteCompany({ id: compId }).then(function () {
        console.log('success');
        $state.go('home', {}, { reload: true });
      });
    }
  };
};

