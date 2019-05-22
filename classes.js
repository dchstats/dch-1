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