import { HTTPSTATUS } from "../../config/http.config.js";
import { UserService } from "./user.service.js";

export class UserController {

  async getPaginatedUsers(req, res) {
    try {

      let userService = new UserService();

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 12;
      const search = (req.query.search) || '';

      const offset = (page - 1) * limit;
      const users = await userService.getPaginatedUsers( limit, offset, search);
      const total = await userService.getTotalPageUsers( search);

      return res.status(HTTPSTATUS.OK).json({
        message: "Users successfully obtained",
        page,
        limit,
        total, 
        users: users
      });
    } catch (error) {
      console.log(error)
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener los usuarios", error 
      });
    }
  }

  async getUserById(req, res) {
    try {
      let userService = new UserService();
      const { userId } = req.params;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(HTTPSTATUS.NOT_FOUND).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      return res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        data: user 
      });

    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener el usuario", error 
      });
    }
  }

  async createUser(req, res) {
    try {
      let userService = new UserService();
      const { userData } = req.body;
      
      await userService.createUser(userData);
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Usuario creado exitosamente" 
      });
    } catch (error) {
      const statusCode = error.statusCode || HTTPSTATUS.INTERNAL_SERVER_ERROR; 
      res.status(statusCode).json({ 
        success: false,
        message: "Error al crear el usuario", error 
      });
    }
  }

  async updateUser(req, res) {
    try {
      let userService = new UserService();
      const { userId } = req.params;
      const { userData } = req.body;
      
      await userService.updateUser( userId, userData );
      
      res.status(HTTPSTATUS.OK).json({ 
        success: true, 
        message: "Usuario actualizado exitosamente" 
      });

    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al actualizar el usuario", error 
      });
    }
  }

}
