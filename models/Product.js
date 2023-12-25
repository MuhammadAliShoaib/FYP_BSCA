import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaProduct = Schema({
  name: String,
  symbol: String,
  formula: String,
  manufacturer: String,
});

export const Product = model("Product", schemaProduct);
