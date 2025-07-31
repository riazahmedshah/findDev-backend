import { Request, Response } from "express";
import { createSwipeSchema } from "../schemas/schema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { MatchingRepository } from "../repositories/MatchingRepository";

export const swipe = async (req:Request, res:Response) => {
  const swiperUserId = req.userId;

  const {success, data, error} = createSwipeSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const isSwipeExists = await MatchingRepository.findSwipe(swiperUserId, data.swipedUserId);
    if(isSwipeExists) return ResponseHandler.json(res,{MESSAGE:"SWIPE_REQUEST_ALREADY_EXISTS"},409);

    await MatchingRepository.createSwipe({
      swiper_user_id:swiperUserId,
      swiped_user_id:data.swipedUserId,
      action:data.action
    });

    return ResponseHandler.created(res,{MESSAGE:"REQUEST_SENT_SECCESSFULLY"})

  } catch (error) {
    return ResponseHandler.error(res,error);
  }
}