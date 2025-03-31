import { HTTPSTATUS } from "../../config/http.config.js";
import { GroupService } from "./group.service.js";

export class GroupController {

  async getGroupsByMember(req, res) {
    try {
      const { technicianUserId } = req.params;
      let groupService = new GroupService();
      const groups = await groupService.getGroupsByMember(technicianUserId);
      return res.status(HTTPSTATUS.OK).json({
        message: "Groups successfully obtained",
        groups: groups
      });
    } catch (error) {
      console.log("Error CTRL - getGroupsByMember: ", error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los grupos", error 
      });
    }
  }

  async getPaginatedGroups(req, res) {
    try {
      let groupService = new GroupService();
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const groups = await groupService.getPaginatedGroups(limit, offset, search);
      const total = await groupService.getTotalPageGroups(search);

      return res.status(HTTPSTATUS.OK).json({
        message: "Group successfully obtained",
        page,
        limit,
        total, 
        groups: groups
      });
    } catch (error) {
      console.log("Error CTRL - getPaginatedGroups: ", error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los grupos", error 
      });
    }
  }
  
  async getPaginatedGroupsByLeadUserId(req, res) {
    try {
      const { leadUserId } = req.params;
      let groupService = new GroupService();
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const groups = await groupService.getPaginatedGroupsByLeadUserId(leadUserId, limit, offset, search);
      const total = await groupService.getTotalPageGroupsByLeadUserId(leadUserId, search);

      return res.status(HTTPSTATUS.OK).json({
        message: "Group successfully obtained",
        page,
        limit,
        total, 
        groups: groups
      });
    } catch (error) {
      console.log("Error CTRL - getPaginatedGroupsByLeadUserId: ", error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los grupos", error 
      });
    }
  }

  async createGroup(req, res) {
    try {
      let groupService = new GroupService();
      const { groupData } = req.body;
      
      if ( !groupData.nameGroup?.trim()) {
        return res.status(400).json({ error: "Todos los campos son obligatorios." });
      }

      await groupService.createGroup(groupData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Grupo creado exitosamente" 
      });
    } catch (error) {
      console.log("Error CTRL - createGroup: ", error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al crear el grupo", error 
      });
    }
  }

  async updateGroup(req, res) {
    try {
      const { groupId } = req.params;
      const { groupData } = req.body;
      let groupService = new GroupService();
      
      await groupService.updateGroup(groupId, groupData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Grupo actualizado exitosamente" 
      });
    } catch (error) {
      console.log("Error CTRL - updateGroup: ", error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar el grupo", error 
      });
    }
  }

}