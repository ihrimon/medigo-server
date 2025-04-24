import bcrypt from 'bcryptjs';

export const checkPassword = async (newPassword: string, oldPassword: string) => {
  return await bcrypt.compare(newPassword, oldPassword);
};

