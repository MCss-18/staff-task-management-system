import bcrypt from "bcryptjs";

export const hashPassword = async(plainPassword) => {
  const saltRounds = 10;
  const handlePassword = await bcrypt.hash(plainPassword, saltRounds)
  return handlePassword;
}

export const verifyPassword = async (plainPassword, handlePassword) => {
  const match = await bcrypt.compare(plainPassword, handlePassword)
  return match;
}
