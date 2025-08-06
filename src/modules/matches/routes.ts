import express from "express"

import { authMiddleWare } from "../auth/middleware/authMiddleware";
import { swipe, getPendindSwipes, createAndAccept, rejectRequest } from "./controllers";


export const swipeRoutes = express.Router();

swipeRoutes.get('/pending', authMiddleWare, getPendindSwipes);
swipeRoutes.post('/send', authMiddleWare, swipe);
swipeRoutes.post('/accept', authMiddleWare, createAndAccept);
swipeRoutes.post('/reject', authMiddleWare, rejectRequest);