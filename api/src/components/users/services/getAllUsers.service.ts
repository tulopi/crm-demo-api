import clienteModel from "../models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import { IUser } from "../types/User.types";

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await clienteModel.find({ isDeleted: false });
  
  return users;
};
