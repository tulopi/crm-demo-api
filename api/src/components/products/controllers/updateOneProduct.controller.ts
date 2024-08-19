import { NextFunction, Request, Response } from "express";
import { StatusError } from "../../../shared/classes/StatusError";
import { logError, logWarning } from "../../../loggers";
import * as services from "../services/index";

export const updateOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {id} = req.params; 
    const { name, description, price, expirationDate } = req.body; 
    
    const updatedProduct = await services.updateOneProduct(id, name, description, price, expirationDate);
    
    res.status(200).json(updatedProduct);
  } catch (err: any) {
    logError(err);
    logWarning(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    
    if (err instanceof StatusError) {
      next(err);
    } else {
      const statusError = new StatusError("Internal Server Error", 500);
      next(statusError); 
    }
  }
};
