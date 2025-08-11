import { Prisma } from "@/generated/prisma"
import {prisma} from "@/config/prisma"
import { UserService } from "../utils/UserService"

export class UserRepository{
  static async createUser(data:Prisma.UserCreateInput){
    const hashedPassword = await UserService.hashPassword(data.password)
    return await prisma.user.create({
      data:{
        username:data.username,
        email:data.email,
        password:hashedPassword
      }
    })
  }

  static async updateUser(userId:string, data:Prisma.UserUpdateInput){
    return await prisma.user.update({
      where:{
        id:userId
      },
      data:{
        firstName:data.firstName,
        lastName:data.lastName,
        age:data.age,
        photo:data.photo,
        bio:data.bio,
        gender:data.gender,
        github:data.github,
        location:data.location,
        portfolio:data.portfolio,
        skills:data.skills,
      }
    })
  }

  static async getUserById(id:string):Promise<Boolean>{
    const user = await prisma.user.findUnique({
      where:{
        id
      }
    });

    if(user) return true
    return false;
  }

  static async getUserByEmail(email:string){
    return await prisma.user.findUnique({
      where:{
        email:email
      }
    })
  }
}