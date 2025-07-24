// DonutChart.js
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ReactApexChart from 'react-apexcharts';
// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [state, setState] = React.useState({
    series: [44, 55, 41,34],
      colors: ["#2ca87f", "#e58a00", "#008ffb","#ff4560"], // 🎨 Your custom colors here
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart" style={{height:"300px",width:"300px"}}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;
