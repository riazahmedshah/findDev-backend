import { $Enums } from "@/generated/prisma";

type SwipeIds = {
  swiper_user_id: string;
  swiped_user_id:string;
}

export interface createSwipeDTO extends SwipeIds {
  action: $Enums.SwipeAction;
}

export interface updateSwipeDTO extends SwipeIds{
  status?: $Enums.SwipeStatus
}