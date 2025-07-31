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

    /* Prevent Swiping Back on a User Who Has Already Sent a "PENDING" Request */
    // IMPORTANT: composite key ==> swipedUserId_swiperUserId
    const isSwipeExistsBySwipedUser = await MatchingRepository.findSwipe(data.swiper_user_id, data.swiped_user_id);
    if(isSwipeExistsBySwipedUser && isSwipeExistsBySwipedUser?.status == 'PENDING'){
      throw new ServiceError(409, "CANNOT_SWIPE", "Cannot swipe on this user; they have already sent you a pending request. Please respond via your pending requests list.")
    }


    /* Checking: is Swiper already made a request to Swiped User.. */
    // AGAIN IMPORTANT NOTE: composite key ==> swipedUserId_swiperUserId
    const isSwipeExists = await MatchingRepository.findSwipe(data.swiped_user_id, data.swiper_user_id);

    if(isSwipeExists){
      throw new ServiceError(409,"ALREADY_SWIPE_RECORDED","You have already send a request to this user")
    } else{
      const newSatus = data.action === 'RIGHT' ? 'PENDING' : 'IGNORED';
      await MatchingRepository.createSwipe({
        swiped_user_id: data.swiped_user_id,
        swiper_user_id:data.swiped_user_id,
        action:data.action,
        status:newSatus
      });

      /* 
      if(data.action === 'RIGHT'){
        FUTURE: Send Notification...
      }
      */
    }

    return { MESSAGE: "SWIPE_RECORDED_SUCCESSFULLY." };
    
  } catch (error) {
    throw new ServiceError(500,"INTERNAL_SERVICE_ERROR","something went wrong")
  }
}