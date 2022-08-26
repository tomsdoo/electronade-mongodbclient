import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName)
};

let uri: string;
let db: string;
let collection: string;

describe("preloadObject", () => {
  before(() => {
    uri = "dummy uri";
    db = "db name",
    collection = "collection name";
  });

  it("preloadObject is exported", () => {
    assert(preloadObject);
  });

  it("mongodbclient exists", () => {
    assert(preloadObject.mongodbclient);
  });

  it("mongodbclient.insertMany exists", () => {
    assert(preloadObject.mongodbclient.insertMany);
  });

  it("mongodbclient.insertMany calling", async () => {
    const [
      items,
      mockedValue
    ] = [
      [{ name: "test1" }, { name: "test2" }],
      { insertedCount: 2 }
    ];
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs(
        "electronade-mongodbclient:insertmany",
        { uri, db, collection, items }
      )
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.insertMany.toString())
        (uri, db, collection, items)
        .then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });
});
