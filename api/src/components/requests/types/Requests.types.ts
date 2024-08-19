import { Schema } from "mongoose";

export interface IRequest {
    isActive: boolean;
    user: Schema.Types.ObjectId;
    product: string;
    description: string;
    createdAt: Date;
    telefono: string;
    ticket: string;
}