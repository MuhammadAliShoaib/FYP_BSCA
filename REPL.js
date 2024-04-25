import { db } from "./models/index.js";

db.Product.aggregate([
  {
    $match: {
      manufacturer: "0x867c6f443404cA5FC002148EC18bdD986EB4d8A6",
    },
  },
  {
    $lookup: {
      from: "batches",
      foreignField: "medicine",
      localField: "name",
      as: "medicineBatches",
    },
  },
  {
    $match: {
      medicineBatches: { $ne: [] },
    },
  },
])
  .then((res) => console.log(JSON.stringify(res, null, 4)))
  .then(() => process.exit());
