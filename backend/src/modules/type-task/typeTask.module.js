import { TypeTaskController } from "./typeTask.controller.js";
import { TypeTaskService } from "./typeTask.service.js";

const typeTaskService = new TypeTaskService();
const typeTaskController= new TypeTaskController();

export { typeTaskService, typeTaskController };