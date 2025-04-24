import bcrypt from 'bcryptjs';

export const generateHashedPassword = async (password: string, saltRound: number) => {
  return await bcrypt.hash(password, saltRound);
};

