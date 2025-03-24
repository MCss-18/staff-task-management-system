import { Router } from "express";
import { taskController } from "./task.module.js";

const taskRoutes = Router();

taskRoutes.get("/by-group/:groupId", taskController.getPaginatedTaskByGroupId);
taskRoutes.get("/by-group-technician/:groupId/:userTechnicianId", taskController.getPaginatedTaskByGroupIdAndUserTechnicianId);

taskRoutes.post("/", taskController.createTask);
taskRoutes.delete("/:taskId", taskController.deleteTask);

taskRoutes.put("/:taskId", taskController.updateTask);
taskRoutes.put("/start-date/:taskId", taskController.updateStartDateTask);
taskRoutes.put("/end-date/:taskId", taskController.updateEndDateTask);

export default taskRoutes;