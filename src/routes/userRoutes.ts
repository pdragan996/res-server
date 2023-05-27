import bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
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
    //TODO Move message and status to shared file
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name, email, password, isAdmin, isSuperAdmin} = req.body;

    const matchUser = await userRepository.getByEmail(email);

    if (!!matchUser) {
      return res.status(522).send('User already exists');
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
        return res.status(500).send('Failed to create user');
      });
    }).catch(err => {
      res.status(522).send('Failed to create hash');
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const {id} = req.params;
    const updatedUser = await userRepository.update(id, user);
    if (!updatedUser) {
      return res.status(404).send('User with id not found');
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;
