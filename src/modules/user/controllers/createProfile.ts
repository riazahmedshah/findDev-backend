import { Request, Response } from "express";
import { photoSchema, profileSchema } from "../schema/profileSchema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { UserRepository } from "../repositories/UserRepository";
import { uploadImageAndProcess } from "../utils/StorageHelper";

export const create = async (req:Request, res:Response) => {
  const userId = req.userId
  const {success, data, error} = profileSchema.safeParse(req.body);
  const photo = req.file
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const isProfileExist = await UserRepository.getProfileByUserId(userId);
    if(isProfileExist) return ResponseHandler.json(res,{MESSAGE:"PROFILE_ALREADY_EXISTS"});

    if(photo){
      const validate = photoSchema.safeParse({photo});

      if(!validate.success){
        const firstError = validate.error.message

        return ResponseHandler.json(res,{MESSAGE:firstError})
      }

      const path = `users/${userId}/photo.jpg`

      try {
        await uploadImageAndProcess(path, photo.buffer,{
          width: 514,
          height: 514,
          format: 'webp'
        });

        data.photo = path
      } catch (error) {
        return ResponseHandler.json(res, {MESSAGE:"PROFILE_PHOTO_UPLOAD_FAILED"})
      }
    }
    const profile = await UserRepository.createProfile(userId,{
      name:data.name,
      age:data.age,
      bio:data.bio,
      gender:data.gender,
      github:data.github,
      portfolio:data.portfolio,
      location:data.location,
      skills:data.skills,
      photo:data.photo
    });

    return ResponseHandler.json(res,profile);
  } catch (error) {
    return ResponseHandler.error(res, error)
  }

}