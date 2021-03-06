/**
 * 만든이 : 수겨미
 */
'use strict';

angular.module('bluepassApp').factory('AddressIndex', AddressIndex);

AddressIndex.$inject = ['$resource'];

function AddressIndex($resource) {
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
}
