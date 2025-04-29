import express from 'express';
import { AuthServices } from '../services/auth.services';

const router = express.Router();

// create a instance for auth services
const authServicesInstance = new AuthServices();

router.post('/register', authServicesInstance.proxyRegister);
router.post('/login', authServicesInstance.proxyLogin);

export default router;
