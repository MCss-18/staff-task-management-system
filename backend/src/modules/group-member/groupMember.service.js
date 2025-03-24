import { pool } from "../../database/database.js";
import { GroupMemberModel } from "../../database/models/groupMember.model.js";


export class GroupMemberService {

  constructor() {
    this.groupMemberModel = new GroupMemberModel();
  }

  async getPaginatedMembersByGroupId(groupId, limit, offset, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupMemberModel.getPaginatedMembersByGroupId(connection, groupId, limit, offset, search);
    } catch (error) {
      console.error("Error SV - getPaginatedMembersByGroupId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getTotalPageMembersByGroupId(groupId, search) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupMemberModel.getTotalPageMembersByGroupId(connection, groupId, search);
    } catch (error) {
      console.error("Error SV - getTotalPageMembersByGroupId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getMembersByGroupId(groupId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupMemberModel.getMembersByGroupId(connection, groupId);
    } catch (error) {
      console.error("Error SV - getMembersByGroupId: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getAvailableMembers(groupId) {
    let connection;
    try {
      connection = await pool.getConnection();
      return await this.groupMemberModel.getAvailableMembers(connection, groupId);
    } catch (error) {
      console.error("Error SV - getAvailableMembers: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }


  async createGroupMember(groupMemberData) {
    let connection;
    try {
      connection = await pool.getConnection();
      await connection.beginTransaction(); 
  
      const { groupId, members } = groupMemberData;
  
      await Promise.all(members.map(({ staffId }) => 
        this.groupMemberModel.createGroupMember(connection, groupId, staffId)
      ));
  
      await connection.commit();
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.log("Error SV - createGroupMember: ", error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  

  async updateGroupMember(groupStaffId, groupMemberData) {
    let connection;
    try {
      connection = await pool.getConnection();

      return await this.groupMemberModel.updateGroupMember(connection, groupStaffId, groupMemberData);
    } catch (error) {
      console.error("Error SV - updateGroupMember: ", error);
      throw error;
    } finally {
      connection?.release();
    }
  }
}