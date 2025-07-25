import { Request, Response } from "express";
import { signinSchema } from "../schema/authSchemas";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "@/modules/user/repositories/UserRepository";
import { UserService } from "@/modules/user/utils/UserService";
import { AuthService } from "../utils/AuthService";

export const login = async(req:Request, res:Response) => {
  const {success, data, error} = signinSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const user = await UserRepository.getUserByEmail(data.email);
    if(!user) return ResponseHandler.notFound(res,"USER_NOT_FOUND");
    const isPassMatch = await UserService.validatePassword(data.password, user.password);
    if(!isPassMatch) return ResponseHandler.unauthorized(res,"INVALID_CREDENTIALS");
    const token = AuthService.createToken(user.id)
    return ResponseHandler.json(res,{token});
  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}