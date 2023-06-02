import bcrypt from 'bcrypt';

export const hashString = (str: string | undefined, rounds = 10) => {
  if (!str) throw new Error("The string is empty, can't be hashed");
  return bcrypt.hashSync(str, rounds);
};

export const compareHash = (str: string, hash: string) => {
  if (!str) throw new Error("The string is empty, can't compare");
  return bcrypt.compareSync(str, hash);
};

export default { hashString, compareHash };
