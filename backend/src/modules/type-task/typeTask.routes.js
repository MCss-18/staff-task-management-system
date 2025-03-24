import { Router } from "express";
import { typeTaskController } from "./typeTask.module.js";

const typeTaskRoutes = Router();

typeTaskRoutes.get("/all", typeTaskController.getTypeTasks);

export default typeTaskRoutes;