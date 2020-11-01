var app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {

    $scope.crushers = ['Crusher-01', 'Crusher-02', 'Crusher-03'];
    $scope.shovels = ['P&H-06', 'P&H-07', 'P&H-09', 'P&H-10',
        'P&H-11', 'P&H-12', 'P&H-13', 'P&H-14', 'P&H-15',
        'P&H-16', 'P&H-17', 'P&H-18', 'P&H-19', 'HIM-20', 'PC-TATA', 'PL-06', 'PL-07', 'SM-L&T'];
    $scope.draglines = ['Jyoti', 'Pawan', 'Vindhya', 'Jwala'];
    $scope.machines = [];
    $scope.types = ['crusher', 'shovel', 'dragline'];
    $scope.statusCodes = [0, 1, 2];
    $scope.statusStrings = ['Idle', 'Running', 'BreakDown', 'Undef'];
    $scope.time = new Date().getTime();
    $scope.stamp = ""  // time of fetched status
    $scope.changed = false;
    $scope.pin = "";
    $scope.auth = false;
    $scope.user = "Guest";
    $scope.status = "Please user PIN:1234 to login as Viewpoint";
    $scope.upUrl = 'https://sushanttiwari.in/serv/upLive.php';
    $scope.downUrl = 'https://sushanttiwari.in/serv/downLive.php';
    $scope.upUrl = 'serv/upLive.php';
    $scope.downUrl = 'serv/downLive.php';
    $scope.min = 0;
    $scope.uploader = true;




    class Machine {
        constructor(name, type) {
            this.name = name;
            this.type = type;
            this.status = 0;
            this.remark = "";
            this.logs = [];
            this.idlmins = 0;
            this.runmins = 0;
            this.brkmins = 0;
            this.avlmins = 0;
            this.defmins = 0;
            this.avl = 0;
            this.utl = 0;

        }
    }


    initialize();


    function initialize() {
        angular.forEach($scope.crushers, function (x, i) {
            var k = new Machine(x, 'crusher');
            $scope.machines.push(k);
        })
        angular.forEach($scope.shovels, function (x, i) {
            var k = new Machine(x, 'shovel');
            $scope.machines.push(k);
        })
        angular.forEach($scope.draglines, function (x, i) {
            var k = new Machine(x, 'dragline');
            $scope.machines.push(k);
        })


        sync();
        setInterval(sync, 10000);
    }


    function sync() {
        var a = new Date(2019, 9, 5, 5, 0, 0, 0);
        var b = a.getTime();
        var c = new Date().getTime();
        var d = Math.floor((c - b) / (8 * 3600 * 1000));
        var e = b + d * (8 * 3600 * 1000);
        $scope.start = e;
        $scope.min = Math.floor((c - e) / (5 * 60 * 1000));
        console.log($scope.min);


        if ($scope.changed) {
            console.log('Uploading on status change...');
            upload();
        }
        else {
            console.log('Downloading...');
            download();
        }

    }


    $scope.update = function () {
        $scope.changed = true;
        performanceLog();
    }


    function download() {

        var payload = {};
        var req = {
            method: 'POST',
            url: $scope.downUrl,
            headers: {
                'Content-Type': undefined
            },
            data: payload
        };

        $http(req).then(
            function (res) {
                var a = res.data;
                var b = a.indexOf('{');
                var c = a.lastIndexOf('}');
                var d = a.slice(b, c + 1);
                var e = JSON.parse(d);
                var stamp = e.stamp;
                var f = new Date(stamp);
                var hh = f.getHours();
                var mm = f.getMinutes();
                var ss = f.getSeconds();
                var t = hh + ':' + mm + ':' + ss;
                var machines = e.machines;
                $scope.machines = machines;
                // console.log(e.user + ' @ ' + t);
                $scope.stamp = stamp;
                performanceLog();
            },
            function () {
                console.log("fetch failed");
            })
    }


    function upload() {
        $scope.obj = {
            user: $scope.user,
            stamp: new Date().getTime(),
            machines: $scope.machines
        };

        $scope.objString = JSON.stringify($scope.obj);
        var payload = { 'str': $scope.objString };
        // console.log(JSON.parse(payload.str));
        var req = {
            method: 'POST',
            url: $scope.upUrl,
            headers: {
                'Content-Type': undefined
            },
            data: payload
        };

        $http(req).then(
            function (res) {
                var a = res.data;
                var b = a.indexOf('{');
                var c = a.lastIndexOf('}');
                var d = a.slice(b, c + 1);
                var e = JSON.parse(d);
                // console.log(e);
                $scope.changed = false; // only when upload is successful.
            },
            function () {
                console.log("upload failed....");
            })
    }

    function interpolate() {
        if ($scope.stamp < $scope.start) {
            console.log('Obsolete data detected. Resetting....')
            angular.forEach($scope.machines, function (mach, i) {
                if (mach.status != 2) {
                    mach.status = 0;
                    mach.remark = "";
                }
                mach.logs[0] = mach.status;
                for (j = 1; j < 96; j++) {
                    mach.logs[j] = 3;
                }
            });
        }


        angular.forEach($scope.machines, function (machine, i) {
            for (j = 1; j < 96; j++) {
                if (j > $scope.min) {
                    machine.logs[j] = 3;
                }
                else if (j < $scope.min) {
                    if (machine.logs[j] > 2) {
                        machine.logs[j] = machine.logs[j - 1];
                    }
                }
                else {
                    machine.logs[j] = machine.status;
                }
            }
        })

    }


    function performanceLog() {

        interpolate(); // Will ensure data validity and continuity.


        angular.forEach($scope.machines, function (mach, i) {
            mach.idlmins = 0;
            mach.runmins = 0;
            mach.brkmins = 0;

            for (j = 0; j <= $scope.min; j++) {
                s = mach.logs[j];
                if (s === 0) {
                    mach.idlmins += 5;
                }
                else if (s === 1) {
                    mach.runmins += 5;
                }
                else if (s === 2) {
                    mach.brkmins += 5;
                }
                else {
                    console.log('Status error while performance counting...')
                    console.log(j);
                    console.log(s);
                }
            }
            mach.defmins = mach.idlmins + mach.runmins + mach.brkmins;
            mach.avlmins = mach.idlmins + mach.runmins;
            mach.avl = Math.round(mach.avlmins * 100 / mach.defmins);
            mach.utl = Math.round(mach.runmins * 100 / mach.defmins);

            mach.idlhms = ` ${Math.floor(mach.idlmins / 60)} : ${mach.idlmins % 60} `;
            mach.runhms = ` ${Math.floor(mach.runmins / 60)} : ${mach.runmins % 60} `;
            mach.brkhms = ` ${Math.floor(mach.brkmins / 60)} : ${mach.brkmins % 60} `;
            mach.avlhms = ` ${Math.floor(mach.avlmins / 60)} : ${mach.avlmins % 60} `;
            mach.avlstr = ` ${mach.avl} %`;
            mach.utlstr = ` ${mach.utl} %`;



            $scope.changed = true;
        })
    }

    $scope.login = function () {
        if ($scope.pin == "1234") {
            $scope.user = "Viewpoint";
            $scope.auth = true;
        }
        else if ($scope.pin == "1111") {
            $scope.user = "Admin";
            $scope.auth = true;
        }
        else {
            $scope.pin = ""
        }

    }


});  