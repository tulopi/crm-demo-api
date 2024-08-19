import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Importacion de Routers
import notFoundRouter from "./shared/routes/notFound.routes";
// Importacion de loggers
import { logInfo } from "./loggers/index";

import { StatusError } from "./shared/classes/StatusError";
import connectDB from "./shared/database/database";
import router from "./routers/main.routes";

//------------------------------------------------------------------------
// server
const app = express();

// configuracion server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//--------------------------------------------
// Configuración del limitador de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // Límite de 100 peticiones por IP por ventana de tiempo
  message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.",
});

// Aplica el limitador de tasa a todas las peticiones
app.use(limiter);


//--------------------------------------------
// logging general

app.use((req, res, next): void => {
  logInfo(`${req.method} ${req.url}`);
  next();
});

app.get("/api", (req: Request, res: Response) => {
  res.send("Bienvenido al CRM!");
});

// Router Api
app.use(router);

//--------------------------------------------

// Ruta inexistente
app.use(notFoundRouter);
//--------------------------------------------

// Manejo de errores
app.use(
  (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> => {
    const statusError = error as StatusError;
    const status = statusError.status ?? 500;
    const message = statusError.message;
    return res.status(status).json({ status, message });
  }
);
//--------------------------------------------

// Conexión a la base de datos MongoDB
connectDB();


export default app;
