import { prisma } from "@/config/prisma";

export async function getFeed() {
  const feed = prisma.profile.findMany();
  return feed;
}