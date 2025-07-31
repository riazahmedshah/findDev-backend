import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { createSwipeDTO } from "../dto/swipe.dto";
import { ServiceError } from "../utils/ServiceError";
import { MatchingRepository } from "../repositories/MatchingRepository";

export const SwipeService = async(data:createSwipeDTO) => {
  try {
    if(data.swiped_user_id === data.swiper_user_id){
      throw new ServiceError(403,"SELF_SWIPED_IS_NOT_ALLOWED")
    }

    const isUserExistToSwipe = await UserRepository.getUserById(data.swiped_user_id);
    if(!isUserExistToSwipe){
      throw new ServiceError(404,"USER_NOT_FOUND", `User does not exists with id: ${data.swiped_user_id}`)
    }
    const isSwipeExists = await MatchingRepository.findSwipe(data.swiped_user_id, data.swiper_user_id);
    
    
  } catch (error) {
    
  }
}