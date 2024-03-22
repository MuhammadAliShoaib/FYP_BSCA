import { db } from "./models/index.js";

db.Dispatch.aggregate([
  {
    $match: {
      'pharmacy.pharmaAddress': '0x64D960696643321b26976fb64f8c91EDFb04Ae18'
    }
  },
  {
    $lookup: {
      from: 'batches',
      foreignField: 'batchId',
      localField: 'batchId',
      as: 'batchDetails',
    },
  }, 
  {
    $unwind: '$batchDetails'
  }
]).then((res) => console.log(JSON.stringify(res, null, 4)))
.then(() => process.exit())