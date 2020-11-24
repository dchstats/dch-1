function crusherGraph(obj) {
    let crushers = obj.crushers;
    let crusherTotal = obj.crusherTotal;

    let section = document.querySelector('#crusher-sec');
    section.querySelectorAll('.chart-container canvas').forEach(x => x.remove());


  

    labels = [];
    avlm = [];
    runm = [];
    brkm = [];
    mntm = [];
    idlm = [];
    pavl = [];
    putl = [];


    const color_avl = '#1e75f2';
    const color_run = '#22ee3d';
    const color_brk = '#f44336';
    const color_mnt = 'yellow';
    const color_idl = 'rgb(200, 200, 200)';


    crushers.forEach(x => {
        labels.push(x.name);
        avlm.push(x.avlm);
        runm.push(x.runm);
        brkm.push(x.brkm);
        mntm.push(x.mntm);
        idlm.push(x.idlm);
        pavl.push(x.pavl);
        putl.push(x.putl);
    });



    let container = document.querySelector('#crusher-time');
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



    container = document.querySelector('#crusher-perf');
    canvas = document.createElement('canvas');
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



    console.log(crusherTotal);

    container = document.querySelector('#crusher-total-time');
    canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Crusher Total'],
            datasets: [{
                label: 'Avl',
                data: [crusherTotal.avlm],
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: 'Run',
                data: [crusherTotal.runm],
                backgroundColor: color_run,
                borderWidth: 1
            },
            {
                label: 'Brk',
                data: [crusherTotal.brkm],
                backgroundColor: color_brk,
                borderWidth: 1
            },
            {
                label: 'Mnt',
                data: [crusherTotal.mntm],
                backgroundColor: color_mnt,
                borderWidth: 1
            },
            {
                label: 'Idl',
                data: [crusherTotal.idlm],
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




    container = document.querySelector('#crusher-total-perf');
    canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Crusher Total'],
            datasets: [{
                label: '%Avl',
                data: [crusherTotal.pavl],
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: '%Utl',
                data: [crusherTotal.putl],
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




