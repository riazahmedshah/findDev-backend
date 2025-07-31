import express from "express"
import { swipe } from "./controllers/createSwipe";
import { authMiddleWare } from "../auth/middleware/authMiddleware";

export const swipeRoutes = express.Router();

swipeRoutes.post('/send', authMiddleWare, swipe);