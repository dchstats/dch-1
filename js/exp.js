function type1(id, mcns) {
    console.log(mcns);

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


    let container = document.querySelector(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avl',
                data: avlm,
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: 'Run',
                data: runm,
                backgroundColor: color_run,
                borderWidth: 1
            },
            {
                label: 'Brk',
                data: brkm,
                backgroundColor: color_brk,
                borderWidth: 1
            },
            {
                label: 'Mnt',
                data: mntm,
                backgroundColor: color_mnt,
                borderWidth: 1
            },
            {
                label: 'Idl',
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}


function type2(id, mcns) {

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


    let container = document.querySelector(id);
    let canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');


    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '%Avl',
                data: pavl,
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: '%Utl',
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


function crusherGraph(obj) {
    let crushers = obj.crushers;
    let crusherTotal = obj.crusherTotal;

    let section = document.querySelector('#crusher-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type1('#crusher-time', crushers);
    type2('#crusher-perf', crushers);
    type1('#crusher-total-time', [crusherTotal]);
    type2('#crusher-total-perf', [crusherTotal]);
}

function draglineGraph(obj) {
    console.log(obj);
    let draglines = obj.draglines;
    let draglineTotal = obj.draglineTotal;

    let section = document.querySelector('#dragline-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type1('#dragline-time', draglines);
    type2('#dragline-perf', draglines);
    type1('#dragline-total-time', [draglineTotal]);
    type2('#dragline-total-perf', [draglineTotal]);
}

function dumperGraph(obj) {
    console.log(obj);
    let dumpers = obj.dumpers;
    let dumperTotal = obj.dumperTotal;

    let section = document.querySelector('#dumper-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());

    type1('#dumper-time', dumpers);
    type2('#dumper-perf', dumpers);
    type1('#dumper-total-time', [dumperTotal]);
    type2('#dumper-total-perf', [dumperTotal]);
}

