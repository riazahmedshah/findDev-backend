/*
  Warnings:

  - A unique constraint covering the columns `[swiperUserId,swipedUserId]` on the table `Swipes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Swipes_swipedUserId_swiperUserId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Swipes_swiperUserId_swipedUserId_key" ON "Swipes"("swiperUserId", "swipedUserId");
