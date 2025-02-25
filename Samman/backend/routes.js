const express = require("express");
const client = require("./db");
const router = express.Router();

// Route to add a new dustbin
router.post("/add-dustbin", async (req, res) => {
    const { lat, lon, fill, weight, address, floor, block } = req.body;
    try {
        await client.query(
            "INSERT INTO dustbin (latitude, longitude, height_threshold, weight, address, floor, block) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [lat, lon, fill, weight, address, floor, block]
        );
        res.json({ message: "Dustbin added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
