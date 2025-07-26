import * as jwt from "jsonwebtoken"

const secret = "secret"

export class AuthService{
  static createToken(userId:string):string{
    return jwt.sign({ userId }, secret, {expiresIn:'2 days'});
  }

  static decodeToken(token:string){
    return jwt.verify(token, secret)
  }
}