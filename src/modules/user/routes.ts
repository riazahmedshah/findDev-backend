import express from "express"
import { multerMiddleWare } from "@/config/multer";
import { authMiddleWare } from "../auth/middleware/authMiddleware";
import { create, update } from "./controllers";

export const profileRoutes = express.Router();

profileRoutes.post('/create',authMiddleWare, multerMiddleWare, create);
profileRoutes.post('/update/:id',authMiddleWare, update);