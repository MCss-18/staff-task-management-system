import { pool } from "../../database/database.js";
import { TaskDelayModel } from "../../database/models/taskDelay.model.js";


export class TaskDelayService {

  constructor() {
    this.taskDelayModel = new TaskDelayModel();
  }

  async getTaskDelayByTaskId(taskId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskDelayModel.getTaskDelayByTaskId(connection, taskId);
    } catch (error) {
      console.error("Error SV - getTaskDelayByTaskId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async createTaskDelay(taskDelayData) {
    let connection;
    try {
      connection = await pool.getConnection();
      
      return await this.taskDelayModel.createTaskDelay(connection, taskDelayData)

    } catch (error) {
      console.log("Error SV - createTaskDelay: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async deleteTaskDelay(taskDelayId) {
    let connection;
    try {
      connection = await pool.getConnection();

      return await this.taskDelayModel.deleteTask(connection, taskDelayId);
    } catch (error) {
      console.error("Error SV - deleteTaskDelay: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

  async getTaskDelayByGroupAndUser(groupStaffId){
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskDelayModel.getTaskDelayByGroupAndUser(connection, groupStaffId)

    } catch (error) {
      console.log("Error SV - getTaskDelayByGroupAndUser: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTaskDelayByGroup(groupId){
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.taskDelayModel.getTaskDelayByGroup(connection, groupId)

    } catch (error) {
      console.log("Error SV - getTaskDelayByGroup: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

}