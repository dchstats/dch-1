var app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {
    $scope.crushers = ['PGC_01', 'PGC_02', 'PGC_03'];
    $scope.shovels = ['P&H_06', 'P&H_07', 'P&H_09', 'P&H_10',
        'P&H_11', 'P&H_12', 'P&H_13', 'P&H_14', 'P&H_15',
        'P&H_16', 'P&H_17', 'P&H_18', 'P&H_19', 'HIM_20', 'PC_TATA', 'PL_06', 'PL_07'];
    $scope.draglines= ['Jyoti', 'Pawan', 'Vindhya', 'Jwala'];
    $scope.surfaceMiners = ['LnT'];


    $scope.crusherStatus = [];
    angular.forEach($scope.crushers, function (x, i) {
        $scope.crusherStatus.push(0);
    })
    $scope.shovelStatus = [];
    angular.forEach($scope.shovels, function (x, i) {
        $scope.shovelStatus.push(0);
    })
    $scope.draglineStatus = [];
    angular.forEach($scope.draglines, function (x, i) {
        $scope.draglineStatus.push(0);
    })
    $scope.surfaceMinerStatus = [];
    angular.forEach($scope.surfaceMiners, function (x, i) {
        $scope.surfaceMinerStatus.push(0);
    })
    $scope.obj = {
        crushers: $scope.crusherStatus,
        shovels: $scope.shovelStatus,
        draglines: $scope.draglineStatus,
        surfaceMiners:$scope.surfaceMinerStatus
    }
    $scope.obj_string = JSON.stringify($scope.obj);
    console.log($scope.obj_string);
    fetch();

    function fetch() {
        var payload = { command: 'get'};
        var req = {
            method: 'POST',
            url: 'live.php',
            headers: {
                'Content-Type': undefined
            },
            data: payload
        };

        $http(req).then(
            function (res) {
                console.log(res);         
            },
            function () {
                console.log('request failed');
            }
        );

    }
});  