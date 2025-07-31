import { $Enums } from "@/generated/prisma";

type SwipeIds = {
  swiped_user_id:string;
  swiper_user_id: string;
}

export interface createSwipeDTO extends SwipeIds {
  action: $Enums.SwipeAction;
  status?: $Enums.SwipeStatus;
}

export interface updateSwipeDTO extends SwipeIds{
  status?: $Enums.SwipeStatus
}