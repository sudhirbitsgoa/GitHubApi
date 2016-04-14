(function (angular) {
    "use strict";

    angular
        .module('kwik')
        /* Setup Layout Part - Header */
        .controller('HeaderCtrl', ['$scope', '$rootScope', 'AppCoreService', '$location',
            function ($scope, $rootScope, AppCoreService, $location) {
                $scope.githubAuth = function () {
                    AppCoreService.redirectToGit();
                }

                $scope.LogOut = function () {
                    AppCoreService.setAccessToken(null);
                    $rootScope.isLogin = false;
                    console.error($scope.isLogin);
                    $location.path('/home')
                }
            }]);
})(angular);