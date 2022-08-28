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

  it("mongodbclient.read exists", () => {
    assert(preloadObject.mongodbclient.read);
  });

  it("mongodbclient.read calling", async () => {
    const [
      mockedValue
    ] = [
      [
        { _id: "test id 1", value: "test1" },
        { _id: "test id 2", value: "test2" }
      ]
    ];
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs(
        "electronade-mongodbclient:read",
        { uri, db, collection, condition: undefined }
      )
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.read.toString())
        (uri, db, collection)
        .then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });
});
