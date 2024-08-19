"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: String,
        enum: [
            "Web Landing",
            "Web Pro",
            "Web Business",
            "Ecommerce",
            "System",
            "Hosting"
        ],
    },
    description: {
        type: String,
    },
    telefono: {
        type: String,
    },
    ticket: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("Request", RequestSchema);
