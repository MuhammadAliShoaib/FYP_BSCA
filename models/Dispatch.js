import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaDispatch = Schema({
  batchId: String,
  status: String,
  courier: [String],
  distributor: [
    {
      distributorAddress: String,
      distributorSupply: Number,
      distributedAmount: Number,
    },
  ],
  pharmacy: [
    {
      pharmaAddress: String,
      deliveredAmount: Number,
      medicineSold: Number,
      pharmaTransactions: [String],
    },
  ],
  transactions: [String],
});

export const Dispatch = model("Dispatch", schemaDispatch);
