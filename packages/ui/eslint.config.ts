import { defineConfig } from "eslint/config";

import { baseConfig } from "@turborepo-agents/eslint/base";
import { reactConfig } from "@turborepo-agents/eslint/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig
);
