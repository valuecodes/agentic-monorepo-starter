import { Badge } from "@turborepo-agents/ui/components/badge";
import { Button } from "@turborepo-agents/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turborepo-agents/ui/components/card";
import { Input } from "@turborepo-agents/ui/components/input";
import { Label } from "@turborepo-agents/ui/components/label";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:py-20">
        <header className="flex flex-col gap-5">
          <Badge variant="secondary" className="w-fit">
            Turborepo Agents
          </Badge>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Let agents handle the monorepo busywork.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Turborepo Agents plan, execute, and report on tasks across your
              Turbo pipelines so your team can ship faster with confidence.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg">Create workspace</Button>
            <Button variant="outline" size="lg">
              Read the docs
            </Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Agent playbook</CardTitle>
              <CardDescription>
                Turn ideas into actionable repo tasks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Break down tickets into scoped changes.</li>
                <li>Generate tasks that map to Turbo pipelines.</li>
                <li>Prepare PRs with tests and summaries.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guardrails built-in</CardTitle>
              <CardDescription>
                Keep every run aligned with your standards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Respects workspace boundaries and ownership.</li>
                <li>Surface risks before changes land.</li>
                <li>Delivers daily status digests for teams.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Get early updates</CardTitle>
            <CardDescription>
              Join the list for release notes and product invites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="turborepo-agents-email">Work email</Label>
                <Input
                  id="turborepo-agents-email"
                  type="email"
                  placeholder="you@company.com"
                />
              </div>
              <Button className="sm:min-w-[160px]">Join updates</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
