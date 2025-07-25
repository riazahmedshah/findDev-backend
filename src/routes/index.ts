import { authRoutes } from "@/modules/auth/routes";
import express from "express"

export const routes = express.Router();

routes.use('/auth', authRoutes)