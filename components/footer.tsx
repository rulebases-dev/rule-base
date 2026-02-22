import { Github, Twitter } from "lucide-react";
import Image from "next/image";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Browse Rules", href: "/#rules" },
    { label: "Submit Rule", href: "/#submit" },
    { label: "API", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "GitHub Discussions", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Support: [
    { label: "Support us", href: "/support" },
    { label: "GitHub Sponsors", href: "https://github.com/sponsors/rulebases-dev" },
    { label: "Ko-fi", href: "https://ko-fi.com/rulebases" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "License", href: "#" },
  ],
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
              <div
                className="flex size-7 items-center justify-center rounded-md"
                style={{ background: 'linear-gradient(to bottom right, rgb(139, 92, 246), rgb(79, 70, 229))' }}
              >
                <Image src="/icon.png" alt="RuleBase" width={28} height={28} className="size-7 rounded-md shadow-lg shadow-violet-500/20" />
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
                href="https://github.com/rulebases-dev/rule-base"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg bg-subtle-md text-muted-foreground ring-1 ring-border transition-all hover:bg-subtle-stronger hover:text-foreground"
              >
                <Github className="size-4" />
              </a>
              <a
                href="#"
                className="flex size-8 items-center justify-center rounded-lg bg-subtle-md text-muted-foreground ring-1 ring-border transition-all hover:bg-subtle-stronger hover:text-foreground"
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
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
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
        </div>
      </div>
    </footer>
  );
}
