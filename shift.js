
var app = angular.module('dch', []);

app.controller('ctrl', function ($scope, $http) {
	class Shovel {
		constructor(name) {
			this.name = name;
		}
		initialize = function () {
			this.data = {
				name: this.name,
				east: false,
				west: false,
				east_coal_100: null,
				east_coal_120: null,
				east_ob_100: null,
				east_ob_120: null,
				west_coal_100: null,
				west_coal_85: null,
				west_ob_100: null,
				west_ob_85: null
			};
		};
		remove = function (arg) {
			if (arg == 'east') {
				this.data.east = false;
				this.data.east_coal_100 = null;
				this.data.east_coal_120 = null;
				this.data.east_ob_100 = null;
				this.data.east_ob_120 = null;
			}
			if (arg == 'west') {
				this.data.west = false;
				this.data.west_coal_100 = null;
				this.data.west_coal_85 = null;
				this.data.west_ob_100 = null;
				this.data.west_ob_85 = null;
			}
			ref();
		};
		inflate = function () {
			this.qty = {
				east_coal_100: this.data.east_coal_100 * 45,
				east_coal_120: this.data.east_coal_120 * 55,
				east_ob_100: this.data.east_ob_100 * 25,
				east_ob_120: this.data.east_ob_120 * 29,
				west_coal_100: this.data.west_coal_100 * 45,
				west_coal_85: this.data.west_coal_85 * 40,
				west_ob_100: this.data.west_ob_100 * 25,
				west_ob_85: this.data.west_ob_85 * 21,
				east_coal: this.data.east_coal_100 * 45 + this.data.east_coal_120 * 55,
				east_ob: this.data.east_ob_100 * 25 + this.data.east_ob_120 * 29,
				west_coal: this.data.west_coal_100 * 45 + this.data.west_coal_85 * 40,
				west_ob: this.data.west_ob_100 * 25 + this.data.west_ob_85 * 21,
				coal:
					this.data.east_coal_100 * 45 +
					this.data.east_coal_120 * 55 +
					this.data.west_coal_100 * 45 +
					this.data.west_coal_85 * 40,
				ob:
					this.data.east_ob_100 * 25 +
					this.data.east_ob_120 * 29 +
					this.data.west_ob_100 * 25 +
					this.data.west_ob_85 * 21
			};
		};
		sum = function (x) {
			this.data.east_coal_100 += x.data.east_coal_100;
			this.data.east_coal_120 += x.data.east_coal_120;
			this.data.east_ob_100 += x.data.east_ob_100;
			this.data.east_ob_120 += x.data.east_ob_120;
			this.data.west_coal_100 += x.data.west_coal_100;
			this.data.west_coal_85 += x.data.west_coal_85;
			this.data.west_ob_100 += x.data.west_ob_100;
			this.data.west_ob_85 += x.data.west_ob_85;
		};
	}

	class Dragline {
		constructor(name) {
			this.name = name;
		}
		initialize = function () {
			this.data = {
				name: this.name,
				solid: null,
				rehandling: null,
				wrk: null,
				mnt: null,
				bd: null,
				idl: null,
				remark: null
			};
		};
		inflate = function () {
			this.solid_qty = this.data.solid * 13;
			this.rehandling_qty = this.data.rehandling * 13;
		};
		sum = function (x) {
			this.data.solid += x.data.solid;
			this.data.rehandling += x.data.rehandling;
		}
	}

	class SurfaceMiner {
		constructor(name) {
			this.name = name;
		}
		initialize = function () {
			this.data = {
				name: this.name,
				cutting: null,
				prod: null,
				wrk: null,
				remark: null
			};
		};
		sum = function (x) {
			this.data.wrk += x.data.wrk;
			this.data.cutting += x.data.cutting;
			this.data.prod += x.data.prod;
		}
	}

	class Outsourcing {
		constructor(name) {
			this.name = name;
		}
		initialize = function () {
			this.data = {
				name: this.name,
				qty: null,
				remark: null
			};
		};
		sum = function (x) {
			this.data.qty += x.data.qty;
		}
	}
	appInitialize();
	changeDay();
	getData();

	function appInitialize() {
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
		$scope.date = new Date();
		$scope.log = "";
	}

	$scope.getData = function () {
		getData();
	};

	function getData() {
		fetch($scope.s1);
		fetch($scope.s2);
		fetch($scope.s3);
	}

	$scope.changeDay = function () {
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
		var str = d + "/" + $scope.s1 + "," + $scope.s2 + "," + $scope.s3 + "/" + $scope.shift;
		log(str);

		$scope.d1 = null;
		$scope.d2 = null;
		$scope.d3 = null;
		$scope.a1 = false;
		$scope.a2 = false;
		$scope.a3 = false;


		angular.forEach($scope.shovels, function (x, i) {
			x.initialize();
		});
		angular.forEach($scope.draglines, function (x, i) {
			x.initialize();
		});
		angular.forEach($scope.surfaceMiners, function (x, i) {
			x.initialize();
		});
		angular.forEach($scope.outsourcings, function (x, i) {
			x.initialize();
		});
	}

	function fetch(s) {
		var tmp = "nothing";
		var payload = { command: 'get', shift: s };
		var req = {
			method: 'POST',
			url: 'http://localhost/dch-server/shift.php',
			headers: {
				'Content-Type': undefined
			},
			data: payload
		};

		$http(req).then(
			function (res) {
				var records = res.data.length;
				log(records);
				if (records > 0) {
					var p = res.data[records - 1];
					var sft = p.shift;
					var obj_ = p.data;
					var i = p.id;
					var obj = JSON.parse(obj_);
					if (s == $scope.s1) {
						$scope.d1 = obj;
						$scope.a1 = true;
						$scope.i1 = i;
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
					$scope.status = "Data fetched from server";

				}
				else {
					$scope.status = "no data on server";
				}
			},
			function () {
				$scope.status = 'request failed.';
			}
		);

	}

	$scope.dummy = function () {
		dummy();
	}

	function dummy() {
		var k = '{"shift":129,"shovels":[{"name":"P&H_1","east":true,"west":true,"east_coal_100":1,"east_coal_120":2,"east_ob_100":3,"east_ob_120":4,"west_coal_100":5,"west_coal_85":5,"west_ob_100":4,"west_ob_85":6},{"name":"P&H_2","east":true,"west":true,"east_coal_100":5,"east_coal_120":6,"east_ob_100":7,"east_ob_120":8,"west_coal_100":4,"west_coal_85":4,"west_ob_100":5,"west_ob_85":5},{"name":"P&H_3","east":true,"west":true,"east_coal_100":9,"east_coal_120":10,"east_ob_100":11,"east_ob_120":12,"west_coal_100":4,"west_coal_85":4,"west_ob_100":4,"west_ob_85":null},{"name":"P&H_4","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_5","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_6","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_7","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_8","east":false,"west":true,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":4,"west_coal_85":null,"west_ob_100":4,"west_ob_85":4},{"name":"P&H_9","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_10","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null}],"draglines":[{"name":"Jyoti","solid":1,"rehandling":2,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 1"},{"name":"Pawan","solid":3,"rehandling":4,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 2"},{"name":"Vindhya","solid":5,"rehandling":6,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 3"},{"name":"Jwala","solid":7,"rehandling":8,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 4"}],"surfaceMiners":[{"name":"LnT","hrs":null,"remark":"Remark 1","wrk":1,"cutting":2,"prod":3}],"outsourcings":[{"name":"BGR-EAST-APT","qty":1,"remark":"Remark 1"},{"name":"GAJRAJ-WEST-APT","qty":2,"remark":"Remark 2"},{"name":"GAJRAJ-EAST-APB","qty":3,"remark":"Remark 3"},{"name":"GAJRAJ-WEST-APB","qty":4,"remark":"Remark 4"},{"name":"DL-EAST","qty":5,"remark":"Remark 5"},{"name":"DL-WEST","qty":6,"remark":"Remark 6"}],"shovels_total":{"name":"total","data":{"name":"total","east":false,"west":false,"east_coal_100":15,"east_coal_120":18,"east_ob_100":21,"east_ob_120":24,"west_coal_100":17,"west_coal_85":13,"west_ob_100":17,"west_ob_85":15},"qty":{"east_coal_100":675,"east_coal_120":990,"east_ob_100":525,"east_ob_120":696,"west_coal_100":765,"west_coal_85":520,"west_ob_100":425,"west_ob_85":315,"east_coal":1665,"east_ob":1221,"west_coal":1285,"west_ob":740,"coal":2950,"ob":1961}},"draglines_total":{"name":"total","data":{"name":"total","solid":16,"rehandling":20,"wrk":null,"mnt":null,"bd":null,"idl":null,"remark":null},"solid_qty":208,"rehandling_qty":260},"surfaceMiners_total":{"name":"total","data":{"name":"total","cutting":2,"prod":3,"wrk":1,"remark":null}},"outsourcings_total":{"name":"total","data":{"name":"total","qty":21,"remark":null}}}';
		$scope.obj = JSON.parse(k);
		$scope.status = "some dummy data populated";
		randomValues();
		pop();
	}
	function randomValues() {
		t = $scope.obj;
		angular.forEach(t.shovels, function (x, i) {
			t.shovels[i].east_coal_100 = Math.floor(100 * Math.random());
			t.shovels[i].east_coal_120 = Math.floor(100 * Math.random());
			t.shovels[i].east_ob_100 = Math.floor(100 * Math.random());
			t.shovels[i].east_ob_120 = Math.floor(100 * Math.random());
			t.shovels[i].west_coal_100 = Math.floor(100 * Math.random());
			t.shovels[i].west_coal_85 = Math.floor(100 * Math.random());
			t.shovels[i].west_ob_100 = Math.floor(100 * Math.random());
			t.shovels[i].west_ob_85 = Math.floor(100 * Math.random());
		});
		angular.forEach(t.draglines, function (x, i) {
			t.draglines[i].solid = Math.floor(100 * Math.random());
			t.draglines[i].rehandling = Math.floor(100 * Math.random());
		});
		angular.forEach(t.surfaceMiners, function (x, i) {
			t.surfaceMiners[i].cutting = Math.floor(100 * Math.random());
			t.surfaceMiners[i].wrk = Math.floor(100 * Math.random());
			t.surfaceMiners[i].prod = Math.floor(100 * Math.random());
		});
		angular.forEach(t.outsourcings, function (x, i) {
			t.outsourcings[i].qty = Math.floor(100 * Math.random());
		});
	}


	$scope.pop = function () {
		pop();
	}

	function pop() {
		t = $scope.obj;
		angular.forEach(t.shovels, function (x, i) {
			$scope.shovels[i].data = x;
		});
		angular.forEach(t.draglines, function (x, i) {
			$scope.draglines[i].data = x;
		});
		angular.forEach(t.surfaceMiners, function (x, i) {
			$scope.surfaceMiners[i].data = x;
		});
		angular.forEach(t.outsourcings, function (x, i) {
			$scope.outsourcings[i].data = x;
		});
		ref();
	};


	function ref() {
		$scope.packet = {
			shift: $scope.shift,
			shovels: [],
			draglines: [],
			surfaceMiners: [],
			outsourcings: [],
			shovels_total: null,
			draglines_total: null,
			surfaceMiners_total: null,
			outsourcings_total: null
		};
		$scope.shovels_total.initialize();
		$scope.draglines_total.initialize();
		$scope.surfaceMiners_total.initialize();
		$scope.outsourcings_total.initialize();

		angular.forEach($scope.shovels, function (x) {
			x.inflate();
			$scope.packet.shovels.push(x.data);
			$scope.shovels_total.sum(x);
		});

		angular.forEach($scope.draglines, function (x) {
			x.inflate();
			$scope.packet.draglines.push(x.data);
			$scope.draglines_total.sum(x);
		});

		angular.forEach($scope.surfaceMiners, function (x) {
			$scope.packet.surfaceMiners.push(x.data);
			$scope.surfaceMiners_total.sum(x);
		});

		angular.forEach($scope.outsourcings, function (x) {
			$scope.packet.outsourcings.push(x.data);
			$scope.outsourcings_total.sum(x);
		});

		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();
		$scope.packet.shovels_total = $scope.shovels_total;
		$scope.packet.draglines_total = $scope.draglines_total;
		$scope.packet.surfaceMiners_total = $scope.surfaceMiners_total;
		$scope.packet.outsourcings_total = $scope.outsourcings_total;


		$scope.packet_string = JSON.stringify($scope.packet);
		// console.log($scope.packet_string);

	}


	$scope.sub = function () {
		var payload = { command: 'post', shift: $scope.shift, t: $scope.packet_string };
		var req = {
			method: 'POST',
			url: 'http://localhost/dch-server/shift.php',
			headers: {
				'Content-Type': undefined
			},
			data: payload
		};

		$http(req).then(
			function (res) {
				$scope.status = JSON.stringify(res.data);
				log($scope.status);
			},
			function () {
				$scope.status = 'data submission failed.';
			}
		);
	};

	$scope.refresh = function () {
		ref();
	};

	$scope.populate = function () {
		$scope.i = 100;
		populate();
	}

	function populate() {
		if ($scope.i <= $scope.s3) {
			$scope.shift = $scope.i;
			dummy();
			$scope.sub();
			$scope.i = $scope.i + 1;;
			setTimeout(populate, 100);
		}
		else {
			return 0;
		}
	}

	$scope.show = function (t) {
		show(t);
	}
	function show(t) {
		if (t == "first") {
			$scope.shift = $scope.s1;
			if ($scope.a1) {
				$scope.obj = $scope.d1;
				log('showing:' + $scope.s1);
				shiftSelector(1);
				pop();
			}
			
		}
		else if (t == "second") {
			$scope.shift = $scope.s2;
			if ($scope.a2) {
				$scope.obj = $scope.d2;
				log('showing:' + $scope.s2);
				shiftSelector(2);
				pop();
			}
		}
		else if (t == "night") {
			$scope.shift = $scope.s3;
			if ($scope.a3) {
				$scope.obj = $scope.d3;
				log('showing:' + $scope.s3);
				shiftSelector(3);
				pop();
			}
		}
		
	}

	function log(s) {
		$scope.log = s + "\n" + $scope.log;
	}

});
