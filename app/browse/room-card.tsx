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
import { GithubIcon, Dot } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags, timeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function RoomCard({ room }: { room: Room }) {
  const devRoom = room.room;
  const user = room.user;

  return (
    <Card className="transition duration-300 ease-in-out hover:bg-gray-900">
      <CardHeader>
        <div className="mb-2 flex items-center">
          <div className="flex items-center ">
            {" "}
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Link
              href={"/profile"}
              className="text-sm font-bold hover:cursor-pointer  "
            >
              {user.name}
            </Link>
            <Dot className="text-gray-400" />
            <p className="text-sm font-light text-gray-400 ">
              {" "}
              {timeAgo(devRoom.createdAt.toISOString())}
            </p>
          </div>
        </div>

        <CardTitle>{devRoom.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(devRoom.tags)} />
        {devRoom.githubRepo && (
          <Link
            href={devRoom.githubRepo}
            className="flex items-center gap-2 w-max"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${devRoom.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
