# @repo/logger

A [pino](https://getpino.io) logger that emits single-line JSON shaped for **Google Cloud Logging**.

```ts
import { Logger } from "@repo/logger";

const logger = new Logger({ bindings: { service: "api" } });

logger.info("server ready", { port: 8080 });
logger.error("request failed", { err, requestId: "abc" });

const requestLog = logger.child({ requestId: "abc" });
requestLog.info("fetched"); // carries requestId
```

**Message first, fields second — in every method.** That is the opposite of pino's own
`(obj, msg)`, and it is deliberate: `Logger` wraps pino rather than re-exporting it, so pino's
`(message, ...args)` printf overload is unreachable. A call cannot land on it by accident and
interpolate the fields _into_ the message string, which is the one silent way to lose a line's
contents. The wrapper owns the shape, so there is only one shape.

This is a Node package: pino writes to file descriptor 1. It is not for browser bundles.

## Two constraints, both easy to break

**1. Keep it bundler-safe.** Services are typically bundled into a single file and shipped without
`node_modules`. So:

> Never use a pino `transport:`, `pino-pretty`, `pino.multistream`, or anything else backed by a
> worker thread — not even behind a `NODE_ENV !== "production"` branch.

pino resolves transport worker entry points by path at runtime, so they are not in the module graph
and will not be in the bundle. Plain `pino()` with a `destination` bundles cleanly.

**2. The field names are a contract with Google's parser, not a style choice.** Every one of these
fails _silently_ if renamed — a wrong key is not an error, just a field nobody looks at:

| Field                                  | What Cloud Logging does with it                                                                                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `severity`                             | Promoted to `LogEntry.severity`. Drives Logs Explorer colouring and every `severity >= ERROR` filter or alert. Replaces pino's numeric `level`.                                                                                                      |
| `message`                              | Promoted to the Logs Explorer summary line. pino's default `msg` is **not**.                                                                                                                                                                         |
| `time`                                 | An RFC3339 **string**, one of the three time forms Google recognises. Moved to `LogEntry.timestamp` and stripped from the payload, so entries carry their emit time rather than their collection time. pino's default epoch integer matches nothing. |
| `stack_trace`                          | Parsed by **Cloud Error Reporting**, which groups the error event on these frames.                                                                                                                                                                   |
| `logging.googleapis.com/trace`         | Promoted to `LogEntry.trace`; nests a request's lines under the request entry.                                                                                                                                                                       |
| `logging.googleapis.com/spanId`        | 16-char **hex**. Note `X-Cloud-Trace-Context` sends the span as a _decimal_ uint64 — `trace.ts` converts it.                                                                                                                                         |
| `logging.googleapis.com/trace_sampled` | Promoted to `LogEntry.traceSampled`.                                                                                                                                                                                                                 |

`pid` and `hostname` are dropped: on Cloud Run `pid` is always 1 and `hostname` is a throwaway
sandbox id already exposed as `labels.instanceId`.

Everything, including `error`, goes to **stdout**. Cloud Run tags anything on stderr as ERROR
automatically, which would fight the explicit `severity`.

## Levels

`debug` · `info` · `warn` · `error` · `silent`. pino's `trace` and `fatal` are not part of the
vocabulary, though `severity.ts` still maps them because pino renders a severity for every level it
knows about.

`LOG_LEVEL` overrides the default, which is `info` under `NODE_ENV=production`, `silent` under
`NODE_ENV=test`, and `debug` otherwise. An unrecognised `LOG_LEVEL` falls back and logs one
`WARNING` naming the value rather than crashing — a bad level announces itself in the very next
line.

## Errors

Pass the `Error` itself as the `err` field. It reaches pino's error serialiser, which folds any
`cause` chain into the message and stack, and `formatters.log` promotes the frames to a top-level
`stack_trace`:

```ts
logger.error("request failed", { err: error, requestId: "abc" });
```

`@type` and `serviceContext` are deliberately not set. Setting `@type` would promote _every_ ERROR
line into Error Reporting, including ones that describe a policy outcome rather than an exception.
The rule this encodes is narrower and more useful: **a line carrying a real `Error` becomes an error
event, and nothing else does.**

## Trace correlation

Trace fields are ordinary `child()` bindings. Parse the incoming headers once per request, build one
traced child, and pass it down — there is no ambient context:

```ts
import { parseTraceHeaders } from "@repo/logger";

const trace = parseTraceHeaders({
  traceparent: req.header("traceparent"),
  cloudTraceContext: req.header("X-Cloud-Trace-Context"),
});
const requestLog = trace === undefined ? logger : logger.child(trace);
```

The consequence to know: **only loggers descended from that child are traced.** Code that imports a
module-level logger directly and logs during a request produces an untraced line, and nothing in the
type system will tell you. Pass the logger down.

W3C `traceparent` wins over `X-Cloud-Trace-Context` when both are present. The bare `TRACE_ID` form
is emitted rather than `projects/<PROJECT_ID>/traces/<TRACE_ID>`; both correlate, and the bare form
needs no project id. If correlation ever fails to appear in the Logs Explorer, set
`GOOGLE_CLOUD_PROJECT` and prefix.

Because a child is an ordinary value captured lexically, **work that outlives its request keeps the
trace it started under**, and it does not depend on async-context propagation surviving an abandoned
promise.

## Testing

`@repo/logger/testing` captures the **serialised** line and parses it back, so assertions are about
what Cloud Logging will actually receive:

```ts
import { createTestLogger } from "@repo/logger/testing";

const { logger, lines } = createTestLogger();
logger.info("heartbeat", { taskId: "a" });
expect(lines[0]).toMatchObject({ severity: "INFO", message: "heartbeat" });
```

To fake a logger rather than capture from one, depend on the `LoggerLike` type: it names no private
state, so a plain object literal satisfies it. The concrete `Logger` class does not, by design.

## Not configured, on purpose

**No `redact`.** It compiles path matchers at construction and traverses every line, and a default
path list that matches nothing provides false assurance. The real control is "don't log raw
headers". Revisit the moment a request-logging middleware lands, and start with
`["req.headers.authorization", "*.authorization", "*.token"]`.

**No duplicate-key guard.** With `messageKey: "message"`, a field literally named `message` is
emitted twice; the same is true of any field that repeats a `child()` binding — trace fields
included, since those are bindings too. Bindings are written ahead of call-site fields and nothing
de-duplicates them, so JSON parsers take the last value: the call site wins and the binding is lost.
Don't shadow bound keys.
