import { Router } from "express";
import { categoryDelayController } from "./categoryDelay.module.js";

const categoryDelayRoutes = Router();

categoryDelayRoutes.get("/all", categoryDelayController.getCategoryDelay);

export default categoryDelayRoutes;