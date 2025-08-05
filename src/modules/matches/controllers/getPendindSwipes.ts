import { ResponseHandler } from "@/utils/ResponseHandler";
import { Request, Response } from "express";
import { pendingSwipesService } from "../services";

export const getPendindSwipes = async (req:Request, res:Response) => {
  const userId = req.userId;
  try {
    const pendingProfiles = await pendingSwipesService(userId)

    return ResponseHandler.json(res,pendingProfiles);
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}