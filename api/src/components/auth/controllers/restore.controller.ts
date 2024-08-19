import { NextFunction, Request, Response } from "express";
import * as services from "../services/restorePassword.service";
import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";

export const sendRestorePasswordEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    await services.sendRestorePasswordEmail(email);
    res.status(200).json({ message: "Correo de restauración enviado." });
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

export const restorePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("llego aca", req.body);
    
    const { token, newPassword } = req.body;
    await services.restorePassword(token, newPassword);
    res.status(200).json({ message: "Contraseña restaurada con éxito." });
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
