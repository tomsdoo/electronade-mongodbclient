import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles } from "../src/";

describe("handles", () => {
  it("handles are exported", () => {
    assert(handles);
  });
});
