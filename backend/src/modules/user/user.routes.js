import { Router } from "express";
import { userController } from "./user.module.js";

const userRoutes = Router();

userRoutes.get("/", userController.getPaginatedUsers);
userRoutes.get("/:userId", userController.getUserById);
userRoutes.post("/", userController.createUser);
userRoutes.put("/:userId", userController.updateUser);

export default userRoutes;