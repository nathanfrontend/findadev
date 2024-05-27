import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/rooms";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import RoomCard from "./room-card";
import Image from "next/image";
import SearchBar from "./search-bar";
import TrendingRooms from "./trending-rooms";
export default async function Browse({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen py-16 ">
      <div className="grid grid-cols-browse mx-4">
        <div className=" ">hello</div>
        <div className="flex flex-col justify-center items-center mb-8 ">
          <div className="flex space-x-4">
            <SearchBar />
          </div>
          <div className="grid grid-rows-1 justify-items-center ">
            {rooms.map((room) => {
              return <RoomCard key={room.id} room={room} />;
            })}
          </div>
        </div>
        <div className=" ">
          {" "}
          <TrendingRooms />
        </div>
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">No Rooms Yet!</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
