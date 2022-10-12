# electronade-mongodbclient

It's a package for electronade that provides the storing features in a file.  
See [electronade-mongodbclient.netlify.app](https://electronade-mongodbclient.netlify.app/) for details.

![npm](https://img.shields.io/npm/v/electronade-mongodbclient)
![NPM](https://img.shields.io/npm/l/electronade-mongodbclient)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/electronade-mongodbclient)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/electronade-mongodbclient)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

# Installation
``` shell
npm install electronade-mongodbclient
```

# What Exposed
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
      db:string,
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
      condition ?: any
    ) => Promise<any>;
  }
}
```

# Usage
See electronade usage for details.

``` javascript
const uri = "mongodb://...";
const db = "db";
const collection = "collection";

const items = [
  { name: "test1" }, { name: "test2" }
];

console.log(
  await electronade.mongodbclient
    .insertMany(
      uri,
      db,
      collection,
      items
    )
    .then(({ insertedCount }) => insertedCount)
) // 2

console.log(
  await electronade.mongodbclient
    .read(
      uri,
      db,
      collection
    )
); // [ { _id: "xxx", name: "test1"}, { _id: "yyy", name: "test2" } ]

console.log(
  await electronade.mongodbclient
    .upsert(
      uri,
      db,
      collection,
      { name: "test3" }
    )
    .then(({ name }) => name)
); // test3

console.log(
  await electronade.mongodbclient
    .count(
      uri,
      db,
      collection,
      { name: "test3" }
    )
); // 1

console.log(
  await electronade.mongodbclient
    .remove(
      uri,
      db,
      collection,
      { name: "test3" }
    )
    .then(({ deletedCount }) => deletedCount)
); // 1

console.log(
  await electronade.mongodbclient
    .distinct(
      uri,
      db,
      collection,
      "name"
    )
); // [ "test1", "test2" ]
```
