import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { MatchingRepository } from "../repositories/MatchingRepository";
import { ServiceError } from "../utils/ServiceError";

export async function pendingSwipesService(userId:string) {
  try {
    const requests = await MatchingRepository.findPendingSwipes(userId);
    if(!requests || requests.length === 0){
      throw new ServiceError(404,"NO_PENDING_REQUESTS_FOUND")
    }

    const swiperIds = requests.map(request => request.swiperUserId);

    const swipers = await Promise.all(
      swiperIds.map(async(id) => {
        try {
          const profile = await UserRepository.getProfileByUserId(id);
          if(!profile){
            return {
              userId: id,
              error: "USER_HAS_NO_PROFILE",
              message: `User with ID ${id} has not created a profile yet`
            };
          }
          return profile;
        } catch (error) {
          return {
            userId: id,
            error: "PROFILE_FETCH_ERROR",
            message: `Error fetching profile for user ${id}`
          };
        }
      })
    );

    return swipers;

  } catch (error) {
    if(error instanceof ServiceError) throw error;
    throw new ServiceError(500,"INTERNAL_SERVICE_ERROR","something went wrong")
  }
}