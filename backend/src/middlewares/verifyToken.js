import jwt from 'jsonwebtoken';
import { config } from '../config/app.config.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token_access;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, config.JWT.SECRET);
    // console.log("decoded: ", decoded)
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
}