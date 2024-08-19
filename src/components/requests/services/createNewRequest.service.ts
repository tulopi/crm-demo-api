import { IRequest } from "../types/Requests.types";
import RequestsModel from "../models/requests.model";
import userModel from "../../users/models/user.model";
import { isValidObjectId } from "mongoose";
import { StatusError } from "../../../shared/classes/StatusError";

export const createNewRequest = async (
  user: string,
  telefono?: string,
  product?: string,
  description?: string,
  ticket?: string
): Promise<IRequest> => {
  if (user) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!user) {
    throw new StatusError("El campo user es obligatorio", 400);
  }

  if (!isValidObjectId(user)) {
    throw new StatusError("El campo user tiene que ser un ObjectId válido", 400);
  }

  const userFromDB = await userModel.findById(user);
  if (!userFromDB) {
    throw new StatusError(`No se encontró ningún usuario con el id solicitado`, 400);
  }

  const newRequest = new RequestsModel({
    user: user,
    telefono: telefono,
    product: product,
    description: description,
    ticket: ticket
  });

  await newRequest.save();

  return newRequest;
};
