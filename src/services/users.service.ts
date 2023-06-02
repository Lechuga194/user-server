import db from '../configs/db.config';
import tables from '../constants/tables.constants';
import User from '../types/user.type';
import hashString from '../utils/hash.util';
import {
  validateEmail,
  validateNames,
  validatePassword
} from '../utils/validation.util';

//TODO ALLOW ACCESS ONLY IF LOGGED
export async function getAllUsers() {
  return db
    .select()
    .from(tables.users)
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
}

export async function getUser(id: string) {
  return db
    .select()
    .from(tables.users)
    .where({ id })
    .then((data) => data)
    .catch((err) => {
      throw err;
    });
}

export async function saveUser(user: User) {
  const isNamesValid = validateNames(user.name, user.surname, user.username);
  const isEmailValid = validateEmail(user.email);
  const isPasswordValid = validatePassword(user.password);

  if (!isNamesValid || !isEmailValid || !isPasswordValid) {
    throw new Error('Invalid data');
  }

  //We hash the user original password
  user.password = hashString(user.password);

  return db
    .transaction(async (trx) => {
      return await trx(tables.users)
        .returning('*')
        .insert(user)
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((user) => user[0])
    .catch((err) => {
      throw err;
    });
}

export async function removeUser(id: string) {
  return db
    .transaction(async (trx) => {
      return await trx(tables.users)
        .returning('*')
        .where({ id })
        .del()
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((user) => user[0])
    .catch((err) => {
      throw err;
    });
}

export async function updateUser(user: User) {
  const id = user.id;
  const isNamesValid = validateNames(user.name, user.surname, user.username);
  const isEmailValid = validateEmail(user.email);

  if (!isNamesValid || !isEmailValid) {
    throw new Error('Invalid data');
  }

  return db
    .transaction(async (trx) => {
      return await trx(tables.users)
        .returning('*')
        .where({ id })
        .update(user)
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then((user) => user[0])
    .catch((err) => {
      throw err;
    });
}

export default {
  getAllUsers,
  getUser,
  saveUser,
  removeUser,
  updateUser
};
