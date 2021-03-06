/**
 * 만든이 : 수겨미
 */
'use strict';

angular.module('bluepassApp').controller('settingsController', settingsController);

settingsController.$inject = ['$scope', 'Principal'];

function settingsController($scope, Principal) {
    getAccount();
    function getAccount() {
        return Principal.identity(true).then(function (response) {
            return $scope.$broadcast('Account', response);
        }, function () {
            alert("유저정보를 불러오지 못 하였습니다.")
        })
    }
}
