import productModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IProduct } from "../types/Product.types";

export const deleteProduct = async (id: string): Promise<IProduct> => {
  if (id) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  const product = await productModel.findById(id);
  if (!product)
    throw new StatusError(
      "No se han encontrado el producto solicitado en la base de datos.",
      400
    );
  product.isDeleted = true;
  product.save();
  return product;
};
