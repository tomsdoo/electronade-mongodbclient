# electronade-mongodbclient

It's a package that provides mongodb client feathre for electronade.  
See [electronade page](https://electronade.netlify.app/) for the structures of `electronade packages`.  
This package uses [@tomsd/mongodbclient](https://mongodbclient.netlify.app/) internally.

![npm](https://img.shields.io/npm/v/electronade-mongodbclient)
![NPM](https://img.shields.io/npm/l/electronade-mongodbclient)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade-mongodbclient)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade-mongodbclient)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

[![](https://nodei.co/npm/electronade-mongodbclient.svg?mini=true)](https://www.npmjs.com/package/electronade-mongodbclient)

## install

``` shell
npm install electronade-mongodbclient
```

## exposed

``` typescript
electronade: {
  mongodbclient: {
    insertMany: (
      uri: string,
      db: string,
      collection: string,
      items: object[]
    ) => Promise<any>;

    read: (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) => Promise<any[]>;

    upsert: (
      uri: string,
      db: string,
      collection: string,
      item: object
    ) => Promise<any>;

    remove: (
      uri: string,
      db: string,
      collection: string,
      condition: any
    ) => Promise<any>;

    count: (
      uri: string,
      db: string,
      collection: string,
      condition?: any
    ) => Promise<number>;

    distinct: (
      uri: string,
      db: string,
      collection: string,
      key: string,
      condition?: any
    ) => Promise<any>;
  }
}
```

## usage
See electronade usage for details.

``` javascript
const [ uri, db, collection ] = [
  "mongodb+srv://...",
  "dbName",
  "collectionName"
];

console.log(
  await electronade.mongodbclient
    .insertMany(
      uri,
      db,
      collection,
      [{ label: "test", name: "test1" }, { label: "test", name: "test2" }]
    )
    .then(({ insertedCount }) => insertedCount)
); // 2

console.log(
  await electronade.mongodbclient
    .read(
      uri,
      db,
      collection,
      { label: "test" }
    )
    .then(items => items.map(({ name }) => name))
); // [ "test1", "test2" ]

console.log(
  await electronade.mongodbclient
    .read(
      uri,
      db,
      collection,
      { label: "test" }
    )
    .then(items => items[0])
    .then(item =>
      electronade.mongodbclient
        .upsert(
          uri,
          db,
          collection,
          {
            ...item,
            name: "test3"
          }
        )
    )
    .then(({ modifiedCount }) => modifiedCount)
); // 1

console.log(
  await electronade.mongodbclient
    .count(
      uri,
      db,
      collection,
      { label: "test" }
    )
); // 2

console.log(
  await electronade.mongodbclient
    .distinct(
      uri,
      db,
      collection,
      "name",
      { label: "test" }
    )
); // [ "test1", "test3" ]

console.log(
  await electronade.mongodbclient
    .remove(
      uri,
      db,
      collection,
      { label: "test" }
    )
    .then(({ deletedCount }) => deletedCount)
); // 2
```
