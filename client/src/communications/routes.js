module.exports = function ($stateProvider) {
  $stateProvider.state('comm', {
    parent: 'company',
    url: '/communications',
    controller: 'CommController',
    template: require('./comm.html')
  });
  $stateProvider.state('email' {
    parent: 'comm',
    url: '/mail',
    controller: 'CommController',
    template: require('./mail.html');
  });
};
