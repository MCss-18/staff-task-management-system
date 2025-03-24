import api from "./axios/axiosInstance"

class UserService {

  userListPaginated  = (page = 1, search = '') => api.get(`/api/v1/users?page=${page}&limit=12&search=${search}`)
  userList  = () => api.get(`/api/v1/users/?all=true`)
  // userById  = (userId) => api.get(`/api/v1/users`, userId )

  createUser = (userData) => api.post(`/api/v1/users`, { userData: userData })
  modifyUser = (userId, userData) => api.put(`/api/v1/users/${userId}`, { userData: userData })
  modifyPassUser = (userId) => api.put(`/api/v1/users/logout/${userId}`)
  
}

const userService = new UserService();
export default userService;