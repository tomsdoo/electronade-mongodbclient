import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName)
};

let uri: string;
let db: string;
let collection: string;
let handleStore: {
  [key: string]: Function;
}

describe("preload to handles", () => {
  before(() => {
    uri = "dummy uri";
    db = "dummy db";
    collection = "dummy collection";
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [ eventName, handler ])
    );
  });

  it("electronade-mongodbclient:insertmany", async () => {
    assert(
      await eval(preloadObject.mongodbclient.insertMany.toString())
        (uri, db, collection, [{ test: 1 }])
        in handleStore
    );
  });
});
