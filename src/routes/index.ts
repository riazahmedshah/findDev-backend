import { authRoutes } from "@/modules/auth/routes";
import { profileRoutes } from "@/modules/user/routes";
import express from "express"

export const routes = express.Router();

routes.use('/auth', authRoutes)
routes.use('/profile', profileRoutes)