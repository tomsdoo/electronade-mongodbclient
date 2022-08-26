import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles } from "../src/";

let handleStore: {
  [key: string]: Function;
};

describe("handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [ eventName, handler ])
    );
  });

  it("handles are exported", () => {
    assert(handles);
  });

  it("electronade-mongodbclient:insertmany eventName exists", () => {
    assert(
      "electronade-mongodbclient:insertmany" in handleStore
    );
  });
});
