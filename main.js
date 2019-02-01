$(begin);

function begin() {

}



var app = angular.module('dch', []);
app.controller('ctrl', function ($scope) {
    /////////////////////////////////////////////////////////////////////////////// Constants
    $scope.shifts = ['other', 'First', 'Second', 'Night'];

    $scope.shovels = [
        { id: 00, name: 'P&H-01', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 01, name: 'P&H-02', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 02, name: 'P&H-03', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 03, name: 'P&H-04', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 04, name: 'P&H-05', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 05, name: 'P&H-06', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 06, name: 'P&H-07', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 07, name: 'P&H-08', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 08, name: 'P&H-09', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 },
        { id: 09, name: 'P&H-10', east: false, west: false, e_coal_100: 0, e_coal_120: 0, e_ob_100: 0, e_ob_120: 0, w_coal_100: 0, w_ob_100: 0, w_coal_85: 0, w_ob_85: 0 }
    ]

    /////////////////////////////////////////////////////////////////////////////// Properties    
    $scope.shift = getShift();
    $scope.date = formattedDate();
    $scope.user = "none";
    $scope.shovelsTotal = {
        e_coal_100: 0,
        e_coal_120: 0,
        e_ob_100: 0,
        e_ob_120: 0,
        w_coal_100: 0,
        w_ob_100: 0,
        w_coal_85: 0,
        w_ob_85: 0
    };



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



    $scope.refresh = function () {
        $scope.shovelsTotal.e_coal_100 = 0;
        $scope.shovelsTotal.e_coal_120 = 0;
        $scope.shovelsTotal.e_ob_100 = 0;
        $scope.shovelsTotal.e_ob_120 = 0;
        $scope.shovelsTotal.w_coal_100 = 0;
        $scope.shovelsTotal.w_coal_85 = 0;
        $scope.shovelsTotal.w_ob_100 = 0;
        $scope.shovelsTotal.w_ob_85 = 0;

        angular.forEach($scope.shovels, function (shovel) {
            $scope.shovelsTotal.e_coal_100 += shovel.e_coal_100;
            $scope.shovelsTotal.e_coal_120 += shovel.e_coal_120;
            $scope.shovelsTotal.e_ob_100 += shovel.e_ob_100;
            $scope.shovelsTotal.e_ob_120 += shovel.e_ob_120;
            $scope.shovelsTotal.w_coal_100 += shovel.w_coal_100;
            $scope.shovelsTotal.w_coal_85 += shovel.w_coal_85;
            $scope.shovelsTotal.w_ob_100 += shovel.w_ob_100;
            $scope.shovelsTotal.w_ob_85 += shovel.w_ob_85;
        });
    };
});

