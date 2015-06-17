'use strict';

//XXX TODO This is very un-angular.
var DEBUG = true;
// var HOSTNAME = "mfly://";
var HOSTNAME = "http://127.0.0.1:8000/";

function mflyDataInit(obj) {
    DEBUG = false; // Since we are on a device, DEBUG should be false
    // var HOSTNAME = "mfly://";
    HOSTNAME = 'http://127.0.0.1:8000/';
    var $scope = angular.element('html').scope();
    $scope.$apply(function() {
        $scope.$broadcast('Mediafly.mflyDataInit', obj);
    });
    return '{ "mflyInitVersion" : "3", "mflyWideScreenSupport" : "false" }';
}

function mflyInit(obj) {
    var $scope = angular.element('body').scope();
    $scope.$apply(function() {
        $scope.$broadcast('Mediafly.mflyInit', obj);
    });
}

function mflyResume() {
    var $scope = angular.element('body').scope();
    $scope.$apply(function() {
        $scope.$broadcast('Mediafly.mflyResume');
    });
}


function mflySync() {
    var $scope = angular.element('body').scope();
    $scope.$apply(function() {
        $scope.$broadcast('Mediafly.mflySync');
    });
}

/* Services */
angular.module('Mediafly.services', []).
    factory('MflyLinkService', ['$http', function ($http) {
        return {
            getFolder: function (key) {
                return $http({
                    method: 'GET',
                    url: HOSTNAME + 'data/folder/' + key
                }).success(function (data, status, headers, config) {
                    return data;
                });
            }
        };
    }]).
    factory('MflyDataService', ['$http', '$rootScope', function ($http, $rootScope) {
        var service = {
            namespace: "",

            save: function (key, value, useNamespace) {
                useNamespace = typeof useNamespace !== 'undefined' ? useNamespace : true;
                return $http({
                    method: 'GET',
                    url: HOSTNAME + 'data/info/' + (useNamespace ? this.namespace + '-' : '') + key,
                    params: { value: /*encodeURIComponent*/(value), method: 'PUT' },
                    dataType: 'text',
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8"
                    }
                }).success(function (data, status, headers, config) {
                    return data;
                });
            },

            load: function (key, useNamespace) {
                useNamespace = typeof useNamespace !== 'undefined' ? useNamespace : true;
                return $http({
                    method: 'GET',
                    url: HOSTNAME + 'data/info/' + (useNamespace ? this.namespace + '-' : '') + key
                }).success(function (data, status, headers, config) {
                    return data;
                });
            },

            setNamespace: function(namespace) {
                this.namespace = namespace;
            }, 

            putValue: function(key, value) {
                mflyCommands.putValue(key, value);
            }
        };

        $rootScope.$on('Mediafly.mflyDataInit', function(event, obj) {
            service.setNamespace(obj.id);
        });

        return service;
    }]);