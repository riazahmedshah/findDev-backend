import { $Enums } from "@/generated/prisma";

type SwipeIds = {
  // swiper_user_id: string;
  // swiped_user_id:string;
  sender_user_id: string;
  reciepent_user_id:string;

}

export interface createSwipeDTO extends SwipeIds {
  action: $Enums.Action;
  status?: $Enums.Status;
}

export interface updateSwipeDTO extends SwipeIds{
  status?: $Enums.Status
}