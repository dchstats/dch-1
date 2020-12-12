var app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {


    const server = 'prod';    // dev or prod


    if (server == 'dev') {
        const origin = window.location.hostname;
        const path = "/dch/";
        $scope.downUrl = "http://" + origin + path + 'serv/downLive.php';
        $scope.upUrl = "http://" + origin + path + 'serv/upLive.php';
    }
    else if (server == 'prod') {
        $scope.upUrl = 'serv/upLive.php';
        $scope.downUrl = 'serv/downLive.php';
    }





    $scope.begin = new Date(2020, 3, 1, 5, 0, 0, 0);
    $scope.crusherNames = ['CRUSHER 1', 'CRUSHER 2', 'CRUSHER 3'];
    $scope.shovelNames = ['P&H-06', 'P&H-07', 'P&H-10',
        'P&H-11', 'P&H-12', 'P&H-13', 'P&H-14', 'P&H-15',
        'P&H-16', 'P&H-17', 'P&H-18', 'P&H-19', 'HIM-20', 'PC-TATA', 'KOMATSU PC', 'LAXMAN PC', 'PL-06', 'PL-07', 'SM-L&T'];
    $scope.draglineNames = ['JYOTI', 'PAWAN', 'VNDHYA', 'JWALA'];
    $scope.siloNames = ['OLD SILO', 'NEW SILO', 'WHARF WALL'];

    $scope.statusCodes = [0, 1, 2, 3];
    $scope.statusStrings = ['IDL', 'RNG', 'BDN', 'MNT', 'UDF'];
    $scope.statusLongStrings = ['IDLE', 'RUNNING', 'BREAKDOWN', 'MAINTENANCE', 'UDF'];


    $scope.machines = [];
    $scope.silos = [];
    $scope.dumper = {};
    $scope.dumpers = [];  // stores hourly snapshots of dumper objects.
    $scope.activeDumpers = [];
    $scope.dumperTotal = {};


    $scope.stamp = ""  // time of fetched status
    $scope.syncCounter = 0;

    $scope.pin = "";

    $scope.user = "Guest";



    // GLOBALS /////
    $scope.block = 0;
    $scope.hour = 0;

    const blockWidth = 10;
    const totalBlocks = 8 * 60 / blockWidth;

    let downEv = null;
    let upEv = null;



    // CONFIGS ///////////////////////////////////
    $scope.auth = false;
    $scope.forceUpload = false;
    /////////////////////////////////////////////


    initialize();


    function initialize() {
        timeBlock();
        console.log('block:', $scope.block, '  hour:', $scope.hour);

        angular.forEach($scope.crusherNames, function (x, i) {
            var k = new Machine(x, 'crusher');
            $scope.machines.push(k);
        })
        angular.forEach($scope.shovelNames, function (x, i) {
            var k = new Machine(x, 'shovel');
            $scope.machines.push(k);
        })
        angular.forEach($scope.draglineNames, function (x, i) {
            var k = new Machine(x, 'dragline');
            $scope.machines.push(k);
        })
        angular.forEach($scope.siloNames, function (x, i) {
            var k = new Silo(x)
            $scope.silos.push(k);
        })

        $scope.dumper = new Dumper();

        angular.forEach($scope.machines, function (mach, i) {
            for (j = 0; j < totalBlocks; j++) {
                mach.logs[j] = 4;
            }
        })


        for (i = 0; i < 8; i++) {
            k = new Dumper(i);
            $scope.dumpers.push(k);
        }



        download();
        sync();

        setInterval(autoReloader, 4 * 3600 * 1000);
        pageLoad();
        analytics();
    }

    function analytics() {
        let prof = getUserProfile();
        let uid = localStorage.getItem('xxx');
        console.log('uid:', uid);
        if (uid) {
            logVisit(uid);
        }
        else {
            var payload = {
                'data': prof
            };
            var req = {
                method: 'POST',
                url: 'serv/get_uid.php',
                headers: {
                    'Content-Type': undefined
                },
                data: payload
            };

            $http(req).then(
                function (res) {
                    var a = res.data;
                    console.log(a);
                    var b = a.indexOf('#');
                    var c = a.lastIndexOf('#');
                    var d = +a.slice(b + 1, c);
                    if (isNaN(d)) {
                        console.log('Got invalid uid from server...', d);
                    }
                    else {
                        localStorage.setItem('xxx', d);
                        uid = localStorage.getItem('xxx');
                        console.log('uid:', uid);
                        if (uid) {
                            logVisit(uid);
                        }
                    }
                })
        }
    }


    function logVisit(xid) {
        var payload = {
            'data': {
                uid: xid,
                uname: localStorage.getItem('logname') || 'udf',
                uts: new Date().toLocaleString()
            }
        };
        var req = {
            method: 'POST',
            url: 'serv/log_visit.php',
            headers: {
                'Content-Type': undefined
            },
            data: payload
        };

        $http(req).then(
            function (res) {
                var a = res.data;
                console.log(a);
            })
    }



    function performanceLog() {
        // console.log('logging................');
        timeBlock();


        angular.forEach($scope.machines, function (mach, i) {
            let valids = [0, 1, 2, 3];
            if (!valids.includes(mach.logs[0])) {
                mach.logs[0] = mach.status;
            }

            for (j = 1; j < $scope.block; j++) {
                if (!valids.includes(mach.logs[j])) {
                    mach.logs[j] = mach.logs[j - 1];
                }
            }

            mach.logs[$scope.block] = mach.status;

            for (j = $scope.block + 1; j < totalBlocks; j++) {
                mach.logs[j] = 4;
            }

            mach.calculate();

            mach.evs = [];
            mach.evs.push(new MachEvent(0, mach.logs[0]));
            let n = 0; // for counting lengh of event.
            for (j = 1; j <= $scope.block; j++) {
                if (mach.logs[j] != mach.logs[j - 1]) {
                    mach.evs.push(new MachEvent(j, mach.logs[j], n));
                    n = 0;
                }
                n++;
            }


            mach.changes = [];
            mach.evs.forEach((x, i) => {

                if (i % 2 == 1) {
                    mach.changes[x.start] = 'bottom';
                }
                else if (i % 2 == 0 && i > 0) {
                    mach.changes[x.start] = 'top';
                }


            })
            // console.log(mach.name, ":", mach.evs);
            statusTimings(mach);
        });


        $scope.crushers = $scope.machines.filter(x => x.type == 'crusher');
        $scope.shovels = $scope.machines.filter(x => x.type == 'shovel');
        $scope.draglines = $scope.machines.filter(x => x.type == 'dragline');

        $scope.crusherTotal = new Machine('crusher total', 'crusher total');
        $scope.crusherTotal.add($scope.crushers);

        $scope.shovelTotal = new Machine('shovel total', 'shovel total');
        $scope.shovelTotal.add($scope.shovels);

        $scope.draglineTotal = new Machine('dragline total', 'dragline total');
        $scope.draglineTotal.add($scope.draglines);

        $scope.activeDumpers = $scope.dumpers.filter(x => x.hour <= $scope.hour);


        $scope.dumpers[$scope.hour].set($scope.dumper.get());
        angular.forEach($scope.dumpers, function (x, i) {
            x.calculate();
        })
        $scope.dumper.calculate();

        $scope.dumperTotal = new Dumper(10);
        $scope.dumperTotal.add($scope.activeDumpers);

        // $scope.graph('crusher');
        // $scope.graph('shovel');
        // $scope.graph('dragline');
        // $scope.graph('dumper');
    }


    function sync() {

        clearInterval(downEv);
        if ($scope.auth) {
            clearTimeout(upEv);
            upEv = setTimeout(upload, 5000);
        }
        downEv = setInterval(download, 30000);
    }

    function autoReloader() {
        location.reload();
    }

    $scope.update = function () {
        performanceLog();
        sync();
    }


    function download() {
        console.log('Downloading from:', $scope.downUrl);
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

                $scope.stamp = e.stamp;
                t = e.time;

                angular.forEach($scope.machines, function (x, i) {
                    x.set(e.machines[i]);
                    x.calculate();
                })
                angular.forEach($scope.silos, function (x, i) {
                    x.set(e.silos[i]);
                })
                angular.forEach($scope.dumpers, function (x, i) {
                    x.set(e.dumpers[i]);
                    x.calculate();
                })
                $scope.dumper.set(e.dumper);
                $scope.dumper.calculate();


                console.log('Downloaded..', e.stamp, 'By:' + e.user + ' @ ' + t);
                // console.log(e);
                if ($scope.stamp < $scope.start) {
                    console.log('Obsolete data detected.');
                    reset();
                }
                performanceLog();

            },
            function () {
                console.log("fetch failed");
            })

    }


    function upload() {
        console.log('Uploading to:', $scope.upUrl);

        let obj = {
            user: $scope.user,
            stamp: new Date().getTime(),
            time: new Date().toLocaleString(),
            machines: [],
            silos: [],
            dumpers: [],
            dumper: $scope.dumper.get()
        };
        console.log(obj);


        angular.forEach($scope.machines, function (x, i) {
            obj.machines.push($scope.machines[i].get());
        })
        angular.forEach($scope.silos, function (x, i) {
            obj.silos.push($scope.silos[i].get());
        })

        angular.forEach($scope.dumpers, function (x, i) {
            obj.dumpers.push($scope.dumpers[i].get());
        })

        let objString = JSON.stringify(obj);
        let payload = { 'str': objString };


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
                if (e.stamp == obj.stamp) {
                    console.log('Uploaded...', e.stamp);
                }
            },
            function () {
                console.log("upload failed....");
                sync();
            })
    }



    /////////////////////////////////////////////// UTILITY FUNCTIONS //////
    function reset() {
        angular.forEach($scope.machines, function (mach, i) {
            if (mach.status < 2) {
                mach.status = 0;
                mach.remark = "";
                mach.timeStamp = $scope.start;
            }
            mach.logs = [];
            mach.logs[0] = mach.status;
            for (j = 1; j < totalBlocks; j++) {
                mach.logs[j] = 4;
            }
        });

        $scope.dumper = new Dumper();
        $scope.dumpers = [];
        for (i = 0; i < 8; i++) {
            $scope.dumpers[i] = new Dumper(i);
        }
        console.log('Reset...');
        performanceLog();

    }

    $scope.graph = function (section) {
        let hourStrings = [];
        $scope.dumpers.forEach(x => {
            hourStrings.push($scope.hourf(x.hour));
        })


        obj = {
            crushers: JSON.parse(JSON.stringify($scope.crushers)),
            crusherTotal: JSON.parse(JSON.stringify($scope.crusherTotal)),
            shovels: JSON.parse(JSON.stringify($scope.shovels)),
            shovelTotal: JSON.parse(JSON.stringify($scope.shovelTotal)),
            draglines: JSON.parse(JSON.stringify($scope.draglines)),
            draglineTotal: JSON.parse(JSON.stringify($scope.draglineTotal)),
            dumpers: JSON.parse(JSON.stringify($scope.activeDumpers)),
            dumperTotal: JSON.parse(JSON.stringify($scope.dumperTotal)),
            hourStrings: hourStrings
        }
        if (section == 'crusher') {
            crusherGraph(obj);
        }
        else if (section == 'shovel') {
            shovelGraph(obj);
        }
        else if (section == 'dragline') {
            draglineGraph(obj);
        }
        else if (section == 'dumper') {
            dumperGraph(obj);
        }
    }


    $scope.login = function () {
        if (btoa($scope.pin) == "ODUyMA==") {
            $scope.user = "Viewpoint";
            $scope.auth = true;
        }
        else if (btoa($scope.pin) == "NDU2Mw==") {
            $scope.user = "Admin";
            $scope.auth = true;
        }
        else if (btoa($scope.pin) == "MjMwNA==") {
            $scope.user = "Dev";
            $scope.auth = true;
        }
        else {
            $scope.pin = ""
        }
    }



    /////////////////////////////////////////////////// ACTION FUNCTIONS ////
    $scope.machineStatus = function (mach) {

        if (mach.status == 3) {
            mach.remark = "MAINTENANCE";
        }
        else {
            mach.remark = "";
        }
        mach.timeStamp = new Date().getTime();
        $scope.update();

    }




    $scope.dumperCounter = function (command) {
        if (command == 1) {
            if ($scope.dumper.east_avl > 0)
                $scope.dumper.east_avl--;
        }
        else if (command == 2) {
            if ($scope.dumper.east_avl < $scope.dumper.east_total)
                $scope.dumper.east_avl++;
        }
        else if (command == 3) {
            if ($scope.dumper.east_run > 0)
                $scope.dumper.east_run--;
        }
        else if (command == 4) {
            if ($scope.dumper.east_run < $scope.dumper.east_avl)
                $scope.dumper.east_run++;
        }

        else if (command == 5) {
            if ($scope.dumper.west_avl > 0)
                $scope.dumper.west_avl--;
        }
        else if (command == 6) {
            if ($scope.dumper.west_avl < $scope.dumper.west_total)
                $scope.dumper.west_avl++;
        }
        else if (command == 7) {
            if ($scope.dumper.west_run > 0)
                $scope.dumper.west_run--;
        }
        else if (command == 8) {
            if ($scope.dumper.west_run < $scope.dumper.west_avl)
                $scope.dumper.west_run++;
        }

        $scope.update();
    }



    $scope.trendToggle = function (mach, i) {
        if ($scope.auth) {
            k = mach.logs[i];
            k += 1;
            k %= 4;
            mach.logs[i] = k;
            sync();
        }
        $scope.update();
    }



    ///////////////////////////////////////////////////////////////////////////// TIMING FUNCTIONS ////////////////
    function timeBlock() {
        var a = $scope.begin;
        var b = a.getTime();
        var c = new Date().getTime();
        var d = Math.floor((c - b) / (8 * 3600 * 1000));
        var e = b + d * (8 * 3600 * 1000);
        $scope.start = e;
        $scope.block = Math.floor((c - e) / (blockWidth * 60 * 1000));
        $scope.hour = Math.floor((c - e) / (60 * 60 * 1000));

        $scope.shift = Math.floor((c - b) / (8 * 3600 * 1000));
        $scope.shiftString = shiftDecode($scope.shift);
        console.log($scope.shiftString);

        // $scope.block = 37;
        // $scope.hour = 6;
    }

    function shiftDecode(shift) {
        var s = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        shifts = ['First', 'Second', 'Night'];

        var a = $scope.begin;
        var b = a.getTime();
        var c = shift;
        var d = b + (c * 8 * 3600 * 1000) + 1;
        var e = new Date(d);
        var f = e.getDate() + '-' + months[e.getMonth()] + '-' + e.getFullYear();
        var g = c % 3;
        var h = shifts[g];
        return i = h + " Shift, " + f;
    }


    $scope.timef = function (block, isSimple) {
        let k = $scope.start + block * blockWidth * 60 * 1000;
        let l = new Date(k);
        let h = l.getHours();
        h = h % 12;
        if (h == 0) { h = 12; }
        let t = "" + h + ":" + (l.getMinutes() < 10 ? "0" : "") + l.getMinutes() + (l.getHours() < 12 ? " AM" : " PM");
        if (isSimple) {
            t = "" + h + ":" + (l.getMinutes() < 10 ? "0" : "") + l.getMinutes();
        }
        return t;
    }


    $scope.tsToClock = function (ts, isSimple) {
        let l = new Date(ts);
        let h = l.getHours();
        h = h % 12;
        if (h == 0) { h = 12; }
        let t = "" + h + ":" + (l.getMinutes() < 10 ? "0" : "") + l.getMinutes() + (l.getHours() < 12 ? " AM" : " PM");
        if (isSimple) {
            t = "" + h + ":" + (l.getMinutes() < 10 ? "0" : "") + l.getMinutes();
        }
        return t;
    }

    $scope.hourf = function (hour) {

        // this format is useful for dumpers
        let s = new Date($scope.start + hour * 3600 * 1000).getHours();
        sh = s % 12;
        if (sh == 0) sh = 12;

        let e = new Date($scope.start + (hour + 1) * 3600 * 1000).getHours();
        eh = e % 12;
        if (eh == 0) eh = 12;
        let res = "" + sh + (s < 12 ? "AM" : "PM") + " - " + eh + (e < 12 ? "AM" : "PM");
        // console.log('hourf:',hour, res);
        return res;

    }


    $scope.hms = function (mins) {
        h = Math.floor(mins / 60);
        m = mins % 60;
        return h.toString().padStart(2, 0) + " : " + m.toString().padStart(2, 0);
    }

    // $scope.durationSince = function (block) {
    //     let st = $scope.start + block * blockWidth * 60 * 1000;
    //     let d = new Date().getTime() - st;
    //     let dm = Math.floor(d / (60 * 1000));

    //     let h = Math.floor(dm / 60);
    //     let m = dm % 60;
    //     m = m.toString().padStart(2, 0);
    //     return h + ":" + m + " hrs";
    // }

    function statusTimings(mach) {


        mach.lastev = mach.evs.pop();
        mach.evs.push(mach.lastev);
        mach.since = $scope.statusStrings[mach.status] + " since ";

        const ts = mach.timeStamp;
        const time = $scope.timef(mach.lastev.start);
        const now = new Date().getTime();
        const prevStart = $scope.start - 8 * 3600 * 1000;

        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(ts);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(ts);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(ts);
        const dt = `${da}-${mo}-${ye}`;

        let mins = Math.floor((now - ts) / (60 * 1000));
        let hrs = Math.floor(mins / 60);
        mins = mins % 60;
        days = Math.floor(hrs / 24) + 1;

        // if (mach.name == 'P&H-17') {
        //     console.log('///////////////////////////////////////')
        //     console.log(mach.evs);
        //     console.log(ts);
        //     console.log($scope.start);
        //     console.log(ts >= $scope.start)
        //     console.log(new Date(ts))
        // }

        if (ts >= $scope.start) {
            // console.log('cond1:', mach.name);

            if (mach.lastev.start == 0) {
                mach.since += "Shift start, "
            }
            mach.since += time;

            let t = $scope.start + mach.lastev.start * blockWidth * 60 * 1000;
            let mins = Math.floor((now - t) / (60 * 1000));
            let hrs = Math.floor(mins / 60);

            mins = mins % 60;
            mach.for = "(" + hrs.toString() + ":" + mins.toString().padStart(2, 0) + " hrs)";
        }
        else if (ts > prevStart) {
            // console.log('cond2:', mach.name);
            mach.since += "Previous Shift, ";
            mach.since += $scope.tsToClock(ts);
            mach.for = "(" + hrs.toString() + ":" + mins.toString().padStart(2, 0) + " hrs)";
        }
        else if (days < 365) {
            // console.log('cond3:', mach.name);
            mach.since += dt;
            mach.for = "(" + days + (days == 1 ? " day" : " days") + ")";
        }
        else {
            // console.log('cond4:', mach.name);
            mach.since = "Long breakdown";
        }
    }


    /////////////////////////////////////////// DEBUG FUNCTIONS //////////////

    randomize = function () {
        reset();

        angular.forEach($scope.machines, function (mach, i) {
            k = 0;
            for (i = 0; i < 7; i++) {
                l = 5 + Math.floor(10 * Math.random());
                v = Math.floor(4 * Math.random())
                for (j = 0; j < l; j++) {
                    if (k < $scope.block) {
                        mach.logs[k] = v;
                        k++;
                    }
                }
                if (k == $scope.block) {
                    mach.status = v;
                    break;
                }
            }
        })

        angular.forEach($scope.dumpers, function (d, i) {
            let obj = {
                east_avl: 20 + Math.floor(10 * Math.random()),
                east_run: 20 - Math.floor(10 * Math.random()),
                west_avl: 20 + Math.floor(10 * Math.random()),
                west_run: 20 - Math.floor(10 * Math.random())
            }
            d.set(obj);
        })
        $scope.dumper.set($scope.dumpers[$scope.hour].get());


        $scope.update();
    }

    $scope.rebase = function () {
        $scope.machines = [];
        $scope.silos = [];
        $scope.dumper = {};
        $scope.dumpers = [];


        angular.forEach($scope.crusherNames, function (x, i) {
            var k = new Machine(x, 'crusher');
            $scope.machines.push(k);
        })
        angular.forEach($scope.shovelNames, function (x, i) {
            var k = new Machine(x, 'shovel');
            $scope.machines.push(k);
        })
        angular.forEach($scope.draglineNames, function (x, i) {
            var k = new Machine(x, 'dragline');
            $scope.machines.push(k);
        })
        angular.forEach($scope.siloNames, function (x, i) {
            var k = new Silo(x)
            $scope.silos.push(k);
        })

        $scope.dumper = new Dumper();

        angular.forEach($scope.machines, function (mach, i) {
            for (j = 0; j < totalBlocks; j++) {
                mach.logs[j] = 4;
            }
        })


        for (i = 0; i < 8; i++) {
            k = new Dumper(i);
            $scope.dumpers.push(k);
        }

        performanceLog();
    }




    $scope.indirect = function (js) {
        return eval(js);
    }

    $scope.dnLocal = function () {

        let temp = $scope.downUrl;

        const origin = window.location.hostname;
        const port = window.location.port || "";
        const path = "/dch/";
        $scope.downUrl = "http://" + origin + path + 'serv/downLive.php';

        download();
        $scope.downUrl = temp;
    }
    $scope.upLocal = function () {
        let temp = $scope.upUrl;

        const origin = window.location.hostname;
        const port = window.location.port || "";
        const path = "/dch/";
        $scope.upUrl = "http://" + origin + path + 'serv/upLive.php';

        upload();
        $scope.upUrl = temp;
    }
    $scope.dnRemote = function () {

        let temp = $scope.downUrl;
        console.log(temp);
        $scope.downUrl = 'https://sushanttiwari.in/dch/serv/downLive.php';
        download();
        $scope.downUrl = temp;
    }
    $scope.upRemote = function () {
        let temp = $scope.upUrl;
        $scope.upUrl = 'https://sushanttiwari.in/dch/serv/upLive.php';
        upload();
        $scope.upUrl = temp;
    }
});

