import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price,  user, expirationDate } = req.body;
    const data = await services.createNewProduct(name, description, price, user, expirationDate);
    res.status(201).json({ message: "Product created successfully", data });
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
