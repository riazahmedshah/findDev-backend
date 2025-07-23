import { Prisma } from "@/generated/prisma"
import {prisma} from "@/config/prisma"
import { UserService } from "../utils/UserService"

export class UserRepository{
  static async createUser(data:Prisma.UserCreateInput){
    const hashedPassword = await UserService.hashPassword(data.password)
    return await prisma.user.create({
      data:{
        email:data.email,
        password:hashedPassword
      }
    })
  }

  static async getUserByEmail(email:string){
    return await prisma.user.findUnique({
      where:{
        email:email
      }
    })
  }
}