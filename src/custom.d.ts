import { Request } from "express"

interface AuthRequest extends Request{
  userId:string
}

declare global {
  namespace Express {
    interface Request {
      id: AuthRequest
    }
  }
}