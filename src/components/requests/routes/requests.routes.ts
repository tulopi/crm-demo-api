import { Router } from "express";
import * as controllers from "../controllers";

const requestsRouter = Router();


// [GET] 🌐/api/requests/
requestsRouter.get("/", controllers.getAllRequests);

// [GET] 🌐/api/requests/:id
requestsRouter.get("/:id", controllers.getOneRequest);

// [DELETE] 🌐/api/requests/delete/:id
requestsRouter.delete("/delete/:id", controllers.softDeleteRequest);

// [POST] 🌐/api/requests/
requestsRouter.post("/", controllers.createNewRequest);


export default requestsRouter;