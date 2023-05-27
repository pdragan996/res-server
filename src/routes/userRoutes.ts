import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import { APP_ERROR_MESSAGES, USER_ERROR_MESSAGES } from '../error-handling/error.messages';
import { saltRounds, User, UserModel } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

const router = Router();
const userRepository = new UserRepository();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userRepository.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(APP_ERROR_MESSAGES.SERVER_ERROR);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password, isAdmin, isSuperAdmin} = req.body;

    const matchUser = await userRepository.getByEmail(email);

    if (!!matchUser) {
      return res.status(522).send(USER_ERROR_MESSAGES.USER_EXISTS);
    }

    bcrypt.hash(password, saltRounds)
    .then((hash) => {
      const user: User = new UserModel(
        {
          name,
          email,
          password: hash,
          isAdmin,
          isSuperAdmin
        });
      const newUser = userRepository.create(user)
      .then((user: User) => res.json(user))
      .catch(err => {
        console.log(err);
        return res.status(500).send(USER_ERROR_MESSAGES.CREATE_FAILED);
      });
    }).catch(err => {
      res.status(522).send(USER_ERROR_MESSAGES.CREATE_HASH);
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(APP_ERROR_MESSAGES.SERVER_ERROR);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const {id} = req.params;
    const updatedUser = await userRepository.update(id, user);
    if (!updatedUser) {
      return res.status(404).send(USER_ERROR_MESSAGES.NOT_EXISTS);
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send(APP_ERROR_MESSAGES.SERVER_ERROR);
  }
});

export default router;
