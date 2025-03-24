import { Router } from "express";
import { taskDelayController } from "./taskDelay.module.js";

const taskDelayRoutes = Router();

taskDelayRoutes.get("/all-by-task/:taskId", taskDelayController.getTaskDelayByTaskId);

taskDelayRoutes.post("/", taskDelayController.createTaskDelay);
taskDelayRoutes.delete("/:taskId", taskDelayController.deleteTaskDelay);

export default taskDelayRoutes;