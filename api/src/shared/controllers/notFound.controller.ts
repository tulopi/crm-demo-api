import { NextFunction, Request, Response } from "express";
import { logWarning } from "../../loggers/index";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  logWarning(`${req.method} ${req.originalUrl} - Ruta inexistente`);
  return res.status(404).json({ message: "Ups, Ruta inexistente..." });
};
