import { Github, Terminal, Twitter } from "lucide-react";

const footerLinks = {
  Product: ["Browse Rules", "Submit Rule", "API", "Changelog"],
  Community: ["Discord", "GitHub Discussions", "Twitter", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "License"],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600">
                <Terminal className="size-3.5 text-white" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">
                RuleBase
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The open-source directory for AI editor system prompts. Discover
              rules that make your coding assistant smarter.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex size-8 items-center justify-center rounded-lg bg-foreground/[0.04] text-muted-foreground ring-1 ring-border transition-all hover:bg-foreground/[0.08] hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-8 items-center justify-center rounded-lg bg-foreground/[0.04] text-muted-foreground ring-1 ring-border transition-all hover:bg-foreground/[0.08] hover:text-foreground"
              >
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3.5 text-sm font-medium">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground/60" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} RuleBase. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Built with Next.js, Tailwind CSS & Shadcn UI
          </p>
        </div>
      </div>
    </footer>
  );
}
