import { describe, it } from "mocha";
import { strict as assert } from "assert";
import { mock } from "sinon";

import { preloadObject } from "../src/";

const ipcRenderer: {
  invoke: (eventName: string, ...args: any[]) => Promise<any>;
} = {
  invoke: (eventName: string) => Promise.resolve(eventName),
};

let uri: string;
let db: string;
let collection: string;

describe("preloadObject", () => {
  before(() => {
    uri = "dummy uri";
    (db = "db name"), (collection = "collection name");
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
    const [items, mockedValue] = [
      [{ name: "test1" }, { name: "test2" }],
      { insertedCount: 2 },
    ];
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:insertmany", {
        uri,
        db,
        collection,
        items,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.insertMany.toString())(
        uri,
        db,
        collection,
        items
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });

  it("mongodbclient.read exists", () => {
    assert(preloadObject.mongodbclient.read);
  });

  it("mongodbclient.read calling", async () => {
    const [mockedValue] = [
      [
        { _id: "test id 1", value: "test1" },
        { _id: "test id 2", value: "test2" },
      ],
    ];
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:read", {
        uri,
        db,
        collection,
        condition: undefined,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.read.toString())(
        uri,
        db,
        collection
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );
    mocked.verify();
    mocked.restore();
  });

  it("mongodbclient.upsert exists", () => {
    assert(preloadObject.mongodbclient.upsert);
  });

  it("mongodbclient.upsert calling", async () => {
    const item = { name: "test" };
    const mockedValue = {
      ...item,
      _id: "test id",
    };

    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:upsert", {
        uri,
        db,
        collection,
        item,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.upsert.toString())(
        uri,
        db,
        collection,
        item
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );

    mocked.verify();
    mocked.restore();
  });

  it("mongodbclient.remove exists", () => {
    assert(preloadObject.mongodbclient.remove);
  });

  it("mongodbclient.remove calling", async () => {
    const condition = { name: "test" };
    const mockedValue = { deletedCount: 1 };
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:remove", {
        uri,
        db,
        collection,
        condition,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.remove.toString())(
        uri,
        db,
        collection,
        condition
      ).then(({ deletedCount }: { deletedCount: number }) => deletedCount),
      1
    );

    mocked.verify();
    mocked.restore();
  });

  it("mongodbclient.count exists", () => {
    assert(preloadObject.mongodbclient.count);
  });

  it("mongodbclient.count calling", async () => {
    const condition = { name: "test" };
    const mockedValue = 1;
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:count", {
        uri,
        db,
        collection,
        condition,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.count.toString())(
        uri,
        db,
        collection,
        condition
      ),
      mockedValue
    );

    mocked.verify();
    mocked.restore();
  });

  it("mongodbclient.distinct exists", () => {
    assert(preloadObject.mongodbclient.distinct);
  });

  it("mongodbclient.distinct calling", async () => {
    const mockedValue = ["test1", "test2"];
    const mocked = mock(ipcRenderer);
    mocked
      .expects("invoke")
      .once()
      .withArgs("electronade-mongodbclient:distinct", {
        uri,
        db,
        collection,
        key: "name",
        condition: undefined,
      })
      .returns(Promise.resolve(mockedValue));

    assert.equal(
      await eval(preloadObject.mongodbclient.distinct.toString())(
        uri,
        db,
        collection,
        "name"
      ).then((result: any) => JSON.stringify(result)),
      JSON.stringify(mockedValue)
    );
  });
});
