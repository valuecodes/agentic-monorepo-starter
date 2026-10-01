import { useState } from "react";

type CopyButtonProps = {
  readonly text: string;
};

type CopyStatus = "idle" | "copied" | "failed";

const resetDelayMs = 1500;

const labels: Record<CopyStatus, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Select to copy",
};

const CopyButton = ({ text }: CopyButtonProps) => {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const copy = () => {
    // Inside the promise chain so a missing Clipboard API (non-secure context)
    // lands in `.catch` instead of throwing out of the click handler.
    void Promise.resolve()
      .then(() => navigator.clipboard.writeText(text))
      .then(() => setStatus("copied"))
      // Clipboard access can be denied; the command text stays selectable.
      .catch(() => setStatus("failed"))
      .finally(() => setTimeout(() => setStatus("idle"), resetDelayMs));
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={status === "idle" ? `Copy: ${text}` : labels[status]}
      className="shrink-0 rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
    >
      {labels[status]}
    </button>
  );
};

export { CopyButton };
