import api from "./axios/axiosInstance";

class CategoryDelayService {

  getCategoryDelay = () => api.get(`api/v1/category-delay/all`)
  
}

const categoryDelayService = new CategoryDelayService();
export default categoryDelayService;