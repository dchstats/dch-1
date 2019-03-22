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
		set = function(data) {
			this.data = data;
		};
		inflate = function() {
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

		inflate = function() {};
	}
	class Outsourcing {
		constructor(name) {
			this.name = name;
		}
		initialize = function() {
			this.qty = null;
			this.remark = null;
		};

		inflate = function() {};
	}
	$scope.shovel_names = [ 'P&H1', 'P&H2', 'P&H13' ];
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

	$scope.eastShovels = [];
	$scope.westShovels = [];

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
			shovel.data.east = true;
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
	$scope.outsourcings_total = new Outsourcing('total');

	$scope.fetch = function() {
		var t = {
			shovels: [
				{
					name: 'P&H1',
					east: true,
					west: false,
					east_coal_100: 1,
					east_coal_120: 2,
					east_ob_100: 3,
					east_ob_120: 4,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				},
				{
					name: 'P&H2',
					east: true,
					west: false,
					east_coal_100: 5,
					east_coal_120: 6,
					east_ob_100: 7,
					east_ob_120: 8,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				},
				{
					name: 'P&H13',
					east: true,
					west: false,
					east_coal_100: 9,
					east_coal_120: 10,
					east_ob_100: 11,
					east_ob_120: 12,
					west_coal_100: null,
					west_coal_85: null,
					west_ob_100: null,
					west_ob_85: null
				}
			]
		};

		angular.forEach(t.shovels, function(x, i) {
			console.log(x);
			if (x.east) {
				$scope.addShovel('east', i);
			}
			$scope.shovels[i].data = x;
		});
	};

	$scope.refresh = function() {
		$scope.packet = {
			shovels: []
		};

		$scope.shovels_total.initialize();
		$scope.draglines_total.initialize();
		$scope.surface_miners_total.initialize();
		$scope.outsourcings_total.initialize();

		angular.forEach($scope.shovels, function(x) {
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

		angular.forEach($scope.draglines, function(x) {
			x.inflate();
			$scope.draglines_total.solid_buckets += x.solid_buckets;
			$scope.draglines_total.rehandling_buckets += x.rehandling_buckets;
			$scope.draglines_total.wrk_hrs += x.wrk_hrs;
			$scope.draglines_total.bd_hrs += x.bd_hrs;
			$scope.draglines_total.mnt_hrs += x.mnt_hrs;
		});

		angular.forEach($scope.surface_miners, function(x) {
			x.inflate();
			$scope.surface_miners_total.wrk_hrs += x.wrk_hrs;
			$scope.surface_miners_total.cutting += x.cutting;
			$scope.surface_miners_total.prod += x.prod;
		});

		angular.forEach($scope.outsourcings, function(x) {
			x.inflate();
			$scope.outsourcings_total.qty += x.qty;
		});

		$scope.packet_string = JSON.stringify($scope.packet);

		$scope.shovels_total.inflate();
		$scope.draglines_total.inflate();
		$scope.surface_miners_total.inflate();
		$scope.outsourcings_total.inflate();
	};
});
