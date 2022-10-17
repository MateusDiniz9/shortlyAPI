import express from "express";
import { signIn, signUp, usersInfos } from "../controllers/usersController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users/me", authMiddleware, usersInfos);

export default router;
