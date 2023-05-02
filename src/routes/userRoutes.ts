import { Router, Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';

const router = Router();
const userRepository = new UserRepository();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.getAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await userRepository.create(user);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const { id } = req.params;
    const updatedUser = await userRepository.update(id, user);
    if (!updatedUser) {
      return res.status(404).send('User with id not found');
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error');
  }
})

export default router;
