import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles } from "../src/";

let handleStore: {
  [key: string]: Function;
};

describe("handles", () => {
  before(() => {
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [eventName, handler])
    );
  });

  it("handles are exported", () => {
    assert(handles);
  });

  it("electronade-mongodbclient:insertmany eventName exists", () => {
    assert("electronade-mongodbclient:insertmany" in handleStore);
  });

  it("electronade-mongodbclient:read eventName exists", () => {
    assert("electronade-mongodbclient:read" in handleStore);
  });

  it("electronade-mongodbclient:upsert eventName exists", () => {
    assert("electronade-mongodbclient:upsert" in handleStore);
  });

  it("electronade-mongodbclient:remove eventName exists", () => {
    assert("electronade-mongodbclient:remove" in handleStore);
  });

  it("electronade-mongodbclient:count eventName exists", () => {
    assert("electronade-mongodbclient:count" in handleStore);
  });

  it("electronade-mongodbclient:distinct eventName exists", () => {
    assert("electronade-mongodbclient:distinct" in handleStore);
  });
});
