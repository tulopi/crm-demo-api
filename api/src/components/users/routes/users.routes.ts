import { Router } from "express";
import * as controllers from "../controllers";

const usersRouter = Router();

// [GET] 🌐/api/users
usersRouter.get("/", controllers.getAllUsers);

// [GET] 🌐/api/users/:id
usersRouter.get("/:id", controllers.getOneUser);

// [POST] 🌐/api/users
usersRouter.post("/", controllers.createNewUser);

// [PUT] 🌐/api/users/:id
usersRouter.put("/:id", controllers.updateOneUser);

// [PUT] 🌐/api/users/password/:id
usersRouter.put("/password/:id", controllers.updatePassword);

// [DELETE] 🌐/api/users/
usersRouter.delete("/", controllers.softDeleteUser);

export default usersRouter;