import Link from "next/link";
import { Crown, Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/lib/auth";
import { getUserPlan } from "@/lib/lemonsqueezy/subscription";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Trending", href: "#trending" },
  { label: "Rules", href: "#rules" },
  { label: "Submit", href: "#submit" },
];

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Terminal className="size-3.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">RuleBase</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="size-4" />
            </a>
          </Button>
          <div className="mx-1 h-4 w-px bg-border" />

          {session?.user ? (
            <HeaderUser
              name={session.user.name}
              image={session.user.image}
              email={session.user.email}
              userId={session.user.id!}
            />
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-[13px] text-muted-foreground" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-[13px] text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500" asChild>
                <a href="#rules">Get Started</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

async function HeaderUser({
  name,
  image,
  email,
  userId,
}: {
  name: string | null | undefined;
  image: string | null | undefined;
  email: string | null | undefined;
  userId: string;
}) {
  const plan = await getUserPlan(userId);

  return (
    <div className="flex items-center gap-2">
      {plan === "pro" && (
        <Badge className="gap-1 border-violet-500/30 bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-600 hover:bg-violet-500/10 dark:text-violet-300">
          <Crown className="size-2.5" />
          Pro
        </Badge>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="text-[13px] text-muted-foreground"
        asChild
      >
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <UserMenu name={name} image={image} email={email} />
    </div>
  );
}
