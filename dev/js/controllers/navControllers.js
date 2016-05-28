dhApp.controller('navController', function($scope){
    var lastChose = -1;
    $scope.active = function(index){
        //如果有选择过，就把选过的数据中active置false
        $scope.active[lastChose]=false;
        $scope.active[index] = true;
        lastChose = index;
    }
});