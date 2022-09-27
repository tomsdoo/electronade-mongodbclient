import { MClient } from "@tomsd/mongodbclient";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron");

export const handles = [
  {
    eventName: "electronade-mongodbclient:insertmany",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        items,
      }: {
        uri: string;
        db: string;
        collection: string;
        items: object[];
      }
    ) => await new MClient(uri, db, collection).insertMany(items),
  },
  {
    eventName: "electronade-mongodbclient:read",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        condition,
      }: {
        uri: string;
        db: string;
        collection: string;
        condition?: any;
      }
    ) => await new MClient(uri, db, collection).read(condition),
  },
  {
    eventName: "electronade-mongodbclient:upsert",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        item,
      }: {
        uri: string;
        db: string;
        collection: string;
        item: object;
      }
    ) => await new MClient(uri, db, collection).upsert(item),
  },
  {
    eventName: "electronade-mongodbclient:remove",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        condition,
      }: {
        uri: string;
        db: string;
        collection: string;
        condition: any;
      }
    ) => await new MClient(uri, db, collection).remove(condition),
  },
  {
    eventName: "electronade-mongodbclient:count",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        condition,
      }: {
        uri: string;
        db: string;
        collection: string;
        condition?: any;
      }
    ) => await new MClient(uri, db, collection).count(condition),
  },
  {
    eventName: "electronade-mongodbclient:distinct",
    handler: async (
      event: any,
      {
        uri,
        db,
        collection,
        key,
        condition,
      }: {
        uri: string;
        db: string;
        collection: string;
        key: string;
        condition?: any;
      }
    ) => await new MClient(uri, db, collection).distinct(key, condition),
  },
];

export const preloadObject = {
  mongodbclient: {
    insertMany: async (
      uri: string,
      db: string,
      collection: string,
      items: object[]
    ) =>
      await ipcRenderer.invoke("electronade-mongodbclient:insertmany", {
        uri,
        db,
        collection,
        items,
      }),
    read: async (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) =>
      await ipcRenderer.invoke("electronade-mongodbclient:read", {
        uri,
        db,
        collection,
        condition,
      }),
    upsert: async (uri: string, db: string, collection: string, item: object) =>
      await ipcRenderer.invoke("electronade-mongodbclient:upsert", {
        uri,
        db,
        collection,
        item,
      }),
    remove: async (
      uri: string,
      db: string,
      collection: string,
      condition: any
    ) =>
      await ipcRenderer.invoke("electronade-mongodbclient:remove", {
        uri,
        db,
        collection,
        condition,
      }),
    count: async (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) =>
      await ipcRenderer.invoke("electronade-mongodbclient:count", {
        uri,
        db,
        collection,
        condition,
      }),
    distinct: async (
      uri: string,
      db: string,
      collection: string,
      key: string,
      condition?: any
    ) =>
      await ipcRenderer.invoke("electronade-mongodbclient:distinct", {
        uri,
        db,
        collection,
        key,
        condition,
      }),
  },
};
