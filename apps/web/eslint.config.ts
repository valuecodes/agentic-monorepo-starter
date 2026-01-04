import { baseConfig } from "@turborepo-agents/eslint/base";
import { nextjsConfig } from "@turborepo-agents/eslint/nextjs";
import { reactConfig } from "@turborepo-agents/eslint/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig
);
