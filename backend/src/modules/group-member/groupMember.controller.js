import { HTTPSTATUS } from "../../config/http.config.js";
import { GroupMemberService } from "./groupMember.service.js";

export class GroupMemberController {
  async getPaginatedMembersByGroupId(req, res) {
    try {
      let groupMemberService = new GroupMemberService();
      const { groupId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const members = await groupMemberService.getPaginatedMembersByGroupId( groupId, limit, offset, search);
      const total = await groupMemberService.getTotalPageMembersByGroupId( groupId, search);

      return res.status(HTTPSTATUS.OK).json({
        message: "Members successfully obtained",
        page,
        limit,
        total, 
        members: members
      });
    } catch (error) {
      console.error("Error CTRL - getPaginatedMembersByGroupId: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los miembros", error 
      });
    }
  }

  async getMembersByGroupId(req, res) {
    try {
      let groupMemberService = new GroupMemberService();
      const { groupId } = req.params;

      const members = await groupMemberService.getMembersByGroupId( groupId);
      return res.status(HTTPSTATUS.OK).json({
        message: "Members successfully obtained",
        members: members
      });
    } catch (error) {
      console.error("Error CTRL - getMembersByGroupId: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las miembros", error 
      });
    }
  }

  async getAvailableMembers(req, res) {
    try {
      let groupMemberService = new GroupMemberService();
      const { groupId } = req.params;

      const members = await groupMemberService.getAvailableMembers( groupId);
      console.log("members", members)
      return res.status(HTTPSTATUS.OK).json({
        message: "Members successfully obtained",
        members: members
      });
    } catch (error) {
      console.error("Error CTRL - getAvailableMembers: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las miembros", error 
      });
    }
  }

  async createGroupMember(req, res) {
    try {
      let groupMemberService = new GroupMemberService();
      const { groupMemberData } = req.body;
      
      await groupMemberService.createGroupMember(groupMemberData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Grupo miembros creado exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - createGroupMember: ", error);
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al crear grupo-miebros", error 
      });
    }
  }

  async updateGroupMember(req, res) {
    try {
      let groupMemberService = new GroupMemberService();
      const { groupStaffId } = req.params;
      const { groupMemberData } = req.body;
      
      await groupMemberService.updateGroupMember(groupStaffId, groupMemberData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Tarea actualizada exitosamente" 
      });
    } catch (error) {
      console.error("Error CTRL - updateGroupMember: ", error);

      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar grupo-miebros", error 
      });
    }
  }

}