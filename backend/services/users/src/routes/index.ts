const express = require("express");
const router = express.Router();
import userRoutes from "./user.routes";

const defaultRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
