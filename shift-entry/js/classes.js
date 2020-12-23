class Shovel {
    constructor(name) {
        this.name = name;
        this.east_factor = [45, 55, 90, 32, 37, 60];
        this.west_factor = [45, 40, 32, 27];
    }
    set = function (arr) {
        this.data = {
            // name: arr[0],
            east: arr[1],
            west: arr[2],

            east_coal_100: arr[3],
            east_coal_120: arr[4],
            east_coal_190: arr[5],
            east_ob_100: arr[6],
            east_ob_120: arr[7],
            east_ob_190: arr[8],

            west_coal_100: arr[9],
            west_coal_85: arr[10],
            west_ob_100: arr[11],
            west_ob_85: arr[12],
        };
    }

    get = function () {
        var arr = [
            this.data.name,
            this.data.east,
            this.data.west,

            this.data.east_coal_100,
            this.data.east_coal_120,
            this.data.east_coal_190,
            this.data.east_ob_100,
            this.data.east_ob_120,
            this.data.east_ob_190,

            this.data.west_coal_100,
            this.data.west_coal_85,
            this.data.west_ob_100,
            this.data.west_ob_85,


        ];
        return arr;
    }

    initialize = function () {
        this.set([this.name, false, false, null, null, null, null, null, null, null, null, null,null,null]);
    };
    remove = function (arg) {
        if (arg == 'east') {
            this.data.east = false;

            this.data.east_coal_100 = null;
            this.data.east_coal_120 = null;
            this.data.east_coal_190 = null;
            this.data.east_ob_100 = null;
            this.data.east_ob_120 = null;
            this.data.east_ob_190 = null;

        }
        if (arg == 'west') {
            this.data.west = false;
            this.data.west_coal_100 = null;
            this.data.west_coal_85 = null;
            this.data.west_ob_100 = null;
            this.data.west_ob_85 = null;

        }
    };
    inflate = function () {
        this.qty = {

            east_coal_100: this.data.east_coal_100 * this.east_factor[0],
            east_coal_120: this.data.east_coal_120 * this.east_factor[1],   // to confirm
            east_coal_190: this.data.east_coal_120 * this.east_factor[2],   // to be changed

            east_ob_100: this.data.east_ob_100 * this.east_factor[3],
            east_ob_120: this.data.east_ob_120 * this.east_factor[4],   // to confirm
            east_ob_190: this.data.east_ob_190 * this.east_factor[5],   // to be changed

            west_coal_100: this.data.west_coal_100 * this.west_factor[0],
            west_coal_85: this.data.west_coal_85 * this.west_factor[1],   // to be changed

            west_ob_100: this.data.west_ob_100 * this.west_factor[2],
            west_ob_85: this.data.west_ob_85 * this.west_factor[3],    // to be changed


            east_coal: this.data.east_coal_100 * this.east_factor[0] + this.data.east_coal_120 * this.east_factor[1] + this.data.east_coal_190 * this.east_factor[2],
            east_ob: this.data.east_ob_100 * this.east_factor[3] + this.data.east_ob_120 * this.east_factor[4] + this.data.east_ob_190 * this.east_factor[5],

            west_coal: this.data.west_coal_100 * this.west_factor[0] + this.data.west_coal_85 * this.west_factor[1],
            west_ob: this.data.west_ob_100 * this.west_factor[2] + this.data.west_ob_85 * this.west_factor[3],

            coal:
                this.data.east_coal_100 * this.east_factor[0] +
                this.data.east_coal_120 * this.east_factor[1] +
                this.data.west_coal_190 * this.east_factor[2] +
                this.data.west_coal_100 * this.west_factor[0] +
                this.data.west_coal_85 * this.west_factor[1],
            ob:
                this.data.east_ob_100 * this.east_factor[3] +
                this.data.east_ob_120 * this.east_factor[4] +
                this.data.west_ob_190 * this.east_factor[5] +
                this.data.west_ob_100 * this.west_factor[2] +
                this.data.west_ob_85 * this.west_factor[3],
        };
    };
    sum = function (x) {
        this.data.east_coal_100 += x.data.east_coal_100;
        this.data.east_coal_120 += x.data.east_coal_120;
        this.data.east_coal_190 += x.data.east_coal_190;

        this.data.east_ob_100 += x.data.east_ob_100;
        this.data.east_ob_120 += x.data.east_ob_120;
        this.data.east_ob_190 += x.data.east_ob_190;

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
    set = function (arr) {
        this.data = {
            name: arr[0],
            solid: arr[1],
            rehandling: arr[2],
            wrk: arr[3],
            mnt: arr[4],
            bd: arr[5],
            idl: arr[6],
            remark: arr[7]
        };
    }

    get = function () {
        var arr = [
            this.data.name,
            this.data.solid,
            this.data.rehandling,
            this.data.wrk,
            this.data.mnt,
            this.data.bd,
            this.data.idl,
            this.data.remark
        ];
        return arr;
    }

    initialize = function () {
        this.set([this.name, null, null, null, null, null, null, null]);
    };
    inflate = function () {
        this.solid_qty = this.data.solid * 15;
        this.rehandling_qty = this.data.rehandling * 15;
    };
    sum = function (x) {
        this.data.solid += x.data.solid;
        this.data.rehandling += x.data.rehandling;
        this.data.remark += ", ";
        this.data.remark += x.data.remark;
    }
}

class SurfaceMiner {
    constructor(name) {
        this.name = name;
    }
    set = function (arr) {
        this.data = {
            name: arr[0],
            cutting: arr[1],
            prod: arr[2],
            wrk: arr[3],
            remark: arr[4]
        };
    }
    get = function () {
        var arr = [
            this.data.name,
            this.data.cutting,
            this.data.prod,
            this.data.wrk,
            this.data.remark
        ];
        return arr;
    }
    initialize = function () {
        this.set([this.name, null, null, null, null, null]);
    };
    sum = function (x) {
        this.data.wrk += x.data.wrk;
        this.data.cutting += x.data.cutting;
        this.data.prod += x.data.prod;
        this.data.remark += ", ";
        this.data.remark += x.data.remark;
    }
}

class Outsourcing {
    constructor(name) {
        this.name = name;
    }
    set = function (arr) {
        this.data = {
            name: arr[0],
            qty: arr[1],
            remark: arr[2]
        };
    }
    get = function () {
        var arr = [
            this.data.name,
            this.data.qty,
            this.data.remark
        ];
        return arr;
    }
    initialize = function () {
        this.set([this.name, null, null, null, null])
    };
    sum = function (x) {
        this.data.qty += x.data.qty;
        this.data.remark += ", ";
        this.data.remark += x.data.remark;
    }
}

class Dispatch {
    constructor(name) {
        this.name = name;
    }
    set = function (arr) {
        this.data = arr;
    }
    get = function () {
        return this.data;

    }
    initialize = function () {
        this.data = [];

    }
    sum = function (x) {
        for (i = 0; i < this.data.length; i++) {
            this.data[i] += x.data[i];
        }
    }
}