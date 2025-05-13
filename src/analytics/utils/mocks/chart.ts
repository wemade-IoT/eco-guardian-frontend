export const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Water Consumption (Liters)",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#4A90E2",
      backgroundColor: "rgba(74, 144, 226, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Energy Consumption (kWh)",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#78C679",
      backgroundColor: "rgba(120, 198, 121, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};