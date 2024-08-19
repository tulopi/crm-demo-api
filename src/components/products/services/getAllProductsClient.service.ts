import productModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IProduct } from "../types/Product.types";

export const getAllProductsClient = async (
    id: string
): Promise<IProduct[]> => {

  const products = await productModel.find({ user: id, isDeleted: false }).exec();


  return products;
};
