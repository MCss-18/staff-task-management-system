import { pool } from "../../database/database.js";
import { RolModel } from "../../database/models/rol.model.js";

export class RolService {

  constructor() {
    this.rolModel = new RolModel();
  }

  async getRoles() {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.rolModel.getRoles(connection);
    } catch (error) {
      console.error("Error SV - getRoles: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

}