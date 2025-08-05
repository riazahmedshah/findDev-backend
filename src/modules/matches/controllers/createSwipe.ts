import { Request, Response } from "express";
import { createSwipeSchema } from "../schemas/schema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { createSwipeService } from "../services";

export const swipe = async (req:Request, res:Response) => {
  const swiperUserId = req.userId;

  const {success, data, error} = createSwipeSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const swipe = await createSwipeService({
      ...data, swiper_user_id: swiperUserId,
    })

    return ResponseHandler.created(res,swipe)
  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}