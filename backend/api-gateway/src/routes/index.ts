const express = require('express');
const router = express.Router();
import authRoutes from './auth.routes';

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes
  }
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
