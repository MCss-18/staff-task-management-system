import { pool } from "../../database/database.js";
import { GroupModel } from "../../database/models/group.model.js";

export class GroupService {

  constructor(){
    this.groupModel = new GroupModel()
  }

  async getGroupsByMember(technicianUserId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getGroupsByMember(connection, technicianUserId);
    } catch (error) {
      console.error("Error SV - getGroupsByMember: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


  async getPaginatedGroups(limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getPaginatedGroups(connection, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedGroups: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageGroups(search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getTotalPageGroups(connection, search);
    } catch (error) {
      console.error("Error SV - getTotalPageGroups: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  
  async getPaginatedGroupsByLeadUserId(leadUserId, limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getPaginatedGroupsByLeadUserId(connection, leadUserId, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedGroupsByUserLead: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageGroupsByLeadUserId(leadUserId, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getTotalPageGroupsByLeadUserId(connection, leadUserId, search);
    } catch (error) {
      console.error("Error SV - getTotalPageGroupsByUserLead: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getGroupById(groupId, limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupModel.getGroupById(connection, groupId, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getGroupById: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async createGroup(groupData) {
    let connection;
    try {
      connection = await pool.getConnection();
      
      return await this.groupModel.createGroup(connection, groupData)

    } catch (error) {
      console.log("Error SV - createGroup: ", error)
      throw error
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async updateGroup(groupId, groupData) {
    let connection;
    try {
      connection = await pool.getConnection();

      return await this.groupModel.updateGroup(connection, groupId, groupData);
    } catch (error) {
      console.error("Error SV - updateGroup: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }

}