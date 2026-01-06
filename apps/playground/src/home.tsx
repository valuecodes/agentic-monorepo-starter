import { Button } from "@turborepo-agents/ui/components/button";
import { Badge } from "@turborepo-agents/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@turborepo-agents/ui/components/card";

export const Home = () => {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-10">
      <header className="flex flex-col gap-4">
        <Badge variant="secondary">Agentic starter</Badge>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Ship AI-driven workflows faster with a focused monorepo starter.
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            Build agents, tools, and UI in one place with shared configs,
            reusable components, and a clean baseline for experiments.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg">Explore the stack</Button>
          <Button size="lg" variant="outline">
            View sample agents
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Agent ready</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Start with a repo tailored for tool calling, workflows, and quick
            iterations.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shared tooling</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Unified lint, typecheck, and formatting keep every package aligned.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Efficient UI</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Reuse the component library to build dashboards and demos quickly.
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border bg-muted/30 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Build with agents in mind</h2>
            <p className="text-muted-foreground text-sm">
              Start with sensible defaults for automation, evaluation, and
              polished UX.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button>Run the playground</Button>
            <Button variant="outline">Read the docs</Button>
          </div>
        </div>
      </section>
    </main>
  );
};
