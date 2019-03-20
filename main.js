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

app.controller('ctrl', function($scope) {
	class Shovel {
		constructor(name) {
			this.name = name;
		}
		initialize = function() {
			this.east = false;
			this.east_coal_100_trips = null;
			this.east_coal_120_trips = null;
			this.east_ob_100_trips = null;
			this.east_ob_120_trips = null;

			this.west = false;
			this.west_coal_100_trips = null;
			this.west_coal_85_trips = null;
			this.west_ob_100_trips = null;
			this.west_ob_85_trips = null;
		};
		inflate = function() {
			this.east_coal_100_qty = this.east_coal_100_trips * 45;
			this.east_coal_120_qty = this.east_coal_120_trips * 55;
			this.east_ob_100_qty = this.east_ob_100_trips * 25;
			this.east_ob_120_qty = this.east_ob_120_trips * 29;

			this.west_coal_100_qty = this.west_coal_100_trips * 45;
			this.west_coal_85_qty = this.west_coal_85_trips * 40;
			this.west_ob_100_qty = this.west_ob_100_trips * 25;
			this.west_ob_85_qty = this.west_ob_85_trips * 21;

			this.east_coal = this.east_coal_100_qty + this.east_coal_120_qty;
			this.east_ob = this.east_ob_100_qty + this.east_ob_120_qty;
			this.west_coal = this.west_coal_100_qty + this.west_coal_85_qty;
			this.west_ob = this.west_ob_100_qty + this.west_ob_85_qty;
			this.coal = this.east_coal + this.west_coal;
			this.ob = this.east_ob + this.west_ob;
		};
	}
	class Dragline {
		constructor(name) {
			this.name = name;
		}
		initialize = function() {
			this.solid_buckets = null;
			this.rehandling_buckets = null;
			this.wrk_hrs = null;
			this.bd_hrs = null;
			this.mnt_hrs = null;
			this.remark = null;
		};
		inflate = function() {
			this.solid_qty = this.solid_buckets * 13;
			this.rehandling_qty = this.rehandling_buckets * 13;
			this.idl_hrs = 8 - this.wrk_hrs - this.bd_hrs - this.mnt_hrs;
		};
	}
	class SurfaceMiner {
		constructor(name) {
			this.name = name;
		}
		initialize = function() {
			this.wrk_hrs = null;
			this.cutting = null;
			this.prod = null;
			this.remark = null;
		};
	}
	class Outsourcing {
		constructor(name) {
			this.name = name;
		}
		initialize = function() {
			this.qty = null;
			this.remark = null;
		};
	}
	$scope.shovel_names = [ 'P&H-1', 'P&H-2', 'P&H-13' ];
	$scope.dragline_names = [ 'Jyoti', 'Pawan', 'Vindhya', 'Jwala' ];
	$scope.surface_miner_names = [ 'LnT' ];
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
	$scope.surface_miners = [];
	$scope.outsourcings = [];

	angular.forEach($scope.shovel_names, function(x) {
		var temp = new Shovel(x);
		temp.initialize();
		$scope.shovels.push(temp);
	});
	angular.forEach($scope.dragline_names, function(x) {
		var temp = new Dragline(x);
		temp.initialize();
		$scope.draglines.push(temp);
	});
	angular.forEach($scope.surface_miner_names, function(x) {
		var temp = new SurfaceMiner(x);
		temp.initialize();
		$scope.surface_miners.push(temp);
	});
	angular.forEach($scope.outsourcing_names, function(x) {
		var temp = new Outsourcing(x);
		temp.initialize();
		$scope.outsourcings.push(temp);
	});
	$scope.shifts = [ 'other', 'First', 'Second', 'Night' ];
	$scope.shift = getShift();
	$scope.date = formattedDate();
	$scope.eastShovels = [];
	$scope.westShovels = [];

	$scope.datahead = {
		eastShovels: [ 'Coal-100', 'Coal-120', 'OB-100', 'OB-120' ],
		westShovels: [ 'Coal-100', 'Coal-85', 'OB-100', 'OB-85' ],
		draglines: [ 'Solid', 'Re-handling', 'Timings', 'Remark' ],
		surfaceMiners: [ 'Working', 'Cutting', 'Production', 'Remark' ],
		outsourcing: [ 'Quantity', 'Remark' ]
	};

	$scope.unit = {
		eastShovels: [ 'trips', 'trips', 'trips', 'trips' ],
		westShovels: [ 'trips', 'trips', 'trips', 'trips' ],
		draglines: [ 'buckets', 'buckets', 'hrs', '' ],
		surfaceMiners: [ 'hrs', 'mtrs', 'Te', '' ],
		outsourcing: [ 'cum', '' ]
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

	$scope.addShovel = function(location, id) {
		var shovel = $scope.shovels[id];
		if (location == 'east') {
			shovel.east = true;
			$scope.eastShovels.push(shovel);
		} else if (location == 'west') {
			shovel.west = true;
			$scope.westShovels.push(shovel);
		}
	};

	$scope.removeShovel = function(location, id) {
		if (location == 'east') {
			$scope.eastShovels.splice(id, 1);
		} else if (location == 'west') {
			$scope.westShovels.splice(id, 1);
		}
	};

	$scope.shovels_total = new Shovel('total');
	$scope.draglines_total = new Dragline('total');
	$scope.surface_miners_total = new SurfaceMiner('total');
	$scope.outsourcing_total = new Outsourcing('total');

	$scope.refresh = function() {
		$scope.shovels_total.initialize();
		$scope.draglines_total.initialize();
		$scope.surface_miners_total.initialize();
		$scope.outsourcing_total.initialize();

		angular.forEach($scope.shovels, function(x) {
			x.inflate();
			$scope.shovels_total.east_coal_100_trips += x.east_coal_100_trips;
			$scope.shovels_total.east_coal_120_trips += x.east_coal_120_trips;
			$scope.shovels_total.east_ob_100_trips += x.east_ob_100_trips;
			$scope.shovels_total.east_ob_120_trips += x.east_ob_120_trips;

			$scope.shovels_total.west_coal_100_trips += x.west_coal_100_trips;
			$scope.shovels_total.west_coal_85_trips += x.west_coal_85_trips;
			$scope.shovels_total.west_ob_100_trips += x.west_ob_100_trips;
			$scope.shovels_total.west_ob_85_trips += x.west_ob_85_trips;
		});

		angular.forEach($scope.draglines, function(x) {
			x.inflate();
			$scope.draglines_total.solid_buckets += x.solid_buckets;
			$scope.draglines_total.rehandling_buckets += x.rehandling_buckets;
			$scope.draglines_total.wrk_hrs += x.wrk_hrs;
			$scope.draglines_total.bd_hrs += x.bd_hrs;
			$scope.draglines_total.mnt_hrs += x.mnt_hrs;
		});

		$scope.packet = {
			shovels: $scope.shovels,
			draglines: $scope.draglines,
			surface_miners: $scope.surfaceMiners,
			outsourcings: $scope.outsourcings
		};

		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();
	};
});
