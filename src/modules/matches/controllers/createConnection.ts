import { Request, Response } from "express";
import { createConnectionSchema } from "../schemas/schema";
import { ResponseHandler } from "@/utils/ResponseHandler";
import { createConnection } from "../services";

export const createAndAccept = async (req:Request,res:Response) => {
  const currentUserId = req.userId;

  const { success, data, error} = createConnectionSchema.safeParse(req.body);
  if(!success){
    return ResponseHandler.zodError(res,error);
  }
  try {
    const match = await createConnection(
      currentUserId,
      data.swiper_user_id,
    );

    return ResponseHandler.json(res,match);

  } catch (error) {
    return ResponseHandler.error(res,error)
  }
}