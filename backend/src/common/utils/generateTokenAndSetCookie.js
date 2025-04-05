import jwt from 'jsonwebtoken';
import { config } from '../../config/app.config.js';

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign(
    {
      userId
    }, 
    config.JWT.SECRET,
    { expiresIn: config.JWT.EXPIRES_IN } 
  );

  res.cookie('token_access', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production' || false,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  })

  return token;
}