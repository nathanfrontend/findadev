"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Dot, GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags, timeAgo } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserRoomCard({ room }: { room: Room }) {
  const { owner } = room;

  return (
    <Card>
      <CardHeader className="relative">
        {/* <Button className="absolute top-2 right-2" size="icon">
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button> */}
        <div className="mb-2 flex items-center">
          <div className="flex items-center ">
            {" "}
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={owner?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Link
              href={"/profile"}
              className="text-sm font-bold hover:cursor-pointer  "
            >
              {owner?.name}
            </Link>
            <Dot className="text-gray-400" />
            <p className="text-sm font-light text-gray-400 ">
              {" "}
              {timeAgo(room.createdAt.toISOString())}
            </p>
          </div>
        </div>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/devRooms/${room.id}`}>Join devRoom</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" /> Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
