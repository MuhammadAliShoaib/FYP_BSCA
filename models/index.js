import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";
import { Product } from "./Product.js";
import { Batch } from "./Batch.js";
import { Dispatch } from "./Dispatch.js";
import { Notification } from "./Notification.js";


const pass = process.env.VITE_DB_PASS;

(async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
})();

export const db = {
  User,
  Product,
  Batch,
  Dispatch,
  Notification
};
