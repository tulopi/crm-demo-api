"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: [
            "Web Landing",
            "Web Pro",
            "Web Business",
            "Ecommerce",
            "System",
            "Hosting",
        ],
        required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    expirationDate: { type: Date },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
