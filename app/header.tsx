"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AccountDropdown from "@/components/account-dropdown";
import ActionsDropdown from "@/components/actions-dropdowns";
export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:underline"
        >
          <Image
            src="/icon.png"
            width="60"
            height="60"
            alt="the application icon of a magnifying glass"
          />
          findadev.io
        </Link>

        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Browse
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center ">
          {isLoggedIn && (
            <div className="flex items-center h-[10px]">
              {" "}
              <ActionsDropdown /> <AccountDropdown />
            </div>
          )}
          {!isLoggedIn && (
            <Button onClick={() => signIn("google")} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
}
