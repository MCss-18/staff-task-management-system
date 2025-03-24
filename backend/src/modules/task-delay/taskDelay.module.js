import { TaskDelayController } from "./taskDelay.controller.js";
import { TaskDelayService } from "./taskDelay.service.js";

const taskDelayService = new TaskDelayService();
const taskDelayController= new TaskDelayController();

export { taskDelayService, taskDelayController };