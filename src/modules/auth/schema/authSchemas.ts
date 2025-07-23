import { UserRepository } from "@/modules/user/repositories/UserRepository"
import { z } from "zod"

const email_schema = z.email('EMAIL_IS_INVALID')

export const signupSchema = z.object({
  email:email_schema.refine(async(email:string) => {
    const isUserExist = await UserRepository.getUserByEmail(email);
    return !isUserExist
  },'EMAIL_ALREADY_EXISTS'),
  password:z.string().min(6,'PASSWORD_TOO_SHORT').max(10, 'PASSWORD_TOO_LONG')
})