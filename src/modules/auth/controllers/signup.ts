import { Request, Response } from "express";
import { signupSchema } from "../schema/authSchemas";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { AuthService } from "../utils/AuthService";

export const signup = async (req:Request, res:Response) => {
  const {success, data, error} = await signupSchema.safeParseAsync(req.body)
  if(!success){
    return ResponseHandler.zodError(res, error);
  }
  try {
    const user = await UserRepository.createUser({
      username:data.username,
      email:data.email,
      password:data.password
    })
    
    const token = AuthService.createToken(user.id);
    return ResponseHandler.created(res,{
      MESSAGE:`${user.username} CREATED SUCCESSFULLY`,
      token
    })
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}