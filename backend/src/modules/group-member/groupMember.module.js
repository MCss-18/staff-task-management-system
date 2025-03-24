import { GroupMemberController } from "./groupMember.controller.js";
import { GroupMemberService } from "./groupMember.service.js";

const groupMemberService = new GroupMemberService();
const groupMemberController= new GroupMemberController();

export { groupMemberService, groupMemberController };