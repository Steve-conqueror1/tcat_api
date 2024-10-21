import { Router } from "express";
import { signUp } from "../controllers/auth/signUp";
import { signIn } from "../controllers/auth/signIn";
import {logout} from "../controllers/auth/logout";
import {refreshToken} from "../controllers/auth";
import { requestNewPassword } from "../controllers/auth";
import { resetPassword } from "../controllers/auth";

const router = Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/request-password-reset", requestNewPassword)
router.post("/reset-password", resetPassword)
router.get("/logout", logout);
router.get("/refreshToken", refreshToken);

export default router;
