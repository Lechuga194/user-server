import emailValidator from 'email-validator';
import PasswordValidator from 'password-validator';

/**
 * This function verifies if the password has no empty spaces and if is at least of 8 chars and a max of 100 chars long
 * At the return we use 'as boolean' since the object can return an array with different info (not in our case)
 * @param password the password we want to check
 * @return boolean true if the passwords meets the requirements, false otherwise
 */
export const validatePassword = (password: string | undefined): boolean => {
  if (!password) return false;
  const passwordSchema = new PasswordValidator();
  passwordSchema.is().min(8).is().max(100).has().not().spaces();
  return passwordSchema.validate(password) as boolean;
};

export const validateEmail = (email: string): boolean => {
  return emailValidator.validate(email);
};

export const validateNames = (
  name: string,
  surname: string,
  username: string
): boolean => {
  return name.length > 0 && surname.length > 0 && username.length > 0;
};
