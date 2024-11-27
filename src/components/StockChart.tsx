import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockChartProps {
  stockData: { date: string; close: number }[];
}

const StockChart: React.FC<StockChartProps> = ({ stockData }) => {
  const dates = stockData.map((data) => data.date).reverse();
  const prices = stockData.map((data) => data.close).reverse();

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Closing Prices",
        data: prices,
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50", // Point color
        pointHoverBackgroundColor: "yellow", // Highlight color on hover
        pointHoverBorderColor: "black", // Border color on hover
        pointHoverBorderWidth: 2, // Border width on hover
        pointRadius: 4, // Default point size
        pointHoverRadius: 8, // Enlarged point size on hover
        tension: 0.1, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
