import express from "express";
import { chat } from "../controllers/chatController.js";

const router = express.Router();

router.get("/chat", chat);

export default router;
