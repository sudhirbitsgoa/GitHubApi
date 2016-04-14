(function (angular) {
    'use strict';

    angular
        .module('kwik')
        .service('AppCoreService', ['$q', '$http', '$window', function ($q,  $http, window) {
            // Base rest Url
            var repoUrl = "https://api.github.com/user/repos?page=1&per_page=100&access_token=";
            var userUrl = 'https://api.github.com/user?access_token=';
            var getAccTokenUrl = 'https://github.com/login/oauth/access_token?client_id=048c747d942c41f0e883&client_secret=908078308bd51b0203c355b2e0a2afcbcfc05b39&code=';
            
            var self = this;

            function decoreURI () {
                var regex = /[?&]([^=#]+)=([^&#]*)/g,
                    url = window.location.href,
                    params = {},
                    match;
                while(match = regex.exec(url)) {
                    params[match[1]] = match[2];
                }
                return params;
            }

            this.redirectToGit = function () {
                window.location.href = 'https://github.com' + 
                '/login/oauth/authorize' + 
                '?client_id=048c747d942c41f0e883' +
                '&scope=gist,repo&state=lll';
            }

            this.getAccessToken = function () {
                var dfd = $q.defer();
                var params = decoreURI();
                console.error(getAccTokenUrl + params.code);
                $http({
                    url : 'http://localhost:3000/token?code=' + params.code
                }).then(function (res) {
                    self.setAccessToken(res.data.access_token);
                    return dfd.resolve(res.data);
                }, function (err) {
                    console.error(err);
                    dfd.reject(err);
                })
                return dfd.promise;
            }

            this.getRepoDetails = function (config) {
                var dfd = $q.defer();
                $http.get(repoUrl + self.access_token, {
                }).then(function (result) {
                    dfd.resolve(result.data);
                }, function (err) {
                    dfd.reject(err);
                });
                return dfd.promise;
            };

            this.getUserDetails = function (config) {
                var dfd = $q.defer();
                $http.get(userUrl + self.access_token, {
                }).then(function (result) {
                    console.error(result);
                    dfd.resolve(result.data);
                }, function (err) {
                    dfd.reject(err);
                });

                return dfd.promise;
            };

            this.setAccessToken = function (access_token) {
                self.access_token = access_token;
            }

            this.getToken = function () {
                return self.access_token || false;
            }
        }]);
})(angular);
