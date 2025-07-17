 import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Tooltip,
 } from 'chart.js';
 import { Bar } from 'react-chartjs-2';
 
 // Register Chart.js components
 ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
 
 const BarChart = () => {
   // Simulated data (can be dynamic)
   const data = {
     labels: Array.from({ length: 10 }, (_, i) => i + 1),
     datasets: [
       {
         label: 'Activity',
         data: [1, 4, 7, 3, 9, 6, 10, 5, 3, ],
         backgroundColor: '#e28a26',
         borderRadius: 4,
         barPercentage: 0.7,
         categoryPercentage: 0.7,
       },
     ],
   };
 
   const options = {
     responsive: true,
     plugins: {
       legend: { display: false },
     },
     scales: {
       x: {
         display: false, // hide labels
       },
       y: {
         display: false,
         beginAtZero: true,
       },
     },
   };
 
   return (
     <div style={{ width: '150px', height: '60px' }}>
       <Bar data={data} options={options} />
     </div>
   );
 };
 
 export default BarChart;