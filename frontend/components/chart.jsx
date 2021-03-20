import React from 'react'
import { Line } from 'react-chartjs-2'

const data = {
  labels: ['03-14', '03-13', '03-12', '03-11', '03-10', '03-09'].reverse(),
  datasets: [
    {
      label: 'Price',
      data: [0.40325877, 0.41824865, 0.4100801, 0.444045, 0.28798512, 0.29842356, 0.21873327, 0.21346247],
      fill: false,
      // backgroundColor: 'rgb(255, 99, 132)',
      // borderColor: 'rgba(255, 99, 132, 0.2)',
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'hsl(171, 100%, 41%)',
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      lineTension: 0.4,
      xAxisId: 'x-0',
      yAxisID: 'y-0',
      // pointRadius: 10,
      // pointHoverRadius: 0,
      fill: true,
      showLine: true,
    },
  ],
}

const options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
    // callbacks: {
    //   label: function (tooltipItem) {
    //     return tooltipItem.yLabel;
    //   }
    // }
  },
  scales: {
    yAxes: [
      {
        id: 'y-0',
        display: true,
        type: 'linear',
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        id: 'x-0',
        display: true,
        gridLines: {
          display: false,
        },
      },
    ],
  },
  responsive: true,
  maintainAspectRatio: false,
}

const LineChart = () => <Line data={data} options={options} />;


export default LineChart;