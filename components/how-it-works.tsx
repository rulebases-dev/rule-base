import { Copy, Rocket, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find your stack",
    description:
      "Browse curated prompts filtered by framework, language, or use case. Find the perfect rules for your workflow.",
    gradient: "from-sky-500 to-cyan-500",
    glow: "rgba(56, 189, 248, 0.08)",
  },
  {
    icon: Copy,
    title: "Copy to your editor",
    description:
      "One click to copy any rule into .cursorrules, .windsurfrules, or your Copilot instructions file.",
    gradient: "from-violet-500 to-purple-500",
    glow: "rgba(139, 92, 246, 0.08)",
  },
  {
    icon: Rocket,
    title: "Code at lightspeed",
    description:
      "Your AI editor now understands your stack deeply. Write better code, faster, with context-aware assistance.",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.08)",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-violet-500 dark:text-violet-400 uppercase">
          How it works
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps to AI mastery
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="glass-card group relative flex flex-col rounded-2xl p-7 transition-all duration-300"
          >
            {/* Step number */}
            <span className="mb-5 text-xs font-mono text-muted-foreground/50">
              0{index + 1}
            </span>

            {/* Icon */}
            <div
              className={`mb-5 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
              style={{ boxShadow: `0 8px 30px ${step.glow}` }}
            >
              <step.icon className="size-5 text-white" />
            </div>

            {/* Content */}
            <h3 className="mb-2 text-lg font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
