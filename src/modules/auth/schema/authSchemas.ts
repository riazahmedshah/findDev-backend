import { UserRepository } from "@/modules/user/repositories/UserRepository"
import { z } from "zod"

const email_schema = z.email('EMAIL_IS_INVALID')

const password_schema = z.string().min(6,'PASSWORD_TOO_SHORT').max(10, 'PASSWORD_TOO_LONG')

export const signupSchema = z.object({
  email:email_schema.refine(async(email:string) => {
    const isUserExist = await UserRepository.getUserByEmail(email);
    return !isUserExist
  },'EMAIL_ALREADY_EXISTS'),
  password:password_schema
});

export const signinSchema = z.object({
  email:email_schema,
  password:password_schema
})