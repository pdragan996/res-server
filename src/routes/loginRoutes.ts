import { NextFunction, Request, Response, Router } from 'express';
import { APP_ERROR_MESSAGES, USER_ERROR_MESSAGES } from '../error-handling/error.messages';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';


const router = Router();
const userRepository = new UserRepository();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body;

    const user = await userRepository.getByEmail(email);

    if (!user) {
      return res.status(404).send(USER_ERROR_MESSAGES.NOT_EXISTS);
    }

    bcrypt.compare(password, user.password).then( (result) => {
      if (result) {
        return res.json(user)
      } else {
        return res.status(401).send(USER_ERROR_MESSAGES.WRONG_PASSWORD)
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(APP_ERROR_MESSAGES.SERVER_ERROR)
  }
})

export default router;