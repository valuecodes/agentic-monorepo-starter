import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Box,
  ChevronRight,
  FolderTree,
  GitBranch,
  Terminal,
} from "lucide-react";

const templateUrl =
  "https://github.com/valuecodes/agentic-monorepo-starter/generate";
const repoUrl = "https://github.com/valuecodes/agentic-monorepo-starter";

interface RepoFolder {
  name: string;
  icon: React.ReactNode;
  children: { name: string; description?: string }[];
}

const repoStructure: RepoFolder[] = [
  {
    name: "apps",
    icon: <Box className="text-chart-1 h-4 w-4" />,
    children: [
      { name: "web", description: "Next.js Product" },
      { name: "playground", description: "Vite Experiments" },
    ],
  },
  {
    name: "packages",
    icon: <Box className="text-chart-4 h-4 w-4" />,
    children: [{ name: "ui", description: "Shadcn Components" }],
  },
  {
    name: "tooling",
    icon: <Terminal className="text-chart-5 h-4 w-4" />,
    children: [
      { name: "agents", description: "Prompts & Context" },
      { name: "typescript", description: "TS Configs" },
      { name: "eslint", description: "Lint Rules" },
      { name: "prettier", description: "Code Formatting" },
    ],
  },
];

const faqItems = [
  {
    question: "Is this just create-turbo?",
    answer:
      "It builds on Turbo but adds agent guardrails, strict boundaries, and documentation specifically designed for LLM context windows.",
  },
  {
    question: "Do I need AI tools to use this?",
    answer:
      "No. It's a rock-solid monorepo template on its own. The agent tooling is just a bonus layer that stays out of your way if you don't use it.",
  },
  {
    question: "Why Next.js AND Vite?",
    answer:
      "Next.js is heavy. Vite is instant. We use Vite for a component playground (like Storybook but simpler) to iterate on UI fast, then import those components into the Next.js app.",
  },
];

const Home = () => {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 min-h-screen font-sans">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-primary/5 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="bg-accent/5 absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
      </div>

      <main className="mx-auto w-full max-w-5xl space-y-24 px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <header className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center space-y-8 text-center duration-700">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary rounded-full px-4 py-1.5 text-sm backdrop-blur-sm"
          >
            v1.0 Public Template
          </Badge>

          <div className="max-w-3xl space-y-4">
            <h1 className="from-foreground to-foreground/70 bg-linear-to-b bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-7xl">
              Agentic Monorepo Starter
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
              Stop fighting your agents. Give them guardrails, strict types, and
              clear boundaries so they can actually ship code.
            </p>
          </div>

          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="shadow-primary/20">
              <a href={templateUrl} target="_blank" rel="noreferrer noopener">
                <GitBranch className="text-accent mr-2 h-4 w-4" />
                Use Template
              </a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a href={repoUrl} target="_blank" rel="noreferrer noopener">
                View Source
              </a>
            </Button>
          </div>

          {/* Quickstart Snippet */}
          <div className="group relative mt-8 w-full max-w-md">
            <div className="from-primary/20 to-accent/20 absolute -inset-0.5 rounded-xl bg-linear-to-r opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
            <div className="border-border/10 bg-foreground/95 text-background relative rounded-lg border p-4 text-left font-mono text-sm shadow-2xl">
              <div className="absolute top-4 left-4 flex gap-1.5">
                <div className="bg-destructive/30 h-2.5 w-2.5 rounded-full"></div>
                <div className="bg-chart-4/30 h-2.5 w-2.5 rounded-full"></div>
                <div className="bg-chart-2/30 h-2.5 w-2.5 rounded-full"></div>
              </div>
              <pre className="overflow-x-auto pt-8">
                <code className="text-accent">git clone</code>{" "}
                <span className="text-muted">...</span>
                <br />
                <code className="text-accent">pnpm</code> install
                <br />
                <code className="text-accent">pnpm</code> dev
              </pre>
            </div>
          </div>
        </header>

        {/* The Philosophy / "Why" Section */}
        <section className="bg-primary/5 border-primary/10 relative overflow-hidden rounded-3xl border p-8 sm:p-12 lg:p-16">
          <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full blur-[80px]" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="bg-background/50 backdrop-blur"
              >
                The Philosophy
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Agents drift. <br />
                <span className="text-muted-foreground">
                  Architecture shouldn&apos;t.
                </span>
              </h2>
              <div className="text-muted-foreground space-y-4 text-lg">
                <p>
                  When you let an agent loose on a repo, it takes the path of
                  least resistance. Without boundaries, it creates duplicate
                  utils, messy imports, and side effects.
                </p>
                <p>
                  This template enforces{" "}
                  <span className="text-foreground font-medium">
                    shared rules
                  </span>
                  ,
                  <span className="text-foreground font-medium">
                    {" "}
                    consistent tooling
                  </span>
                  , and
                  <span className="text-foreground font-medium">
                    {" "}
                    strict boundaries
                  </span>
                  . If the agent breaks a rule, the build fails. Simple as that.
                </p>
              </div>
            </div>

            <div className="bg-background/80 border-border/50 rounded-xl border p-6 shadow-sm backdrop-blur-sm">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <FolderTree className="text-primary h-4 w-4" />
                Repo Structure
              </h3>
              <div className="text-muted-foreground space-y-3 font-mono text-sm">
                {repoStructure.map((folder, i) => (
                  <div key={folder.name}>
                    <div
                      className={`text-foreground flex items-center gap-2 ${i > 0 ? "pt-2" : ""}`}
                    >
                      {folder.icon}
                      <span>{folder.name}/</span>
                    </div>
                    <div className="border-border mt-3 ml-1.75 space-y-2 border-l pl-6">
                      {folder.children.map((child) => (
                        <div
                          key={child.name}
                          className="flex items-center gap-2"
                        >
                          <span className="border-border w-3 border-t" />
                          <span>{child.name}</span>
                          {child.description && (
                            <span className="text-muted-foreground ml-auto text-xs">
                              {child.description}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="space-y-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-3xl font-bold">The Workflow</h2>
            <p className="text-muted-foreground">
              Simple enough for humans, strict enough for bots.
            </p>
          </div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Connector Line */}
            <div className="via-border absolute top-12 right-[20%] left-[20%] hidden h-0.5 bg-linear-to-r from-transparent to-transparent md:block" />

            {[
              {
                step: "01",
                title: "Clone",
                desc: "Use the template to create a new repo.",
              },
              {
                step: "02",
                title: "Dev",
                desc: "pnpm dev runs both apps instantly.",
              },
              {
                step: "03",
                title: "Verify",
                desc: "Lint, typecheck, and build gate the PR.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative z-10 flex flex-col items-center space-y-4 text-center"
              >
                <div className="border-muted bg-background flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-sm">
                  <span className="text-muted-foreground/50 text-2xl font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-border mx-auto max-w-3xl space-y-8 border-t pt-16">
          <h2 className="text-center text-2xl font-semibold">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="border-border/50 bg-card/30 hover:bg-card/50 group rounded-lg border p-6 transition-colors"
              >
                <h3 className="text-foreground mb-2 flex items-center justify-between font-medium">
                  {item.question}
                  <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-muted-foreground pt-12 pb-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Valuecodes</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
