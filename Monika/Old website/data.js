// Mock Data
const mockData = {
  totalWaste: 1200, // in kg
  binsCollected: 45,
  onTimeRate: 85, // in percentage
  fillLevels: [30, 50, 80, 90, 70, 40], // fill levels over time
  locations: [
    { name: "Location A", lat: 51.505, lng: -0.09, waste: 200 },
    { name: "Location B", lat: 51.51, lng: -0.1, waste: 150 },
    { name: "Location C", lat: 51.49, lng: -0.08, waste: 300 },
  ],
  wasteComposition: {
    organic: 300,
    plastic: 150,
    metal: 100,
    paper: 50,
  },
  collectionEfficiency: [80, 90, 85, 95], // efficiency percentages
  generationTrends: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [500, 600, 700, 800, 900, 1000], // in kg
  },
};
