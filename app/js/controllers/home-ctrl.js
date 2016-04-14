(function (angular) {
    "use strict";

    angular
        .module('kwik')
        /* Setup App Main Controller */
        .controller('HomeCtrl', ['$scope', 'AppCoreService', function ($scope, AppCoreService) {
        	//AppCoreService.getRepoDetails();
        	$scope.githubAuth = function () {
                AppCoreService.redirectToGit();
            }
        	$scope.isLogin = AppCoreService.getToken();
                
            $scope.LogOut = function () {
                AppCoreService.setAccessToken(null);
                $scope.isLogin = AppCoreService.getToken();
                console.error($scope.isLogin);
                $location.path('/home')
            }
        }]);
})(angular);