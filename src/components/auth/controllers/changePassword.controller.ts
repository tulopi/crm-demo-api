import { NextFunction, Request, Response } from "express";
import * as services from "../services/index";
import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword, repeatPassword } = req.body
    await services.changePassword(id, currentPassword, newPassword, repeatPassword);
    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (err: StatusError | unknown) {
    logError(err);
    logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    if (err instanceof StatusError) {
      next(err);
    } else {
      const statusError = new StatusError("Error interno del servidor: " + err, 500);
      next(statusError);
    }
  }
};