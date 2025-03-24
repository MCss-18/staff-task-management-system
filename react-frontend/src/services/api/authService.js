import api from './axiosInstance.js'

class AuthService {

  login  = (email, password) => api.post(`/api/auth/login`, {email, password} )
  logout = () => api.post(`/api/auth/logout`)
  checkAuth = () => api.get(`/api/auth/check-auth`)

}

const authService = new AuthService();
export default authService;