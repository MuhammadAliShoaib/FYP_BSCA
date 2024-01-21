import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaDispatch = Schema({
    batchId: String,
    status: String,
    distributor: [
        {
            distributedAmount: Number,
            distributorAddress: String,
        },
    ],
    pharmacy: [
        {
            pharmaName: String,
            deliveredAmount: Number,
            medicineSold: Number,
            pharmaTransactions: [String],
        },
    ],
    transactions: [String],
});

export const Dispatch = model("Dispatch", schemaDispatch);
