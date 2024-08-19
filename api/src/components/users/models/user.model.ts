import { Schema, model } from "mongoose";
import { IUser } from "../types/User.types";

const addressSchema = new Schema({
  address: { type: String },
  number: { type: Number },
  locality: { type: String },
  district: { type: String },
  postal_code: { type: String },
  nationality: { type: String },
});

const userSchema = new Schema(
  {
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
    products: { type: Schema.Types.ObjectId, ref: 'Product' },
    telefono: { type: String },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
