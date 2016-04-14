(function (angular) {
    "use strict";

    angular
        .module('kwik')
        .controller('RepoCtrl', ['$scope', 'AppCoreService', '$rootScope', function ($scope, AppCoreService, $rootScope) {
            $scope.init = function () {
                $scope.isLoading = true;
                AppCoreService.getAccessToken().then( function () {
                    $rootScope.isLogin = true;
                    AppCoreService.getUserDetails().then( function (userDetails) {
                        console.error(userDetails);
                        $scope.userDetails = userDetails;
                    });
                    AppCoreService.getRepoDetails().then( function (repoList) {
                        $scope.repoItems = repoList;
                        $scope.isLoading = false;
                    });
                })
            };
            $scope.init();
        }])
})(angular);