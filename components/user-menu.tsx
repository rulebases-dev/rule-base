"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
}

export function UserMenu({ name, image, email }: UserMenuProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : email?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2.5">
        {image ? (
          <img
            src={image}
            alt={name ?? "User"}
            className="size-7 rounded-full ring-1 ring-border"
          />
        ) : (
          <div
            className="flex size-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-1 ring-border"
            style={{ background: "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(79, 70, 229))" }}
          >
            {initials}
          </div>
        )}
        <span className="hidden text-[13px] font-medium sm:block">
          {name ?? email}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => signOut({ callbackUrl: "/" })}
        title="Sign out"
      >
        <LogOut className="size-3.5" />
      </Button>
    </div>
  );
}
