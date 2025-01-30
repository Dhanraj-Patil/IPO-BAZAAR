import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Graph({ data }) {
  if (!data || !data.labels) return <p>Loading...</p>;

  const { labels, Revenue, ProfitAfterTax, TotalAssets } = data;

  // Common options for all the charts
  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the height to be set independently
    plugins: {
      legend: { display: true, labels: { color: "#fff" } },
      title: { display: true, color: "#fff" },
      tooltip: {
        callbacks: {
          // Custom tooltip to append "Cr" to the value
          label: function(tooltipItem) {
            return tooltipItem.dataset.label + ": " + tooltipItem.raw + " Cr";
          },
        },
      },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.2)" } },
      y: { 
        ticks: { 
          color: "#fff", 
          callback: function(value) { 
            return value + " Cr";  // Add "Cr" after each tick value
          } 
        },
        grid: { color: "rgba(255, 255, 255, 0.2)" }
      },
    },
    animation: {
      duration: 2000,  // Animation duration in milliseconds
    },
  };

  // Function to generate chart data for each graph
  const chartData = (label, dataset, color) => ({
    labels,
    datasets: [{ 
      label, 
      data: dataset, 
      backgroundColor: color, 
      borderRadius: 5 
    }],
  });

  return (
    <div className="bg-[#111822] p-6 text-white rounded-2xl mt-11 shadow-2xl ">
      <h2 className="text-center mb-8 text-3xl">Financial Data </h2>
      <div className="flex space-x-6 justify-center">
        {/* Revenue Chart */}
        <div className="w-1/3 h-[23rem]">
          <Bar
            data={chartData("Revenue", Revenue, "#FEBE10")}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: { text: "Revenue", display: true },
              },
            }}
          />
        </div>
        {/* Profit After Tax Chart */}
        <div className="w-1/3 h-[23rem]">
          <Bar
            data={chartData("Profit After Tax", ProfitAfterTax, "#03c02c")}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: { text: "Profit After Tax", display: true },
              },
            }}
          />
        </div>
        {/* Total Assets Chart */}
        <div className="w-1/3 h-[23rem]">
          <Bar
            data={chartData("Total Assets", TotalAssets, "#EF0107")}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: { text: "Total Assets", display: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Graph;
