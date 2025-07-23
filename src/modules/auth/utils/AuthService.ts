import * as jwt from "jsonwebtoken"

const secret = "secret"

export class AuthService{
  static createToken(userId:string){
    return jwt.sign(userId, secret);
  }
}