import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaBatch = Schema({
  batchId: String,
  medicine: String,
  quantity: Number,
  mfg: Date,
  exp: Date,
  manufacturer: String,
});

export const Batch = model("Batch", schemaBatch);
