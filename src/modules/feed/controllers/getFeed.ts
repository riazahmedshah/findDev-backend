import { Request, Response } from "express";
import { getFeed } from "../repositories/FeedRepository";
import { ResponseHandler } from "@/utils/ResponseHandler";

export const feed = async (req:Request, res:Response) => {
  const feed = await getFeed();
  return ResponseHandler.json(res,feed);
}