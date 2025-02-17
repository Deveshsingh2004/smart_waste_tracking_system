document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map centered at Sehore
    var map = L.map("map").setView([23.2053, 77.0807], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add a fixed marker at Sehore Bus Stand
    var marker = L.marker([23.2053, 77.0807]).addTo(map);
    marker.bindPopup("<b>📍 Sehore Bus Stand</b><br>Latitude: 23.2053, Longitude: 77.0807").openPopup();

    // Refresh Map Button Event
    document.getElementById("refresh-map").addEventListener("click", function () {
        location.reload(); // Simple page reload to reset map
    });

    // Fetch Data from API
    fetch("https://ewklvl3p95.execute-api.us-east-1.amazonaws.com/Default")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("API Data:", data); // Log fetched data to console

            // Display fetched data inside the info box
            document.getElementById("info-data").innerHTML = `
                <h3>🌍 Fetched Data</h3>
                <p><b>Name:</b> ${data.name || "N/A"}</p>
                <p><b>Description:</b> ${data.description || "No description available"}</p>
                <p><b>Latitude:</b> ${data.latitude || "Unknown"}, <b>Longitude:</b> ${data.longitude || "Unknown"}</p>
            `;

            // If latitude & longitude exist, add marker dynamically
            if (data.latitude && data.longitude) {
                var fetchedMarker = L.marker([data.latitude, data.longitude]).addTo(map);
                fetchedMarker.bindPopup(`<b>${data.name}</b><br>(${data.latitude}, ${data.longitude})`).openPopup();
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("info-data").innerHTML = "<p>⚠ Failed to fetch data.</p>";
        });
});


