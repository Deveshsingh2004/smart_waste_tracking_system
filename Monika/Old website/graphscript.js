// Initialize Metrics
document.getElementById("totalWaste").textContent = `${mockData.totalWaste} kg`;
document.getElementById("binsCollected").textContent = mockData.binsCollected;
document.getElementById("onTimeRate").textContent = `${mockData.onTimeRate}%`;

// Garbage Fill Levels Chart
const fillLevelCtx = document.getElementById("fillLevelChart").getContext("2d");
new Chart(fillLevelCtx, {
  type: "line",
  data: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        label: "Fill Level (%)",
        data: mockData.fillLevels,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Waste Composition Chart
const wasteCompositionCtx = document
  .getElementById("wasteCompositionChart")
  .getContext("2d");
new Chart(wasteCompositionCtx, {
  type: "doughnut",
  data: {
    labels: ["Organic", "Plastic", "Metal", "Paper"],
    datasets: [
      {
        label: "Waste Composition (kg)",
        data: Object.values(mockData.wasteComposition),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
});

// Collection Efficiency Chart
const collectionEfficiencyCtx = document
  .getElementById("collectionEfficiencyChart")
  .getContext("2d");
new Chart(collectionEfficiencyCtx, {
  type: "bar",
  data: {
    labels: ["Truck 1", "Truck 2", "Truck 3", "Truck 4"],
    datasets: [
      {
        label: "Efficiency (%)",
        data: mockData.collectionEfficiency,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Garbage Generation Trends Chart
const generationTrendsCtx = document
  .getElementById("generationTrendsChart")
  .getContext("2d");
new Chart(generationTrendsCtx, {
  type: "line",
  data: {
    labels: mockData.generationTrends.labels,
    datasets: [
      {
        label: "Waste Generated (kg)",
        data: mockData.generationTrends.data,
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Leaflet Map for Peak Garbage Locations
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

mockData.locations.forEach((location) => {
  L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup(`<b>${location.name}</b><br>Waste: ${location.waste} kg`);
});
