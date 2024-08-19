import productModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IProduct } from "../types/Product.types";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await productModel.find({ isDeleted: { $ne: true } }).populate('user', 'email');
  
  return products;
};
