# electronade-mongodbclient

It's a package for electronade that provides the storing features in a file.

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
    .remove(
      uri,
      db,
      collection,
      { name: "test3" }
    )
    .then(({ deletedCount }) => deletedCount)
); // 1
```
