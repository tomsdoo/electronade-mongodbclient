import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { preloadObject } from "../src/";

describe("preloadObject", () => {
  it("preloadObject is exported", () => {
    assert(preloadObject);
  });
});
