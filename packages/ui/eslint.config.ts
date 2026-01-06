import { baseConfig } from "@repo/eslint/base";
import { reactConfig } from "@repo/eslint/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig
);
