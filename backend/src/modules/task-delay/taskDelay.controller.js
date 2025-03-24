import { HTTPSTATUS } from "../../config/http.config.js";
import { TaskDelayService } from "./taskDelay.service.js";

export class TaskDelayController {

  async getTaskDelayByTaskId(req, res) {
    try {
      let taskDelayService = new TaskDelayService();
      const { taskId } = req.params;

      const tasksDelay = await taskDelayService.getTaskDelayByTaskId( taskId);


      return res.status(HTTPSTATUS.OK).json({
        message: "Tasks successfully obtained",
        tasksDelay: tasksDelay ?? []
      });
    } catch (error) {
      console.error("Error CTRL - getTaskDelayByTaskId: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las tareas", error 
      });
    }
  }

  async createTaskDelay(req, res) {
    try {
      let taskDelayService = new TaskDelayService();
      const { taskDelayData } = req.body;
      
      await taskDelayService.createTaskDelay(taskDelayData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea creado exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - createTaskDelay: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al crear la tarea", error 
      });
    }
  }


  async deleteTaskDelay(req, res) {
    try {
      let taskDelayService = new TaskDelayService();
      const { taskDelayId } = req.params;
      await taskDelayService.deleteTaskDelay(taskDelayId);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea eliminado exitosamente" 
      });
    } catch (error) {      
      console.error("Error CTRL - deleteTaskDelay: ", error);

      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al eliminar la tarea", error 
      });
    }
  }

}