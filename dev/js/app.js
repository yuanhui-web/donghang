var dhApp = angular.module('dhApp',['ngRoute', 'ui.bootstrap', 'ngCookies', 'ngAnimate', 'meta', 'infinite-scroll']);
dhApp.sysVersion = '201600032112';

dhApp.config(['$locationProvider', '$httpProvider', '$sceProvider', function($locationProvider, $httpProvider, $sceProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $sceProvider.enabled(false);
  }])
  .config(['$provide', function($provide) {
    $provide.decorator('$sniffer', ['$delegate', function($sniffer) {
      var msie = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
      var _hasEvent = $sniffer.hasEvent;
      $sniffer.hasEvent = function(event) {
        if (event === 'input' && msie === 10) {
          return false;
        }
        _hasEvent.call(this, event);
      }
      return $sniffer;
    }]);
  }])
  .run(["$rootScope", "$window", "$cookies", "$http", '$cookieStore', 'Meta', function($rootScope, $window, $cookies, $http, $cookieStore, Meta) {
    $rootScope.$on('$routeChangeStart', function(evt, absNewUrl, absOldUrl) {
      $window.scrollTo(0, 0); //scroll to top of page after each route change
    });

    Meta.init();
  }]);

  dhApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  var v = dhApp.sysVersion;
  $routeProvider
    .when('/', {
      templateUrl: 'tpl/industry.html?' + v,
      controller: 'IndexCtrl'
    })
    // .when('/', {
    //   templateUrl: 'tpl/knowledgeAsk.html?' + v,
    //   controller: 'IndexCtrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
}]);
