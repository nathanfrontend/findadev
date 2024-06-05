import { db } from "@/db";
import { Room, comment, devRoom, users } from "@/db/schema";

import { like, or, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search ? like(devRoom.tags, `%${search}%`) : undefined;
  const rooms = await db.query.devRoom.findMany({
    where,
    with: { owner: true },
  });

  return rooms;
}

export async function getUserRooms(): Promise<Room[]> {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.query.devRoom.findMany({
    where: eq(devRoom.userId, session.user.id),
    with: { owner: true },
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.devRoom.findFirst({
    where: eq(devRoom.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(devRoom).where(eq(devRoom.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string,
) {
  const inserted = await db
    .insert(devRoom)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(devRoom)
    .set(roomData)
    .where(eq(devRoom.id, roomData.id))
    .returning();
  return updated[0];
}

export async function createComment(
  message: string,
  userId: string,
  roomId: string,
) {
  const inserted = await db
    .insert(comment)
    .values({ message, userId, roomId })
    .returning();

  return inserted[0];
}
