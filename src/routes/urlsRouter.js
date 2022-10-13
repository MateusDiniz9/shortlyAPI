import express from "express";
import { shortenUrl } from "../controllers/urlsController.js";
const router = express.Router();

router.post("/urls/shorten", shortenUrl);

export default router;
