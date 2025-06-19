export const metrics = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Water Consumption (Liters)",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#4A90E2",
      backgroundColor: "rgba(74, 144, 226, 0.1)",
      fill: true,
      tension: 0.4
    },
    {
      label: "Energy Consumption (kWh)",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#78C679",
      backgroundColor: "rgba(120, 198, 121, 0.1)",
      fill: true,
      tension: 0.4
    }
  ],
  widgets: [
    {
      title: "Water Consumption",
      value: "65,25 L",
      description: "Water Consumption in the last month"
    },
    {
      title: "Energy Consumption",
      value: "16 kW/h",
      description: "System energy consumption."
    },
    {
      title: "Humidity Threshold",
      value: "30%",
      description: "Humidity Threshold of the most recent monitored plantation."
    },
    {
      title: "Light Level",
      value: "15 kLux",
      description: "Light Levels of the most recent monitored plantation"
    },
    {
      title: "Temperature",
      value: "20°C",
      description: "Temperature of the most recent monitored plantation"
    },
    {
      title: "Humidity",
      value: "82%",
      description: "Humidity of the most recent monitored plantation"
    }
  ]
};

export default metrics;