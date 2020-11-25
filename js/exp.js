



function crusherGraph(obj) {
    let crushers = obj.crushers;
    let crusherTotal = obj.crusherTotal;

    let section = document.querySelector('#crusher-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type1('#crusher-time', crushers);
    type2('#crusher-perf', crushers);
    type1('#crusher-total-time', [crusherTotal], ['ALL CRUSHERS']);
    type2('#crusher-total-perf', [crusherTotal], ['ALL CRUSHERS']);
}

function draglineGraph(obj) {

    let draglines = obj.draglines;
    let draglineTotal = obj.draglineTotal;

    let section = document.querySelector('#dragline-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type1('#dragline-time', draglines);
    type2('#dragline-perf', draglines);
    type1('#dragline-total-time', [draglineTotal], ['DRAGLINE TOTAL']);
    type2('#dragline-total-perf', [draglineTotal], ['DRAGLINE TOTAL']);
}

function dumperGraph(obj) {

    let dumpers = obj.dumpers;
    let dumperTotal = obj.dumperTotal;
    let hourStrings = obj.hourStrings;

    let section = document.querySelector('#dumper-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());
    type1('#dumper-time', dumpers, hourStrings);
    type2('#dumper-perf', dumpers, hourStrings);
    type1('#dumper-total-time', [dumperTotal], ['DUMPER']);
    type2('#dumper-total-perf', [dumperTotal], ['DUMPER']);
}


function shovelGraph(obj) {

    let shovels = obj.shovels;
    let shovelTotal = obj.shovelTotal;

    let section = document.querySelector('#shovel-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type3('#shovel-avlm', shovels, 'AVAILABLE HOURS');
    type3('#shovel-runm', shovels, 'RUNNING HOURS');
    type3('#shovel-pavl', shovels, '% AVAILABILITY');
    type3('#shovel-putl', shovels, '% UTILAZATION');
    type1('#shovel-total-time', [shovelTotal], ['ALL SHOVELS']);
    type2('#shovel-total-perf', [shovelTotal], ['ALL SHOVELS']);

}



function type1(id, mcns, labs) {

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
            }
        }
    });

}


function type2(id, mcns, labs) {

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
                            return value+"%";
                        }
                    }
                }]
            }
        }
    });
}

function type3(id, mcns, param) {

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

    if (param == 'AVAILABLE HOURS') {
        arr = avlm;
        color = color_avl;
    }
    else if (param == 'RUNNING HOURS') {
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
            }
        }
    });

}