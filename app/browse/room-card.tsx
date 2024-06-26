import { Button } from "@/components/ui/button";
import Link from "next/link";
import Comments from "./comments";
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
import { Input } from "@/components/ui/input";
export default function RoomCard({ room }: { room: Room }) {
  const { owner } = room;

  return (
    <div>
      <div className="mb-2 flex items-center my-8 w-full">
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
      <Card className="transition duration-300 ease-in-out hover:bg-gray-900 h-[468px] w-[578px] flex flex-col">
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm line-clamp-3">{room.description}</p>
          <TagsList tags={splitTags(room.tags)} />
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 w-max"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <Comments id={room.id} />
        </CardFooter>
      </Card>
    </div>
  );
}
