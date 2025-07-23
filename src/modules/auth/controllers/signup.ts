import { Request, Response } from "express";
import { signupSchema } from "../schema/authSchemas";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { AuthService } from "../utils/AuthService";
import { ApiError } from "@/utils/ApiError";

export const signup = async (req:Request, res:Response) => {
  const {success, data, error} = await signupSchema.safeParseAsync(req.body)
  if(!success){
    return ResponseHandler.zodError(res, error);
  }
  try {
    const user = await UserRepository.createUser({
      email:data.email,
      password:data.password
    });

    if (!user || !user.id) {
      throw new ApiError(
        500, 
        "USER_CREATION_FAILED", 
        "User creation failed - invalid response from repository"
      );
    }

    const token = AuthService.createToken(user.id);
    return ResponseHandler.created(res,{token})
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}