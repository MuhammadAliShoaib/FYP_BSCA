import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";

(async () => {
  mongoose.connect(
    `mongodb://127.0.0.1:27017/fyp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0`
  );
})();

export const db = {
  User,
};
