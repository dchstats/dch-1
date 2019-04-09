$(begin);

function begin() {
}

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
				hrs: null,
				remark: null
			};
		};
		sum = function (x) {
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
	getLastShift();
	updateShiftData();

	function appInitialize() {
		$scope.module = 0;
		$scope.debug = false;
		$scope.shovel_names = ['P&H_1', 'P&H_2', 'P&H_3', 'P&H_4', 'P&H_5', 'P&H_6', 'P&H_7', 'P&H_8', 'P&H_9', 'P&H_10'];
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
	}

	function getLastShift() {
		var a = new Date(2019, 3, 1, 6, 0, 0, 0);
		var b = a.getTime();
		var c = new Date();
		var d = Math.floor((c - b) / (8 * 3600 * 1000));
		$scope.beginTime = b;
		$scope.lastShift = d;
		$scope.shift = d;
	}

	function updateShiftData() {
		$scope.obj = null;
		var d = $scope.shift;
		var e = Math.floor((d - 1) / 3);
		var f = $scope.beginTime + e * 24 * 3600 * 1000;
		var g = new Date(f);
		var h = g.getDate() + '/' + (g.getMonth() + 1) + '/' + g.getFullYear();
		var i = d % 3;
		$scope.date = h;
		$scope.shiftName = $scope.shifts[i];
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
		fetch();
	}

	function fetch() {
		var payload = { command: 'get', shift: $scope.shift };
		var req = {
			method: 'POST',
			url: 'shift.php',
			headers: {
				'Content-Type': undefined
			},
			data: payload
		};

		$http(req).then(
			function (res) {
				var records = res.data.length;
				if (records > 0) {
					var p = res.data[records - 1];
					var sft = p.shift;
					var obj_ = p.data;
					$scope.obj = JSON.parse(obj_);
					$scope.status = "Data fetched for " + $scope.date + ", " + $scope.shiftName + " shift";
					pop();
				}
				else {
					$scope.status = "Report not filed yet.";
				}
			},
			function () {
				$scope.status = 'No connection.';
			}
		);
	}

	$scope.dummy = function () {
		$scope.obj = JSON.parse('{"shift":24,"shovels":[{"name":"P&H_1","east":true,"west":false,"east_coal_100":1,"east_coal_120":2,"east_ob_100":3,"east_ob_120":4,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_2","east":true,"west":false,"east_coal_100":5,"east_coal_120":6,"east_ob_100":7,"east_ob_120":8,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_3","east":true,"west":false,"east_coal_100":9,"east_coal_120":10,"east_ob_100":11,"east_ob_120":12,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_4","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_5","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_6","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_7","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_8","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_9","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null},{"name":"P&H_10","east":false,"west":false,"east_coal_100":null,"east_coal_120":null,"east_ob_100":null,"east_ob_120":null,"west_coal_100":null,"west_coal_85":null,"west_ob_100":null,"west_ob_85":null}],"draglines":[{"name":"Jyoti","solid":1,"rehandling":2,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 1"},{"name":"Pawan","solid":3,"rehandling":4,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 2"},{"name":"Vindhya","solid":5,"rehandling":6,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 3"},{"name":"Jwala","solid":7,"rehandling":8,"hrs":"1.0/2.0/3.0/4.0","remark":"Remark 4"}],"surfaceMiners":[{"name":"LnT","hrs":null,"remark":"Remark 1","wrk":1,"cutting":2,"prod":3}],"outsourcings":[{"name":"BGR-EAST-APT","qty":1,"remark":"Remark 1"},{"name":"GAJRAJ-WEST-APT","qty":2,"remark":"Remark 2"},{"name":"GAJRAJ-EAST-APB","qty":3,"remark":"Remark 3"},{"name":"GAJRAJ-WEST-APB","qty":4,"remark":"Remark 4"},{"name":"DL-EAST","qty":5,"remark":"Remark 5"},{"name":"DL-WEST","qty":6,"remark":"Remark 6"}]}');
		$scope.status = "some dummy data populated";
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
			outsourcings: []
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


		$scope.packet_string = JSON.stringify($scope.packet);
	}


	$scope.changeShift = function (arg) {
		$scope.status = "- - - - - - - - - -";
		if (arg == 'next') {
			$scope.shift += 1;
		}
		if (arg == 'prev') {
			$scope.shift -= 1;
		}
		updateShiftData();
	};

	$scope.sub = function () {

		var payload = { command: 'post', shift: $scope.shift, t: $scope.packet_string };
		var req = {
			method: 'POST',
			url: 'shift.php',
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
	};

	$scope.refresh = function () {
		ref();
	};

});
