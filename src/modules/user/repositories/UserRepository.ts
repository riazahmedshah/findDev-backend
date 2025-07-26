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

  static async createProfile(userId:string,data: Prisma.ProfileCreateInput){
    return await prisma.profile.create({
      data:{
        userId,
        name:data.name,
        age:data.age,
        avatar:data.avatar,
        bio:data.bio,
        gender:data.gender,
        github:data.github,
        location:data.location,
        portfolio:data.portfolio,
        skills:data.skills,
      }
    })
  }
}