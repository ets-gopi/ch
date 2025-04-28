import express from 'express';
import UserAuthAccountController from '../controllers/auth.controller';
const router = express.Router();
// create an new instance on usercontroller.
const userAuthAccountControllerInstance = new UserAuthAccountController();

// create a new user if not exists.
router.post('/register', userAuthAccountControllerInstance.register);

export default router;
