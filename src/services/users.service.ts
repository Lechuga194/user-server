import db from '../configs/db.config';
import tables from '../constants/tables.constants';
import User from '../types/user.type';

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

//TODO ADD EMAIL VERIFICATION AND PASSWORD HASH
export async function saveUser(user: User) {
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

//TODO ADD EMAIL VERIFICATION
export async function updateUser(user: User) {
  const id = user.id;
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
