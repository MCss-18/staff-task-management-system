import { Router } from 'express'
import { 
  login,
  logout,
  checkAuth
 } from './auth.controller.js'
import { verifyToken } from '../../middlewares/verifyToken.js';

const authRouter = Router();

authRouter.get("/check-auth", verifyToken, checkAuth);

authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter