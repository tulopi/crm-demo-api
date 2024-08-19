import { IProduct } from "../types/Product.types";
import ProductModel from "../models/product.model";
import userModel from "../../users/models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";

export const createNewProduct = async (
  name: string,
  description: string,
  price: number,
  user: string,
  expirationDate?: Date
): Promise<IProduct> => {
  if (name || description || price || user) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!name || !description || !price || !user) {
    throw new StatusError("Los campos 'name', 'description', 'user' y 'price' son requeridos", 400);
  }

  let userId;


  const userFromDB = await userModel.findOne({ email: user });
  if (!userFromDB) {
    throw new StatusError(`No se encontró ningún usuario con el email ${user}`, 400);
  }
  userId = userFromDB._id;


  const newProduct = new ProductModel({
    name,
    description,
    price,
    expirationDate,
    user: userId, 
  });


  const savedProduct = await newProduct.save();

  return savedProduct;
};
