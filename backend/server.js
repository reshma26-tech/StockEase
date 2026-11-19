const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/stockEaseDB";

// Home route
app.get("/", (req, res) => {
    res.send("StockEase Backend is Running");
});

// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working");
});

// Connect MongoDB and start server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`StockEase server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });