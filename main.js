$(begin);
  
function begin () {
    $("#shovel-section option:selected:contains('Idle')").parents('td').siblings("td:contains('P&H')").css({ 'background': '#ffff7f' });
    $("#shovel-section option:selected:contains('Running')").parents('td').siblings("td:contains('P&H')").css({ 'background': 'lightgreen' });
    $("#shovel-section option:selected:contains('Breakdown')").parents('td').siblings("td:contains('P&H')").css({ 'background': '#ff4c4c' });
}


var app = angular.module('dch', []);
app.controller('ctrl', function ($scope) {
////////////////////////////////////////////////// Constants
    $scope.shifts = ['other', 'First', 'Second', 'Night'];
    $scope.users = ['other', 'user1', 'user2'];
    
////////////////////////////////////////////////// Properties    
    $scope.shift = getShift();
    $scope.date = formattedDate();
    
    $scope.user = "none";
    
//////////////////////////////////////////////////// Methods
    function formattedDate() {
        var today = new Date;
        var dd = today.getDate();
        var hour = new Date().getHours();
        if (hour<=14) dd = dd - 1;
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
        var shift = (currentShift+1)%3+1;
        return shift;
    }
});

