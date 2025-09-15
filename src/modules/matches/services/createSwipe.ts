import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { createSwipeDTO } from "../dto/swipe.dto";
import { ServiceError } from "../utils/ServiceError";
import { MatchingRepository } from "../repositories/MatchingRepository";
import { Prisma } from "@/generated/prisma";

export async function createSwipeService(data: createSwipeDTO) {
  try {
    if (data.sender_user_id === data.sender_user_id) {
      throw new ServiceError(403, "SELF_SWIPE_IS_NOT_ALLOWED")
    }

    const isUserExistToSwipe = await UserRepository.getUserById(data.reciepent_user_id);
    if (!isUserExistToSwipe) {
      throw new ServiceError(404, "USER_NOT_FOUND", `User does not exists with id: ${data.reciepent_user_id}`)
    }

    /* Prevent Swiping Back on a User Who Has Already Sent a "PENDING" Request */
    // IMPORTANT: composite key ==> swiperUserId_swipedUserId
    const isSwipeExistsBySwipedUser = await MatchingRepository.findSwipe(
      data.reciepent_user_id,
      data.sender_user_id
    );

    if (isSwipeExistsBySwipedUser) {
      switch(isSwipeExistsBySwipedUser.status){
        case 'PENDING':
          throw new ServiceError(409, "PENDING_REQUEST_EXISTS", "This user already sent you a request. Please respond to it first.");
        
        case 'ACCEPTED':
          throw new ServiceError(409, "ALREADY_MATCHED", "You're already connected with this user.");
        
      }
    }

    /* Checking: is Swiper already made a request to Swiped User.. */
    // AGAIN IMPORTANT NOTE: composite key ==> swiperUserId_swipedUserId
    const isSwipeExists = await MatchingRepository.findSwipe(
      data.sender_user_id,
      data.reciepent_user_id
    );

    if (isSwipeExists) {
      switch (isSwipeExists.status) {
        case 'ACCEPTED':
          throw new ServiceError(409, "ALREADY_MATCHED", "You're already connected with this user.");
        case 'REJECTED':
          throw new ServiceError(403, "PREVIOUSLY_REJECTED", "You previously sent a request that was rejected. Cannot swipe again.");
        // case 'IGNORED': 
        //   throw new ServiceError(403, "PREVIOUSLY_DECLINED", "You previously declined this user. Cannot swipe again.");
        case 'PENDING': 
          throw new ServiceError(409, "PENDING_SWIPE_EXISTS", "You already sent a request to this user. Please wait for their response.");
        default:
          throw new ServiceError(409, "EXISTING_INTERACTION", "An existing interaction with this user exists.");
      }


    } 

      const newSatus = data.action === 'RIGHT' ? 'PENDING' : 'IGNORED';
      await MatchingRepository.createSwipe({
        sender_user_id:data.sender_user_id,
        reciepent_user_id: data.reciepent_user_id,
        action: data.action,
        status: newSatus
      });

        // (Future: Notifications) - will be triggered after success
        // NotificationService.sendInAppNotification(swipedUserId, "swiper_user send you an connection request");
        // NotificationService.sendEmailNotification(swipedUserId, "swiper_user send you an connection request");
      
    return { MESSAGE: "SWIPE_RECORDED_SUCCESSFULLY." };

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new ServiceError(409, "SWIPE_CONFLICT", "Swipe action conflicted with another request");
    }
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(500, "INTERNAL_SERVICE_ERROR", "something went wrong")
  }
}