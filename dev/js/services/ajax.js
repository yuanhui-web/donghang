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