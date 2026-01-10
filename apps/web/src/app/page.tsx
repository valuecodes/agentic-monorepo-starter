import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

const templateUrl =
  "https://github.com/valuecodes/agentic-monorepo-starter/generate";
const repoUrl = "https://github.com/valuecodes/agentic-monorepo-starter";

const credibilityItems = [
  {
    title: "CI is the source of truth",
    description: "Lint, typecheck, build, format, and agents checks gate runs.",
  },
  {
    title: "Public-safe by default",
    description: "No secrets or env files baked into the template.",
  },
  {
    title: "Boundary rules enforced",
    description: "Apps import packages, packages stay independent.",
  },
  {
    title: "Agent-friendly",
    description: "Built for Claude, Codex, Cursor, and Copilot.",
  },
];

const whyBullets = [
  "Agents drift without shared rules.",
  "Inconsistent tooling produces mismatched output.",
  "Boundary violations blur ownership.",
  "CI guardrails catch risky changes early.",
  "Public-safe defaults prevent leaks.",
];

const featureItems = [
  {
    title: "Guardrails by default",
    description: "AGENTS.md and shared configs codify behavior.",
  },
  {
    title: "CI as source of truth",
    description: "Lint, typecheck, build, format, and agents checks.",
  },
  {
    title: "Shared UI package",
    description: "Shadcn-style primitives in @repo/ui.",
  },
  {
    title: "Next.js + Vite apps included",
    description: "A web landing page plus a playground app.",
  },
  {
    title: "Consistent tooling",
    description: "ESLint flat config, Prettier sorting, TS presets, Turbo.",
  },
  {
    title: "Fast onboarding",
    description: "pnpm dev runs both apps out of the box.",
  },
];

const steps = [
  {
    title: "Use the template",
    description: "Create a new repo from the GitHub template.",
  },
  {
    title: "Install and run",
    description: "pnpm install sets up the workspace, then pnpm dev.",
  },
  {
    title: "Run the checks",
    description: "Verify lint, typecheck, and build before shipping.",
  },
];

const faqItems = [
  {
    question: "Is this just create-turbo?",
    answer:
      "It builds on Turbo but adds agent guardrails, docs, and strict tooling.",
  },
  {
    question: "Do I need Claude/Codex/Cursor?",
    answer:
      "No. The template works without agents, but it is optimized for them.",
  },
  {
    question: "Is it safe as a template?",
    answer: "Yes. It is public-safe and avoids secrets by default.",
  },
  {
    question: "Can I remove agent tooling?",
    answer:
      "Yes. Delete tooling/agents and related scripts if you do not need it.",
  },
  {
    question: "Why Next + Vite?",
    answer: "Next.js ships the product app, Vite powers fast UI experiments.",
  },
  {
    question: "What is the verification loop?",
    answer: "Run pnpm turbo lint typecheck build before a PR.",
  },
];

const quickstart = `pnpm install
pnpm dev
pnpm turbo lint typecheck build`;

const Home = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:py-20">
        <div className="from-primary/10 via-muted/40 to-background pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 bg-gradient-to-b" />
        <header className="flex flex-col gap-6 bg-muted/20">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/10 text-primary"
            >
              Agentic Monorepo Starter
            </Badge>
            <span className="text-muted-foreground">
              Guardrails-first Turborepo template
            </span>
          </div>
          <div className="space-y-4">
            <h1
              id="hero-title"
              className="text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Agentic Monorepo Starter
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              Guardrails, strict rules, consistent tooling, and clear boundaries
              for agent-driven changes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href={templateUrl} target="_blank" rel="noreferrer noopener">
                Use this template
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={repoUrl} target="_blank" rel="noreferrer noopener">
                View on GitHub
              </a>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Node/pnpm pinned | Turbo | strict lint/typecheck/format
          </p>
        </header>

        <section aria-labelledby="credibility">
          <h2 id="credibility" className="text-lg font-semibold">
            Credibility
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {credibilityItems.map((item) => (
              <div
                key={item.title}
                className="bg-muted/20 rounded-lg border border-primary/10 p-4"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-muted-foreground mt-2 text-sm">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="why"
          className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="w-fit border-primary/20 bg-primary/10 text-primary"
            >
              Why this exists
            </Badge>
            <h2 id="why" className="text-2xl font-semibold">
              Stop agent drift before it ships.
            </h2>
            <p className="text-muted-foreground text-sm">
              A focused template that makes boundaries and checks the default.
            </p>
          </div>
          <ul className="text-muted-foreground grid gap-3 text-sm">
            {whyBullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="bg-primary mt-1 size-1.5 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="features" className="space-y-6">
          <div className="space-y-2">
            <h2 id="features" className="text-2xl font-semibold">
              Feature grid
            </h2>
            <p className="text-muted-foreground text-sm">
              Everything is prewired to keep agents aligned with your repo
              rules.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureItems.map((feature) => (
              <Card
                key={feature.title}
                className="border-primary/10 bg-card/60 hover:border-primary/30 hover:bg-muted/20"
              >
                <CardHeader className="bg-muted/20">
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="how-it-works"
          className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 id="how-it-works" className="text-2xl font-semibold">
                How it works
              </h2>
              <p className="text-muted-foreground text-sm">
                Use the template, run the workspace, then verify with Turbo.
              </p>
            </div>
            <ol className="space-y-4 text-sm">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="text-primary/80 mt-0.5 text-xs font-semibold">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-muted/50 rounded-lg border border-primary/10 p-5">
            <div className="text-sm font-semibold">Quickstart</div>
            <pre className="text-muted-foreground bg-background/80 mt-3 overflow-x-auto rounded-md p-4 text-xs sm:text-sm">
              <code>{quickstart}</code>
            </pre>
          </div>
        </section>

        <section
          aria-labelledby="guardrails"
          className="grid gap-6 lg:grid-cols-[1fr_1.1fr]"
        >
          <div className="space-y-3">
            <h2 id="guardrails" className="text-2xl font-semibold">
              Guardrails, enforced
            </h2>
            <p className="text-muted-foreground text-sm">
              Keep agents within repo boundaries and codify behavior once.
            </p>
            <p className="text-muted-foreground text-sm">
              Agent rules live in <code>tooling/agents</code>. Sync them with{" "}
              <code>pnpm agents:sync</code> and validate with{" "}
              <code>pnpm agents:check</code>.
            </p>
          </div>
          <div className="bg-accent/40 rounded-lg border border-primary/20 p-5">
            <blockquote className="text-muted-foreground text-sm italic">
              "Apps import packages only. Keep diffs tight. No secrets or env
              files. Agents never run git ops."
            </blockquote>
          </div>
        </section>

        <section aria-labelledby="structure" className="space-y-6">
          <div className="space-y-2">
            <h2 id="structure" className="text-2xl font-semibold">
              Repo structure preview
            </h2>
            <p className="text-muted-foreground text-sm">
              Three clear zones keep ownership and tooling clean.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-muted/20 rounded-lg border border-primary/10 p-4">
              <div className="text-sm font-semibold">Apps</div>
              <p className="text-muted-foreground mt-2 text-sm">
                Next.js web + Vite playground for UI experiments.
              </p>
            </div>
            <div className="bg-muted/20 rounded-lg border border-primary/10 p-4">
              <div className="text-sm font-semibold">Packages</div>
              <p className="text-muted-foreground mt-2 text-sm">
                Shared UI and utilities consumed by apps.
              </p>
            </div>
            <div className="bg-muted/20 rounded-lg border border-primary/10 p-4">
              <div className="text-sm font-semibold">Tooling</div>
              <p className="text-muted-foreground mt-2 text-sm">
                ESLint, Prettier, TypeScript, Turbo, and agent scripts.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq" className="space-y-6">
          <div className="space-y-2">
            <h2 id="faq" className="text-2xl font-semibold">
              FAQ
            </h2>
            <p className="text-muted-foreground text-sm">
              Short answers to common template questions.
            </p>
          </div>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group bg-muted/20 rounded-lg border border-primary/10 p-4 hover:border-primary/20"
              >
                <summary className="cursor-pointer text-sm font-semibold text-foreground hover:text-primary">
                  {item.question}
                </summary>
                <p className="text-muted-foreground mt-2 text-sm">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="final-cta">
          <Card className="border-primary/20 bg-muted/40">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to ship?</CardTitle>
              <CardDescription>
                Spin up the template and let the guardrails do the work.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href={templateUrl} target="_blank" rel="noreferrer noopener">
                    Use this template
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={repoUrl} target="_blank" rel="noreferrer noopener">
                    View on GitHub
                  </a>
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">
                If it saves you time, consider starring the repo.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Home;
