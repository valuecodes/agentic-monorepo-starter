/**
 * Cloud Logging promotes these three keys to `LogEntry.trace`, `.spanId` and
 * `.traceSampled`, which is what nests a request's log lines underneath the
 * request entry in the Logs Explorer and links them to Cloud Trace. The key
 * names are a contract with Google's parser, not a style choice — a typo leaves
 * them as ordinary `jsonPayload` fields and correlation silently vanishes with
 * nothing to notice.
 */
type TraceFields = {
  readonly "logging.googleapis.com/trace": string;
  readonly "logging.googleapis.com/spanId"?: string;
  readonly "logging.googleapis.com/trace_sampled"?: boolean;
};

type TraceHeaders = {
  /** W3C `traceparent`: 00-<32 hex trace>-<16 hex span>-<2 hex flags>. */
  readonly traceparent?: string | undefined;
  /** Cloud Run's `X-Cloud-Trace-Context`: TRACE_ID/SPAN_ID;o=1. */
  readonly cloudTraceContext?: string | undefined;
};

const TRACEPARENT = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;

const CLOUD_TRACE = /^([0-9a-f]{32})(?:\/(\d{1,20}))?(?:;o=([01]))?$/;

const ZERO_TRACE = "0".repeat(32);

const ZERO_SPAN = "0".repeat(16);

/**
 * `X-Cloud-Trace-Context` carries the span as a **decimal** uint64, while
 * `logging.googleapis.com/spanId` wants the 16-character hex encoding that the
 * Trace v2 API uses. Missing this conversion is silent: the field is accepted,
 * it just never matches a real span.
 */
const toSpanId = (decimal: string): string | undefined => {
  const hex = BigInt(decimal).toString(16);
  if (hex.length > 16) {
    return undefined;
  }
  const padded = hex.padStart(16, "0");
  return padded === ZERO_SPAN ? undefined : padded;
};

// TypeScript types every capture group as `string`, but an *optional* group
// that did not participate is `undefined` at runtime — `X-Cloud-Trace-Context`
// legitimately arrives with no span and no sampling flag. `at()` is typed
// honestly where indexing is not, so this needs no assertion to be correct.
const group = (match: RegExpExecArray, index: number): string | undefined =>
  match.at(index);

const fromTraceparent = (header: string): TraceFields | undefined => {
  const match = TRACEPARENT.exec(header.trim());
  if (match === null) {
    return undefined;
  }

  const trace = group(match, 1);
  const span = group(match, 2);
  const flags = group(match, 3);

  if (
    trace === undefined ||
    span === undefined ||
    flags === undefined ||
    trace === ZERO_TRACE ||
    span === ZERO_SPAN
  ) {
    return undefined;
  }

  return {
    "logging.googleapis.com/trace": trace,
    "logging.googleapis.com/spanId": span,
    // Only the low bit of the flags byte is `sampled`.
    "logging.googleapis.com/trace_sampled": (parseInt(flags, 16) & 1) === 1,
  };
};

const fromCloudTraceContext = (header: string): TraceFields | undefined => {
  const match = CLOUD_TRACE.exec(header.trim());
  if (match === null) {
    return undefined;
  }

  const trace = group(match, 1);
  const span = group(match, 2);
  const sampled = group(match, 3);

  if (trace === undefined || trace === ZERO_TRACE) {
    return undefined;
  }

  return {
    "logging.googleapis.com/trace": trace,
    "logging.googleapis.com/spanId":
      span === undefined ? undefined : toSpanId(span),
    "logging.googleapis.com/trace_sampled": sampled === "1",
  };
};

/**
 * The bare TRACE_ID form is used rather than
 * `projects/<PROJECT_ID>/traces/<TRACE_ID>`. Both are accepted by the Logs
 * Explorer and Trace Explorer, and the bare form needs no project id — which
 * matters when the platform injects no environment variables.
 *
 * `traceparent` wins when both are present: it is the standard, and a caller
 * that sends it is the more likely source of a trace we can actually join.
 */
const parseTraceHeaders = (headers: TraceHeaders): TraceFields | undefined => {
  const { traceparent, cloudTraceContext } = headers;

  const w3c =
    traceparent === undefined ? undefined : fromTraceparent(traceparent);
  if (w3c !== undefined) {
    return w3c;
  }

  return cloudTraceContext === undefined
    ? undefined
    : fromCloudTraceContext(cloudTraceContext);
};

export type { TraceFields, TraceHeaders };
export { parseTraceHeaders };
