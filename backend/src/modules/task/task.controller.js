import { HTTPSTATUS } from "../../config/http.config.js";
import { TaskService } from "./task.service.js";

export class TaskController {

  // constructor() {
    // this.taskService = new TaskService();
  // }

  async getPaginatedTaskByGroupId(req, res) {
    try {
      let taskService = new TaskService();
      const { groupId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const tasks = await taskService.getPaginatedTaskByGroupId( groupId, limit, offset, search);
      const total = await taskService.getTotalPageTaskByGroupId( groupId, search);

      return res.status(HTTPSTATUS.OK).json({
        message: "Tasks successfully obtained",
        page,
        limit,
        total, 
        tasks: tasks
      });
    } catch (error) {
      console.error("Error CTRL - getPaginatedTaskByGroupId: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las tareas", error 
      });
    }
  }

  async getPaginatedTaskByGroupIdAndUserTechnicianId(req, res) {
    try {
      let taskService = new TaskService();
      const { groupId, userTechnicianId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const tasks = await taskService.getPaginatedTaskByGroupIdAndUserTechnicianId( groupId, userTechnicianId, limit, offset, search);
      const total = await taskService.getTotalPageTaskByGroupIdAndUserTechnicianId( groupId, userTechnicianId, search);

      console.log("Obteniendo tareas para:", groupId, userTechnicianId);

      return res.status(HTTPSTATUS.OK).json({
        message: "Tasks successfully obtained",
        page,
        limit,
        total, 
        tasks: tasks
      });
    } catch (error) {
      console.error("Error CTRL - getPaginatedTaskByGroupIdAndUserTechnicianId: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las tareas", error 
      });
    }
  }

  async createTask(req, res) {
    try {
      let taskService = new TaskService();
      const { taskData } = req.body;
      
      await taskService.createTask(taskData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea creado exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - createTask: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al crear la tarea", error 
      });
    }
  }

  async updateTask(req, res) {
    try {
      let taskService = new TaskService();
      const { taskId } = req.params;
      const { taskData } = req.body;
      
      await taskService.updateTask(taskId, taskData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea actualizada exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - updateTask: ", error);

      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar la tarea", error 
      });
    }
  }

  async deleteTask(req, res) {
    try {
      let taskService = new TaskService();
      const { taskId } = req.params;
      await taskService.deleteTask(taskId);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea eliminado exitosamente" 
      });
    } catch (error) {      
      console.error("Error CTRL - deleteTask: ", error);

      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al eliminar la tarea", error 
      });
    }
  }

  async updateStartDateTask(req, res) {
    try {
      let taskService = new TaskService();
      const { taskId } = req.params;
      
      await taskService.updateStartDateTask(taskId);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Fecha/hora inicio actualizada exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - updateStartDateTask: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar la Fecha/hora inicio", error 
      });
    }
  }

  async updateEndDateTask(req, res) {
    try {
      let taskService = new TaskService();
      const { taskId } = req.params;
      
      await taskService.updateEndDateTask(taskId);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Fecha/hora fin actualizado exitosamente" 
      });
    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar la Fecha/hora fin", error 
      });
    }
  }
}