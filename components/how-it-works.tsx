import { Copy, Rocket, Search } from "lucide-react";

const STEP_GRADIENTS: React.CSSProperties[] = [
  { background: "linear-gradient(to bottom right, rgb(56, 189, 248), rgb(6, 182, 212))", boxShadow: "0 8px 30px rgba(56, 189, 248, 0.08)" },
  { background: "linear-gradient(to bottom right, rgb(139, 92, 246), rgb(168, 85, 247))", boxShadow: "0 8px 30px rgba(139, 92, 246, 0.08)" },
  { background: "linear-gradient(to bottom right, rgb(245, 158, 11), rgb(249, 115, 22))", boxShadow: "0 8px 30px rgba(245, 158, 11, 0.08)" },
];

const steps = [
  {
    icon: Search,
    title: "Find your stack",
    description:
      "Browse curated prompts filtered by framework, language, or use case. Find the perfect rules for your workflow.",
  },
  {
    icon: Copy,
    title: "Copy to your editor",
    description:
      "One click to copy any rule into .cursorrules, .windsurfrules, or your Copilot instructions file.",
  },
  {
    icon: Rocket,
    title: "Code at lightspeed",
    description:
      "Your AI editor now understands your stack deeply. Write better code, faster, with context-aware assistance.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm font-medium tracking-wide uppercase" style={{ color: 'rgb(139, 92, 246)' }}>
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
            <span className="how-it-works-step-num mb-5 text-xs font-mono">
              0{index + 1}
            </span>

            {/* Icon - cùng cách làm hero-section (inline style) */}
            <div
              className="mb-5 flex size-11 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={STEP_GRADIENTS[index]}
            >
              <step.icon className="size-5" style={{ color: "#fff", stroke: "#fff" }} />
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
