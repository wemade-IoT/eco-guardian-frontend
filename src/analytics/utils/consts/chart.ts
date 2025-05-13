export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 30,
      },
      fullsize: true,
    },
    tooltip: {
      enabled: true,
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  scales: {
    x: {
      title: {
        display: false,
      },
    },
    y: {
      title: {
        display: false,
      },
      beginAtZero: true,
    },
  },
};
