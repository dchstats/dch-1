function plot(labels, data1, data2) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '% Avl',
                data: data1,
                backgroundColor: 'red',
                borderWidth: 1
            },
            {
                label: '% Utl',
                data: data2,
                backgroundColor: 'blue',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

