import express from "express";
import { showRanking } from "../controllers/rankingController.js";

const router = express.Router();

router.get("/ranking", showRanking);

export default router;
