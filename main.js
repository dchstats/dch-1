$(begin);

function begin() {

}



var app = angular.module('dch', []);
app.controller('ctrl', function ($scope) {
    /////////////////////////////////////////////////////////////////////////////// Constants
    $scope.shifts = ['other', 'First', 'Second', 'Night'];
    $scope.users = ['other', 'user1', 'user2'];
    $scope.shovels = [
        { id:00, name: 'P&H-01', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:01, name: 'P&H-02', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:02, name: 'P&H-03', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:03, name: 'P&H-04', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:04, name: 'P&H-05', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:05, name: 'P&H-06', location: 'east', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:06, name: 'P&H-07', location: 'west', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:07, name: 'P&H-08', location: 'west', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:08, name: 'P&H-09', location: 'west', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 },
        { id:09, name: 'P&H-10', location: 'west', added: false, coal100:0, coal120:0, coal85:0, ob100:0, ob120:0, ob85:0 }
    ]

    /////////////////////////////////////////////////////////////////////////////// Properties    
    $scope.shift = getShift();
    $scope.date = formattedDate();
    $scope.user = "none";
    $scope.eastShovels = [];
    $scope.westShovels = [];
    

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

    $scope.refresh = function () {
        console.log('heyyy');
        $scope.eastShovelsTotal = { coal100: 0, coal120: 0, ob100: 0, ob120: 0 };
        $scope.westShovelsTotal = { coal100: 0, coal85: 0, ob100: 0, ob85: 0 };
        angular.forEach($scope.eastShovels, function (shovel) {
            $scope.eastShovelsTotal.coal100 += shovel.coal100;
            $scope.eastShovelsTotal.coal120 += shovel.coal120;
            $scope.eastShovelsTotal.ob100 += shovel.ob100;
            $scope.eastShovelsTotal.ob120 += shovel.ob120;
        });
        angular.forEach($scope.westShovels, function (shovel) {
            $scope.westShovelsTotal.coal100 += shovel.coal100;
            $scope.westShovelsTotal.coal85 += shovel.coal85;
            $scope.westShovelsTotal.ob100 += shovel.ob100;
            $scope.westShovelsTotal.ob85 += shovel.ob85;
        });
    };
});

