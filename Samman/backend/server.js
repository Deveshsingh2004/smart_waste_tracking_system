// const express = require("express");
// const { Client } = require("pg");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// const client = new Client({ connectionString: process.env.DB_URL });

// client.connect()
//     .then(() => console.log("Connected to PostgreSQL"))
//     .catch(err => console.error("Connection error", err));

// // Route to add a new dustbin
// app.post("/api/add-dustbin", async (req, res) => {
//     try {
//         const { lat, lon, fill, weight, address, floor, block, phone, user_id } = req.body;

//         const query = `
//             INSERT INTO dustbin (latitude, longitude, height_threshold, weight, address, floor, block, phone_number, user_id)
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
//         `;

//         const values = [lat, lon, fill, weight, address, floor, block, phone, user_id];
//         const result = await client.query(query, values);

//         res.json({ message: "Dustbin added successfully!", data: result.rows[0] });
//     } catch (error) {
//         console.error("Error adding dustbin:", error);
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });









const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new Client({ connectionString: process.env.DB_URL });

client.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Connection error", err));

// Route to add a new dustbin
app.post("/api/add-dustbin", async (req, res) => {
    try {
        const { lat, lon, fill, weight, address, floor, block, phone } = req.body;  // Removed user_id

        const query = `
            INSERT INTO dustbin (latitude, longitude, height_threshold, weight, address, floor, block, phone_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
        `;

        const values = [lat, lon, fill, weight, address, floor, block, phone];  // Removed user_id from values
        const result = await client.query(query, values);

        res.json({ message: "Dustbin added successfully!", data: result.rows[0] });
    } catch (error) {
        console.error("Error adding dustbin:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
