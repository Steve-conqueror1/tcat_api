import { verifyEmail } from "./../controllers/auth";
import { Router } from "express";

const router = Router();

router.get("/api/confirmation/:confirmationToken", verifyEmail);

export default router;
