import userModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";
import { Request } from "express";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";

export const updatePassword = async (
  id: string,
  req: Request
): Promise<IUser> => {
  if (id) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new StatusError("No hay campos para actualizar", 400);
  }
  if (!isValidObjectId(id)) {
    throw new StatusError("El id proporcionado no es válido", 400);
  }
  const user = await userModel.findById(id);
  if (!user) {
    throw new StatusError(
      "No se ha encontrado el usuario solicitado en la base de datos.",
      400
    );
  }
  const { password } = req.body;
  if (await bcrypt.compare(password, user.password)) {
    throw new StatusError("La contraseña no debe ser igual a la anterior", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};
