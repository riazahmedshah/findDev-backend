import * as bcrypt from "bcryptjs"

export class UserService{
  static async hashPassword(password:string): Promise<string>{
    const saltRounds = 12

    return await bcrypt.hash(password, saltRounds);
  }

  static async validatePassword(password:string, hashedPassword:string):Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword)
  }
}