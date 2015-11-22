/**
 * 만든이 : 수겨미
 */
'use strict';

angular.module('bluepassApp').factory('AddressIndex', ['$resource', function ($resource) {
    return $resource('api/addressIndexs/:id', {}, {
        'query': {
            method: 'GET',
            isArray: true
        },
        'get': {
            method: 'GET',
            transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
            }
        },
        'update': {
            method: 'PUT'
        }
    });
}]);
