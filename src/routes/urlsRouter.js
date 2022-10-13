import express from "express";
import { shortenUrl, urlById } from "../controllers/urlsController.js";
const router = express.Router();

router.post("/urls/shorten", shortenUrl);
router.get("/urls/:id", urlById);

export default router;
