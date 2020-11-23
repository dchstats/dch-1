function plot(machines, id) {
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


    machines.forEach(x => {
        labels.push(x.name);
        avlm.push(x.avlm);
        runm.push(x.runm);
        brkm.push(x.brkm);
        mntm.push(x.mntm);
        idlm.push(x.idlm);
        pavl.push(x.pavl);
        putl.push(x.putl);
    });


    var ctx = document.getElementById(id + '-time').getContext('2d');
    var detailsTime = new Chart(ctx, {
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



    var ctx = document.getElementById(id + '-perf').getContext('2d');
    
    var detailsPerf = new Chart(ctx, {
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

