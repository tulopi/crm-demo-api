import userModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";

export const getOneUser = async (
    id: string
): Promise<IUser> => {
  const user = await userModel.findById(id);
  if (!user)
    throw new StatusError(
      "No se han encontrado el usuario solicitado en la base de datos.",
      400
    );
  return user;
};
