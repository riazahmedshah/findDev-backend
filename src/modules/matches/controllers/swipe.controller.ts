import { Request, Response } from "express";
import { createSwipeSchema } from "../schemas/schema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { SwipeService } from "../services/swipe.service";

export const swipe = async (req:Request, res:Response) => {
  const swiperUserId = req.userId;

  const {success, data, error} = createSwipeSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const swipe = await SwipeService({
      ...data, swiper_user_id: swiperUserId,
    })

    if(!swipe) return;
    return ResponseHandler.created(res,swipe)
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}