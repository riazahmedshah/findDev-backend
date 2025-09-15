import { prisma } from "@/config/prisma";
import { createSwipeDTO, updateSwipeDTO } from "../dto/swipe.dto";
import { createConnectionDTO } from "../dto/connection.dto";

export class MatchingRepository{
  static async findSwipe(
    swiper_user_id: string,
    swiped_user_id:string
  ){
    return await prisma.connectionRequests.findUnique({
      where:{
        senderUserId_recipientUserId:{
          senderUserId: swiper_user_id,
          recipientUserId: swiped_user_id
        }
      }
    })
  }

  static async findPendingconnectionRequests(userId: string){
    return await prisma.connectionRequests.findMany({
      where:{
        AND:[
            {senderUserId:userId},
            {status:"PENDING"}
        ]
      },
      select:{
        senderUserId:true
      }
    })
  }

  static async createSwipe(data: createSwipeDTO){
    return await prisma.connectionRequests.create({
      data:{
        senderUserId:data.sender_user_id,
        recipientUserId:data.reciepent_user_id,
        action:data.action,
        status: data.status
      }
    })
  }

  static async updateSwipe(data: updateSwipeDTO){
    return await prisma.connectionRequests.update({
      where:{
        senderUserId_recipientUserId: {
          senderUserId:data.sender_user_id,
          recipientUserId: data.reciepent_user_id,
        }
      },
      data:{
        status:data.status
      }
    })
  }

  static async createMatchAndAcceptSwipe(data:createConnectionDTO){
    return await prisma.$transaction(async (tx) => {
      const updatedSwipe = await tx.connectionRequests.update({
        where: {
          senderUserId_recipientUserId:{
            senderUserId:data.sender_user_id,
            recipientUserId:data.current_user_id
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