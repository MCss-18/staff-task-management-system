import { HTTPSTATUS } from "../../config/http.config.js";
import { TypeTaskService } from "./typeTask.service.js";

export class TypeTaskController {

  async getTypeTasks(req, res) {
    try {
      let typeTaskService = new TypeTaskService();
      const typeTasks = await typeTaskService.getTypeTasks();

      return res.status(HTTPSTATUS.OK).json({
        message: "Type tasks successfully obtained",
        typeTasks: typeTasks
      });
    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los tipos de tareas", error 
      });
    }
  }

}