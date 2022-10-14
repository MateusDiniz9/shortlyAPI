import express from "express";
import {
  shortenUrl,
  urlById,
  openShortUrl,
  deleteUrlById,
} from "../controllers/urlsController.js";
const router = express.Router();

router.post("/urls/shorten", shortenUrl);
router.get("/urls/:id", urlById);
router.get("/urls/open/:shortUrl", openShortUrl);
router.delete("/urls/:id", deleteUrlById);
export default router;
