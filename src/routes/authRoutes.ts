import { Router } from "express";
import { signUp } from "../controllers/auth/signUp";
import { signIn } from "../controllers/auth/signIn";

const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);

export default router;
