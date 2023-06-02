import bcrypt from 'bcrypt';

export const hashString = (str: string | undefined, rounds = 10) => {
  if (!str) throw new Error("The string is empty, can't be hashed");
  return bcrypt.hashSync(str, rounds);
};

export default hashString;
