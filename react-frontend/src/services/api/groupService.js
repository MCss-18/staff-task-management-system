import api from './axios/axiosInstance.js'

class GroupService {

  groupListPag = (page=1, search="") => api.get(`/api/v1/group?page=${page}&limit=12&search=${search}`)

  groupListPagByLeader = (leadUserId, page=1, search="") => api.get(`/api/v1/group/by-lead/${leadUserId}?page=${page}&limit=12&search=${search}`)

  createGroup = (groupData) => api.post(`/api/v1/group`, {groupData: groupData})
  
  updateGroup = (groupId, groupData) => api.put(`/api/v1/group/${groupId}`, {groupData: groupData})

}

const groupService = new GroupService();

export default groupService