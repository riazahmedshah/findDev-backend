import { Request, Response } from "express";
import { updateProfileSchema } from "../schema/profileSchema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "../repositories/UserRepository";

export const update = async(req:Request, res:Response) => {
  const userId = req.userId
  const id = req.params.id
  const {success, data, error} = updateProfileSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const updatedProfile = await UserRepository.updateProfile(id, data);
    if(updatedProfile){
      await UserRepository.updateUser(userId);
    }
    return ResponseHandler.json(res,updatedProfile);
  } catch (err) {
    return ResponseHandler.error(res, err)
  }
}