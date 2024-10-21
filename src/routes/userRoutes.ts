import { Router } from "express";
import {getUsers} from "../controllers/user/getUsers";
import {deleteUser} from "../controllers/user/deleteUser";
import { jwtAuthMiddleware } from "../middleware/JwtAuth";

const router = Router();

router.get("/users", jwtAuthMiddleware,  getUsers);
router.delete("/users/:userId", jwtAuthMiddleware,  deleteUser);

export default router;
