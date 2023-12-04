import mongoose from "mongoose";
import "dotenv/config.js";
import { User } from "./User.js";

(async () => {
  mongoose.connect(
    `mongodb+srv://Umair:${process.env.VITE_DB_PASS}@cluster0.c6tj13p.mongodb.net/practice_fyp?retryWrites=true&w=majority`
  );
})();

export const db = {
  User,
};
