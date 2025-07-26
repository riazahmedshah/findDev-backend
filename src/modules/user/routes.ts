import express from "express"
import { create } from "./controllers/createProfile";
import { authMiddleWare } from "../auth/middleware/authMiddleware";
import { multerMiddleWare } from "@/config/multer";

export const profileRoutes = express.Router();

profileRoutes.post('/create',authMiddleWare, multerMiddleWare, create);