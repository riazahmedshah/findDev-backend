import { authRoutes } from "@/modules/auth/routes";
import { swipeRoutes } from "@/modules/matches/routes";
import { profileRoutes } from "@/modules/user/routes";
import express from "express"

export const routes = express.Router();

routes.use('/auth', authRoutes)
routes.use('/profile', profileRoutes)
routes.use('/request', swipeRoutes)