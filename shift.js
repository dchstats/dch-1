
var app = angular.module('dch', []);


app.controller('ctrl', function ($scope, $http) {
	$scope.local = true;
	appGlobals();
	getData();
	function appGlobals() {
		$scope.date = new Date();
		$scope.shovel_names = ['P&H_45', 'P&H_2', 'P&H_3', 'P&H_4', 'P&H_5', 'P&H_6', 'P&H_7', 'P&H_8', 'P&H_9', 'P&H_10'];
		$scope.dragline_names = ['Jyoti', 'Pawan', 'Vindhya', 'Jwala'];
		$scope.surface_miner_names = ['LnT'];
		$scope.outsourcing_names = [
			'BGR-EAST-APT',
			'GAJRAJ-WEST-APT',
			'GAJRAJ-EAST-APB',
			'GAJRAJ-WEST-APB',
			'DL-EAST',
			'DL-WEST'
		];
		$scope.shifts = ['Night', 'First', 'Second'];
		serverSelect();
	}

	function serverSelect() {

		if ($scope.local) {
			$scope.url = 'http://localhost/dch-server/shift.php';
			$scope.status = "Local Server Selected";

		}
		else {
			$scope.url = 'https://www.gudjingo.com/dch/shift.php';
			$scope.status = "Remote Server Selected";

		}
		console.log($scope.status);
		changeDay();
	}

	function changeDay() {
		var a = new Date(2019, 3, 1, 6, 0, 0, 0);
		var b = a.getTime();
		var c = $scope.date.getTime();
		var d = Math.floor((c - b) / (24 * 3600 * 1000));
		$scope.day = d;
		$scope.s1 = d * 3 + 1;
		$scope.s2 = d * 3 + 2;
		$scope.s3 = d * 3 + 3;
		$scope.shift = $scope.s3;
		console.log("s1:" + $scope.s1);
		console.log("s2:" + $scope.s2);
		console.log("s3:" + $scope.s3);
		appInitialize();
	}

	function appInitialize() {
		$scope.shovels = [];
		$scope.draglines = [];
		$scope.surfaceMiners = [];
		$scope.outsourcings = [];
		$scope.status = '----------';
		$scope.packet_string = "ready";
		$scope.obj = { name: 'scope object' };


		angular.forEach($scope.shovel_names, function (x) {
			var temp = new Shovel(x);
			temp.initialize();
			$scope.shovels.push(temp);
		});
		angular.forEach($scope.dragline_names, function (x) {
			var temp = new Dragline(x);
			temp.initialize();
			$scope.draglines.push(temp);
		});
		angular.forEach($scope.surface_miner_names, function (x) {
			var temp = new SurfaceMiner(x);
			temp.initialize();
			$scope.surfaceMiners.push(temp);
		});
		angular.forEach($scope.outsourcing_names, function (x) {
			var temp = new Outsourcing(x);
			temp.initialize();
			$scope.outsourcings.push(temp);
		});

		$scope.shovels_total = new Shovel('total');
		$scope.draglines_total = new Dragline('total');
		$scope.surfaceMiners_total = new SurfaceMiner('total');
		$scope.outsourcings_total = new Outsourcing('total');

		$scope.d1 = null;
		$scope.d2 = null;
		$scope.d3 = null;
		$scope.a1 = false;
		$scope.a2 = false;
		$scope.a3 = false;
		$scope.i1 = null;
		$scope.i2 = null;
		$scope.i3 = null;
		shiftSelector(0);
	}

	function getData() {
		fetch_l($scope.s1);
		fetch_l($scope.s2);
		fetch_l($scope.s3);
	}

	function pop() {
		var t = $scope.obj;

		angular.forEach(t.shovels, function (x, i) {
			$scope.shovels[i].set(x);
		});
		angular.forEach(t.draglines, function (x, i) {
			$scope.draglines[i].set(x);
		});
		angular.forEach(t.surfaceMiners, function (x, i) {
			$scope.surfaceMiners[i].set(x);
		});
		angular.forEach(t.outsourcings, function (x, i) {
			$scope.outsourcings[i].set(x);
		});
		ref();
	};

	function dayTotal() {
		if ($scope.a1 && $scope.a2 && $scope.a3) {
			var k = null;
			$scope.obj = JSON.parse(JSON.stringify($scope.d1));
			pop();
			angular.forEach($scope.shovels, function (x, i) {
				k = new Shovel('temp');
				k.initialize();
				k.data = $scope.d2.shovels[i];
				x.sum(k);
				k.initialize();
				k.data = $scope.d3.shovels[i];
				x.sum(k);
			});
			angular.forEach($scope.draglines, function (x, i) {
				k = new Dragline('temp');
				k.initialize();
				k.data = $scope.d2.draglines[i];
				x.sum(k);
				k.initialize();
				k.data = $scope.d3.draglines[i];
				x.sum(k);
			});
			angular.forEach($scope.surfaceMiners, function (x, i) {
				k = new SurfaceMiner('temp');
				k.initialize();
				k.data = $scope.d2.surfaceMiners[i];
				x.sum(k);
				k.initialize();
				k.data = $scope.d3.surfaceMiners[i];
				x.sum(k);
			});
			angular.forEach($scope.outsourcings, function (x, i) {
				k = new Outsourcing('temp');
				k.initialize();
				k.data = $scope.d2.outsourcings[i];
				x.sum(k);
				k.initialize();
				k.data = $scope.d3.outsourcings[i];
				x.sum(k);
			});
			show('day');
		}
		else {
			$scope.status = "Incomplete shift data";
		}


	}

	function ref() {
		$scope.packet = {
			shift: $scope.shift,
			shovels: [],
			draglines: [],
			surfaceMiners: [],
			outsourcings: []
		};
		$scope.shovels_total.initialize();
		$scope.draglines_total.initialize();
		$scope.surfaceMiners_total.initialize();
		$scope.outsourcings_total.initialize();

		angular.forEach($scope.shovels, function (x) {
			x.inflate();
			$scope.packet.shovels.push(x.get());
			$scope.shovels_total.sum(x);
		});

		angular.forEach($scope.draglines, function (x) {
			x.inflate();
			$scope.packet.draglines.push(x.get());
			$scope.draglines_total.sum(x);
		});

		angular.forEach($scope.surfaceMiners, function (x) {
			$scope.packet.surfaceMiners.push(x.get());
			$scope.surfaceMiners_total.sum(x);
		});

		angular.forEach($scope.outsourcings, function (x) {
			$scope.packet.outsourcings.push(x.get());
			$scope.outsourcings_total.sum(x);
		});

		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();

		$scope.packet_string = JSON.stringify($scope.packet);
	}

	function fetch(s) {
		console.log("Data requested for " + s);
		var payload = { command: 'get', shift: s };
		var req = {
			method: 'POST',
			url: $scope.url,
			headers: {
				'Content-Type': undefined
			},
			data: payload
		};

		$http(req).then(
			function (res) {
				// console.log(res);
				var records = res.data.length;
				if (records > 0) {
					console.log("Data found for " + s);
					var p = res.data[records - 1];
					var sft = p.shift;
					var obj_ = p.data;
					var i = p.id;
					var obj = JSON.parse(obj_);
					if (s == $scope.s1) {
						$scope.d1 = obj;
						$scope.a1 = true;
						$scope.i1 = i;
						show('first');
					}
					else if (s == $scope.s2) {
						$scope.d2 = obj;
						$scope.a2 = true;
						$scope.i2 = i;
					}
					else {
						$scope.d3 = obj;
						$scope.a3 = true;
						$scope.i3 = i;
					}
				}
				else {
					$scope.status = "No data for " + s
					console.log($scope.status);
				}
			},
			function () {
				$scope.status = "Request failed for " + s;
				console.log($scope.status);
			}
		);

	}
	function fetch_l(s) {
		console.log("Data requested for " + s);
		var obj = JSON.parse(localStorage.getItem(s));
		console.log(obj);
		if (obj) {
			var i = 0;
			if (s == $scope.s1) {
				$scope.d1 = obj;
				$scope.a1 = true;
				$scope.i1 = i;
				show('first');
			}
			else if (s == $scope.s2) {
				$scope.d2 = obj;
				$scope.a2 = true;
				$scope.i2 = i;
			}
			else {
				$scope.d3 = obj;
				$scope.a3 = true;
				$scope.i3 = i;
			}
		}
		
	}
	function sub() {
		var payload = { command: 'post', shift: $scope.shift, t: $scope.packet_string };
		var req = {
			method: 'POST',
			url: $scope.url,
			headers: {
				'Content-Type': undefined
			},
			data: payload
		};

		$http(req).then(
			function (res) {
				$scope.status = JSON.stringify(res.data);
			},
			function () {
				$scope.status = 'data submission failed.';
			}
		);
		console.log($scope.status);
	}
	function sub_l() {
		localStorage.setItem($scope.shift, $scope.packet_string);
		var k = localStorage.getItem($scope.shift);
		if (k) {
			$scope.status = "Record set for " + $scope.shift;
		}
		
	}

	function dummy() {
		var l = '{"shift":171,"shovels":[["P&H_1",true,true,54,77,51,35,10,21,41,65],["P&H_2",true,true,53,72,82,69,63,76,40,67],["P&H_3",true,true,10,85,33,64,87,51,14,59],["P&H_4",true,true,2,11,77,21,59,77,22,93],["P&H_5",true,true,67,35,71,53,24,25,67,28],["P&H_6",true,true,4,18,42,97,54,85,67,28],["P&H_7",true,true,13,81,7,94,69,92,21,59],["P&H_8",true,true,7,8,66,27,96,36,2,29],["P&H_9",true,true,64,32,90,75,9,44,85,73],["P&H_10",true,true,73,85,48,34,48,85,65,83]],"draglines":[["Jyoti",42,85,null,null,null,null,"Remark1"],["Pawan",81,7,null,null,null,null,"Remark2"],["Vindhya",57,40,null,null,null,null,"Remark3"],["Jwala",11,39,null,null,null,null,"Remark4"]],"surfaceMiners":[["LnT",76,0,76,"Remark1"]],"outsourcings":[["BGR-EAST-APT",3,"Remark1"],["GAJRAJ-WEST-APT",36,"Remark2"],["GAJRAJ-EAST-APB",12,"Remark3"],["GAJRAJ-WEST-APB",10,"Remark4"],["DL-EAST",5,"Remark5"],["DL-WEST",9,"Remark6"]]}';

		$scope.obj = JSON.parse(l);
		randomValues();
		pop();
	}
	function randomValues() {
		t = $scope.obj;
		angular.forEach(t.shovels, function (x, i) {
			t.shovels[i][1] = true;
			t.shovels[i][2] = true;
			t.shovels[i][3] = Math.floor(100 * Math.random());
			t.shovels[i][4] = Math.floor(100 * Math.random());
			t.shovels[i][5] = Math.floor(100 * Math.random());
			t.shovels[i][6] = Math.floor(100 * Math.random());
			t.shovels[i][7] = Math.floor(100 * Math.random());
			t.shovels[i][8] = Math.floor(100 * Math.random());
			t.shovels[i][9] = Math.floor(100 * Math.random());
			t.shovels[i][10] = Math.floor(100 * Math.random());
		});
		angular.forEach(t.draglines, function (x, i) {
			t.draglines[i][1] = Math.floor(100 * Math.random());
			t.draglines[i][2] = Math.floor(100 * Math.random());

		});
		angular.forEach(t.surfaceMiners, function (x, i) {
			t.surfaceMiners[i][1] = Math.floor(100 * Math.random());
			t.surfaceMiners[i][2] = Math.floor(100 * Math.random());
			t.surfaceMiners[i][3] = Math.floor(100 * Math.random());
		});
		angular.forEach(t.outsourcings, function (x, i) {
			t.outsourcings[i][1] = Math.floor(100 * Math.random());
		});
	}

	function populate_r() {
		if ($scope.shift > 0) {


			var payload = { command: 'get', shift: $scope.shift };
			var req = {
				method: 'POST',
				url: $scope.url,
				headers: {
					'Content-Type': undefined
				},
				data: payload
			};

			$http(req).then(
				function (res) {
					var records = res.data.length;
					if (records < 1) {
						dummy();
						sub();
						$scope.shift--;
						setTimeout(populate, 100);
					}
					else {
						$scope.status = 'data found for' + $scope.shift;
						console.log($scope.status);
					}
				},
				function () {
					$scope.status = 'request failed.';
				}
			);
		}
	}

	function populate() {
		$scope.shift = 0;
		populat_helper();
	}

	function populat_helper() {
		if ($scope.shift < $scope.s3) {
			$scope.shift++;
			dummy();
			sub_l();
			setTimeout(populat_helper(), 100);
		}
	}

	function show(t) {
		if (t == "first") {
			$scope.shift = $scope.s1;
			if ($scope.a1) {
				$scope.obj = $scope.d1;

			}
			else {
				appInitialize();
			}
			$scope.status = 'showing:' + $scope.s1;
			shiftSelector(1);
			pop();
		}
		else if (t == "second") {
			$scope.shift = $scope.s2;
			if ($scope.a2) {
				$scope.obj = $scope.d2;

			}
			else {
				appInitialize();
			}
			$scope.status = 'showing:' + $scope.s2;
			shiftSelector(2);
			pop();
		}
		else if (t == "night") {
			$scope.shift = $scope.s3;
			if ($scope.a3) {
				$scope.obj = $scope.d3;

			}
			else {
				appInitialize();
			}
			$scope.status = 'showing:' + $scope.s3;
			shiftSelector(3);
			pop();
		}
		else if (t == "day") {
			$scope.shift = null;
			$scope.obj = $scope.day;
			$scope.status = 'showing day report';
			shiftSelector(4);
			pop();
		}
		console.log($scope.status);
	}



	$scope.dummy = function () {
		dummy();
	}

	$scope.getData = function () {
		getData();
	};

	$scope.changeDay = function () {
		changeDay();
	}
	$scope.pop = function () {
		pop();
	}

	$scope.dayTotal = function () {
		dayTotal();
	}


	$scope.sub = function () {
		sub_l();
	};

	$scope.refresh = function () {
		ref();
	};

	$scope.populate = function () {
		populate();
		$scope.shift = $scope.s3;
	}


	$scope.show = function (t) {
		show(t);
	}

	$scope.serverSelect = function () {
		serverSelect();
	}


});
