import { describe, it } from "mocha";
import { strict as assert } from "assert";

import { handles, preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName),
};

let uri: string;
let db: string;
let collection: string;
let handleStore: {
  [key: string]: Function;
};

describe("preload to handles", () => {
  before(() => {
    uri = "dummy uri";
    db = "dummy db";
    collection = "dummy collection";
    handleStore = Object.fromEntries(
      handles.map(({ eventName, handler }) => [eventName, handler])
    );
  });

  it("electronade-mongodbclient:insertmany", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.insertMany.toString())(
        uri,
        db,
        collection,
        [{ test: 1 }]
      )) in handleStore
    );
  });

  it("electronade-mongodbclient:read", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.read.toString())(
        uri,
        db,
        collection
      )) in handleStore
    );
  });

  it("electronade-mongodbclient:upsert", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.upsert.toString())(
        uri,
        db,
        collection,
        { some: "thing" }
      )) in handleStore
    );
  });

  it("electronade-mongodbclient:remove", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.remove.toString())(
        uri,
        db,
        collection,
        { name: "test" }
      )) in handleStore
    );
  });

  it("electronade-mongodbclient:count", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.count.toString())(
        uri,
        db,
        collection,
        { some: "thing" }
      )) in handleStore
    );
  });

  it("electronade-mongodbclient:distinct", async () => {
    assert(
      (await eval(preloadObject.mongodbclient.distinct.toString())(
        uri,
        db,
        collection,
        "name"
      )) in handleStore
    );
  });
});
