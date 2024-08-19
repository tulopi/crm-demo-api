import { NextFunction, Request, Response } from "express";

import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const softDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { _id, motivo_baja } = req.body;
    if (!_id || !motivo_baja) {
      throw new StatusError("Todos los campos son necesarios información necesaria", 400);
    }

    const data = await services.softDeleteUser(_id as string, motivo_baja as string);
    res.status(201).json({ message: data });
  } catch (err: StatusError | unknown) {
    logError(err);
    logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    if (err instanceof StatusError) {
      next(err);
    } else {
      const statusError = new StatusError("Internal Server Error: " + err, 500);
      next(statusError);
    }
  }
};
