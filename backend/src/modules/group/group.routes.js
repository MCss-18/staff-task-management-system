import { Router } from "express";
import { groupController } from "./group.module.js";

const groupRoutes = Router();

groupRoutes.get("/", groupController.getPaginatedGroups);
groupRoutes.get("/by-lead/:leadUserId", groupController.getPaginatedGroupsByLeadUserId);

groupRoutes.post("/", groupController.createGroup);
groupRoutes.put("/:groupId", groupController.updateGroup);

export default groupRoutes;