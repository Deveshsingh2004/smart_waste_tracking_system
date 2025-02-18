// Initialize the Map and Set View to Sehore
var map = L.map('map').setView([23.2053, 77.0807], 13);

// Load OpenStreetMap Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add Fixed Location Marker (Sehore Bus Stand)
L.marker([23.2053, 77.0807]).addTo(map)
    .bindPopup("📍 <b>Sehore Bus Stand</b><br>Latitude: 23.2053, Longitude: 77.0807")
    .openPopup();

// Dustbin Data with Fill Percentage (this is hardcoded for now)
const dustbinData = [
    { lat: 23.2100, lon: 77.0850, fill: 70, img: 'Dustbin.png' }, // Dustbin 1
    { lat: 23.1985, lon: 77.0742, fill: 45, img: 'Dustbin.png' }  // Dustbin 2
];

// Custom Icon for Dustbin
const dustbinIcon = L.icon({
    iconUrl: 'Dustbin.png',  // Ensure you have a dustbin image file in the same directory
    iconSize: [40, 40],      // Adjust size as needed
    iconAnchor: [20, 40],    // Anchor position
    popupAnchor: [0, -35]    // Popup position
});

// Fetch Data from API and override dustbinData (if necessary)
fetch('https://ewklvl3p95.execute-api.us-east-1.amazonaws.com/Default')
    .then(response => response.json()) // Assuming the response is JSON
    .then(data => {
        // Optionally, replace hardcoded dustbin data with fetched data
        // If the API returns a similar structure, this will work
        const fetchedDustbins = data.dustbins || dustbinData;  // Fallback to default if no data is returned

        // Add Dustbin Markers with Image Tags in Popups
        fetchedDustbins.forEach(dustbin => {
            L.marker([dustbin.lat, dustbin.lon], { icon: dustbinIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="text-align:center;">
                        <b>🗑️ Dustbin</b><br>
                        <img src="${dustbin.img}" alt="Dustbin" width="100"><br>
                        Fill Level: <b>${dustbin.fill}%</b>
                    </div>
                `);
        });
    })
    .catch(error => {
        console.error('Error fetching dustbin data:', error);
        // Fallback to hardcoded data in case of an error
        dustbinData.forEach(dustbin => {
            L.marker([dustbin.lat, dustbin.lon], { icon: dustbinIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="text-align:center;">
                        <b>🗑️ Dustbin</b><br>
                        <img src="${dustbin.img}" alt="Dustbin" width="100"><br>
                        Fill Level: <b>${dustbin.fill}%</b>
                    </div>
                `);
        });
    });

// Refresh Button Functionality
document.getElementById('refresh-map').addEventListener('click', () => {
    location.reload();
});
