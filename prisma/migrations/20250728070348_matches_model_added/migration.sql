-- CreateEnum
CREATE TYPE "SwipeAction" AS ENUM ('RIGHT', 'LEFT');

-- CreateEnum
CREATE TYPE "SwipeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'IGNORED');

-- CreateTable
CREATE TABLE "Swipes" (
    "id" TEXT NOT NULL,
    "swiperUserId" TEXT NOT NULL,
    "swipedUserId" TEXT NOT NULL,
    "action" "SwipeAction" NOT NULL,
    "status" "SwipeStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Swipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Matches" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Matches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Swipes_swipedUserId_swiperUserId_key" ON "Swipes"("swipedUserId", "swiperUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Matches_user1Id_user2Id_key" ON "Matches"("user1Id", "user2Id");

-- AddForeignKey
ALTER TABLE "Swipes" ADD CONSTRAINT "Swipes_swiperUserId_fkey" FOREIGN KEY ("swiperUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swipes" ADD CONSTRAINT "Swipes_swipedUserId_fkey" FOREIGN KEY ("swipedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
