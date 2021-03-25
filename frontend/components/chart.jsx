import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = ({ chartData }) => {

  const data = {
    labels: chartData.label,
    datasets: [
      {
        label: 'Price',
        data: chartData.data,
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
            display: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Price of MATIC in USD'
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
  console.log(chartData);

  return (
    <Line data={data} options={options} />
  )
}


export default LineChart;