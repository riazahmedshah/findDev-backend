import express from "express"
import { swipe } from "./controllers/createSwipe";

export const swipeRoutes = express.Router();

swipeRoutes.post('/send', swipe);