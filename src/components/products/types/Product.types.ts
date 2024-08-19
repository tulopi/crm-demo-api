import { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  expirationDate: Date; 
  user: Schema.Types.ObjectId;
  isDeleted: boolean;
  populateUserEmail?: (path: string) => this;
}