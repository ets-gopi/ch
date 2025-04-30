import express from 'express';
import { UserAccountController } from '../controllers';

const router = express.Router();
// create an new instance on usercontroller.
const UserAccountControllerInstance = new UserAccountController();

// create a new user if not exists.
router.post('/register', UserAccountControllerInstance.register);

export default router;
