var venmore = angular.module('venmore', ['ngRoute']);
var venmoAPI = 'https://api.venmo.com/v1/';
// var access_token = 'PgcpC5AjX8ZBnrNWHzAJftXmv69dMf4D';
var access_token;

angular.element(document).ready(function() {
	access_token = getParameterByName('access_token');

	if (access_token === "") {
		$('#getDataButton').hide();
	}
});

venmore.controller('venmoreController', function ($scope, $http) {
	$scope.json = "Angular Testing";

	$scope.getData = function() {
		$http.get(venmoAPI + 'payments?access_token=' + access_token).success(function (data, status, headers, config) {
			json = data;
		});
	};

});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}