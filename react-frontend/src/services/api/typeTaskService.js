import api from './axios/axiosInstance.js'

class TypeTaskService {

  typeTaskList  = () => api.get(`/api/v1/type-task/all`)
  
}

const typeTaskService = new TypeTaskService();
export default typeTaskService;