
import { generateTokenAndSetCookie } from "../../common/utils/generateTokenAndSetCookie.js";
import { verifyPassword } from "../../common/utils/handleBcrypt.js";
import { UserService } from "../user/user.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
	
	const userServices = new UserService();

  try {
    if (!email || !password) {
      throw new Error('Por favor, complete todos los campos.')
    }
		
    const user = await userServices.getUserByUsername(email);
    if (user.length <= 0) {
			return res.status(400).json({ success: false, message: "Correo o contraseña incorrecta" });
		}
    
		const isPasswordValid = await verifyPassword(password, user[0].password);

    if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Correo o contraseña incorrecta" });
		}
    generateTokenAndSetCookie(res, user[0].userId)

    
    res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: user[0]
		});

  } catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
}

export const logout = async (req, res) => {
  res.clearCookie(
		"token_access", 
		{ 
			httpOnly: true, 
			secure: true,
			sameSite: 'none',
			path: '/' 
		}
	);
	res.status(200).json({ success: true, message: "Signout success" });
}

export const checkAuth = async (req, res) => {
	try {
		const userServices = new UserService();

    const user = await userServices.getUserById(req.userId)
		// console.log("ID checkauth: ", req.userId)
		if (user.length <= 0) {
			return res.status(400).json({ success: false, message: "Usuario no encontrado" });
		}

		res.status(200).json({ success: true, user: user[0] });
	} catch (error) {
		console.log("Error in checkAuth: ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

