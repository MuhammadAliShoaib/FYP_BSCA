import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schemaNotification = Schema({
  receiverAddress: String,
  senderAddress: String,
  notification: Object,
  date: Date,
});

export const Notification = model("Notification", schemaNotification);
