// LineAreaChart.js
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

const LineAreaChart = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "series1",
        data: [40, 45, 35, 50, 70, 55, 30, 65, 40, 80, 60, 30],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1.5, // Set line width to 1px
      },
      colors: ["#4680ff"], // Line color: blue
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          colorStops: [
            {
              offset: 0,
              color: "#0d6efd2e", // Light Blue
              opacity: 0.6,
            },
            {
              offset: 100,
              color: "#FFFFFF",
              opacity: 0.1,
            },
          ],
        },
      },
      grid: {
        show: true,
        strokeDashArray: 3, 
        borderColor: "#eeeeee", // Light gray color
        xaxis: {
          lines: {
            show: false, // hide vertical lines if you only want horizontal
          },
        },
        yaxis: {
          lines: {
            show: true, // show horizontal lines
          },
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
        labels: {
    style: {
      colors: "rgb(91,107,121)", // x-axis label color
      
    },
  },
      yaxis: {
        min: 30,
        max: 90,
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "MMM",
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineAreaChart;
