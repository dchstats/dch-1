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
	class Shovel {
		constructor(name) {
			this.name = name;
			this.east = false;
			this.west = false;
			this.east_trips = [null, null, null, null];
			this.west_trips = [null, null, null, null];
		}
		inflate = function () {
			this.east_qty = [
				this.east_trips[0] * 45,
				this.east_trips[1] * 55,
				this.east_trips[2] * 25,
				this.east_trips[3] * 29
			];
			this.west_qty = [
				this.west_trips[0] * 45,
				this.west_trips[1] * 40,
				this.west_trips[2] * 25,
				this.west_trips[3] * 21
			];
			this.east_coal = this.east_qty[0] + this.east_qty[1];
			this.east_ob = this.east_qty[2] + this.east_qty[3];
			this.west_coal = this.west_qty[0] + this.west_qty[1];
			this.west_ob = this.west_qty[2] + this.west_qty[3];
			this.coal = this.east_coal + this.west_coal;
			this.ob = this.east_ob + this.west_ob;
		}
	}
	class Dragline {
		constructor(name) {
			this.name = name;
			this.solid_buckets = null;
			this.rehandling_buckets = null;
			this.wrk_hrs = null;
			this.bd_hrs = null;
			this.mnt_hrs = null;
			this.remark = null;
		}
		inflate = function () {
			this.solid_qty = this.solid_buckets * 13;
			this.rehandling_qty = this.rehandling_buckets * 13;
			this.idl_hrs = 8 - this.wrk_hrs - this.bd_hrs - this.mnt_hrs;
		}
	}
	$scope.shovel_names = ['P&H-1', 'P&H-2', 'P&H-3'];
	$scope.dragline_names = ['Jyoti', 'Pawan', 'Vindhya', 'Jwala'];
	$scope.shovels = [];
	$scope.draglines = [];
	angular.forEach($scope.shovel_names, function (x) {
		var temp = new Shovel(x);
		$scope.shovels.push(temp);
	});
	angular.forEach($scope.dragline_names, function (x) {
		var temp = new Dragline(x);
		$scope.draglines.push(temp);
	});
	$scope.shifts = ['other', 'First', 'Second', 'Night'];
	$scope.shift = getShift();
	$scope.date = formattedDate();
	$scope.eastShovels = [];
	$scope.westShovels = [];
	$scope.esm = [45, 55, 25, 29];
	$scope.wsm = [45, 40, 25, 21];

	$scope.surfaceMiners = [{ name: 'LnT', data: [null, null, null], remark: null }];

	$scope.outsourcing = [
		{ name: 'BGR-EAST-APT', data: [null], remark: null },
		{ name: 'GAJRAJ-WEST-APT', data: [null], remark: null },
		{ name: 'GAJRAJ-EAST-APB', data: [null], remark: null },
		{ name: 'GAJRAJ-WEST-APB', data: [null], remark: null },
		{ name: 'DL-EAST', data: [null], remark: null },
		{ name: 'DL-WEST', data: [null], remark: null }
	];

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

	function formattedDate() {
		var today = new Date();
		var dd = today.getDate();
		var hour = new Date().getHours();
		if (hour <= 14) {
			dd = dd - 1;
		}
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		return dd + '-' + mm + '-' + yyyy;
	}

	function getShift() {
		var hour = new Date().getHours();
		//hour = 7;
		var currentShift = 0;
		if (hour >= 6 && hour < 14) {
			currentShift = 1;
		} else if (hour >= 14 && hour < 22) {
			currentShift = 2;
		} else {
			currentShift = 3;
		}
		var shift = (currentShift + 1) % 3 + 1;
		return shift;
	}

	$scope.addShovel = function (location, id) {
		var shovel = $scope.shovels[id];
		if (location == 'east') {
			shovel.east = true;
			$scope.eastShovels.push(shovel);
		} else if (location == 'west') {
			shovel.west = true;
			$scope.westShovels.push(shovel);
		}
		console.log($scope.eastShovels);
	};

	$scope.removeShovel = function (location, id) {
		if (location == 'east') {
			$scope.eastShovels.splice(id, 1);
		} else if (location == 'west') {
			$scope.westShovels.splice(id, 1);
		}
	};

	$scope.refresh = function () {
		$scope.shovels_total = {
			east_trips: [0, 0, 0, 0],
			east_qty: [0, 0, 0, 0],
			west_trips: [0, 0, 0, 0],
			west_qty: [0, 0, 0, 0],
			east_coal: 0,
			west_coal: 0,
			east_ob: 0,
			west_ob: 0,
			coal: 0,
			ob: 0
		};
		$scope.draglines_total = {
			solid_buckets: 0,
			rehandling_buckets: 0,
			solid_qty: 0,
			rehandling_qty: 0,
			wrk_hrs: 0,
			bd_hrs: 0,
			mnt_hrs: 0,
			idl_hrs: 0
		}


		angular.forEach($scope.shovels, function (x) {

			x.inflate();
			for (var i = 0; i < 4; i++) {
				$scope.shovels_total.east_trips[i] += x.east_trips[i];
				$scope.shovels_total.east_qty[i] += x.east_qty[i];
				$scope.shovels_total.west_trips[i] += x.west_trips[i];
				$scope.shovels_total.west_qty[i] += x.west_qty[i];
			}
			$scope.shovels_total.east_coal += x.east_coal;
			$scope.shovels_total.west_coal += x.west_coal;
			$scope.shovels_total.east_ob += x.east_ob;
			$scope.shovels_total.west_ob += x.west_ob;
			$scope.shovels_total.coal += x.coal;
			$scope.shovels_total.ob += x.ob;


			$scope.draglines_total = {
				solid_buckets: 0,
				rehandling_buckets: 0,
				solid_qty: 0,
				rehandling_qty: 0,
				wrk_hrs: 0,
				bd_hrs: 0,
				mnt_hrs: 0,
				idl_hrs: 0
			};

			angular.forEach($scope.draglines, function (x) {
				x.inflate();
				$scope.draglines_total.solid_buckets += x.solid_buckets;
				$scope.draglines_total.rehandling_buckets += x.rehandling_buckets;
				$scope.draglines_total.solid_qty += x.solid_qty;
				$scope.draglines_total.rehandling_qty += x.rehandling_qty;
				$scope.draglines_total.wrk_hrs += x.wrk_hrs;
				$scope.draglines_total.bd_hrs += x.bd_hrs;
				$scope.draglines_total.mnt_hrs += x.mnt_hrs;
				$scope.draglines_total.idl_hrs += x.idl_hrs;
			});
		});
	}
})