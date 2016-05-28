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