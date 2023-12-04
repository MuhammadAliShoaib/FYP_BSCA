import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaUser = Schema({
  name: String,
  address: String,
  role: String,
});

export const User = model("User", schemaUser);
