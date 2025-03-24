import api from './axios/axiosInstance.js'

class GroupMemberService {

  membersListPagByGroup = (groupId, page=1, search="") => api.get(`/api/v1/group-members/by-group/${groupId}?page=${page}&limit=12&search=${search}`)

  membersByGroupId = (groupId) => api.get(`/api/v1/group-members/all-by-group/${groupId}`)

  availableMembers = (groupId) => api.get(`/api/v1/group-members/available-members/${groupId}`)
  
  createGroupMembers = (groupMemberData) => api.post(`/api/v1/group-members`, {groupMemberData: groupMemberData})
  
  updateGroup = (groupId, groupData) => api.put(`/api/v1/group-members/${groupId}`, {groupMemberData: groupData})

}

const groupMemberService = new GroupMemberService();

export default groupMemberService