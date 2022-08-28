import { MClient } from "@tomsd/mongodbclient";
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-mongodbclient:insertmany",
    handler: (
      event: any,
      {
        uri,
        db,
        collection,
        items
      }: {
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
      {
        uri,
        db,
        collection,
        condition
      }: {
        uri: string;
        db: string;
        collection: string;
        condition?: any;
      }
    ) => new MClient(uri, db, collection).read(condition)
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
    )
  }
};
