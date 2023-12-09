import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";

(async () => {
  mongoose.connect(
    `mongodb://127.0.0.1:27017/fyp`
  );
})();

export const db = {
  User,
};
