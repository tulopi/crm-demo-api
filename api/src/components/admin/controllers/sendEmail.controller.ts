import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { to, subject, content } = req.body;
    const result = await services.sendEmail(to, subject, content);
    res.status(200).json(result);
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