/**
 * 만든이 : 수겨미
 */
'use strict';

angular.module('bluepassApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('account', {
        abstract: true,
        parent: 'site'
    });
}]);
