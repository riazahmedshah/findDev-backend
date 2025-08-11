import { Request, Response } from "express";
import { signupSchema } from "../schema/authSchemas";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "@/modules/user/repositories/UserRepository";

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

    return ResponseHandler.created(res,{
      MESSAGE:`USER_${user.username}_CREATED_SUCCESSFULLY`
    })
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}