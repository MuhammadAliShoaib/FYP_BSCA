import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaBatch = Schema({
  batchId: { type: String, required: true },
  medicine: { type: String, required: true },
  containerType: { type: String, required: true },
  unit: { type: String, required: true },
  packSize: { type: Number, required: true },
  cartonSize: { type: Number, required: true },
  totalSupply: { type: Number, required: true },
  quantity: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  mfg: Date,
  exp: Date,
});

export const Batch = model("Batch", schemaBatch);
