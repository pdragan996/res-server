import { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createUser, getAllUsers, getUserById } from '../db/repositories/userRepo';
import { User, UserDocument } from '../db/models/user';

const router = Router();

router.use(bodyParser.json());
router.use(cors());

const userUrl = 'user/'

router.get(userUrl, async (request: Request, response: Response) => {
  const users = await getAllUsers();
  response.json(users)
})

router.post(userUrl, async (request: Request, response: Response) => {
  const {name, email} = request.body;
  // const user = new User({name, email});
  const user: UserDocument = new User({name, email});
  const createdUser = await createUser(user);
  response.json(createdUser);
})

export default router;