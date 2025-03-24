import { pool } from "../../database/database.js";
import { CategoryDelayModel } from "../../database/models/categoryDelay.model.js";

export class CategoryDelayService {

  constructor() {
    this.categoryDelayModel = new CategoryDelayModel();
  }

  async getCategoryDelay() {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.categoryDelayModel.getCategoryDelay(connection);
    } catch (error) {
      console.error("Error SV - getCategoryDelay: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

}