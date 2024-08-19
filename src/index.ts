import { createServer } from "http";
import config from "./config/config";
import { logError, logInfo } from "./loggers/index";
import app from "./server";

const PORT = config.PORT;

const server = createServer(app);


const enableExpress = (): void => {
  server.listen(PORT, () => {
    logInfo(`🚀 Corriendo servidor en http://localhost:${PORT}...`);
  });
  server.on("error", (error) => logError(`Error en servidor ${error}`));
};

enableExpress();
