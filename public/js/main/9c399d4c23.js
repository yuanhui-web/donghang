var App = window.App || {};
App.apiHost = "http://localdh.com/dhServer";
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

dhApp.controller('BaseCtrl', ['$scope', '$timeout', '$interval', '$location', '$anchorScroll', '$routeParams', '$rootScope', '$document','$cookies','$cookieStore', function($scope, $timeout, $interval, $location, $anchorScroll, $routeParams, $rootScope, $document,$cookies,$cookieStore) {

  $scope.sysVersion = dhApp.sysVersion;

  $rootScope.head = {
    meta: {
      description: '超级理财师（www.superfa.cn)致力于打造最专业的理财师创业平台！超级理财师聚合了最新最全的信托理财产品、资管产品、阳光私募基金、PE/VC产品，致力于解决第三方理财难题，为理财师提供理财规划服务，打造个人品牌',
      keywords: '信托产品,信托理财产品,资管产品,阳光私募,阳光私募基金,理财师,理财规划,第三方理财,PE/VC'
    }
  };

  $scope.platformMonthRebateLoaded = false;

}]);

dhApp.controller('IndexCtrl',['$scope', '$controller','ajaxService',function($scope, $controller, ajaxService){
	 $controller('BaseCtrl', {$scope: $scope});  
	// $scope.names=['a','b','c','d','e','f','g','h'];
	 var result = ajaxService.post("/industry/list",{
	 	
	 });
	 result.then(function(json){
	 	console.log(json.list);
	 	$scope.industryList = json.list;
	 	// var names = json.tmp;
	 	//  $scope.name = names;
	 });
}]);
dhApp.controller('navController', function($scope){
    var lastChose = -1;
    $scope.active = function(index){
        //如果有选择过，就把选过的数据中active置false
        $scope.active[lastChose]=false;
        $scope.active[index] = true;
        lastChose = index;
    }
});
angular.module('dhApp')
.service('ajaxService', ['$http', '$location', '$q', '$cacheFactory' ,'sessionService', '$cookies', '$controller' , function($http, $location, $q, $cacheFactory, sessionService, $cookies, $controller) {
	 this.post = function(apiUrl, data) {
      var d = $q.defer();
      var that = this;
      $http.post(this.url(apiUrl, data, 1), data).success(function(json) {
        if (json.status == "NEED_LOGIN") {
          that.setLogout();
          $location.path("/login");
          return;
        } else if (that.isSysException(json.statusCode)) {

        } else {
          if (!that.isSuccessCode(json.statusCode)) {
            if(json.attributes!=undefined){  
              json.attributes.statusCode = json.statusCode;
            }
          }
          d.resolve(json.attributes);
        }
      }).error(function(error) {
        d.reject(error);
      });

      return d.promise;
    };

    this.url = function(apiUrl, data, isNotJsonp) {
      var data = data || {};
      if (!isNotJsonp) data['callback'] = 'JSON_CALLBACK';

      delete data['createDate'];
      delete data['updateDate'];
      delete data['createBy'];
      delete data['updateBy'];

      var query = [];
      angular.forEach(data, function(v, i) {
        query.push(i + "=" + encodeURIComponent(data[i]));
      });

      return App.apiHost+apiUrl + (apiUrl.indexOf("?") < 0 ? "?" : "&") + query.join("&");
    };

     this.isSuccessCode = function(code) {
      return code == "0000";
    };

    this.isSysException = function(code) {
      return code == "3001";
    };

    this.isRenameError = function(code) {
      return code == "2009";
    };

    this.isPasswordError = function(code) {
      return code == "2009";
    };
    this.isDisableUserError = function(code) {
      return code == "2013";
    };
    this.isPermissionDeny = function(code) {
      return code == "2006";
    };

}]);
 
angular.module('dhApp')
.service('sessionService', [ function () { 
  this.getItem = function (k,v) {
    return sessionStorage.getItem(k) || v;
  }; 
  this.setItem = function(k,v){
    sessionStorage.setItem(k,v);
  };
  this.removeItem = function(k){
    sessionStorage.removeItem(k);
  };
  this.clear = function(){
    sessionStorage.clear(); 
  };
}])
;