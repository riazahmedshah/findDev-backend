import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { ServiceError } from "../utils/ServiceError";
import { MatchingRepository } from "../repositories/MatchingRepository";

export async function rejectConnectionResquest(current_user_id:string, swiper_user_id:string){
  try {
    const isSwiperExists = await UserRepository.getUserById(swiper_user_id);
    if(!isSwiperExists) {
      throw new ServiceError(
        404,
        "SWIPER_NOT_FOUND",
        `User does not exist with id:${swiper_user_id} or user might deleted their account`
      )
    }

    const swipeRecord = await MatchingRepository.findSwipe(current_user_id,swiper_user_id);
    if(!swipeRecord || swipeRecord.action !== 'RIGHT' || swipeRecord.status !== 'PENDING'){
      throw new ServiceError(404,"INVALID_REQUEST","Invalid or already processed request.")
    }

    await MatchingRepository.updateSwipe({
      swiped_user_id:current_user_id,
      swiper_user_id:swiper_user_id,
      status:'REJECTED'
    });

    return { message: "Request rejected successfully." };
  } catch (error) {
    if(error instanceof ServiceError) throw error;
    throw new ServiceError(500,"INTERNAL_SERVICE_ERROR","An unexpected error occurred during rejection.")
  }
}