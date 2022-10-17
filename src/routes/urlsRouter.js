import express from "express";
import {
  shortenUrl,
  urlById,
  openShortUrl,
  deleteUrlById,
} from "../controllers/urlsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/urls/shorten", authMiddleware, shortenUrl);
router.get("/urls/:id", urlById);
router.get("/urls/open/:shortUrl", openShortUrl);
router.delete("/urls/:id", authMiddleware, deleteUrlById);
export default router;
