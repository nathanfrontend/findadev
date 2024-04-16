import { db } from "@/db";
import { Room, devRoom } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search ? like(devRoom.tags, `%${search}%`) : undefined;
  const rooms = await db.query.devRoom.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.query.devRoom.findMany({
    where: eq(devRoom.userId, session.user.id),
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
