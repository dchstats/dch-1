$(begin);

function begin() {
	section = 0;
	t = $('.section');
	t.hide();
	$(t[section]).show();
}

function moduleNav(arg) {
	var last = section;
	if (arg == 'next' && section < t.length - 1) {
		section++;
	} else if (arg == 'prev' && section > 0) {
		section--;
	}
	if (last != section) {
		$(t[last]).hide();
		$(t[section]).slideDown(100);
	}
}

var app = angular.module('dch', []);

app.controller('ctrl', function ($scope) {

	$scope.shifts = ['Night', 'First', 'Second'];
	$scope.diff = 0;
	findShift();
	function findShift() {
		var a = new Date(2019, 2, 22, 6, 0, 0, 0);
		var b = a.getTime();
		var c = new Date();
		var d = Math.floor((c - b) / (8 * 3600 * 1000)) - $scope.diff;
		var e = Math.floor((d - 1) / 3);
		var f = a.getTime() + e * 24 * 3600 * 1000;
		var g = new Date(f);
		var h = g.getDate() + '/' + (g.getMonth() + 1) + '/' + g.getFullYear();
		var i = d % 3;
		$scope.shift = d;
		$scope.date = h;
		$scope.shiftName = $scope.shifts[i];
	}
	$scope.changeShift = function (arg) {
		if (arg == 'next' && $scope.diff > 0) {
			$scope.diff -= 1;
		}
		if (arg == 'prev' && $scope.shift > 1) {
			$scope.diff += 1;
		}
		findShift();
	}



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

	$scope.eastShovels = [];
	$scope.westShovels = [];

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


	$scope.datahead = {
		eastShovels: ['Coal-100', 'Coal-120', 'OB-100', 'OB-120'],
		westShovels: ['Coal-100', 'Coal-85', 'OB-100', 'OB-85'],
		draglines: ['Solid', 'Re-handling', 'Timings', 'Remark'],
		surfaceMiners: ['Working', 'Cutting', 'Production', 'Remark'],
		outsourcing: ['Quantity', 'Remark']
	};

	$scope.unit = {
		eastShovels: ['trips', 'trips', 'trips', 'trips'],
		westShovels: ['trips', 'trips', 'trips', 'trips'],
		draglines: ['buckets', 'buckets', 'hrs', ''],
		surfaceMiners: ['hrs', 'mtrs', 'Te', ''],
		outsourcing: ['cum', '']
	};



	$scope.shovels_total = new Shovel('total');
	$scope.draglines_total = new Dragline('total');
	$scope.surfaceMiners_total = new SurfaceMiner('total');
	$scope.outsourcings_total = new Outsourcing('total');

	$scope.fetch = function () {
		var t = {
			shovels: [
				{
					name: 'P&H_1',
					east: true,
					west: true,
					east_coal_100: 122,
					east_coal_120: null,
					east_ob_100: 5,
					east_ob_120: null,
					west_coal_100: 7,
					west_coal_85: null,
					west_ob_100: 3,
					west_ob_85: null
				},
				{
					name: 'P&H_2',
					east: true,
					west: true,
					east_coal_100: 5,
					east_coal_120: 5,
					east_ob_100: 5,
					east_ob_120: null,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: 5,
					west_ob_85: null,
					west_coal_120: 5
				},
				{
					name: 'P&H_3',
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
				},
				{
					name: 'P&H_4',
					east: true,
					west: true,
					east_coal_100: null,
					east_coal_120: 458,
					east_ob_100: null,
					east_ob_120: null,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null,
					west_ob_120: 44,
					west_coal_120: 44
				},
				{
					name: 'P&H_5',
					east: true,
					west: false,
					east_coal_100: 4,
					east_coal_120: 4,
					east_ob_100: 5,
					east_ob_120: 5,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				},
				{
					name: 'P&H_6',
					east: true,
					west: false,
					east_coal_100: null,
					east_coal_120: 5,
					east_ob_100: 55,
					east_ob_120: null,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				},
				{
					name: 'P&H_7',
					east: false,
					west: true,
					east_coal_100: null,
					east_coal_120: null,
					east_ob_100: null,
					east_ob_120: null,
					west_coal_100: 45,
					west_coal_85: null,
					west_ob_100: 22,
					west_ob_85: null,
					west_coal_120: 2
				},
				{
					name: 'P&H_8',
					east: true,
					west: true,
					east_coal_100: null,
					east_coal_120: 5,
					east_ob_100: null,
					east_ob_120: null,
					west_coal_100: 5,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null,
					west_coal_120: 5
				},
				{
					name: 'P&H_9',
					east: true,
					west: true,
					east_coal_100: 5,
					east_coal_120: 5,
					east_ob_100: null,
					east_ob_120: null,
					west_coal_100: 4,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null,
					west_coal_120: 1
				},
				{
					name: 'P&H_10',
					east: true,
					west: false,
					east_coal_100: null,
					east_coal_120: null,
					east_ob_100: null,
					east_ob_120: null,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				}
			],
			draglines: [
				{ name: 'Jyoti', solid: 7, rehandling: 8, wrk: 1, bd: 2, mnt: 3, remark: 'hey how are you' },
				{ name: 'Pawan', solid: 7, rehandling: 1, wrk: 3, bd: 2, mnt: 1, remark: 'all is well' },
				{ name: 'Vindhya', solid: 9, rehandling: 9, wrk: 1, bd: 2, mnt: 3, remark: 'i am good' },
				{ name: 'Jwala', solid: 1, rehandling: 6, wrk: 3, bd: 2, mnt: 1, remark: 'hello brother' }
			],
			surfaceMiners: [{ name: 'LnT', wrk: 1, cutting: 7, prod: 156, remark: 'hare krishna' }],
			outsourcings: [
				{ name: 'BGR-EAST-APT', qty: 46, remark: 'hello brother' },
				{ name: 'GAJRAJ-WEST-APT', qty: 46, remark: 'hello world' },
				{ name: 'GAJRAJ-EAST-APB', qty: 544, remark: 'irs broken' },
				{ name: 'GAJRAJ-WEST-APB', qty: 45, remark: 'computer science' },
				{ name: 'DL-EAST', qty: 57457, remark: 'power point' },
				{ name: 'DL-WEST', qty: 585, remark: 'circle' }
			]
		};

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

		angular.forEach($scope.shovels, function (x) {
			x.inflate();
			$scope.packet.shovels.push(x.data);
			$scope.shovels_total.data.east_coal_100 += x.data.east_coal_100;
			$scope.shovels_total.data.east_coal_120 += x.data.east_coal_120;
			$scope.shovels_total.data.east_ob_100 += x.data.east_ob_100;
			$scope.shovels_total.data.east_ob_120 += x.data.east_ob_120;
			$scope.shovels_total.data.west_coal_100 += x.data.west_coal_100;
			$scope.shovels_total.data.west_coal_85 += x.data.west_coal_85;
			$scope.shovels_total.data.west_ob_100 += x.data.west_ob_100;
			$scope.shovels_total.data.west_ob_85 += x.data.west_ob_85;
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

		$scope.packet_string = JSON.stringify($scope.packet);

		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();
		$scope.surfaceMiners_total.inflate();
		$scope.outsourcings_total.inflate();
	};
});
