import productModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IProduct } from "../types/Product.types";

export const getOneProduct = async (
    id: string
): Promise<IProduct> => {
  const product = await productModel.findById(id);
  if (!product)
    throw new StatusError(
      "No se han encontrado el producto solicitado en la base de datos.",
      400
    );
  return product;
};
