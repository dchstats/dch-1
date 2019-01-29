$(begin);

function begin() {

}


var app = angular.module('dch', []);
app.controller('ctrl', function ($scope) {
    /////////////////////////////////////////////////////////////////////////////// Constants
    $scope.shifts = ['other', 'First', 'Second', 'Night'];
    $scope.users = ['other', 'user1', 'user2'];
    $scope.shovels = [
        { name: 'P&H-01', location: 'east', added: false },
        { name: 'P&H-02', location: 'east', added: false },
        { name: 'P&H-03', location: 'east', added: false },
        { name: 'P&H-04', location: 'east', added: false },
        { name: 'P&H-05', location: 'east', added: false },
        { name: 'P&H-06', location: 'east', added: false },
        { name: 'P&H-07', location: 'west', added: false },
        { name: 'P&H-08', location: 'west', added: false },
        { name: 'P&H-09', location: 'west', added: false },
        { name: 'P&H-10', location: 'west', added: false },
        { name: 'P&H-11', location: 'west', added: false },
        { name: 'P&H-12', location: 'west', added: false }
    ]
    $scope.eastShovels = [];
    $scope.westShovels = [];
    $scope.shovelTarget = 'east';

    /////////////////////////////////////////////////////////////////////////////// Properties    
    $scope.shift = getShift();
    $scope.date = formattedDate();
    $scope.user = "none";
    $scope.shovelEast = [];
    $scope.shovelWest = [];

    /////////////////////////////////////////////////////////////////////////////// Methods
    function formattedDate() {
        var today = new Date;
        var dd = today.getDate();
        var hour = new Date().getHours();
        if (hour <= 14) dd = dd - 1;
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        return dd + "/" + mm + "/" + yyyy;
    }

    function getShift() {
        var hour = new Date().getHours();
        //hour = 7;
        var currentShift = 0;
        if (hour >= 6 && hour < 14) currentShift = 1;
        else if (hour >= 14 && hour < 22) currentShift = 2;
        else currentShift = 3;
        var shift = (currentShift + 1) % 3 + 1;
        return shift;
    }

    $scope.addShovelEast = function (shovel) {
        $scope.eastShovels.push(shovel);
        shovel.added = true;
    }

    $scope.addShovelWest = function (shovel) {
        $scope.westShovels.push(shovel);
        shovel.added = true;
    }
});

