import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { createConnectionDTO } from "../dto/connection.dto";
import { ServiceError } from "../utils/ServiceError";
import { MatchingRepository } from "../repositories/MatchingRepository";

export async function createConnection(data:createConnectionDTO){
  try {
    const isSwiperExists = await UserRepository.getUserById(data.swiper_user_id);
    if(!isSwiperExists) {
      throw new ServiceError(
        404,
        "SWIPER_NOT_FOUND",
        `User does not exist with id:${data.swiper_user_id} or user might deleted their account`
      )
    }

    const swipeRecord = await MatchingRepository.findSwipe(data.current_user_id,data.swiper_user_id);
    if(!swipeRecord || swipeRecord.action !== 'RIGHT' || swipeRecord.status !== 'PENDING'){
      throw new ServiceError(404,"INVALID_REQUEST","Invalid or already processed request.")
    }

    const [user1IdForConnection, user2IdForConnection] = [data.current_user_id, data.swiper_user_id].sort()

    const newConnection = await MatchingRepository.createMatchAndAcceptSwipe({
      current_user_id:data.current_user_id,
      swiper_user_id:data.swiper_user_id,
      user1Id:user1IdForConnection,
      user2Id:user2IdForConnection
    });

    // (Future: Notifications) - will be triggered after successful match
    // NotificationService.sendInAppNotification(swiperUserId, "It's a match!your request accepted by swiped_user");
    
    return newConnection;
  } catch (error) {
    if(error instanceof ServiceError) throw error;
    throw new ServiceError(500,"INTERNAL_SERVICE_ERROR")
  }
}