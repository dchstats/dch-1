// Data is structured in a two dimensional table like this.

// labels: ['crusher-1', 'cursher-2', 'crusher-3']
// avl: [val1, val2, val3]
// run:[val1,val2,val3]

// Along the x axix are items
// along the y axis are atrributes
// in tooltip, x index is available as index
// y index is available ia datasetIndex



function crusherGraph(obj) {
    Chart.defaults.global.animation.duration = 0;

    let crushers = obj.crushers;
    let crusherTotal = obj.crusherTotal;

    let section = document.querySelector('#crusher-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    plotTime('#crusher-time', crushers);
    plotPerf('#crusher-perf', crushers);
    plotTime('#crusher-total-time', [crusherTotal], ['ALL CRUSHERS']);
    plotPerf('#crusher-total-perf', [crusherTotal], ['ALL CRUSHERS']);
}

function draglineGraph(obj) {

    let draglines = obj.draglines;
    let draglineTotal = obj.draglineTotal;

    let section = document.querySelector('#dragline-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    plotTime('#dragline-time', draglines);
    plotPerf('#dragline-perf', draglines);
    plotTime('#dragline-total-time', [draglineTotal], ['DRAGLINE TOTAL']);
    plotPerf('#dragline-total-perf', [draglineTotal], ['DRAGLINE TOTAL']);
}

function dumperGraph(obj) {

    let dumpers = obj.dumpers;
    let dumperTotal = obj.dumperTotal;
    let hourStrings = obj.hourStrings;

    let section = document.querySelector('#dumper-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());
    plotTime('#dumper-time', dumpers, hourStrings);
    plotPerf('#dumper-perf', dumpers, hourStrings);
    plotTime('#dumper-total-time', [dumperTotal], ['DUMPER']);
    plotPerf('#dumper-total-perf', [dumperTotal], ['DUMPER']);
}


function shovelGraph(obj) {

    let shovels = obj.shovels;
    let shovelTotal = obj.shovelTotal;

    let section = document.querySelector('#shovel-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    plotShovel('#shovel-avlm', shovels, 'AVL HRS');
    plotShovel('#shovel-runm', shovels, 'RUN HRS');
    plotShovel('#shovel-pavl', shovels, '% AVAILABILITY');
    plotShovel('#shovel-putl', shovels, '% UTILAZATION');
    plotTime('#shovel-total-time', [shovelTotal], ['ALL SHOVELS']);
    plotPerf('#shovel-total-perf', [shovelTotal], ['ALL SHOVELS']);

}



function plotTime(id, mcns, labs) {

    let labels = [];
    let avlm = [];
    let runm = [];
    let brkm = [];
    let mntm = [];
    let idlm = [];
    let pavl = [];
    let putl = [];



    mcns.forEach(x => {
        labels.push(x.name);
        avlm.push(x.avlm);
        runm.push(x.runm);
        brkm.push(x.brkm);
        mntm.push(x.mntm);
        idlm.push(x.idlm);
        pavl.push(x.pavl);
        putl.push(x.putl);
    });


    if (labs) {
        labels = labs;
    }

    const color_avl = '#1e75f2';
    const color_run = '#22ee3d';
    const color_brk = '#f44336';
    const color_mnt = 'yellow';
    const color_idl = 'rgb(200, 200, 200)';


    let container = document.querySelector(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'AVL HRS',
                data: avlm,
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: 'RUN HRS',
                data: runm,
                backgroundColor: color_run,
                borderWidth: 1
            },
            {
                label: 'BDN HRS',
                data: brkm,
                backgroundColor: color_brk,
                borderWidth: 1
            },
            {
                label: 'MNT HRS',
                data: mntm,
                backgroundColor: color_mnt,
                borderWidth: 1
            },
            {
                label: 'IDL HRS',
                data: idlm,
                backgroundColor: color_idl,
                borderWidth: 1
            },
            ]
        },
        options: {
            maintainAspectRatio: false,

            scales: {
                xAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            let m = value % 60;
                            m = m.toString().padStart(2, 0);
                            let h = (value - m) / 60;
                            h = h.toString().padStart(2, 0);
                            return `${h}:${m}`;
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    beforeLabel: function (tooltipItem, data) {
                        // console.log(tooltipItem);
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    },
                    label: function (tooltipItem, data) {
                        // console.table(tooltipItem);
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var value = tooltipItem.value;
                        let m = value % 60;
                        m = m.toString().padStart(2, 0);
                        let h = (value - m) / 60;
                        h = h.toString().padStart(2, 0);
                        return `${label}:  ${h}:${m}`;
                    },
                    labelTextColor: function (tooltipItem, chart) {
                        return '#ffff00';
                    }
                }
            }
        }
    });

}


function plotPerf(id, mcns, labs) {

    let labels = [];
    let avlm = [];
    let runm = [];
    let brkm = [];
    let mntm = [];
    let idlm = [];
    let pavl = [];
    let putl = [];



    mcns.forEach(x => {
        labels.push(x.name);
        avlm.push(x.avlm);
        runm.push(x.runm);
        brkm.push(x.brkm);
        mntm.push(x.mntm);
        idlm.push(x.idlm);
        pavl.push(x.pavl);
        putl.push(x.putl);
    });

    if (labs) {
        labels = labs;
    }

    const color_avl = '#1e75f2';
    const color_run = '#22ee3d';
    const color_brk = '#f44336';
    const color_mnt = 'yellow';
    const color_idl = 'rgb(200, 200, 200)';


    let container = document.querySelector(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');


    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '% AVAILIBILITY',
                data: pavl,
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: '% UTILIZATION',
                data: putl,
                backgroundColor: color_run,
                borderWidth: 1
            },
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value + "%";
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var value = tooltipItem.value;
                        return label.slice(2) + ": " + value + "%";
                    }
                }
            }
        }
    });
}

function plotShovel(id, mcns, param) {

    let labels = [];
    let avlm = [];
    let runm = [];
    let brkm = [];
    let mntm = [];
    let idlm = [];
    let pavl = [];
    let putl = [];



    mcns.forEach(x => {
        labels.push(x.name);
        avlm.push(x.avlm);
        runm.push(x.runm);
        brkm.push(x.brkm);
        mntm.push(x.mntm);
        idlm.push(x.idlm);
        pavl.push(x.pavl);
        putl.push(x.putl);
    });

    const color_avl = '#1e75f2';
    const color_run = '#22ee3d';
    const color_brk = '#f44336';
    const color_mnt = 'yellow';
    const color_idl = 'rgb(200, 200, 200)';
    const color_ong = 'RGB(255, 151, 0)';
    const color_teal = 'RGB(0, 151, 135)';

    let arr = [];
    let color = 'black';

    if (param == 'AVL HRS') {
        arr = avlm;
        color = color_avl;
    }
    else if (param == 'RUN HRS') {
        arr = runm;
        color = color_run;
    }
    else if (param == '% AVAILABILITY') {
        arr = pavl;
        color = color_teal;
    }
    else if (param == '% UTILAZATION') {
        arr = putl;
        color = color_ong;
    }

    let container = document.querySelector(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: param,
                data: arr,
                backgroundColor: color,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,

            scales: {
                xAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    stacked: false,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            let m = value % 60;
                            m = m.toString().padStart(2, 0);
                            let h = (value - m) / 60;
                            h = h.toString().padStart(2, 0);
                            return `${h}:${m}`;
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var value = tooltipItem.value;
                        if (param.includes('AVL')) {
                            let m = value % 60;
                            m = m.toString().padStart(2, 0);
                            let h = (value - m) / 60;
                            h = h.toString().padStart(2, 0);
                            let val= `${h}:${m}`;
                            return "Avl: " + val + "Hrs";
                        }
                        else if (param.includes('RUN')) {
                            let m = value % 60;
                            m = m.toString().padStart(2, 0);
                            let h = (value - m) / 60;
                            h = h.toString().padStart(2, 0);
                            let val = `${h}:${m}`;
                            return "Run: " + val + "Hrs";
                        }
                        else if (param.includes('% AVA')) {
                            return "Availibility:" + value + "%";
                        }
                        else {
                            return "Utilization:" + value + "%";
                        }
                    }
                }
            }

        }
    });

}

