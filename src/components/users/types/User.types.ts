import { Schema, Document } from "mongoose";

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  password: string;
  dni: string;
  address: Address;
  email: string;
  role: Role;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  motivo_baja: string;
  lastConnection: Date;
  telefono: string;
  isDeleted: boolean;
}

export interface Address {
  address: string;
  locality: string;
  district: string;
  number: number;
  postal_code: string;
  nationality: string;
}

export interface Role {
  user: boolean;
  admin: boolean;
}
