import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaProduct = Schema({
  name: { type: String, required: true },
  dosage: { type: Number, required: true },
  activeIngredient: { type: String, required: true },
  completeName: { type: String, required: true },
  manufacturer: { type: String, required: true },
});

export const Product = model("Product", schemaProduct);
