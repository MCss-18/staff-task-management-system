import { TaskController } from "./task.controller.js";
import { TaskService } from "./task.service.js";

const taskService = new TaskService();
const taskController= new TaskController();

export { taskService, taskController };