import { ResponseHandler } from "@/utils/ResponseHandler";
import { Request, Response } from "express";
import { MatchingRepository } from "../repositories/MatchingRepository";

export const getPendindSwipes = async (req:Request, res:Response) => {
  const userId = req.userId;
  try {
    const requests = await MatchingRepository.findPendingSwipes(userId);
    if(!requests){
      return ResponseHandler.notFound(res,"NO_PENDING_REQUESTS_FOUND")
    }
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}