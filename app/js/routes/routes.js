(function (angular) {
    'use strict';

    angular
        .module('kwik')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {

                // To remove # tag from url
                // $locationProvider.html5Mode(true);

                //default route
                $urlRouterProvider.otherwise('/home');

                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl',
                        data: {
                            pageTitle: 'Home'
                        },
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'kwik',
                                    files: [
                                        'js/main.min.js'
                                    ]
                                });
                            }]
                        }
                    });

                $stateProvider
                    .state('repo', {
                        url: '/repo',
                        templateUrl: 'templates/repo.html',
                        controller: 'RepoCtrl',
                        data: {
                            pageTitle: 'Repo'
                        },
                        resolve: {
                            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name: 'kwik',
                                    files: [
                                        'js/main.min.js'
                                    ]
                                });
                            }]
                        }
                    })
            }]);
})(angular);