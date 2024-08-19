import userModel from "../../users/models/user.model";
import { StatusError } from "../../../shared/classes/StatusError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/config";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  if (!email || !password) throw new StatusError("Campos obligatorios no proporcionados.", 400);

  const user = await userModel.findOne({ email });
  if (!user) throw new StatusError("Credenciales inválidas.", 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new StatusError("Credenciales inválidas.", 401);
  user.lastConnection = new Date();
  await user.save()
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });
  return { token };
};
