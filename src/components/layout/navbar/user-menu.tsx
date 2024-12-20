import Link from "next/link";

import { LogoutButton } from "~/components/layout/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getServerAuthSession } from "~/server/auth";

export async function UserMenu() {
  const session = await getServerAuthSession();

  if (session === null) {
    return (
      <>
        <Link href="/auth/register">
          <Button
            className="text-lg text-white hover:bg-slate-700"
            variant="ghost"
          >
            Register
          </Button>
        </Link>
        <Link href="/api/auth/signin">
          <Button
            className="text-lg text-white hover:bg-slate-700"
            variant="ghost"
          >
            Login
          </Button>
        </Link>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={session.user.image ?? "/default_profile_picture.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>My Profile</DropdownMenuItem>
        </Link>
        {session.user.role === "admin" && (
          <Link href="/admin">
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
