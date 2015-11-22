/**
 * 만든이 : 수겨미
 */
"use strict";

angular.module("bluepassApp").directive('focusMe', ['$timeout', function ($timeout) {
    return {
        scope: {
            trigger: '=focusMe'
        },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === true) {
                    // console.log('trigger',value);
                    $timeout(function () {
                        element[0].focus();
                        scope.trigger = false;
                    });
                }
            });
        }
    };
}]);
