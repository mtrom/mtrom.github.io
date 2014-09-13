var venmore = angular.module('venmore', ['ngRoute']);
var venmoAPI = 'https://api.venmo.com/v1/';
// var access_token = 'PgcpC5AjX8ZBnrNWHzAJftXmv69dMf4D';
var access_token;

venmore.controller('venmoreController', function ($scope, $http) {
	$scope.json = "Angular Testing";

	$scope.getData = function() {
		try {
			console.log(getParameterByName(access_token));
		} catch (err) {
			
		}
	} 
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}