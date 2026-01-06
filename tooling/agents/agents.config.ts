import type { AgentsConfig } from "./src/types";
import { normalizeLF } from "./src/utils";

const config: AgentsConfig = {
  version: 1,
  globalTransforms: [normalizeLF],
  sources: [
    {
      patterns: ["src/skills/**/SKILL.md"],
      targets: {
        claude: {
          dir: ".claude/skills",
          description: "Claude Code skills",
        },
        codex: {
          dir: ".codex/skills",
          description: "Codex skills",
        },
      },
    },
  ],
};

export default config;
