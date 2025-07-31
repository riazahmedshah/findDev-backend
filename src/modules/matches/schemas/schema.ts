import { z } from "zod"

export const createSwipeSchema = z.object({
  swipedUserId: z.uuid(),
  action: z.enum(['RIGHT', 'LEFT'])
});

