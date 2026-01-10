import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Agentic Monorepo Starter",
    template: "%s | Agentic Monorepo Starter",
  },
  description:
    "Guardrails-first Turborepo template for agent-driven development. Strict rules, consistent tooling, and clear boundaries for Claude, Codex, Cursor, and Copilot.",
  keywords: [
    "turborepo",
    "monorepo",
    "agentic",
    "claude",
    "codex",
    "cursor",
    "copilot",
    "nextjs",
    "typescript",
  ],
  authors: [{ name: "Agentic Monorepo Starter" }],
  creator: "Agentic Monorepo Starter",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Agentic Monorepo Starter",
    description:
      "Guardrails-first Turborepo template for agent-driven development.",
    siteName: "Agentic Monorepo Starter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Monorepo Starter",
    description:
      "Guardrails-first Turborepo template for agent-driven development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
