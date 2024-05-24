import { db } from "@/db";
import { Room, devRoom, users } from "@/db/schema";

import { like, or, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  // const isArray: string[] = (search as string)
  //   .split(",")
  //   .map((item) => item.trim());
  // console.log(isArray.length);
  const rooms = await db
    .select()
    .from(devRoom)
    .innerJoin(users, eq(users.id, devRoom.userId))
    .where(
      or(
        search ? like(devRoom.tags, `%${search}%`) : undefined,
        search ? like(devRoom.name, `%${search}%`) : undefined,
      ),
    );

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
  roomData: Omit<Room["room"], "id" | "userId">,
  userId: string,
) {
  const inserted = await db
    .insert(devRoom)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room["room"]) {
  const updated = await db
    .update(devRoom)
    .set(roomData)
    .where(eq(devRoom.id, roomData.id))
    .returning();
  return updated[0];
}
