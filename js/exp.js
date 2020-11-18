function plot(obj) {
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
    data5 = [];
    labels = [];

    machines = obj.machines.filter(x=>x.type=='dragline');
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
                backgroundColor: 'green',
                borderWidth: 1
            },
            {
                label: 'Run',
                data: data2,
                backgroundColor: 'blue',
                borderWidth: 1
            },
            {
                label: 'Brk',
                data: data3,
                backgroundColor: 'red',
                borderWidth: 1
            },
            {
                label: 'Mnt',
                data: data4,
                backgroundColor: 'yellow',
                borderWidth: 1
            },
            {
                label: 'Idl',
                data: data5,
                backgroundColor: 'grey',
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

