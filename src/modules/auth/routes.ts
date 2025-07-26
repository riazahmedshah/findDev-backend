import express from "express"
import { signup } from "./controllers/signup.ts";
import { login } from "./controllers/login.ts";
import { authMiddleWare } from "./middleware/authMiddleware.ts";

export const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login',login);