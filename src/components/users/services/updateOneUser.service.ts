import userModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";
import { Request } from "express";
import { isValidObjectId } from "mongoose";

export const updateOneUser = async (
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

  if (!isValidObjectId(id))
    throw new StatusError("El id proporcionado no es válido", 400);
  const user = await userModel.findById(id);
  if (!user)
    throw new StatusError(
      "No se ha encontrado el usuario solicitado en la base de datos.",
      400
    );

  const { first_name, last_name, email, telefono, dni, status, motivo_baja, address } =
    req.body;

  if (first_name) {
    user.first_name = first_name;
  }
  if (last_name) {
    user.last_name = last_name;
  }
  if (email) {
    user.email = email;
  }
  if (telefono) {
    user.telefono = telefono;
  }
  if (dni) {
    user.dni = dni;
  }
  if (status) {
    user.status = status;
  }
  if (motivo_baja) {
    user.motivo_baja = motivo_baja;
  }
  if (address) {
    if (address.address) {
      user.address.address = address.address;
    }
    if (address.locality) {
      user.address.locality = address.locality;
    }
    if (address.district) {
      user.address.district = address.district;
    }
    if (address.number) {
      user.address.number = address.number;
    }
    if (address.postal_code) {
      user.address.postal_code = address.postal_code;
    }
    if (address.nationality) {
      user.address.nationality = address.nationality;
    }
  }

  await user.save();
  return user;
};
