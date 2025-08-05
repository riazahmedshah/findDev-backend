import express from "express"

import { authMiddleWare } from "../auth/middleware/authMiddleware";
import { swipe, getPendindSwipes } from "./controllers";


export const swipeRoutes = express.Router();

swipeRoutes.post('/send', authMiddleWare, swipe);
swipeRoutes.get('/pending', authMiddleWare, getPendindSwipes);