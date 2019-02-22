$(begin);

function begin() {
   
}

function loadShift() {
    var target = $('#content');
    target.load('shift.html');
}
var app = angular.module('dch', []);
app.controller('ctrl', function ($scope) {
    /////////////////////////////////////////////////////////////////////////////// Constants
    $scope.shifts = ['other', 'First', 'Second', 'Night'];
    /////////////////////////////////////////////////////////////////////////////// Properties    
    $scope.shift = getShift();
    $scope.date = formattedDate();
    $scope.user = "none";
    $scope.eastShovels = [];
    $scope.westShovels = [];
    $scope.eastShovelsTotal = [0, 0, 0, 0];
    $scope.westShovelsTotal = [0, 0, 0, 0];
    $scope.eastShovelMultipliers = [45, 55, 25, 29];
    $scope.westShovelMultipliers = [45, 40, 25, 21];
    $scope.shovels = [
        { name: 'P&H-01', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-02', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-03', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-04', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-05', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-06', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-07', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-08', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-09', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] },
        { name: 'P&H-10', east: false, east_data: [null, null, null, null], west: false, west_data: [null, null, null, null] }
    ]

    $scope.draglines = [
        { name: 'Jyoti', data: [null, null, null, null, null, null], remark: null },
        { name: 'Pawan', data: [null, null, null, null, null, null], remark: null },
        { name: 'Vindhya', data: [null, null, null, null, null, null], remark: null },
        { name: 'Jwala', data: [null, null, null, null, null, null], remark: null }
    ];

    $scope.surfaceMiners = [{ name: 'L&T-SM', data: [null, null, null], remark: null }];

    $scope.outsourcing = [
        { name: 'BGR-EAST-APT', data: [null], remark: null },
        { name: 'GAJRAJ-WEST-APT', data: [null], remark: null },
        { name: 'GAJRAJ-EAST-APB', data: [null], remark: null },
        { name: 'GAJRAJ-WEST-APB', data: [null], remark: null },
        { name: 'DL-EAST', data: [null], remark: null },
        { name: 'DL-WEST', data: [null], remark: null }
    ];

    $scope.datahead = {
        eastShovels: ['Coal-100', 'Coal-120', 'OB-100', 'OB-120'],
        westShovels: ['Coal-100', 'Coal-85', 'OB-100', 'OB-85'],
        draglines: ['Solid', 'Re-handling', 'Working', 'Breakdown', 'Maintenance', 'Idle', 'Remark'],
        surfaceMiners: ['Working', 'Cutting', 'Production', 'Remark'],
        outsourcing: ['Quantity', 'Remark']
    };

    $scope.unit = {
        eastShovels: ['( trips )', '( trips )', '( trips )', '( trips )'],
        westShovels: ['( trips )', '( trips )', '( trips )', '( trips )'],
        draglines: ['( buckets )', '( buckets )', '( hrs )', '( hrs )', '( hrs )', '( hrs )',''],
        surfaceMiners: ['( hrs )', '( mtrs )', '( Te )', ''],
        outsourcing: ['( cum )', '']
    };

  




    /////////////////////////////////////////////////////////////////////////////// Methods
    function formattedDate() {
        var today = new Date();
        var dd = today.getDate();
        var hour = new Date().getHours();
        if (hour <= 14) {
            dd = dd - 1;
        }
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return dd + "-" + mm + "-" + yyyy;
    }

    function getShift() {
        var hour = new Date().getHours();
        //hour = 7;
        var currentShift = 0;
        if (hour >= 6 && hour < 14) {
            currentShift = 1;
        } else if (hour >= 14 && hour < 22) {
            currentShift = 2;
        } else {
            currentShift = 3;
        }
        var shift = (currentShift + 1) % 3 + 1;
        return shift;
    }


    $scope.addShovel = function (location, id) {
        if (location == 'east') {
            $scope.eastShovels.push($scope.shovels[id]);
            $scope.shovels[id].east = true;

        }
        else if (location == 'west') {
            $scope.westShovels.push($scope.shovels[id]);
            $scope.shovels[id].west = true;
        }

    }

    $scope.removeShovel = function (location, id) {
        if (location == 'east') {
            $scope.eastShovels.splice(id, 1);
        }
        else if (location == 'west') {
            $scope.westShovels.splice(id, 1);
        }
    }

    $scope.refresh = function () {
        $scope.eastShovelsTotal = [0, 0, 0, 0];
        $scope.westShovelsTotal = [0, 0, 0, 0];

        angular.forEach($scope.eastShovels, function (x) {
            $scope.eastShovelsTotal[0] += x.east_data[0];
            $scope.eastShovelsTotal[1] += x.east_data[1];
            $scope.eastShovelsTotal[2] += x.east_data[2];
            $scope.eastShovelsTotal[3] += x.east_data[3];
        });
        angular.forEach($scope.westShovels, function (x) {
            $scope.westShovelsTotal[0] += x.west_data[0];
            $scope.westShovelsTotal[1] += x.west_data[1];
            $scope.westShovelsTotal[2] += x.west_data[2];
            $scope.westShovelsTotal[3] += x.west_data[3];
        });

        angular.forEach($scope.draglines, function (x, y, z) {
            z[y].data[5] = 8 - z[y].data[4];
        }
        );
    };

});

