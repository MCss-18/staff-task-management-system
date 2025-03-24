import { RolController } from "./rol.controller.js";
import { RolService } from "./rol.service.js";

const rolService = new RolService();
const rolController= new RolController();

export { rolService, rolController };