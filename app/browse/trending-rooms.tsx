import React from "react";
import { BookMarkedIcon, Telescope } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../components/ui/command";

import { getSession } from "@/lib/auth";
import { Room } from "@/db/schema";

export default async function TrendingRooms({ rooms }: { rooms: Room[] }) {
  const session = await getSession();

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandItem className="py-4 bg-opacity-10 bg-gray-700">
        <Telescope className="mr-2 text-gray-400" />
        <h1 className="text-gray-300 font-bold ">
          Trending rooms <span className="text-gray-400"> today</span>
        </h1>
      </CommandItem>
      <CommandSeparator />
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {rooms &&
          rooms.map(({ name, id, description }, index) => (
            <CommandGroup key={id}>
              <CommandItem>
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <BookMarkedIcon className="text-gray-400 mr-2 h-4 w-4" />
                    <span className="text-blue-400 mr-2">
                      {session?.user.name}{" "}
                    </span>{" "}
                    /<span className="text-blue-400 ml-2">{name} </span>
                  </div>

                  <p className="text-gray-400 py-2 line-clamp-3">
                    {" "}
                    {description}
                  </p>
                </div>
              </CommandItem>
              {index !== rooms.length - 1 && <CommandSeparator />}
            </CommandGroup>
          ))}
      </CommandList>
    </Command>
  );
}
