import { baseConfig } from "@turborepo-agents/eslint/base";
import { reactConfig } from "@turborepo-agents/eslint/react";
import { defineConfig } from "eslint/config";

export default defineConfig(baseConfig, reactConfig);
