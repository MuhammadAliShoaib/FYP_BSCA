import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";
import { Product } from "./Product.js";
import { Batch } from "./Batch.js";

(async () => {
  mongoose.connect(
    // `mongodb://127.0.0.1:27017/fyp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0`
    `mongodb://127.0.0.1:27017/fypsheet`
  );
})();

export const db = {
  User,
  Product,
  Batch,
};
