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
			$scope.refresh();
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
				bd: null,
				mnt: null,
				remark: null
			};
		};
		inflate = function () {
			this.solid_qty = this.data.solid * 13;
			this.rehandling_qty = this.data.rehandling * 13;
			this.idl = 8 - this.data.wrk - this.data.bd - this.data.mnt;
		};
	}

	class SurfaceMiner {
		constructor(name) {
			this.name = name;
		}
		initialize = function () {
			this.data = {
				name: this.name,
				wrk: null,
				cutting: null,
				prod: null,
				remark: null
			};
		};
		inflate = function () { };
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
		inflate = function () { };
	}
	appInitialize();
	getLastShift();
	updateShiftData();

	function appInitialize() {
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
		$scope.shovels = [];
		$scope.draglines = [];
		$scope.surfaceMiners = [];
		$scope.outsourcings = [];
		$scope.shifts = ['Night', 'First', 'Second'];
		$scope.status = '----------';

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
		var a = new Date(2019, 2, 22, 6, 0, 0, 0);
		var b = a.getTime();
		var c = new Date();
		var d = Math.floor((c - b) / (8 * 3600 * 1000));
		$scope.beginTime = b;
		$scope.lastShift = d;
		$scope.shift = d;
	}

	function updateShiftData() {
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
					var obj = JSON.parse(obj_);
					$scope.status = "Data fetched from server";
					pop(obj);
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

	function pop(t) {

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
		$scope.refresh();
	};

	$scope.changeShift = function (arg) {
		$scope.status = "- - - - - - - - - -";
		if (arg == 'next') {
			$scope.shift += 1;
		}
		if (arg == 'prev') {
			$scope.shift -= 1;
		}
		updateShiftData();
		$scope.refresh();
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
		console.log($scope.shovels_total);

		angular.forEach($scope.shovels, function (x) {
			x.inflate();
			$scope.packet.shovels.push(x.data);
			$scope.shovels_total.sum(x);
		});

		angular.forEach($scope.draglines, function (x) {
			x.inflate();
			$scope.packet.draglines.push(x.data);
			$scope.draglines_total.data.solid += x.data.solid;
			$scope.draglines_total.data.rehandling += x.data.rehandling;
			$scope.draglines_total.data.wrk += x.data.wrk;
			$scope.draglines_total.data.bd += x.data.bd;
			$scope.draglines_total.data.mnt += x.data.mnt;
		});

		angular.forEach($scope.surfaceMiners, function (x) {
			x.inflate();
			$scope.packet.surfaceMiners.push(x.data);

			$scope.surfaceMiners_total.data.wrk += x.data.wrk;
			$scope.surfaceMiners_total.data.cutting += x.data.cutting;
			$scope.surfaceMiners_total.data.prod += x.data.prod;
		});

		angular.forEach($scope.outsourcings, function (x) {
			x.inflate();
			$scope.packet.outsourcings.push(x.data);
			$scope.outsourcings_total.data.qty += x.data.qty;
		});


		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();
		$scope.surfaceMiners_total.inflate();
		$scope.outsourcings_total.inflate();

		$scope.packet_string = JSON.stringify($scope.packet);
	};


});
