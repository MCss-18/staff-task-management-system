import api from './axios/axiosInstance.js'

class DelayTaskService {

  delayTaskList  = (taskId) => api.get(`/api/v1/task-delay/all-by-task/${taskId}`)

  createTaskDelayStart = (taskDelayData) => api.post(`/api/v1/task-delay`, { taskDelayData: taskDelayData })    
  deleteTaskDelay = (taskId) => api.delete(`/api/v1/task-delay/${taskId}`)  
}

const delayTaskService = new DelayTaskService();
export default delayTaskService;