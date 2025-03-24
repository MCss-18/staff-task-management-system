import { Router } from "express";
import { rolController } from "./rol.module.js";

const rolRoutes = Router();

rolRoutes.get("/all", rolController.getRoles);

export default rolRoutes;