import { ResponseHandler } from "@/utils/ResponseHandler";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../utils/AuthService";
import { AuthRequest } from "@/custom";



export const authMiddleWare = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers['authorization']

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return ResponseHandler.unauthorized(res,"INVALID_TOKEN/NOT_FOUND");
  }
  const token = authHeader.split(' ')[1];
  if(!token) return ResponseHandler.unauthorized(res)

  try {
    const decode = AuthService.decodeToken(token) as {userId:string};

    if(!decode){
      return ResponseHandler.unauthorized(res,"INVALID_TOKEN");
    }

    req.userId = decode.userId
    next();
    
  } catch (error) {
    console.error("authMiddleare error: ", error);
    return ResponseHandler.error(res, error)
  }
}