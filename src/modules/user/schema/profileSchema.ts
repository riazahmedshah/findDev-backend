import {z} from "zod"

export const photoSchema = z.object({
  photo: z.object({
    mimetype: z.string().refine((mimetype) => {
      return ['image/jpeg', 'image/png', 'image/webp'].includes(mimetype)
    }, 'PICTURE_MUST_BE_JPG_JPEG_PNG_WEBP'),
    size:z.number().max(5 * 1024 * 1024, 'LIMIT_FILE_SIZE')
  })
})

export const profileSchema = z.object({
  userId:z.uuid().optional(),
  name:z.string().min(1, 'NAME_IS_REQUIRED').max(100, 'NAME_TOO_LONG'),
  age:z.coerce.number().int().positive(),
  photo:z.string().optional(),
  bio:z.string().min(3, 'Minimum length is 3').optional(),
  gender:z.enum(['Male', 'Female', 'Others']),
  github:z.url().optional(),
  location:z.string().optional(),
  portfolio:z.url().optional(),
  skills:z.string().array().max(10,'Max length is 10').optional(),
})