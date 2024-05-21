import { db } from "./models/index.js";

// db.Product.aggregate([
//   {
//     $match: {
//       manufacturer: "0x867c6f443404cA5FC002148EC18bdD986EB4d8A6",
//     },
//   },
//   {
//     $lookup: {
//       from: "batches",
//       foreignField: "medicine",
//       localField: "name",
//       as: "medicineBatches",
//     },
//   },
//   {
//     $match: {
//       medicineBatches: { $ne: [] },
//     },
//   },
// ])
//   .then((res) => console.log(JSON.stringify(res, null, 4)))
//   .then(() => process.exit());

// db.Dispatch.aggregate([
//   {
//     $match: {
//       "distributor.distributorAddress":
//         "0x7e3989EC5689f60aED26e683c8f87cB9A4a22DC4",
//     },
//   },
//   {
//     $lookup: {
//       from: "batches",
//       foreignField: "batchId",
//       localField: "batchId",
//       as: "batch",
//     },
//   },
//   {
//     $unwind: "$batch",
//   },
// ])
//   .then((res) => console.log(JSON.stringify(res, null, 4)))
//   .then(() => process.exit());

// db.Dispatch.find({ batchId: "FOLIC-1714411922315" })
// .then((res) => console.log(JSON.stringify(res, null, 4)))
// .then(() => process.exit());

db.Dispatch.findOne({ batchId: "HYDRA-1715957095100" })
  .then((res) => console.log(JSON.stringify(res, null, 4)))
  .then(() => process.exit());
