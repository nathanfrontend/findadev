import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronDown,
  Computer,
  DeleteIcon,
  LogInIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function ActionsDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-transparent text-gray-400 space-x-3 "
            variant="outline"
          >
            <PlusIcon /> <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="pr-8 flex items-end" asChild>
            <Link href={"/create-room"}>
              <Computer className="mr-2" /> New room
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
