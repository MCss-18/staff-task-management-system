import { pool } from "../../database/database.js";
import { TypeTaskModel } from "../../database/models/typeTask.model.js";

export class TypeTaskService {

  constructor() {
    this.typeTaskModel = new TypeTaskModel();
  }

  async getTypeTasks() {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.typeTaskModel.getTypeTasks(connection);
    } catch (error) {
      console.error("Error SV - getTypeTasks: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

}