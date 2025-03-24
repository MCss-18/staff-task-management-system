import api from "./axios/axiosInstance";

class RolService {

  rolesList = () => api.get(`api/v1/rol/all`)
  
}

const rolService = new RolService();
export default rolService;