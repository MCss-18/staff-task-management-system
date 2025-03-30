import { pool } from "../../database/database.js";
import { TaskModel } from "../../database/models/task.model.js";
import { TaskDelayModel } from "../../database/models/taskDelay.model.js";


export class TaskService {

  constructor() {
    this.taskModel = new TaskModel();
    this.taskDelayModel = new TaskDelayModel();
  }

  async getPaginatedTaskByGroupId(groupId, limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskModel.getPaginatedTaskByGroupId(connection, groupId, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedTaskByGroupId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageTaskByGroupId(groupId, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskModel.getTotalPageTaskByGroupId(connection, groupId, search);
    } catch (error) {
      console.error("Error SV - getTotalPageTaskByGroupId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getPaginatedTaskByGroupIdAndUserTechnicianId(groupId, staffId, limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskModel.getPaginatedTaskByGroupIdAndUserTechnicianId(connection, groupId, staffId, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedTaskByGroupIdAndUserTechnicianId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageTaskByGroupIdAndUserTechnicianId(groupId, staffId, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskModel.getTotalPageTaskByGroupIdAndUserTechnicianId(connection, groupId, staffId, search);
    } catch (error) {
      console.error("Error SV - getTotalPageTaskByGroupIdAndUserTechnicianId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async createTask(taskData) {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log("taskData: ", taskData)
      for (const task of taskData) {
        const { user, task: taskInfo } = task;
        await this.taskModel.createTask(connection, {
          groupStaffId: user.groupStaffId,
          typeTaskId: taskInfo.typeTaskId
        });
      }
      
    } catch (error) {
      console.error("Error SV - createTask: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async updateTask(taskId, taskData) {
    let connection;
    try {
      connection = await pool.getConnection();

      return await this.taskModel.updateTask(connection, taskId, taskData);
    } catch (error) {
      console.error("Error SV - updateTask: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  async deleteTask(taskId) {
    let connection;
    try {
      connection = await pool.getConnection();

      await this.taskDelayModel.deleteTaskDelay(connection, taskId);

      return await this.taskModel.deleteTask(connection, taskId);
    } catch (error) {
      console.error("Error SV - deleteTask: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  async updateStartDateTask(taskId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskModel.updateStartDateTask(connection, taskId);
    } catch (error) {
      console.error("Error SV - updateStartDateTask: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  async updateEndDateTask(taskId) {
    let connection;
    try {
      connection = await pool.getConnection();

      return await this.taskModel.updateEndDateTask(connection, taskId);
    } catch (error) {
      console.error("Error SV - updateEndDateTask: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

}