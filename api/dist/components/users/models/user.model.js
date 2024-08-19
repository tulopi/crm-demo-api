"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    address: { type: String },
    number: { type: Number },
    locality: { type: String },
    district: { type: String },
    postal_code: { type: String },
    nationality: { type: String },
});
const userSchema = new mongoose_1.Schema({
    first_name: { type: String },
    last_name: { type: String },
    password: { type: String, required: true },
    dni: { type: String },
    status: {
        type: String,
        enum: ["Activo", "Inactivo", "Deudor"],
        default: "Activo",
    },
    address: { type: addressSchema, default: {} },
    email: { type: String, unique: true, required: true },
    role: {
        user: { type: Boolean, default: true },
        admin: { type: Boolean, default: false },
    },
    lastConnection: { type: Date },
    isDeleted: { type: Boolean, default: false },
    motivo_baja: { type: String },
    products: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    telefono: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
