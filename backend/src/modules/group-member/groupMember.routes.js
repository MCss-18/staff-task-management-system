import { Router } from "express";
import { groupMemberController } from "./groupMember.module.js";

const groupMemberRoutes = Router();

groupMemberRoutes.get("/by-group/:groupId", groupMemberController.getPaginatedMembersByGroupId);

groupMemberRoutes.get("/all-by-group/:groupId", groupMemberController.getMembersByGroupId);

// usuarios que no estan en un grupo X
groupMemberRoutes.get("/available-members/:groupId", groupMemberController.getAvailableMembers);

groupMemberRoutes.post("/", groupMemberController.createGroupMember);

export default groupMemberRoutes;