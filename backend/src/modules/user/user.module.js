import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

const userService = new UserService();
const userController= new UserController();

export { userService, userController };