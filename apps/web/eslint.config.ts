import { baseConfig } from "@repo/eslint/base";
import { nextjsConfig } from "@repo/eslint/nextjs";
import { reactConfig } from "@repo/eslint/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig
);
