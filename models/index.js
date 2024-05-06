import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";
import { Product } from "./Product.js";
import { Batch } from "./Batch.js";
import { Dispatch } from "./Dispatch.js";
import { Notification } from "./Notification.js";


const pass = process.env.VITE_DB_PASS;

(async () => {
  mongoose.connect(
    // `mongodb://127.0.0.1:27017/fyp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0`
    `mongodb://127.0.0.1:27017/fypsheet`
    // `mongodb+srv://Umair:${pass}@cluster0.c6tj13p.mongodb.net/?retryWrites=true&w=majority`
  );
})();

export const db = {
  User,
  Product,
  Batch,
  Dispatch,
  Notification
};
