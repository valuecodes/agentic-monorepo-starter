import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Home } from "./home";

describe("Home", () => {
  it("renders the heading", () => {
    expect(renderToString(<Home />)).toMatch(/<h1[^>]*>Playground<\/h1>/);
  });
});
