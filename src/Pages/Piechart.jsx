// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title
// } from 'chart.js';

// // ✅ Register required components for Pie chart
// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// // function MyPieChart() {
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Sample Data',
//         data: [12, 19, 3, 5, 2],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//         ],
//         borderColor: '#fff',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Sample Pie Chart',
//       },
//       legend: {
//         position: 'bottom',
//       },
//     },
//   };

//   return <Pie data={data} options={options} />;
// }

// export default MyPieChart;
import React from "react";

import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

export default function MyPieChart() {
  return (
    <div className="App">
      <Line data={data} />
    </div>
  );
}