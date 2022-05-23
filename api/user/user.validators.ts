import { User } from "./user.models"

export const validateEmail = async (email: string) => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`El email ${email} esta registrado`);
  }
};