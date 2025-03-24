import { HTTPSTATUS } from "../../config/http.config.js";
import { RolService } from "./rol.service.js";

export class RolController {

  async getRoles(req, res) {
    try {
      let rolService = new RolService();
      const roles = await rolService.getRoles();

      return res.status(HTTPSTATUS.OK).json({
        message: "Roles successfully obtained",
        roles: roles
      });
    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los roles", error 
      });
    }
  }

}