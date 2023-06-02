import { Request, Response } from 'express';
import usersService from '../services/users.service';
import User from '../types/user.type';

export async function getAllUsers(_req: Request, res: Response) {
  try {
    res.json(await usersService.getAllUsers());
  } catch (err) {
    console.error(`Error while getting the users`, err);
    res.status(400).send('A problem occurred while getting the users data');
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    res.json(await usersService.getUser(id));
  } catch (err) {
    console.error(`Error while getting the user`, err);
    res.status(400).send('A problem occurred while getting the user data');
  }
}

export async function saveUser(req: Request, res: Response) {
  try {
    const { name, surname, username, email, password } = req.body;
    const user: User = {
      name,
      surname,
      username,
      email,
      password
    };
    res.json(await usersService.saveUser(user));
  } catch (err) {
    console.error(`Error while saving the user`, err);
    res.status(400).send('A problem occurred while saving the user');
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    res.json(await usersService.removeUser(id));
  } catch (err) {
    console.error(`Error while removing the user`, err);
    res.status(400).send('A problem occurred while removing the user data');
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id, name, surname, username, email } = req.body;
    const user: User = {
      id,
      name,
      surname,
      username,
      email
    };
    res.json(await usersService.updateUser(user));
  } catch (err) {
    console.error(`Error while updating the user`, err);
    res.status(400).send('A problem occurred while updating the user');
  }
}

export default {
  getAllUsers,
  getUser,
  saveUser,
  removeUser,
  updateUser
};
