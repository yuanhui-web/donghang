 
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