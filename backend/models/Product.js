const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    productId: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: String,
        required: true
    },

    supplier: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    minimumStock: {
        type: Number,
        required: true,
        min: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);