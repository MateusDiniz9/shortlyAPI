import express from "express";
import { signIn, signUp, usersInfos } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users/me", usersInfos);

export default router;
