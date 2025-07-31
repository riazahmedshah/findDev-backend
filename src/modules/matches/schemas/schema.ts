import { z } from "zod"

export const createSwipeSchema = z.object({
  swiped_user_id: z.string(),
  action: z.enum(['RIGHT', 'LEFT']),
  status: z.enum(['PENDING','IGNORED'])
});

