var app = angular.module('myApp', ['ngDatepicker']);
app.controller('myCtrl', function($scope) {
	$scope.changeDate = function (e) {
		alert('EVENT: ' + e.type + ' Date: ' + e.date);
	}

	$scope.changeMonth = function (e) {
		alert('EVENT: ' + e.type + ' Date: ' + e.date);
	}
});