import { Router } from "express";
import { notFound } from "../controllers/notFound.controller";

const notFoundRouter = Router();

notFoundRouter.use("*", notFound);

export default notFoundRouter;
