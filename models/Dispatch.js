import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaDispatch = Schema({
  batchId: String,
  courier: [String],
  distributor: [
    {
      status: String,
      distributorName: String,
      distributorAddress: String,
      distributorSupply: Number,
      distributedAmount: Number,
      distroTransactions: [String],
      pharmacy: [
        {
          pharmaName: String,
          pharmaAddress: String,
          deliveredAmount: Number,
          medicineSold: Number,
          pharmaTransactions: [String],
        },
      ],
    },
  ],
  transactions: [String],
});

export const Dispatch = model("Dispatch", schemaDispatch);
