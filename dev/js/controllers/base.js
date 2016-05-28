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
