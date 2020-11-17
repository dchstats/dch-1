function plot(labels, data1, data2, data3, data4, data5) {
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

