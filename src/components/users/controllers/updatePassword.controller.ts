import { NextFunction, Request, Response } from "express";

import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await services.updatePassword(id, req);
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
