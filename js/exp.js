function plot(machines) {
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
    data5 = [];
    labels = [];

    const color_avl = 'rgb(151, 151, 151)';
    const color_run = 'rgb(76, 176, 80)';
    const color_brk = 'rgb(167,0,26)';
    const color_mnt = 'rgb(220, 220, 66)';
    const color_idl = 'rgb(51, 87, 83)';


    machines.forEach(x => {
        labels.push(x.name);
        data1.push(x.avlm);
        data2.push(x.runm);
        data3.push(x.brkm);
        data4.push(x.mntm);
        data5.push(x.idlm);
    });


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avl',
                data: data1,
                backgroundColor: color_avl,
                borderWidth: 1
            },
            {
                label: 'Run',
                data: data2,
                backgroundColor: color_run,
                borderWidth: 1
            },
            {
                label: 'Brk',
                data: data3,
                backgroundColor: color_brk,
                borderWidth: 1
            },
            {
                label: 'Mnt',
                data: data4,
                backgroundColor: color_mnt,
                borderWidth: 1
            },
            {
                label: 'Idl',
                data: data5,
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

