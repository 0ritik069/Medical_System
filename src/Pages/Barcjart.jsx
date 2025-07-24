// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = (props) => {
  // Example data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May',"june","july","August"],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 15000, 13000, 17000, 19000,15400, 20000,19500],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Sales' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5000
        }
      }
    }
  };

  return (
    <Bar data={data} options={options} {...props} />
  );
};

export default BarChart;
