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
        swipedUserId_swiperUserId:{
          swipedUserId: swiped_user_id,
          swiperUserId: swiper_user_id,
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
      }
    })
  }

  static async createSwipe(data: createSwipeDTO){
    return await prisma.swipes.create({
      data:{
        swipedUserId:data.swiped_user_id,
        swiperUserId:data.swiper_user_id,
        action:data.action,
        status: data.status
      }
    })
  }

  static async updateSwipe(data: updateSwipeDTO){
    return await prisma.swipes.update({
      where:{
        swipedUserId_swiperUserId: {
          swipedUserId: data.swiped_user_id,
          swiperUserId:data.swiper_user_id
        }
      },
      data:{
        status:data.status
      }
    })
  }

  static async createConnection(data:createConnectionDTO){
    return await prisma.connection.create({
      data:{
        user1Id:data.user1Id,
        user2Id:data.user2Id
      }
    })
  }

}