import { CategoryDelayController } from "./categoryDelay.controller.js";
import { CategoryDelayService } from "./categoryDelay.service.js";

const categoryDelayService = new CategoryDelayService();
const categoryDelayController= new CategoryDelayController();

export { categoryDelayService, categoryDelayController };