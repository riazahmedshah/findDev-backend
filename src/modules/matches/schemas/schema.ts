import { z } from "zod"

export const createSwipeSchema = z.object({
  swiped_user_id: z.uuid(),
  action: z.enum(['RIGHT', 'LEFT'])
});

export const createConnectionSchema = z.object({
  swiper_user_id:z.uuid()
});

