import { NextFunction, Request, Response } from "express";

import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await services.getAllUsers();
    res.status(201).json(data);
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
