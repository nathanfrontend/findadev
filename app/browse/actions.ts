"use server";

import { createComment } from "../../data-access/rooms";

import { getSession } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export async function createCommentAction(message: string, roomId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await createComment(message, session.user.id, roomId);

  revalidatePath("/browse");

  return room;
}
