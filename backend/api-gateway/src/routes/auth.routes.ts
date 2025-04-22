import express from "express";
import { proxyLogin, proxySignup } from "../services/auth.services";

const router = express.Router();

router.post("/signup", proxySignup);
router.post("/login", proxyLogin);

export default router;
