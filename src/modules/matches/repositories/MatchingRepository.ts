import { prisma } from "@/config/prisma";
import { createSwipeDTO, updateSwipeDTO } from "../dto/swipe.dto";
import { createConnectionDTO } from "../dto/connection.dto";

export class MatchingRepository{
  static async findSwipe(
    swiper_user_id: string,
    swiped_user_id:string
  ){
    return await prisma.swipes.findUnique({
      where:{
        swiperUserId_swipedUserId:{
          swiperUserId: swiper_user_id,
          swipedUserId: swiped_user_id
        }
      }
    })
  }

  static async findPendingSwipes(userId: string){
    return await prisma.swipes.findMany({
      where:{
        AND:[
            {swipedUserId:userId},
            {status:"PENDING"}
        ]
      },
      select:{
        swiperUserId:true
      }
    })
  }

  static async createSwipe(data: createSwipeDTO){
    return await prisma.swipes.create({
      data:{
        swiperUserId:data.swiper_user_id,
        swipedUserId:data.swiped_user_id,
        action:data.action,
        status: data.status
      }
    })
  }

  static async updateSwipe(data: updateSwipeDTO){
    return await prisma.swipes.update({
      where:{
        swiperUserId_swipedUserId: {
          swiperUserId:data.swiper_user_id,
          swipedUserId: data.swiped_user_id,
        }
      },
      data:{
        status:data.status
      }
    })
  }

  static async createMatchAndAcceptSwipe(data:createConnectionDTO){
    return await prisma.$transaction(async (tx) => {
      const updatedSwipe = await tx.swipes.update({
        where: {
          swiperUserId_swipedUserId:{
            swiperUserId:data.swiper_user_id,
            swipedUserId:data.current_user_id
          }
        },
        data:{
          status:'ACCEPTED'
        }
      });

      const newConnection = await tx.connection.create({
        data:{
          user1Id:data.user1Id,
          user2Id:data.user2Id
        }
      });

      return {updatedSwipe,newConnection}
    })
  }
}