// Initialize the map, centered on Sehore, MP
let map = L.map('map').setView([23.2000, 77.0833], 12);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fixed marker at Sehore Bus Stand
let fixedLat = 23.2053;
let fixedLng = 77.0807;

L.marker([fixedLat, fixedLng]).addTo(map)
    .bindPopup("<b>Sehore Bus Stand</b><br>Lat: " + fixedLat + "<br>Lng: " + fixedLng)
    .openPopup();

// Refresh Button Functionality
document.getElementById("refresh-map").addEventListener("click", function () {
    location.reload();
});


