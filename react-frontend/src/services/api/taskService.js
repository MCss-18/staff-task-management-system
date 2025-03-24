import api from './axios/axiosInstance.js'

class TaskService {

  taskListPagByGroup  = (groupId, page = 1, search = '') => api.get(`/api/v1/task/by-group/${groupId}?page=${page}&limit=12&search=${search}`)

  taskListPagByGroupAndUserTech  = (groupId, userId, page = 1, search = '') => api.get(`/api/v1/task/by-group-technician/${groupId}/${userId}?page=${page}&limit=12&search=${search}`)
  // taskById  = (clientId) => api.get(`/api/clients`, clientId )
  // createTask = (clientData) => api.post(`/api/clients`, { clientData: clientData })

  updateTaskStart = (taskId) => api.put(`/api/v1/task/start-date/${taskId}`)  
  updateTaskEnd = (taskId) => api.put(`/api/v1/task/end-date/${taskId}`) 
  
  
  // createTaskDelayStart = (taskId, taskDelayData) => api.put(`/api/v1/task/delay-start${taskId}`, { taskDelayData: taskDelayData })  
  // createTaskDelayEnd = (taskId, taskDelayData) => api.put(`/api/v1/task/delay-end${taskId}`, { taskDelayData: taskDelayData })  
}

const taskService = new TaskService();
export default taskService;