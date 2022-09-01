import { MClient } from "@tomsd/mongodbclient";
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-mongodbclient:insertmany",
    handler: (
      event: any,
      { uri, db, collection, items }: {
        uri: string;
        db: string;
        collection: string;
        items: object[];
      }
    ) => new MClient(uri, db, collection).insertMany(items)
  },
  {
    eventName: "electronade-mongodbclient:read",
    handler: (
      event: any,
      { uri, db, collection, condition }: {
        uri: string;
        db: string;
        collection: string;
        condition?: any;
      }
    ) => new MClient(uri, db, collection).read(condition)
  },
  {
    eventName: "electronade-mongodbclient:upsert",
    handler: (
      event: any,
      { uri, db, collection, item }: {
        uri: string;
        db: string;
        collection: string;
        item: object;
      }
    ) => new MClient(uri, db, collection).upsert(item)
  },
  {
    eventName: "electronade-mongodbclient:remove",
    handler: (
      event: any,
      { uri, db, collection, condition }: {
        uri: string;
        db: string;
        collection: string;
        condition: any;
      }
    ) => new MClient(uri, db, collection).remove(condition)
  },
  {
    eventName: "electronade-mongodbclient:count",
    handler: (
      event: any,
      { uri, db, collection, condition }: {
        uri: string;
        db: string;
        collection: string;
        condition?: any;
      }
    ) => new MClient(uri, db, collection).count(condition)
  }
];

export const preloadObject = {
  mongodbclient: {
    insertMany: (
      uri: string,
      db: string,
      collection: string,
      items: object[]
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:insertmany",
      { uri, db, collection, items }
    ),
    read: (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:read",
      { uri, db, collection, condition }
    ),
    upsert: (
      uri: string,
      db: string,
      collection: string,
      item: object
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:upsert",
      { uri, db, collection, item }
    ),
    remove: (
      uri: string,
      db: string,
      collection: string,
      condition: any
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:remove",
      { uri, db, collection, condition }
    ),
    count: (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:count",
      { uri, db, collection, condition }
    ),
    distinct: (
      uri: string,
      db: string,
      collection: string,
      key: string,
      condition?: any
    ) => ipcRenderer.invoke(
      "electronade-mongodbclient:distinct",
      { uri, db, collection, key, condition }
    )
  }
};
