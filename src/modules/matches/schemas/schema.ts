import { z } from "zod"

export const createSwipeSchema = z.object({
  swiperUserId: z.uuid(),
  swipedUserId: z.uuid(),
  action: z.enum(['RIGHT', 'LEFT'])
});

