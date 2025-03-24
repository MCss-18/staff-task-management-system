import { GroupController } from "./group.controller.js";
import { GroupService } from "./group.service.js";

const groupService = new GroupService();
const groupController= new GroupController();

export { groupService, groupController };