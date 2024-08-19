import userModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";

export const softDeleteUser = async (_id: string, motivo_baja: string): Promise<IUser> => {
  if (_id) throw new StatusError(
    "Para acceder a todas las funcionalidades y características adicionales, es necesario contratar el servicio completo.",
    400
  );
  
  const user = await userModel.findById(_id);
  if (!user)
    throw new StatusError(
      "No se han encontrado el usuario solicitado en la base de datos.",
      400
    );
  if (user.isDeleted === true)
    throw new StatusError("El usuario ya se encuentra eliminado.", 400);
  user.isDeleted = true;
  user.motivo_baja = motivo_baja;
  user.status = "Inactivo";
  const result = await user.save();

  return result;
};
