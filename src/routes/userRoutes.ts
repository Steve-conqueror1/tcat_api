import { Router } from "express";
import {getUsers} from "../controllers/user/getUsers";
import {deleteUser} from "../controllers/user/deleteUser";

const router = Router();

router.get("/users", getUsers);
router.delete("/users/:userId", deleteUser);

export default router;
