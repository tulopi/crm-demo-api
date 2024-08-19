import { IProduct } from "../types/Product.types";
import ProductModel from "../models/product.model";
import { StatusError } from "../../../shared/classes/StatusError";

export const updateOneProduct = async (
  id: string,
  name: string,
  description: string,
  price: number,
  expirationDate?: Date
): Promise<IProduct | null> => {
  if (name || description || price) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!name || !description || !price) {
    throw new StatusError("Name, description, y price son requeridos", 400);
  }

  const productToUpdate = await ProductModel.findById(id);

  if (!productToUpdate) {
    throw new Error("El producto no se ha encontrado en la base de datos");
  }

  if (expirationDate !== undefined) {
    productToUpdate.expirationDate = expirationDate;
  }

  productToUpdate.name = name;
  productToUpdate.description = description;
  productToUpdate.price = price;

  const updatedProduct = await productToUpdate.save();

  return updatedProduct;
};
